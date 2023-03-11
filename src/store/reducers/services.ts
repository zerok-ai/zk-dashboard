import axios from 'utils/axios';
import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../index';

import { DefaultRootStateProps } from 'types/services';

import { Services as ServiceType } from 'types/services';

import { convertNanoToMilliSecondsNumber } from 'utils/math';

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

const zkCloudEndpoint = '/v1/cluster/1/';

// Reducer
export default slice.reducer;

export async function getServiceDetails(namespace: string | undefined, serviceName: string | undefined) {
  try {
    if (serviceName && namespace) {
      const response = await axios.get(zkCloudEndpoint + '/service/graph?name=' + serviceName + '&ns=' + namespace + '&st=-5m');
      const detailsArr = response.data.results;
      console.log(detailsArr);
      const detailsMap = new Map();
      for (var i = 0; i < detailsArr.length; i++) {
        var obj = detailsArr[i];
        detailsMap.set(obj.time, obj);
      }
      const detailsMapSorted = new Map(
        [...detailsMap].sort((a, b) => {
          if (new Date(String(a[0])) < new Date(String(b[0]))) {
            return -1;
          }
          if (new Date(String(a[0])) > new Date(String(b[0]))) {
            return 1;
          }
          return 0;
        })
      );

      var latencyValues: {
        name: string;
        data: number[];
      }[] = [
        {
          name: 'p50',
          data: []
        },
        {
          name: 'p90',
          data: []
        },
        {
          name: 'p99',
          data: []
        }
      ];
      detailsMapSorted.forEach((value, key) => {
        latencyValues[0].data.push(convertNanoToMilliSecondsNumber(value.latency_p50));
        latencyValues[1].data.push(convertNanoToMilliSecondsNumber(value.latency_p90));
        latencyValues[2].data.push(convertNanoToMilliSecondsNumber(value.latency_p99));
      });
      return latencyValues;
    }
  } catch (error) {
    return null;
  }
}

export function getServices() {
  return async () => {
    try {
      const response = await axios.get(zkCloudEndpoint + 'default/service/list');
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
      dispatch(slice.actions.getServicesSuccess(results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
