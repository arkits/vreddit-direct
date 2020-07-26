import React, { useEffect } from 'react';
import * as axios from 'axios';
import { useRouter } from 'next/router';
import { Container, Typography, Box, TextField, Grid, Fab, LinearProgress, Card, CardContent } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../src/Copyright';
import VideoPlayer from '../src/VideoPlayer';
import DetailsCard from '../src/DetailsCard';

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

function ApiLoadingIndicator({ isApiLoading }) {
    if (isApiLoading) {
        return <LinearProgress color="secondary" />;
    } else {
        return null;
    }
}

function ApiErrorCard({ error }) {
    if (error?.show) {
        return (
            <Card
                style={{
                    backgroundColor: '#f44336'
                }}
            >
                <CardContent>
                    <Typography variant="h6">Something went wrong!</Typography>
                    <Typography variant="body1">Invalid videoID</Typography>
                </CardContent>
            </Card>
        );
    } else {
        return null;
    }
}

export default function Index() {
    const classes = useStyles();

    const [iVRedditLink, setVRedditLink] = React.useState('https://v.redd.it/du1z36bp1zc51');
    const [isApiLoading, setIsApiLoading] = React.useState(false);
    const [channelData, setChannelData] = React.useState({});
    const [metadata, setMetadata] = React.useState({});
    const [apiError, setApiError] = React.useState({});

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
                setApiError({});

                setIsApiLoading(true);

                getMetadata(videoId);
                let directResponse = await axios.get(`https://vreddit.vercel.app/api/direct?id=${videoId}`);

                setIsApiLoading(false);
                setChannelData(directResponse.data);
            } else {
                console.log('videoId not set');
            }
        } catch (error) {
            console.error(error.message);
            setIsApiLoading(false);
            setApiError({
                show: true,
                message: error.message
            });
        }
    };

    const getMetadata = (videoId) => {
        try {
            console.log('Getting Metadata - ', videoId);
            axios
                .get(`https://vreddit.vercel.app/api/metadata?id=${videoId}`)
                .then((response) => {
                    console.log('Got Metadata - ', response.data);
                    setMetadata(response.data);
                })
                .catch((error) => {
                    console.error('Caught Error in getMetadata - ', error);
                });
        } catch (error) {
            console.error(error.message);
            setApiError({
                show: true,
                message: error.message
            });
        }
    };

    const updateVideoId = () => {
        let videoId = iVRedditLink.slice(18);
        if (videoId.indexOf('/') != -1) {
            videoId = videoId.slice(0, videoId.indexOf('/'));
        }
        console.log(videoId);

        router.push({
            pathname: '/',
            search: new URLSearchParams({
                vid: videoId
            })
        });
    };

    const ConditionallyShowDetailsCard = () => {
        if (apiError.show) {
            return null;
        } else {
            return <DetailsCard channelData={channelData} metadata={metadata} />;
        }
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
                                    color="secondary"
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
                    <ApiLoadingIndicator isApiLoading={isApiLoading} />
                    <ApiErrorCard error={apiError} />
                    <br />
                    <VideoPlayer channelData={channelData} />
                    <ConditionallyShowDetailsCard />
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
