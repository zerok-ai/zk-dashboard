import { Services } from 'types/services';

export const services: Services[] = [
  {
    id: 1,
    name: 'Service 1',
    podCount: 3,
    httpLatencyIn: {
      p50: 10,
      p90: 20,
      p99: 29
    },
    httpReqThroughputIn: -1,
    httpErrorRateIn: 0,
    inboundConns: 10,
    outboundConns: 20
  },
  {
    id: 2,
    name: 'Service 2',
    podCount: 4,
    httpLatencyIn: {
      p50: 10,
      p90: 20,
      p99: 29
    },
    httpReqThroughputIn: -2,
    httpErrorRateIn: 0,
    inboundConns: 11,
    outboundConns: 21
  },
  {
    id: 3,
    name: 'Service 3',
    podCount: 5,
    httpLatencyIn: {
      p50: 10,
      p90: 20,
      p99: 29
    },
    httpReqThroughputIn: 3,
    httpErrorRateIn: 0,
    inboundConns: 10,
    outboundConns: 20
  },
  {
    id: 4,
    name: 'Service 4',
    podCount: 1,
    httpLatencyIn: {
      p50: 10,
      p90: 20,
      p99: 29
    },
    httpReqThroughputIn: -1,
    httpErrorRateIn: 0,
    inboundConns: 12,
    outboundConns: 20
  }
];
