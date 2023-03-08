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
  name: 'product',
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

    filterProductsSuccess(state, action) {
      state.services = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

export function getServices() {
  return async () => {
    try {
      const response = await axios.get('/api/services/list');
      dispatch(slice.actions.getServicesSuccess(response.data.products));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterServices(filter: ServicesFilter) {
  return async () => {
    try {
      const response = await axios.post('/api/products/filter', { filter });
      dispatch(slice.actions.filterProductsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
