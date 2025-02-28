import {
  Typography,
  Divider,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Chip,
  Box,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer
} from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import { getFormattedValue } from 'utils/math';
import { stringWithoutComments } from 'utils/strings';
import KeyValueTable from './Components/KeyValueTable';
import RawSpanDetails from './Components/RawSpanDetails';
import { a11yProps, TabPanelProps, TraceDetailsProps } from './Components/TabBarUtils';
import TelemetryDetails from './Components/TelemetryDetails';

const MySQLDetails = (props: TraceDetailsProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function decodeLengthEncodedHexString(hexStr: any): string[] {
    const buffer = Buffer.from(hexStr, 'binary');
    let offset = 0;

    const fields = [];

    while (offset < buffer.length) {
      const fieldLength = buffer.readUInt8(offset);
      offset += 1;

      const fieldData = buffer.slice(offset, offset + fieldLength);
      offset += fieldLength;

      fields.push(fieldData.toString('utf-8'));
    }
    return fields;
  }

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
          <Chip color="info" variant="outlined" label={props.modalData?.type} />
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
        <Tab label="Query" {...a11yProps(0)} />
        <Tab label="Result" {...a11yProps(1)} />
        <Tab label="Telemetry" {...a11yProps(2)} />
        <Tab label="Raw Data" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Card>
          <CardContent sx={{ px: 2.5 }}>
            <Typography variant="h5">Query</Typography>
            <KeyValueTable value={stringWithoutComments(props.modalData?.req_body)} />
          </CardContent>
        </Card>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Card>
          <CardContent sx={{ px: 2.5 }}>
            <Typography variant="h5">Result</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {props.modalData?.resp_body
                  .substr(17)
                  .split(' | ')
                  .map((row: any, idx: number) => {
                    const items = decodeLengthEncodedHexString(row);
                    return (
                      <TableBody key={idx}>
                        {items.map((item, idx) => {
                          return (
                            <TableCell sx={{ fontFamily: 'monospace' }} key={idx}>
                              {item}
                            </TableCell>
                          );
                        })}
                      </TableBody>
                    );
                  })}
              </Table>
            </TableContainer>
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

export default MySQLDetails;
