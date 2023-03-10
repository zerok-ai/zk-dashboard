import { createContext, ReactNode } from 'react';
import { ClusterContextProps } from 'types/config';
import ClusterInfo from 'types/models/ClusterInfo';

const clusterList: ClusterInfo[] = [
  {
    nickname: 'devpx07',
    domain: 'devpx07.getanton.com',
    api_key: 'px-api-4ccea853-5f4e-4127-969d-5a4f288a47ac',
    cluster_id: 'b60b7536-acad-44ad-96fe-604a528660ce',
    id: '8fd05cf5-7f6a-4ce0-829a-7cad7af120b8'
  }
];

const initialState: ClusterContextProps = {
  clusterList: clusterList,
  clusterListLoaded: false,
  selectedCluster: clusterList[0],
  getSelectedCluster: () => {
    return clusterList[0];
  },
  onSetSelectedCluster: (clusterIdx: number) => {}
};

type ClusterProviderProps = {
  children: ReactNode;
};

const ClusterContext = createContext(initialState);

function ClusterConfProvider({ children }: ClusterProviderProps) {
  const clusterListLoaded = false;

  var selectedCluster: ClusterInfo | null = clusterList[0];

  const onSetSelectedCluster = (clusterIdx: number) => {
    selectedCluster = clusterList[clusterIdx];
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
        onSetSelectedCluster
      }}
    >
      {children}
    </ClusterContext.Provider>
  );
}

export { ClusterConfProvider, ClusterContext };
