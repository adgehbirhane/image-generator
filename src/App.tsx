import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import Header from "./components/Header";
import { SendTwoTone } from "@mui/icons-material";
import ImageCard from "./components/ImageCard";

interface Image {
  url: string;
  description: string;
}

function App() {
  const [prompt, setPrompt] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      const boxElement = boxRef.current;
      boxElement.scrollTop = boxElement.scrollHeight;
    }
  }, [images]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer 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`,
          },
          body: JSON.stringify({
            prompt,
            num_images: 1,
            size: "512x512",
            response_format: "url",
          }),
        }
      );

      const data = await response.json();
      const newImage = {
        url: data.data[0].url,
        description: prompt,
      };

      setImages((prevImages) => [...prevImages, newImage]);
      setPrompt("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setPrompt("");
      console.error(error);
    }
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Header loading={loading} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          overflow: "scroll",
          height: "85vh",
          mt: "6.7vh",
          mr: 5,
          mb: 15,
        }}
        ref={boxRef}
      >
        <Box>
          {!images ||
            (images.length === 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ mt: "5%" }}>
                  <Typography variant="h4">Adgeh Image Generator</Typography>
                  <Typography variant="body2" color="darkGrey">
                    Type what you need to an image
                  </Typography>
                  <Typography variant="body2" color="darkGrey">
                    Your history will not be saved, please don't forget to
                    download the image.
                  </Typography>
                  <ImageCard
                    key="1"
                    url="/generated.png"
                    description="sample generated image for prompt: 'Hello world'"
                  />
                </Box>
              </Box>
            ))}
          {images &&
            images.length !== 0 &&
            images.map((image, index) => (
              <ImageCard
                key={index.toString()}
                url={image.url}
                description={image.description}
              />
            ))}
        </Box>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "#242424",
          p: 2,
          pb: 5,
          height: "8.5vh",
        }}
      >
        <Box sx={{ ml: 2, mr: 5, width: "100%" }}>
          <TextField
            type="textarea"
            sx={{
              backgroundColor: "#555151",
              width: "100%",
              borderRadius: 2,
            }}
            placeholder="Enter image description"
            value={prompt}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setPrompt(e.target.value)
            }
            multiline
            fullWidth
            autoFocus
            rows={2}
            maxRows={5}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Send">
                    <IconButton
                      type="submit"
                      color="primary"
                      sx={{ fontSize: 40 }}
                      disabled={!prompt}
                    >
                      <SendTwoTone sx={{ fontSize: 35 }} />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
