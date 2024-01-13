import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState, ChangeEvent, FormEvent } from "react";
import Header from "./Header";
import { Download, SendTwoTone } from "@mui/icons-material";

interface Image {
  url: string;
  description: string;
}

function App() {
  const [prompt, setPrompt] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      const newImage = {
        url: data[0].url,
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

  const handleDownload = (url: string, description: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = description;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Header />
      {loading && <LinearProgress />}
      {!images ||
        (images.length === 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ p: 10, mt: "20%" }}>
              <Typography variant="h4">Adgeh Image Generator</Typography>
              <Typography variant="body2" color="darkGrey">
                Type what you need to an image
              </Typography>
              <Typography variant="body2" color="darkGrey">
                Your history will not be saved, please don't forget to download
                the image.
              </Typography>
            </Box>
          </Box>
        ))}
      <Box sx={{ display: "flex", justifyContent: "right", mr: 5 }}>
        <Box sx={{ height: "85vh", overflowY: "auto" }}>
          {images &&
            images.length !== 0 &&
            images.map((image, index) => (
              <Card key={index} sx={{ mt: 2 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image.url}
                    alt={image.description}
                  />
                  <CardContent
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">{image.description}</Typography>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleDownload(image.url, image.description)
                      }
                    >
                      <Download />
                    </IconButton>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
        </Box>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          position: "fixed",
          top: "89vh",
          mb: 5,
          width: "100%",
          backgroundColor: "#242424",
          p: 2,
        }}
      >
        <Box flex={5} sx={{ ml: 5 }}>
          <TextField
            type="textarea"
            sx={{ width: "100%", backgroundColor: "#555151" }}
            placeholder="Enter image description"
            value={prompt}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setPrompt(e.target.value)
            }
            multiline
            rows={2}
            maxRows={5}
          />
        </Box>
        <Box flex={1}>
          <IconButton
            type="submit"
            color="primary"
            sx={{ ml: 2, fontSize: 40 }}
          >
            <SendTwoTone sx={{ fontSize: 35 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
