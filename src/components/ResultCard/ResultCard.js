import React, { Component } from 'react';
import {
    MuiThemeProvider,
    createMuiTheme
  } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'IBM Plex Mono'
      ].join(',')
    },
  });


class ResultCard extends Component {

    render() {

        if (this.props.form_link === "placeholder") {

            return (
                <MuiThemeProvider theme={theme}>
                    <center>
                        <Typography variant="h4">results will apear here...</Typography>
                    </center>
                </MuiThemeProvider>
            );

        } else {

            return (
                <Card className={this.card}>
                    <CardContent>
                        <Typography className={Card.title} color="textSecondary" gutterBottom>
                            720p
                        </Typography>
                        <Typography variant="h6">
                            {this.props.form_link}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Open</Button>
                    </CardActions>
                </Card>
            );

        }
    }
}

export default ResultCard;