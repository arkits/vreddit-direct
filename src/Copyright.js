import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';

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
            <MuiLink color="inherit" href="https://github.com/arkits" target="_blank" rel="noopener">
                @arkits
            </MuiLink>{' '}
            //
            <MuiLink href="https://github.com/arkits/vreddit-direct" target="_blank" rel="noopener">
                <IconButton aria-label="github">
                    <GitHubIcon />
                </IconButton>
            </MuiLink>
        </Typography>
    );
}
