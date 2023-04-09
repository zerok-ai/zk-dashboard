import { Card, CardContent, Typography } from '@mui/material';
import { JsonViewer } from '@textea/json-viewer';
import { JSONStyle } from './TabBarUtils';

const RawSpanDetails = ({ spanData }: { spanData: any }) => {
  return (
    <Card>
      <CardContent sx={{ px: 2.5 }}>
        <Typography id="modal-modal-description" sx={{ mt: 2, overflow: 'auto' }}>
          <JsonViewer value={spanData} sx={JSONStyle} />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RawSpanDetails;
