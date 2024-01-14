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
    <Card key={image.key} sx={{ mt: 2, backgroundColor: "wheat" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={image.url}
          alt={image.description}
        />
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2">{image.description}</Typography>
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
