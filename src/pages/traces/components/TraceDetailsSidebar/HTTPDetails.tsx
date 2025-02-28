import { Typography, Divider, Tabs, Tab, Card, CardContent, Grid, Chip, Box, Stack } from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import { getFormattedValue } from 'utils/math';
import KeyValueTable from './Components/KeyValueTable';
import RawSpanDetails from './Components/RawSpanDetails';
import { a11yProps, JSONStyle, TabPanelProps, TraceDetailsProps } from './Components/TabBarUtils';
import TelemetryDetails from './Components/TelemetryDetails';
import { JsonViewer } from '@textea/json-viewer';
import { getPartsOfPath, isJsonStr, JSONParseHandler } from 'utils/strings';

const HTTPDetails = (props: TraceDetailsProps) => {
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

  const partsOfPath = getPartsOfPath(props.modalData?.req_path);

  return (
    <>
      <Grid container>
        <Grid item sm={6}>
          <Chip color="success" variant="outlined" label="HTTP" />
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

      <Typography variant="caption">Destination</Typography>
      <Typography variant="h5">{props.modalData?.destination.label}</Typography>

      <Divider sx={{ mt: 2 }} />
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Request" {...a11yProps(0)} />
        <Tab label="Response" {...a11yProps(1)} />
        <Tab label="Telemetry" {...a11yProps(2)} />
        <Tab label="Raw Data" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Card>
          <CardContent sx={{ px: 2.5 }}>
            <Grid container sx={{ mb: 1.5 }}>
              <Grid item>
                <Chip variant="filled" color="warning" sx={{ textTransform: 'uppercase' }} label={props.modalData?.req_method}></Chip>
              </Grid>
              <Grid item sx={{ ml: 1.5, pt: 0.4 }}>
                <Typography variant="h4">{partsOfPath.path}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />

            <Typography variant="h5">Headers</Typography>
            <KeyValueTable value={props.modalData?.req_headers} />
            <Divider sx={{ my: 2 }} />

            <Typography variant="h5">Query Params</Typography>
            <KeyValueTable value={partsOfPath.params} />
            <Divider sx={{ my: 2 }} />

            <Typography variant="h5">Body</Typography>
            {isJsonStr(props.modalData?.req_body) ? (
              <JsonViewer sx={JSONStyle} value={JSONParseHandler(props.modalData?.req_body)} />
            ) : (
              <KeyValueTable value={props.modalData?.req_body} />
            )}
          </CardContent>
        </Card>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Card>
          <CardContent sx={{ px: 2.5 }}>
            <Chip variant="filled" color="success" sx={{ textTransform: 'uppercase' }} label={props.modalData?.resp_status || '200'}></Chip>
            <Divider sx={{ my: 2 }} />

            <Typography variant="h5">Headers</Typography>
            <KeyValueTable value={props.modalData?.resp_headers} />
            <Divider sx={{ my: 2 }} />

            <Typography variant="h5">Body</Typography>
            {isJsonStr(props.modalData?.resp_body) ? (
              <JsonViewer sx={JSONStyle} value={JSONParseHandler(props.modalData?.resp_body)} />
            ) : (
              <KeyValueTable value={props.modalData?.resp_body} />
            )}
          </CardContent>
        </Card>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TelemetryDetails spanData={props.modalData} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <RawSpanDetails spanData={props.modalData} />
      </TabPanel>
    </>
  );
};

export default HTTPDetails;
