import React, { useEffect } from 'react';
import { Fab, CircularProgress } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ShareIcon from '@material-ui/icons/Share';

function MediaLoadingIndicator({ isLoading }) {
    if (isLoading) {
        return <CircularProgress />;
    } else {
        return null;
    }
}

export default function VideoPlayer({ channelData }) {
    const [videoChannelUrl, setVideoChannelUrl] = React.useState(null);
    const [audioChannelUrl, setAudioChannelUrl] = React.useState(null);
    const [isMediaLoading, setIsMediaLoading] = React.useState(false);

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
                    <center>
                        <MediaLoadingIndicator isLoading={isMediaLoading} />
                    </center>
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
                            setIsMediaLoading(true);
                        }}
                        onLoadedData={() => {
                            console.log('Video finished loading');
                            setIsMediaLoading(false);
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
