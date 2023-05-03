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

export type GetClusterPodListResponseType = {
  results?: PodListResultsType[];
  stats?: APIResponseStatsType;
  status?: number;
};

export async function getClusterPodList(
  clusterId: string,
  ns: string,
  service: string,
  st: string
): Promise<GetClusterPodListResponseType> {
  try {
    const response = await axios.get(`${zkCloudEndpoint}/cluster/${clusterId}/pod/list`, {
      params: {
        st,
        ns,
        service_name: service
      }
    });
    return response.data.payload;
  } catch (err) {
    console.error('Error caught while fetching pods list.', err);
    return {
      results: []
    };
  }
}
