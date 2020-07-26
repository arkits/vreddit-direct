import React, { useEffect } from 'react';
import { Container, Typography, Box, TextField, Grid, Fab, LinearProgress } from '@material-ui/core';
import Copyright from '../src/Copyright';
import { makeStyles } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import GetAppIcon from '@material-ui/icons/GetApp';
import ShareIcon from '@material-ui/icons/Share';
import * as axios from 'axios';
import { useRouter } from 'next/router';

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
            setAudioChannelUrl(channelData.audioChannelUrl);
        }
    }, [channelData]);

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

    const copyShareableLink = () => {
        const prodUrl = 'https://vreddit.vercel.app/';
        navigator.clipboard.writeText(prodUrl + '?vid=' + channelData.videoId);
    };

    if (videoChannelUrl === null) {
        return null;
    } else {
        return (
            <div className="video-player">
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
                        onLoadStart={() => {
                            console.log('Video is loading');
                            pauseMedia();
                        }}
                        onLoadedData={() => {
                            console.log('Video finished loading');
                        }}
                    ></video>
                </div>
                <br />
                <br />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <div style={{ flexGrow: '1' }}>
                        <Fab color="primary" aria-label="add" onClick={togglePlayback}>
                            <GetMediaStateIcon />
                        </Fab>
                    </div>
                    <div style={{}}>
                        <Fab color="secondary" onClick={copyShareableLink} variant="extended">
                            <ShareIcon style={{ marginRight: '15px' }} /> Copy Shareable Link
                        </Fab>
                    </div>
                </div>
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
                        onLoadStart={() => {
                            console.log('Audio is loading');
                            pauseMedia();
                        }}
                        onLoadedData={() => {
                            console.log('Audio finished loading');
                        }}
                    ></video>
                </div>
            </div>
        );
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
