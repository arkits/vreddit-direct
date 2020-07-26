const axios = require('axios');
const cheerio = require('cheerio');
const allowCors = require('../../utils/cors');

const VREDDIT_PATH = 'https://v.redd.it/';

async function postMetadata(req, res) {
    try {
        console.time('postMetadata');
        let id = req.query.id;
        if (!id) {
            throw new Error('invalid request - no id');
        }
        id = id.trim();
        console.log(`postDirect request for id=${id}`);

        let response = await axios.get(VREDDIT_PATH + id, {
            headers: { 'User-Agent': 'vreddit-direct/0.1.0 (http://vreddit.vercel.app/)' }
        });
        console.log(response.request.res.responseUrl);

        // Get the post ID
        let finalUrl = response.request.res.responseUrl;
        let splitUrl = finalUrl.split('/');
        let postId = splitUrl[6];

        // Get the subreddit
        let subreddit = splitUrl[4];

        let $ = cheerio.load(response.data);

        // Get the post title
        let title = $('meta[property="og:title"]').attr('content');

        // Get the score
        let score = $('#vote-arrows-t3_' + postId)
            .first()
            .text();

        console.timeEnd('postMetadata');
        res.json({
            message: 'OK',
            videoId: id,
            title: title,
            score: score,
            postId: postId,
            subreddit: subreddit
        });
    } catch (error) {
        console.error('Caught Error - ', error.message, error);
        res.status(400);
        res.json({
            error: error.message
        });
    }
}

module.exports = allowCors(postMetadata);
