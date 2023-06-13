type ClusterListAPIResponse = {
  clusters: ClusterInfo[];
};

type ClusterInfo = {
  id: string;
  name: string;
  nickname: string;
  status: string;
};

export type { ClusterInfo, ClusterListAPIResponse };
