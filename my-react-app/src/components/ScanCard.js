import React from "react";
import {
  Card,
  CardHeader,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ScanCard = ({ title, children }) => {
  return (
    <Card
      style={{
        margin: "15px",
        border: "1px solid black",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardHeader
        title={title}
        titleTypographyProps={{ style: { fontFamily: "Minecraft" } }}
      />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography style={{ fontFamily: "Minecraft" }}>Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ fontFamily: "Minecraft" }}>
            {" "}
            {}
            {children}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default ScanCard;
