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
      <Box sx={{ mt: "5%" }}>
        <Typography variant="h4">Adgeh Image Generator</Typography>
        <Typography variant="body2" color="darkGrey">
          Type what you need to be an image.
        </Typography>
        <Typography variant="body2" color="darkGrey">
          Your history will not be saved, please don't forget to download the
          image.
        </Typography>
        <Typography variant="body2" color="darkGrey">
          Your privacy has been secured.
        </Typography>
        <ImageCard
          key="1"
          url="/generated.png"
          description="sample generated image for prompt: 'Coder'"
        />
      </Box>
    </Box>
  );
}
