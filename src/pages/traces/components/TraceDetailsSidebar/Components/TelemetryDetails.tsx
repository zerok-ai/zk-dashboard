import { Typography, Divider, Card, CardContent } from '@mui/material';

const TelemetryDetails = ({ spanData }: { spanData: any }) => {
  return (
    <Card>
      <CardContent sx={{ px: 2.5 }}>
        <Typography variant="h5">Trace ID</Typography>
        <Typography variant="body1">{spanData.trace_id}</Typography>
        <Divider sx={{ my: 2 }} />

        <Typography variant="h5">Span ID</Typography>
        <Typography variant="body1">{spanData.span_id}</Typography>
        <Divider sx={{ my: 2 }} />

        <Typography variant="h5">Trace State</Typography>
        <Typography variant="body1">{spanData.tracestate || '-'}</Typography>
        <Divider sx={{ my: 2 }} />

        <Typography variant="h5">OTel Flag</Typography>
        <Typography variant="body1">{spanData.otel_flag}</Typography>
      </CardContent>
    </Card>
  );
};

export default TelemetryDetails;
