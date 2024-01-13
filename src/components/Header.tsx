import {
  AppBar,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import myLogo from "/app-logo.png";

export default function Header(progress: { loading: boolean }) {
  return (
    <AppBar sx={{ position: "fixed", top: 0, backgroundColor: "#242424" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          color="darkgrey"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Adgeh Image Generator
        </Typography>
        <Typography
          variant="h6"
          color="darkgrey"
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          A I G
        </Typography>
        <Typography variant="h6" color="darkgrey">
          <a
            href="https://belaybirhanu.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            <IconButton>
              <img
                src={myLogo}
                style={{ width: 34, height: 34 }}
                alt="my portfolio"
              />
            </IconButton>
          </a>
        </Typography>
      </Toolbar>
      {progress.loading && (
        <LinearProgress sx={{ position: "sticky", top: "6.5vh" }} />
      )}
    </AppBar>
  );
}
