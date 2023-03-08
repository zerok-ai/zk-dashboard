import AxiosMockAdapter from 'axios-mock-adapter';
import axios from './axios';

// ==============================|| AXIOS - MOCK ADAPTER ||============================== //

const mockServices = new AxiosMockAdapter(axios, { delayResponse: 0 });
export default mockServices;
