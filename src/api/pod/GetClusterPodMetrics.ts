import axios from 'utils/axios';

const zkCloudEndpoint = '/v1/u';

export type CpuUsageResultsType = {
  actual_disk_read_throughput: string;
  actual_disk_write_throughput: string;
  container: string;
  cpu_usage: string;
  rss: string;
  time: string;
  total_disk_read_throughput: string;
  total_disk_write_throughput: string;
  vsize: string;
};

export type ErrAndReqResultsType = {
  container: string;
  error_rate: number;
  errors_per_ns: number;
  request_throughput: string;
};

export type LatencyResultsType = {
  time: string;
  latency_p50: number;
  latency_p90: number;
  latency_p99: number;
};

export type MetricsResultsType = {
  AcceptedBytes: number;
  TotalBytes: number;
  ExecutionTime: number;
  CompilationTime: number;
  BytesProcessed: number;
  RecordsProcessed: number;
};

export type APIResponseStatsType = {
  AcceptedBytes: number;
  TotalBytes: number;
  ExecutionTime: number;
  CompilationTime: number;
  BytesProcessed: number;
  RecordsProcessed: number;
};

export type MetricsResultType = {
  results: (LatencyResultsType | ErrAndReqResultsType | CpuUsageResultsType | any)[];
  stats: APIResponseStatsType;
  status: number;
};

export type GetClusterPodMetricsResponseType = {
  cpuUsage?: MetricsResultType;
  errAndReq?: MetricsResultType;
  latency?: MetricsResultType;
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
    return response.data.payload;
  } catch (err) {
    console.error('Error caught while fetching pods list.', err);
    return {};
  }
}
