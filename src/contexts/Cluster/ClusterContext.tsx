import { createContext, ReactNode } from 'react';
import { ClusterContextProps } from 'types/config';
import ClusterInfo from 'types/models/ClusterInfo';
import { fetchClusterList } from './ClusterListApiController';

const initialState: ClusterContextProps = {
  clusterList: [] as ClusterInfo[],
  clusterListLoaded: false,
  selectedCluster: null,
  getSelectedCluster: () => {
    return null;
  },
  onSetSelectedCluster: (clusterId: string) => {},
  updateClusterList: () => {
    return Promise.resolve([]);
  }
};

type ClusterProviderProps = {
  children: ReactNode;
};

const ClusterContext = createContext(initialState);

function ClusterConfProvider({ children }: ClusterProviderProps) {
  let selectedCluster = null as ClusterInfo | null;
  let clusterList = [] as ClusterInfo[];
  let clusterListLoaded = false;

  const updateClusterList = () => {
    return fetchClusterList().then((clusterListParam: ClusterInfo[]) => {
      clusterList = clusterListParam;
      clusterListLoaded = true;
      return clusterList;
    });
  };

  updateClusterList();

  const onSetSelectedCluster = (clusterId: string) => {
    const filteredList = clusterList.filter((cluster: ClusterInfo) => {
      return cluster.id && cluster.id === clusterId;
    });
    if (filteredList && filteredList.length === 1) {
      selectedCluster = filteredList[0];
    }
  };

  const getSelectedCluster = (): ClusterInfo | null => {
    console.log('reading some value');
    return selectedCluster;
  };

  return (
    <ClusterContext.Provider
      value={{
        clusterList,
        clusterListLoaded,
        selectedCluster,
        getSelectedCluster,
        onSetSelectedCluster,
        updateClusterList
      }}
    >
      {children}
    </ClusterContext.Provider>
  );
}

export { ClusterConfProvider, ClusterContext };
