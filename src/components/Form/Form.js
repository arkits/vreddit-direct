import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import blue from '@material-ui/core/colors/blue';

const ColorButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(blue[500]),
        padding: '10px',
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
}))(Button);

class Form extends Component {

    render() {
        return (
            <div className="Form">
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <TextField
                            id="outlined-name"
                            label="Insert v.reddit.link"
                            placeholder="https://v.redd.it/bkq3tykza0y21"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <br />
                        <ColorButton
                            variant="contained"
                            size="large"
                            color="primary"
                            onClick={this.props.letsGo.bind(this, "gooddays")}
                        >
                            Go!
                    </ColorButton>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Form;