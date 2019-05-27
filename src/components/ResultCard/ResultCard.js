import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
class ResultCard extends Component {

  render() {

    if (this.props.video_links[0].link === "") {
      return (
        <center>
          <h3>results will be here</h3>
        </center>
      );
    } 
    else if(this.props.video_links === "SOMETHING_WENT_WRONG"){
      return (
        <center>
          <h3>SOMETHING_WENT_WRONG</h3>
        </center>
      );
    }
    else {
      
      return this.props.video_links.map((video_link, key) => (
        <div className="Results">
                <ColorButton
                    variant="contained"
                    size="large"
                    color="primary"
                    href={video_link.link}
                >
                    {video_link.quality}p
            </ColorButton>
            <br></br>
            <br></br>
        </div>
      ));

    }
  }
}

export default ResultCard;