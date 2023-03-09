import axios from 'utils/axios';
import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../index';

import { DefaultRootStateProps, ServicesFilter } from 'types/services';

import { services } from 'data/services';

//import { Services as ServiceType } from 'types/services';

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

//const zkCloudEndpoint = 'http://test.com';

// Reducer
export default slice.reducer;

export function getServices() {
  return async () => {
    try {
      //   console.log('Get services method called.');
    //   const response = await axios.get(zkCloudEndpoint + 'services/list');
    //   const servicesArr = response.data.services;
    //   for (var i = 0; i < servicesArr.length; i++) {
    //     var obj = servicesArr[i];
    //     let service: ServiceType = {
    //       name: obj.service,
    //       podCount: obj.pod_count,
    //       httpLatencyIn: {
    //         p50: obj.http_latency_in.p50,
    //         p90: obj.http_latency_in.p90,
    //         p99: obj.http_latency_in.p99
    //       },
    //       httpReqThroughputIn: obj.http_req_throughput_in,
    //       httpErrorRateIn: obj.http_error_rate_in,
    //       inboundConns: obj.inbound_conns,
    //       outboundConns: obj.outbound_conns
    //     };
    //     console.log(service);
    //   }
      //   console.log('Response for list of services is ', response);
      dispatch(slice.actions.getServicesSuccess(services));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterServices(filter: ServicesFilter) {
  return async () => {
    try {
      const response = await axios.post('/api/services/filter', { filter });
      dispatch(slice.actions.filterServicesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
