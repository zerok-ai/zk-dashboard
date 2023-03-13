import { Grid, Box, Button, LinearProgress, Modal, Paper, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import { useState } from 'react';
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
  code: 'sh -c "$(curl -fsSL https://zerok.ai/install.sh)"',
  language: 'sh',
  showLineNumbers: false,
  theme: monokai
};

const setupCommand = {
  code: 'zkctl install',
  language: 'sh',
  showLineNumbers: false,
  theme: monokai
};

const steps = [
  {
    label: <Typography variant="h5">Install ZeroK CLI</Typography>,
    description: (
      <>
        For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions, which networks and
        geographical locations you want your ads to show on, and more.
        <Box sx={{ my: 2 }}>
          <CopyBlock
            text={installCommand.code}
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
    label: <Typography variant="h5">Setup ZeroK Operator on Cluster</Typography>,
    description: (
      <>
        An ad group contains one or more ads which target a shared set of keywords.
        <Box sx={{ my: 2 }}>
          <CopyBlock
            text={setupCommand.code}
            language={setupCommand.language}
            showLineNumbers={setupCommand.showLineNumbers}
            theme={setupCommand.theme}
            wrapLines
            codeBlock
          />
        </Box>
      </>
    )
  },
  {
    label: <Typography variant="h5">Installation</Typography>,
    description: (
      <>
        <Box sx={{ my: 2 }}>
          <LinearProgress />
        </Box>
        Try out different ad text to see what brings in the most customers, and learn how to enhance your ads using features like ad
        extensions. If you run into any problems with your ads, find out how to tell if they're running and how to resolve approval issues.
      </>
    )
  }
];

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

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ mb: 3, ml: 3 }}>
          <Grid item xs={10} sx={{ pr: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Add new Cluster
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ pr: 2 }}>
            <Button variant="contained" sx={{ mt: 1, mr: 1 }}>
              Installation
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
                      <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                        Back
                      </Button>
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
