import React, { useEffect } from 'react';
import { Container, Typography, Box, TextField, Grid, Fab, LinearProgress } from '@material-ui/core';
import Copyright from '../src/Copyright';
import { makeStyles } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import GetAppIcon from '@material-ui/icons/GetApp';
import * as axios from 'axios';

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
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
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

function VideoPlayer({ channelData }) {
    const [videoChannelUrl, setVideoChannelUrl] = React.useState(null);
    const [audioChannelUrl, setAudioChannelUrl] = React.useState(null);

    const showNativeMediaControls = false;

    let videoRef = React.createRef();
    let audioRef = React.createRef();

    const [isPlaying, setIsPlaying] = React.useState(false);

    useEffect(() => {
        if (channelData.videoChannelUrls) {
            setVideoChannelUrl(channelData.videoChannelUrls[channelData.videoChannelUrls.length - 1]);
            console.log('videoChannelUrls got updated -', videoChannelUrl);

            setAudioChannelUrl(channelData.audioChannelUrl);
            console.log('audioChannelUrl got updated -', audioChannelUrl);
        }
    });

    const togglePlayback = () => {
        if (isPlaying) {
            pauseMedia();
        } else {
            playMedia();
        }
    };

    const playMedia = () => {
        try {
            videoRef.current.play();
            audioRef.current.play();
            setIsPlaying(true);
        } catch (error) {
            console.error(error);
        }
    };

    const pauseMedia = () => {
        try {
            videoRef.current.pause();
            audioRef.current.pause();
            setIsPlaying(false);
        } catch (error) {
            console.error(error);
        }
    };

    const GetMediaStateIcon = () => {
        if (isPlaying) {
            return <PauseIcon />;
        } else {
            return <PlayArrowIcon />;
        }
    };

    if (videoChannelUrl === null) {
        return null;
    } else {
        return (
            <div className="video-player">
                <center>
                    <div>
                        <video
                            ref={videoRef}
                            controls={showNativeMediaControls}
                            width="100%"
                            height="auto"
                            src={videoChannelUrl}
                            onPlay={() => {
                                console.log('Video is playing');
                                playMedia();
                            }}
                            onPause={() => {
                                console.log('Video is paused');
                                pauseMedia();
                            }}
                        ></video>
                    </div>
                    <br /><br />
                    <Fab color="primary" aria-label="add" onClick={togglePlayback}>
                        <GetMediaStateIcon />
                    </Fab>
                    <div>
                        <video
                            ref={audioRef}
                            controls={showNativeMediaControls}
                            src={audioChannelUrl}
                            onPlay={() => {
                                console.log('Audio is playing');
                                playMedia();
                            }}
                            onPause={() => {
                                console.log('Audio is paused');
                                pauseMedia();
                            }}
                        ></video>
                    </div>
                </center>
            </div>
        );
    }
}

export default function Index() {
    const classes = useStyles();

    const [iVRedditLink, setVRedditLink] = React.useState('');
    const [isApiLoading, setIsApiLoading] = React.useState(false);
    const [channelData, setChannelData] = React.useState({});

    const loadDirectVideo = async () => {
        console.log('We here!');
        try {
            setIsApiLoading(true);
            let response = await axios.get('https://vreddit.vercel.app/api/direct?id=du1z36bp1zc51');
            console.log(response.data);

            setIsApiLoading(false);
            setChannelData(response.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className={classes.root}>
            <Container component="main" maxWidth="sm">
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
                            <Fab color="primary" aria-label="add" onClick={loadDirectVideo}>
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
