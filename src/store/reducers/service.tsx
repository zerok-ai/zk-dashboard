// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps, ServicesFilter } from '../../pages/services/types';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['product'] = {
  error: null,
  services: [],
  service: null
  // relatedProducts: [],
  // reviews: [],
  // addresses: []
};

const slice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET SERVICES
    getServicesSuccess(state, action) {
      state.services = action.payload;
    },

    // FILTER SERVICES
    filterServicesSuccess(state, action) {
      state.services = action.payload;
    },

    // GET SERVICE
    getServiceSuccess(state, action) {
      state.service = action.payload;
    }

    // // GET RELATED PRODUCTS
    // getRelatedProductsSuccess(state, action) {
    //   state.relatedProducts = action.payload;
    // },

    // // GET PRODUCT REVIEWS
    // getProductReviewsSuccess(state, action) {
    //   state.reviews = action.payload;
    // },

    // // GET ADDRESSES
    // getAddressesSuccess(state, action) {
    //   state.addresses = action.payload;
    // },

    // // ADD ADDRESS
    // addAddressSuccess(state, action) {
    //   state.addresses = action.payload;
    // },

    // // EDIT ADDRESS
    // editAddressSuccess(state, action) {
    //   state.addresses = action.payload;
    // }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

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
      const response = await axios.post('/api/services/filter', { filter });
      dispatch(slice.actions.filterServicesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getService(id: string | undefined) {
  return async () => {
    try {
      const response = await axios.post('/api/service/details', { id });
      dispatch(slice.actions.getServiceSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// export function getRelatedProducts(id: string | undefined) {
//   return async () => {
//     try {
//       const response = await axios.post('/api/product/related', { id });
//       dispatch(slice.actions.getRelatedProductsSuccess(response.data));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// export function getProductReviews() {
//   return async () => {
//     try {
//       const response = await axios.get('/api/review/list');
//       dispatch(slice.actions.getProductReviewsSuccess(response.data.productReviews));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// export function getAddresses() {
//   return async () => {
//     try {
//       const response = await axios.get('/api/address/list');
//       dispatch(slice.actions.getAddressesSuccess(response.data.address));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// export function addAddress(address: Address) {
//   return async () => {
//     try {
//       const response = await axios.post('/api/address/new', address);
//       dispatch(slice.actions.addAddressSuccess(response.data.address));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// export function editAddress(address: Address) {
//   return async () => {
//     try {
//       const response = await axios.post('/api/address/edit', address);
//       dispatch(slice.actions.editAddressSuccess(response.data.address));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }
