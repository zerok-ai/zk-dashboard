import { Typography, Divider, Tabs, Tab, Card, CardContent, Grid, Chip, Box, Stack } from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import { getFormattedValue } from 'utils/math';
import ExceptionTable from './Components/ExceptionTable';
import KeyValueTable from './Components/KeyValueTable';
import RawSpanDetails from './Components/RawSpanDetails';
import { a11yProps, TabPanelProps, TraceDetailsProps } from './Components/TabBarUtils';
import TelemetryDetails from './Components/TelemetryDetails';

const ExceptionDetails = (props: TraceDetailsProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // tab panel wrapper
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
        {value === index && children}
      </div>
    );
  }

  return (
    <>
      <Grid container>
        <Grid item sm={6}>
          <Chip color="error" variant="combined" label={props.modalData?.type} />
        </Grid>
        <Grid item sm={6}>
          <Box display="flex" justifyContent="flex-end">
            <Stack direction="column">
              <Typography variant="caption"> Latency </Typography>
              <Typography variant="h5">{getFormattedValue(props.modalData?.latency)}</Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />
      <Typography variant="caption">Source</Typography>
      <Typography variant="h5">{props.modalData?.source.label}</Typography>

      <Divider sx={{ mt: 2 }} />
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Exception" {...a11yProps(0)} />
        <Tab label="Telemetry" {...a11yProps(2)} />
        <Tab label="Raw Data" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Card>
          <CardContent sx={{ px: 2.5 }}>
            <Typography variant="h5">Stack Trace</Typography>
            <Box sx={{ mx: -2.5 }}>
              <ExceptionTable value={props.modalData?.req_body} />
            </Box>
            <Divider sx={{ my: 2 }} />

            <Typography variant="h5">Headers</Typography>
            <KeyValueTable value={props.modalData?.req_headers} />
          </CardContent>
        </Card>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TelemetryDetails spanData={props.modalData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RawSpanDetails spanData={props.modalData} />
      </TabPanel>
    </>
  );
};

export default ExceptionDetails;
