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
  },
  registerChangeListener: (listener: (cluster: ClusterInfo) => void) => {}
};

type ClusterProviderProps = {
  children: ReactNode;
};

const ClusterContext = createContext(initialState);

function ClusterConfProvider({ children }: ClusterProviderProps) {
  let selectedCluster = null as ClusterInfo | null;
  let clusterList = [] as ClusterInfo[];
  let clusterListLoaded = false;
  let changeListener: (cluster: ClusterInfo) => void = () => {};

  const updateClusterList = () => {
    return fetchClusterList().then((clusterListParam: ClusterInfo[]) => {
      clusterList = clusterListParam;
      clusterListLoaded = true;
      return clusterList;
    });
  };

  updateClusterList();

  const onSetSelectedCluster = (clusterId: string) => {
    console.log('Clustet id in context ' + clusterId);
    const filteredList = clusterList.filter((cluster: ClusterInfo) => {
      return cluster.cluster_id && cluster.cluster_id === clusterId;
    });
    if (filteredList && filteredList.length === 1) {
      selectedCluster = filteredList[0];
      changeListener(selectedCluster);
    }
  };

  const getSelectedCluster = (): ClusterInfo | null => {
    console.log('reading some value');
    return selectedCluster;
  };

  const registerChangeListener = (listener: (cluster: ClusterInfo) => void) => {
    changeListener = listener;
  };

  return (
    <ClusterContext.Provider
      value={{
        clusterList,
        clusterListLoaded,
        selectedCluster,
        getSelectedCluster,
        onSetSelectedCluster,
        updateClusterList,
        registerChangeListener
      }}
    >
      {children}
    </ClusterContext.Provider>
  );
}

export { ClusterConfProvider, ClusterContext };
