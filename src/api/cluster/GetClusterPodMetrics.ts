import axios from 'utils/axios';

const zkCloudEndpoint = '/v1/u';

export type PodListResultsType = {
  pod: string;
  service: string;
  startTime: string;
  containers: number;
  status: {
    phase: string;
    message: string;
    reason: string;
    ready: boolean;
  };
};
export type APIResponseStatsType = {
  AcceptedBytes: number;
  TotalBytes: number;
  ExecutionTime: number;
  CompilationTime: number;
  BytesProcessed: number;
  RecordsProcessed: number;
};

export type GetClusterPodMetricsResponseType = {
  results?: PodListResultsType[];
  stats?: APIResponseStatsType;
  status?: number;
};

export async function getClusterPodMetrics(
  clusterId: string,
  ns: string,
  pod: string,
  st: string
): Promise<GetClusterPodMetricsResponseType> {
  try {
    const response = await axios.get(`${zkCloudEndpoint}/cluster/${clusterId}/pod/details`, {
      params: {
        st,
        ns,
        pod_name: pod
      }
    });
    return response.data;
  } catch (err) {
    console.error('Error caught while fetching pods list.', err);
    return {
      results: []
    };
  }
}
