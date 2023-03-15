import { Grid, Box, LinearProgress, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import ServicesHeader from 'sections/apps/ServicesHeader';
import { ServicesFilter } from 'types/services';
import TracesTable from './components/TracesTable';

import { getTraceDetails } from './controllers/TracesAPIController';
import { traceDataResponse, traceItem } from './models/traceDataResponse';
import { ClusterContext } from 'contexts/Cluster/ClusterContext';
import ClusterInfo from 'types/models/ClusterInfo';

const Traces = () => {
  const initialState: ServicesFilter = {
    search: ''
  };
  const [filter, setFilter] = useState(initialState);

  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const handleDrawerOpen = () => {
    setOpenFilterDrawer((prevState) => !prevState);
    console.log(openFilterDrawer);
  };

  const [loading, setLoading] = useState(true);
  const [traceData, setTraceData] = useState<traceItem[]>([]);
  const [selectedClusterId, setSelectedClusterId] = useState('');

  function updateTraceData(clusterId: string, intervalParam: string) {
    if (!clusterId || clusterId === '') return;
    getTraceDetails(clusterId, intervalParam).then((traceData: traceDataResponse) => {
      setTraceData(traceData.results || []);
      setLoading(false);
      console.log(loading);
    });
  }

  const [interval, setInterval] = useState('-5m');

  function handleIntervalChange(e: SelectChangeEvent<string>) {
    setInterval(e.target.value);
    setLoading(true);
    updateTraceData(selectedClusterId, e.target.value);
  }

  useEffect(() => {
    if (!loading) return;
    updateTraceData(selectedClusterId, interval);
  });

  const getTraceData = (results: any[]) => {
    var nwDataMap: Map<string, any> = new Map();
    var maxLatency = 0;
    results.forEach((data, idx) => {
      maxLatency = data.latency > maxLatency ? data.latency : maxLatency;
    });
    results.forEach((data, idx) => {
      let newData = results[idx];
      const existing = nwDataMap.get(data.trace_id) || [];
      if (existing) {
        newData = existing.push(newData);
        nwDataMap.set(data.trace_id, existing);
      } else {
        nwDataMap.set(data.trace_id, [newData]);
      }
    });

    console.log(nwDataMap);
    const data: any[] = [];
    const sorter = (x: any, y: any) => x.time_ > y.time_;

    nwDataMap.forEach((traces, traceId) => {
      data.push({
        trace_id: traceId,
        traces: nwDataMap.get(traceId).sort(sorter),
        count: nwDataMap.get(traceId).length
      });
    });

    console.log(data);
    return data;
  };

  function changeListener(cluster: ClusterInfo) {
    if (cluster.cluster_id !== selectedClusterId) {
      setLoading(true);
      console.log('Updating cluster ' + cluster.cluster_name + ',' + cluster.cluster_id);
      setSelectedClusterId(cluster.cluster_id);
      updateTraceData(cluster.cluster_id, interval);
    }
  }

  function refreshButtonClick() {
    setLoading(true);
    updateTraceData(selectedClusterId, interval);
  }

  return (
    <ClusterContext.Consumer>
      {({ registerChangeListener, getSelectedCluster }: any) => {
        let selectedCluster = getSelectedCluster();
        if (selectedCluster) {
          setSelectedClusterId(selectedCluster.cluster_id);
        }
        registerChangeListener(changeListener);

        return (
          <Box sx={{ display: 'block' }}>
            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <ServicesHeader
                  filter={filter}
                  handleDrawerOpen={handleDrawerOpen}
                  setFilter={setFilter}
                  handleRefreshButtonClick={refreshButtonClick}
                  showTimeSelector={true}
                  interval={interval}
                  handleIntervalChange={handleIntervalChange}
                />
              </Grid>
              <Grid item xs={12}>
                {loading ? (
                  <Box sx={{ mt: -3 }}>
                    <LinearProgress />
                  </Box>
                ) : (
                  <TracesTable data={getTraceData(traceData)}></TracesTable>
                )}
              </Grid>
            </Grid>
          </Box>
        );
      }}
    </ClusterContext.Consumer>
  );
};

export default Traces;
