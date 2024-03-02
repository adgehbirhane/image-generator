import { Box } from "@mui/material";
import { useState, FormEvent, useRef, useEffect } from "react";
import Header from "./components/Header";
import ImageCard from "./components/ImageCard";
import Greeting from "./components/Greeting";
import CustomInput from "./components/CustomInput";
import CustomSnackbar from "./components/CustomSnackbar";

interface Image {
  url: string;
  description: string;
}

function App() {
  const [prompt, setPrompt] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const boxRef = useRef<HTMLDivElement>(null);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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

            // Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
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
      setMessage("Sorry! The system temporarily stopped functioning...");
      setOpen(true);
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
          ml: 1,
          mr: 5,
          mb: 15,
        }}
        ref={boxRef}
      >
        <Box ref={boxRef}>
          {!images || (images.length === 0 && <Greeting />)}
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
      <CustomInput
        handleSubmit={handleSubmit}
        prompt={prompt}
        setPrompt={setPrompt}
      />
      <CustomSnackbar open={open} message={message} handleClose={handleClose} />
    </Box>
  );
}

export default App;
