import { Box, Typography } from "@mui/material";
import ImageCard from "./ImageCard";

export default function Greeting() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          mt: "5%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography color="darkgrey" variant="h4">
          Adgeh Image Generator
        </Typography>

        <ImageCard
          key="1"
          url="/generated.png"
          description="Sample generated image for prompt: 'Coder'"
        />
        <Typography variant="body2" color="darkGrey">
          Your history will not be saved, please don't forget to download the
          image.
        </Typography>
        <Typography variant="body2" color="darkGrey">
          Your privacy has been secured.
        </Typography>
      </Box>
    </Box>
  );
}
