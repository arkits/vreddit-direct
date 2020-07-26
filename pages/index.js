import React, { useEffect } from 'react';
import * as axios from 'axios';
import { useRouter } from 'next/router';
import { Container, Typography, Box, TextField, Grid, Fab, LinearProgress } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../src/Copyright';
import VideoPlayer from '../src/VideoPlayer';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2)
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    }
}));

function ApiLoader({ isApiLoading }) {
    if (isApiLoading) {
        return <LinearProgress color="secondary" />;
    } else {
        return null;
    }
}

export default function Index() {
    const classes = useStyles();

    const [iVRedditLink, setVRedditLink] = React.useState('https://v.redd.it/du1z36bp1zc51');
    const [isApiLoading, setIsApiLoading] = React.useState(false);
    const [channelData, setChannelData] = React.useState({});

    const [currentVideoId, setCurrentVideoId] = React.useState(null);

    const router = useRouter();

    useEffect(() => {
        let videoIdFromRouter = router.query.vid;
        if (videoIdFromRouter) {
            console.log('Had vid in URL - ', videoIdFromRouter);
            setCurrentVideoId(videoIdFromRouter);
            loadDirectVideo(videoIdFromRouter);
        }
    }, [router]);

    const loadDirectVideo = async (videoId) => {
        try {
            if (videoId) {
                console.log('Calling API', videoId);

                setIsApiLoading(true);

                let response = await axios.get(`https://vreddit.vercel.app/api/direct?id=${videoId}`);
                // console.log(response.data);

                setIsApiLoading(false);
                setChannelData(response.data);
            } else {
                console.log('videoId not set');
            }
        } catch (error) {
            console.error(error.message);
            setIsApiLoading(false);
        }
    };

    const updateVideoId = () => {
        let videoId = iVRedditLink.slice(18);
        if (videoId.indexOf('/') != -1) {
            videoId = videoId.slice(0, videoId.indexOf('/'));
        }
        console.log(videoId);

        setCurrentVideoId(videoId);
        loadDirectVideo(videoId);
    };

    return (
        <div className={classes.root}>
            <Container component="main" maxWidth="md">
                <Box my={4}>
                    <Typography align="center" variant="h4" component="h1" gutterBottom>
                        vreddit-direct
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <form noValidate autoComplete="off">
                                <TextField
                                    id="outlined-basic"
                                    label="Paste v.redd.it link..."
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setVRedditLink(e.target.value)}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={2} align="right">
                            <Fab color="primary" aria-label="add" onClick={updateVideoId}>
                                <GetAppIcon />
                            </Fab>
                        </Grid>
                    </Grid>
                    <br />
                    <ApiLoader isApiLoading={isApiLoading} />
                    <br />
                    <VideoPlayer channelData={channelData} />
                </Box>
            </Container>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Copyright />
                </Container>
            </footer>
        </div>
    );
}
