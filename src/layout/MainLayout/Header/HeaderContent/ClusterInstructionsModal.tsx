import { Grid, Box, Button, Modal, Paper, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import GetKeysForId from 'api/keys/GetKeyForId';
import { useEffect, useState } from 'react';
import { CopyBlock, monokai } from 'react-code-blocks';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

type ClusterInstructionsModalProps = {
  open: boolean;
  handleClose: () => void;
};

const installCommand = {
  code: 'zkctl install --apikey ',
  language: 'sh',
  showLineNumbers: false,
  theme: monokai
};

const activateCommand = {
  code: 'zkctl activate -n <namespace>',
  language: 'sh',
  showLineNumbers: false,
  theme: monokai
};

const activateAndRestartCommand = {
  code: 'zkctl activate -n <namespace> -r',
  language: 'sh',
  showLineNumbers: false,
  theme: monokai
};

const ClusterInstructionsModal = (props: ClusterInstructionsModalProps) => {
  const { open, handleClose } = props;
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const backButton = (index: number) => {
    if (index !== 0) {
      return (
        <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
          Back
        </Button>
      );
    }
  };

  const [apiKey, setAPIKey] = useState('');
  useEffect(() => {
    GetKeysForId('top').then((response) => {
      setAPIKey(response?.apikey?.key || '');
    });
  }, []);

  const steps = [
    {
      label: <Typography variant="h5">Install ZeroK CLI on Cluster</Typography>,
      description: (
        <>
          Run the following command to install zerok on the current cluster context:
          <Box sx={{ my: 2 }}>
            <CopyBlock
              text={installCommand.code + apiKey}
              language={installCommand.language}
              showLineNumbers={installCommand.showLineNumbers}
              theme={installCommand.theme}
              wrapLines
              codeBlock
            />
          </Box>
        </>
      )
    },
    {
      label: <Typography variant="h5">Activate zerok and do rolling restart.</Typography>,
      description: (
        <>
          Each namespace in the cluster has to be marked for ZeroK. Once marked, all the new pods will get activated for zerok. I can be
          done using the following command:
          <Box sx={{ my: 2 }}>
            <CopyBlock
              text={activateCommand.code}
              language={activateCommand.language}
              showLineNumbers={activateCommand.showLineNumbers}
              theme={activateCommand.theme}
              wrapLines
              codeBlock
            />
          </Box>
          You have to restart the old pods. You can do both activation and restart using the following command:
          <Box sx={{ my: 2 }}>
            <CopyBlock
              text={activateAndRestartCommand.code}
              language={activateAndRestartCommand.language}
              showLineNumbers={activateAndRestartCommand.showLineNumbers}
              theme={activateAndRestartCommand.theme}
              wrapLines
              codeBlock
            />
          </Box>
        </>
      )
    }
  ];

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ mb: 3, ml: 3 }}>
          <Grid item xs={9.5} sx={{ pr: 1 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Add new Cluster
            </Typography>
          </Grid>
          <Grid item xs={2.5} sx={{ pr: 1 }}>
            <Button variant="contained" sx={{ mt: 1 }}>
              Download CLI
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ maxWidth: '100%' }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel optional={index === 2 ? <Typography variant="caption">Last step</Typography> : null}>{step.label}</StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </Button>
                      {backButton(index)}
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ClusterInstructionsModal;
