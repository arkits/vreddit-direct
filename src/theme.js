import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#ff5722'
        },
        secondary: {
            main: '#00e676'
        },
        error: {
            main: red.A400
        },
    }
});

export default theme;
