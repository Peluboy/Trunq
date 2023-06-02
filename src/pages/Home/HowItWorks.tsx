import React from "react";
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Typography,
  Divider,
} from "@mui/material";
import PutLinkImg from "../../assets/images/put-link.svg";
import CustomUrlImg from "../../assets/images/custom-url.svg";
import ShortenLinkImg from "../../assets/images/shorten-link.svg";
import GenerateCodeImg from "../../assets/images/qr-code.svg";

const steps = [
  "Put a Link",
  "Create Custom Url",
  "Click on Shorten Link",
  "Create QR Code",
];

const stepImages = [PutLinkImg, CustomUrlImg, ShortenLinkImg, GenerateCodeImg];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <Box>
      <Box
        py={8}
        sx={{
          py: 6,
        }}
      >
        <Divider light={true} />
      </Box>
      <Box>
        <Box
          pb={6}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            gap: "1.5rem",
          }}
        >
          <Typography variant="h4" color="white">
            HOW WE WORK 👇
          </Typography>

          <Box sx={{ width: { xs: "100%", sm: "auto" }, maxWidth: "500px" }}>
            <p className="how-it-works-paragraph">
              Our platform provides all-in-one tools for global audience
              connectivity, link and QR Code management, and fostering brand
              relationships.
            </p>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box
          bgcolor="#444E56"
          px={2}
          py={2}
          borderRadius={2}
          sx={{ overflowX: "auto", overflowY: "hidden" }}
        >
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton
                  color="inherit"
                  onClick={handleStep(index)}
                  className="stepButton"
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box pt={4}>
          {allStepsCompleted() ? (
            <React.Fragment></React.Fragment>
          ) : (
            <React.Fragment>
              <img
                src={stepImages[activeStep]}
                alt={`Step ${activeStep + 1}`}
                className="stepImages"
              />
            </React.Fragment>
          )}
        </Box>
      </Box>
    </Box>
  );
}
