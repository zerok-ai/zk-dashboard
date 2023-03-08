import axios from 'utils/axios';
import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../index';

import { DefaultRootStateProps, ServicesFilter } from 'types/services';

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

// Reducer
export default slice.reducer;

export function getServices() {
  return async () => {
    try {
      console.log('Get services method called.');
      const response = await axios.get('/api/services/list');
      console.log('Response for list of services is ', response);
      dispatch(slice.actions.getServicesSuccess(response.data.services));
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
