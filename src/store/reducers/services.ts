import axios from 'utils/axios';
import { createSlice } from '@reduxjs/toolkit';

import { DefaultRootStateProps } from 'types/services';

import { Services as ServiceType } from 'types/services';
import { parseTimeseriesData } from 'utils/chart';

const initialState: DefaultRootStateProps['service'] = {
  error: null,
  services: [],
  service: null
};

const slice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    // GET Services
    getServicesSuccess(state, action) {
      state.services = action.payload;
    },

    filterServicesSuccess(state, action) {
      state.services = action.payload;
    }
  }
});

const zkCloudEndpoint = '/v1/u/cluster/';

// Reducer
export default slice.reducer;

export async function getServiceDetails(
  clusterId: string | undefined,
  namespace: string | undefined,
  serviceName: string | undefined,
  interval: string
) {
  try {
    if (serviceName && namespace) {
      const response = await axios.get(zkCloudEndpoint + clusterId + '/service/details', {
        params: {
          name: serviceName,
          ns: namespace,
          st: interval
        }
      });
      const detailsArr = response.data.results;
      console.log(detailsArr);
      return parseTimeseriesData(detailsArr);
    }
  } catch (error) {
    return null;
  }
}

export async function getServices(clusterId: string) {
  try {
    const response = await axios.get(zkCloudEndpoint + clusterId + '/service/list', {
      params: {
        st: '-5m'
      }
    });
    const servicesArr = response.data.results;
    let results: ServiceType[] = [];
    for (var i = 0; i < servicesArr.length; i++) {
      var obj = servicesArr[i];
      let service: ServiceType = {
        name: obj.service,
        podCount: obj.pod_count,
        httpLatencyIn: {
          p50: obj.http_latency_in.p50,
          p90: obj.http_latency_in.p90,
          p99: obj.http_latency_in.p99
        },
        httpReqThroughputIn: obj.http_req_throughput_in,
        httpErrorRateIn: obj.http_error_rate_in,
        inboundConns: obj.inbound_conns,
        outboundConns: obj.outbound_conns
      };
      results.push(service);
    }
    return results;
  } catch (error) {
    console.log('Error while fetching services list ', error);
    return [];
  }
}
