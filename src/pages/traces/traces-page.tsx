import { Grid, Box } from '@mui/material';
import { useState } from 'react';
import ServicesHeader from 'sections/apps/ServicesHeader';
import { ServicesFilter } from 'types/services';
import TracesTable from './TracesTable';

import nwData from './nwData.json';

const Traces = () => {
  const initialState: ServicesFilter = {
    search: ''
  };
  const [filter, setFilter] = useState(initialState);

  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const handleDrawerOpen = () => {
    setOpenFilterDrawer((prevState) => !prevState);
    console.log(openFilterDrawer);
    console.log(nwData);
  };

  var nwDataMap: Map<string, any> = new Map();
  var maxLatency = 0;
  nwData.results.forEach((data, idx) => {
    maxLatency = data.latency > maxLatency ? data.latency : maxLatency;
  });
  nwData.results.forEach((data, idx) => {
    let newData = nwData.results[idx];
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

  // const dataItems = nwData.results.map((traceObj) => {
  //   return {
  //     trace_id: (
  //       <Box>
  //         <Typography variant="caption">{traceObj.trace_id}</Typography>
  //         <Typography variant="body2">Spans: {nwDataMap.get(traceObj.trace_id).length}</Typography>
  //       </Box>
  //     ),
  //     span: traceObj.span_id,
  //     latency: traceObj.latency / 10000,
  //     type: traceObj.type
  //   };
  // });

  console.log(data);

  return (
    <Box sx={{ display: 'block' }}>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <ServicesHeader filter={filter} handleDrawerOpen={handleDrawerOpen} setFilter={setFilter} />
        </Grid>
        <Grid item xs={12}>
          <TracesTable data={data}></TracesTable>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Traces;
