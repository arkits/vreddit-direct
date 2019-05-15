import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class ResultCard extends Component {

    render() {

        return (

            <Card className={this.card}>

                <CardContent>
                    <Typography className={Card.title} color="textSecondary" gutterBottom>
                        ACTIVE
                    </Typography>
                    <Typography variant="h6">
                        {this.props.form_link}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button size="small">View on Map</Button>
                </CardActions>

            </Card>
        );
    }
}


export default ResultCard;