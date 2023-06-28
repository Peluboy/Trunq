import React from "react";
import { Container, Typography, Box } from "@mui/material";
import "../styles/home.css";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={3}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          style={{ fontSize: "2.8rem", textTransform: "inherit" }}
        >
          Trunq's Privacy Policy
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          style={{
            fontSize: "1.5rem",
            textTransform: "inherit",
            color: "#4b4b4b",
            fontWeight: "bold",
          }}
        >
          Information We Collect
        </Typography>
        <Typography
          style={{
            fontSize: ".9rem",
            textTransform: "inherit",
            fontWeight: "300",
            color: "#4b4b4b",
            lineHeight: "1.7rem",
          }}
        >
          Trunq-URL Shortener collects the following information:
          <ul className="privacy-points">
            <li>Personal information: Name, email address</li>
            <li>
              Usage data: Clicks on shortened links, link performance metrics
            </li>
          </ul>
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          style={{
            fontSize: "1.5rem",
            textTransform: "inherit",
            color: "#4b4b4b",
            fontWeight: "bold",
          }}
        >
          Use of Collected Information
        </Typography>
        <Typography
          style={{
            fontSize: ".9rem",
            textTransform: "inherit",
            fontWeight: "300",
            color: "#4b4b4b",
            lineHeight: "1.7rem",
          }}
        >
          The collected information is used to:
          <ul className="privacy-points">
            <li>Manage and provide the URL shortening service</li>
            <li>Track link performance and generate analytics</li>
            <li>Communicate with users regarding their account and services</li>
          </ul>
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          style={{
            fontSize: "1.5rem",
            textTransform: "inherit",
            color: "#4b4b4b",
            fontWeight: "bold",
          }}
        >
          Data Security
        </Typography>
        <Typography
          style={{
            fontSize: ".9rem",
            textTransform: "inherit",
            fontWeight: "300",
            color: "#4b4b4b",
            lineHeight: "1.7rem",
          }}
        >
          Trunq-URL Shortener implements security measures to protect user data,
          including encryption and access controls.
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          style={{
            fontSize: "1.5rem",
            textTransform: "inherit",
            color: "#4b4b4b",
            fontWeight: "bold",
          }}
        >
          Third-Party Services
        </Typography>
        <Typography
          style={{
            fontSize: ".9rem",
            textTransform: "inherit",
            fontWeight: "300",
            color: "#4b4b4b",
            lineHeight: "1.7rem",
          }}
        >
          Trunq-URL Shortener may use third-party services for analytics and
          authentication. These services have their own privacy policies that
          govern the use of user data.
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          style={{
            fontSize: "1.5rem",
            textTransform: "inherit",
            color: "#4b4b4b",
            fontWeight: "bold",
          }}
        >
          Data Retention
        </Typography>
        <Typography
          style={{
            fontSize: ".9rem",
            textTransform: "inherit",
            fontWeight: "300",
            color: "#4b4b4b",
            lineHeight: "1.7rem",
          }}
        >
          Trunq-URL Shortener retains user data for as long as necessary to
          provide the services and comply with legal obligations.
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          style={{
            fontSize: "1.5rem",
            textTransform: "inherit",
            color: "#4b4b4b",
            fontWeight: "bold",
          }}
        >
          Terms of Use
        </Typography>
        <Typography
          style={{
            fontSize: ".9rem",
            textTransform: "inherit",
            fontWeight: "300",
            color: "#4b4b4b",
            lineHeight: "1.7rem",
          }}
        >
          By using the Trunq-URL Shortener platform, you agree to comply with
          the following terms of use:
          <ul className="privacy-points">
            <li>
              You must not use Trunq-URL Shortener for any illegal or
              unauthorized purposes
            </li>
            <li>
              You are responsible for the links you create and the content
              associated with those links
            </li>
            <li>
              Trunq-URL Shortener reserves the right to suspend or terminate
              your account if you violate these terms of use or engage in any
              abusive or harmful activities
            </li>
            <li>
              Trunq-URL Shortener does not guarantee the availability,
              reliability, or accuracy of the platform or the links created
              using the platform
            </li>
          </ul>
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          style={{
            fontSize: "1.5rem",
            textTransform: "inherit",
            color: "#4b4b4b",
            fontWeight: "bold",
          }}
        >
          Contact Us
        </Typography>
        <Typography
          style={{
            fontSize: ".9rem",
            textTransform: "inherit",
            fontWeight: "300",
            color: "#4b4b4b",
            lineHeight: "1.7rem",
          }}
        >
          If you have any questions, concerns, or requests regarding your
          privacy or the handling of your data, please contact our support team
          at pelumimoses@gmail.com or call +234 903 876 1241.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
