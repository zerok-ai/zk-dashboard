import { Grid, Box, LinearProgress, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import ServicesHeader from 'sections/apps/ServicesHeader';
import { ServicesFilter } from 'types/services';
import TracesTable from './components/TracesTable';

import { getTraceDetails } from './controllers/TracesAPIController';
import { TraceDataAPIResponse, TraceItem } from './models/traceDataResponse';
import { ClusterContext } from 'contexts/Cluster/ClusterContext';
import { ClusterInfo } from 'types/models/ClusterInfo';
import Moment from 'moment';
import RightPanelModal from 'components/modals/RightPanelModal';
import TraceDetailsSidebar from './components/TraceDetailsSidebar/TraceDetailsSidebar';

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

  const [loading, setLoading] = useState(false);
  const [traceData, setTraceData] = useState<TraceItem[]>([]);
  const [selectedClusterId, setSelectedClusterId] = useState('');

  function updateTraceData(clusterId: string, intervalParam: string) {
    if (!clusterId || clusterId === '') return;
    setLoading(true);
    getTraceDetails(clusterId, intervalParam)
      .then(
        (traceData: TraceDataAPIResponse) => {
          setTraceData(traceData.results || []);
          setLoading(false);
          console.log(loading);
        },
        (e) => {
          console.log('failed to fetch trace', e);
          setLoading(false);
        }
      )
      .catch((e) => {
        console.log('failed to fetch trace', e);
        setLoading(false);
      });
  }

  const [interval, setInterval] = useState('-5m');

  function handleIntervalChange(e: SelectChangeEvent<string>) {
    setInterval(e.target.value);
    updateTraceData(selectedClusterId, e.target.value);
  }

  useEffect(() => {
    if (loading) return;
    console.log('getting traces for', selectedClusterId);
    updateTraceData(selectedClusterId, interval);
  }, [interval, selectedClusterId]);

  function changeListener(cluster: ClusterInfo) {
    if (cluster.id !== selectedClusterId) {
      console.log('Updating cluster ' + cluster.name + ',' + cluster.id);
      setSelectedClusterId(cluster.id);
      updateTraceData(cluster.id, interval);
    }
  }

  function refreshButtonClick() {
    if (loading) return;
    updateTraceData(selectedClusterId, interval);
  }

  const getTraceData = (results: any[]) => {
    var nwDataMap: Map<string, any> = new Map();
    var maxLatency = 0;
    results = results.filter((span) => {
      return span.type === 'HTTP' && span.destination.label.includes('zerok-operator-system') ? false : true;
    });
    results = results.filter((span) => {
      return span.destination.script === 'px/pod' && span.source.script === 'px/pod';
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

  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(undefined);

  const handleClose = () => setOpen(false);

  return (
    <ClusterContext.Consumer>
      {({ registerChangeListener, getSelectedCluster }: any) => {
        let selectedCluster = getSelectedCluster();
        setSelectedClusterId(selectedCluster?.id);
        registerChangeListener(changeListener);

        const traceBody = <TraceDetailsSidebar modalData={modalData} />;

        return (
          <Box sx={{ display: 'block' }}>
            <RightPanelModal open={open} onClose={handleClose} body={traceBody}></RightPanelModal>
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
