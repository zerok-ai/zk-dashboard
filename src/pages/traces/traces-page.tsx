import { Grid, Box, LinearProgress, SelectChangeEvent, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ServicesHeader from 'sections/apps/ServicesHeader';
import { ServicesFilter } from 'types/services';
import TracesTable from './components/TracesTable';

import { getTraceDetails } from './controllers/TracesAPIController';
import { traceDataResponse, traceItem } from './models/traceDataResponse';
import { ClusterContext } from 'contexts/Cluster/ClusterContext';
import ClusterInfo from 'types/models/ClusterInfo';
import Moment from 'moment';
import { JsonViewer } from '@textea/json-viewer';

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
    results = results.filter((span) => {
      return span.type === 'HTTP' && span.destination.label.includes('zerok-operator-system') ? false : true;
    });
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
    const spanSorter = (x: any, y: any) => Moment(y.time_).diff(Moment(x.time_));

    nwDataMap.forEach((traces, traceId) => {
      data.push({
        trace_id: traceId,
        traces: nwDataMap.get(traceId).sort(spanSorter),
        count: nwDataMap.get(traceId).length
      });
    });

    return data.sort((x, y) => {
      return Moment(y.traces[0].time_).diff(Moment(x.traces[0].time_));
    });
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

  const [open, setOpen] = useState(true);
  const [modalData, setModalData] = useState('');

  const style = {
    position: 'absolute' as 'absolute',
    top: '0',
    left: '50%',
    width: '50%',
    height: '100vh',
    bgcolor: 'background.paper',
    outline: 'none',
    p: 4
  };

  const JSONStyle = {
    '.data-key': {
      color: 'rgba(255,255,255,0.8) !important'
    }
  };

  const handleClose = () => setOpen(false);

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
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Trace ID:
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, height: '90vh', overflow: 'scroll' }}>
                  <JsonViewer value={modalData} sx={JSONStyle} />
                </Typography>
              </Box>
            </Modal>
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
                  <TracesTable data={getTraceData(traceData)} traceModal={{ setOpen, setModalData }}></TracesTable>
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
