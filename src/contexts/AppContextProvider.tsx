import { ClusterConfProvider } from './Cluster/ClusterContext';
import { ConfigProvider } from './ConfigContext';

import { combineComponents } from 'utils/combineComponents';

const providers = [ClusterConfProvider, ConfigProvider];
const AppContextProvider = combineComponents(...providers);
export { AppContextProvider };
