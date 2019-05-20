#!/usr/bin/env python
# -*- coding: utf-8 -*-

###################################################################
#                       vreddit-direct                            #
#                        Archit Khode                             #
###################################################################

# Notes:
# Direct video link - https://v.redd.it/bkq3tykza0y21/DASH_96
# Playlist of all video quality - https://v.redd.it/bkq3tykza0y21/DASHPlaylist.mpd

# TODO:
# Get video qualities from DASHPlaylist

import requests
import logging

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

video_suffixs = ["96", "360", "720"]

def director(link):

    logger.info("link = " + link)

    video_links = {}

    for suffix in video_suffixs:
        
        video_link = link + "/DASH_" + suffix
        logger.info("GETing: " + video_link)

        try:
            # Get the header of video
            response = requests.head(video_link)

            # If status was 200, then add to video_links
            if response.status_code == 200:
                logger.info("GOOD: " + video_link)
                video_links[suffix] = video_link
            else:
                logger.info("BAD: " + video_link)
        except: 
            pass

    payload = {
        "video_links" : video_links
    }

    return(payload)