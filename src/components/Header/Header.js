import React from 'react';
import {
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'IBM Plex Mono'
    ].join(',')
  },
});

function Header() {
  return (
    <div className="Header">
      <MuiThemeProvider theme={theme}>
        <center>
          <Link href="/" color="inherit">
            <Typography variant="h3">vreddit-direct</Typography>
          </Link>
        </center>
      </MuiThemeProvider>
    </div>
  );
}

export default Header;
