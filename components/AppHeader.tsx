import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const AppHeader = () => {
  return (
    <AppBar component={"nav"}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Budget personnel
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
