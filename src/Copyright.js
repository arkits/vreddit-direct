import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

export default function Copyright() {
    return (
        <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            style={{
                marginTop: '1rem'
            }}
        >
            <MuiLink color="inherit" href="https://github.com/arkits">
                @arkits
            </MuiLink>
        </Typography>
    );
}
