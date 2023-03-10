import axios from 'utils/axios';
import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../index';

import { DefaultRootStateProps, ServicesFilter } from 'types/services';

import { services } from 'data/services';

import { KeyedObject } from 'types/services';

import { Services as ServiceType } from 'types/services';

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

const zkCloudEndpoint = 'http://localhost:8080/v1/cluster/1/default/';

// Reducer
export default slice.reducer;

export function getServices() {
  return async () => {
    try {
      console.log('Get services method called.');
      const response = await axios.get(zkCloudEndpoint + 'service/list');
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
      console.log(results);
      //console.log('Response for list of services is ', response);
      dispatch(slice.actions.getServicesSuccess(results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterServices(filter: ServicesFilter) {
  return async () => {
    try {
      console.log('filterServices method called.');
      const results = services.filter((service: KeyedObject) => {
        let searchMatches = true;
        if (filter.search) {
          const properties = ['name'];
          let containsQuery = false;
          properties.forEach((property) => {
            if (service[property] && service[property].toString().toLowerCase().includes(filter.search.toString().toLowerCase())) {
              containsQuery = true;
            }
          });
          if (!containsQuery) {
            searchMatches = false;
          }
        }
        return searchMatches;
      });
      console.log('Returning list of filtered values.');
      dispatch(slice.actions.filterServicesSuccess(results));
    } catch (err) {
      dispatch(slice.actions.hasError(err));
    }
  };
}
