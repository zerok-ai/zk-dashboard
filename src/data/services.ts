import { Services } from 'types/services';

export const services: Services[] = [
  {
    name: 'Service-1',
    podCount: 3,
    httpLatencyIn: {
      p50: 11,
      p90: 21,
      p99: 39
    },
    httpReqThroughputIn: -1,
    httpErrorRateIn: 0,
    inboundConns: 10,
    outboundConns: 20
  },
  {
    name: 'Service-2',
    podCount: 4,
    httpLatencyIn: {
      p50: 12,
      p90: 22,
      p99: 49
    },
    httpReqThroughputIn: -2,
    httpErrorRateIn: 0,
    inboundConns: 11,
    outboundConns: 21
  },
  {
    name: 'Service-3',
    podCount: 5,
    httpLatencyIn: {
      p50: 13,
      p90: 23,
      p99: 25
    },
    httpReqThroughputIn: 3,
    httpErrorRateIn: 0,
    inboundConns: 10,
    outboundConns: 20
  },
  {
    name: 'Service-4',
    podCount: 1,
    httpLatencyIn: {
      p50: 17,
      p90: 24,
      p99: 79
    },
    httpReqThroughputIn: -1,
    httpErrorRateIn: 0,
    inboundConns: 12,
    outboundConns: 20
  }
];
