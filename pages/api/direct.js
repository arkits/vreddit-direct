const axios = require('axios');
const xmlToJson = require('../../utils/xml');

const VREDDIT_PATH = 'https://v.redd.it/';
const DASH_PLAYLIST_PATH = '/DASHPlaylist.mpd';

async function postDirect(req, res) {
    console.log('In postDirect!');

    try {
        let id = req.query.id;
        if (!id) {
            throw new Error('invalid request - no id');
        }
        console.log(`id=${id}`);

        let dashPlaylistUrl = VREDDIT_PATH + id + DASH_PLAYLIST_PATH;
        console.log(`dashPlaylistUrl=${dashPlaylistUrl}`);

        let response = await axios.get(dashPlaylistUrl);

        let parsedDashPlaylist = xmlToJson(response.data);
        console.log(JSON.stringify(parsedDashPlaylist, null, 2));

        res.json({
            message: 'OK'
        });
    } catch (error) {
        console.error('Caught Error - ', error.message);
        res.status(400);
        res.json({
            error: error.message
        });
    }
}

module.exports = postDirect;
