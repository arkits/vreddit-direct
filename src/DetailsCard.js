import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function DetailsCard({ channelData, metadata }) {
    const GetTitle = () => {
        if ('title' in metadata) {
            return metadata.title;
        } else {
            return 'Loading Details...';
        }
    };

    return (
        <div className="video-player">
            <div style={{ marginTop: '20px' }}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>
                            <GetTitle />
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div style={{ lineHeight: '1.5rem' }}>
                            Title: {metadata?.title} <br />
                            Score: {metadata?.score} <br />
                            Subreddit: {metadata?.subreddit} <br />
                            postId: {metadata?.postId} <br />
                            <br /><hr /><br />
                            Video ID: <code>{channelData.videoId}</code> <br />
                            Audio Channel: <code>{channelData.audioChannelUrl}</code> <br />
                            Video Channels: <code>{JSON.stringify(channelData.videoChannelUrls, null, 2)}</code> <br />
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}
