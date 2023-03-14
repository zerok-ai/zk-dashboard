import { Grid, Box, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import ServicesHeader from 'sections/apps/ServicesHeader';
import { ServicesFilter } from 'types/services';
import TracesTable from './components/TracesTable';

import { getTraceDetails } from './controllers/TracesAPIController';
import { traceDataResponse, traceItem } from './models/traceDataResponse';

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

  useEffect(() => {
    if (!loading) return;
    getTraceDetails().then((traceData: traceDataResponse) => {
      setTraceData(traceData.results || []);
      setLoading(false);
      console.log(loading);
    });
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

  return (
    <Box sx={{ display: 'block' }}>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <ServicesHeader filter={filter} handleDrawerOpen={handleDrawerOpen} setFilter={setFilter} />
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
};

export default Traces;
