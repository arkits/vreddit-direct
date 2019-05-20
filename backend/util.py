import requests

import logging

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# https://v.redd.it/bkq3tykza0y21/DASH_96
# https://v.redd.it/bkq3tykza0y21/DASHPlaylist.mpd

video_suffixs = ["96", "360", "720"]

def director(link):

    logger.info("link = " + link)

    video_links = {}

    for suffix in video_suffixs:
        
        video_link = link + "/DASH_" + suffix
        logger.info("GETing: " + video_link)

        try:
            response = requests.head(video_link)

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