import { Download } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

export default function ImageCard(image: {
  key: string;
  url: string;
  description: string;
}) {
  return (
    <Card key={image.key} sx={{ mt: 2, backgroundColor: "rgb(50, 65, 65)" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={image.url}
          alt={image.description}
          height={512}
        />
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="subtitle1"
            color="darkgrey"
            sx={{
              transition: "font-style 0.3s",
              cursor: "text",
            }}
          >
            {image.description}
          </Typography>
          <a href={image.url} target="_blank" rel="noreferrer" download>
            <IconButton color="primary">
              <Download />
            </IconButton>
          </a>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
