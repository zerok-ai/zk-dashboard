import { List, ListItem, ListItemButton, ListItemText, Typography, useTheme } from '@mui/material';

const ExceptionTable = ({ value }: { value: string }) => {
  const theme = useTheme();
  const messagePos = value.indexOf('], message=');
  const traceStr = value.substring(13, messagePos);
  const traceMsg = value.substring(messagePos + 11, value.length - 1);
  const stacktrace = traceStr.split(',');

  console.log(traceMsg);

  const getTraceDetails = (trace: string) => {
    let regex = new RegExp(`^(.*)[(](.*)(:(.*))?[)]$`);
    console.log(regex.test(trace));
    let traceItems = regex.exec(trace);
    if (!traceItems)
      return {
        text: trace
      };
    return {
      text: traceItems[1],
      file: traceItems[2],
      line: traceItems[3]
    };
  };

  const getTraceLineItem = (trace: string) => {
    const traceItems = getTraceDetails(trace);
    return (
      <>
        <Typography variant="caption">{traceItems.text}</Typography>
        {traceItems.file ? (
          <Typography variant="caption" sx={{ ml: 0.3, color: theme.palette.info.dark }}>{`(${traceItems.file})`}</Typography>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <>
      <Typography variant="body1" sx={{ pl: 2.5, pt: 1 }}>
        {traceMsg}
      </Typography>
      <List sx={{ maxHeight: '40vh', overflowY: 'scroll' }}>
        {stacktrace.map((trace) => (
          <ListItem disablePadding>
            <ListItemButton component="a" sx={{ width: '100%', py: 0.1, pl: 4 }}>
              <ListItemText>{getTraceLineItem(trace)}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ExceptionTable;
