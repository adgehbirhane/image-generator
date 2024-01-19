import { SendTwoTone } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import { ChangeEvent, FormEvent } from "react";

interface CustomInputProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
}

export default function CustomInput({
  handleSubmit,
  prompt,
  setPrompt,
}: CustomInputProps) {
  return (
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
          sx={{
            backgroundColor: "rgb(60, 65, 70)",
            width: "100%",
            borderRadius: 2,
          }}
          placeholder="Type what you need to be an image..."
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
  );
}
