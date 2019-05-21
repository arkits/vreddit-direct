import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            api_status: "",
            api_version: ""
        };
    }

    render() {
        return (
            <div className="Footer">
                <Container>
                <Grid container spacing={1}>
                    <Grid item xs={8}>
                        <h4>
                            vreddit-direct <br />
                            <Link href="https://github.com/arkits" color="inherit">
                                @arkits
                            </Link>
                        </h4>
                    </Grid>
                    <Grid item xs={3}>
                        <h4>
                        api_status: {this.props.api_status} <br />
                        api_version: {this.props.api_version}
                        </h4>
                    </Grid>
                </Grid>
                </Container>
            </div>
        );
    }
}

export default Footer;