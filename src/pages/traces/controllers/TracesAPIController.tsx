import axios from 'utils/axios';
import { TraceDataAPIResponse } from '../models/traceDataResponse';

const zkCloudEndpoint = '/v1/u/cluster';

export function getTraceDetails(cluster_id: string, interval: string): Promise<TraceDataAPIResponse> {
  return axios
    .get(zkCloudEndpoint + '/traces', {
      params: {
        st: interval,
        cluster_id: cluster_id
      }
    })
    .then((response): TraceDataAPIResponse => {
      console.log(response.data.payload);
      return response.data.payload;
    });
}
