const allowCors = require('./cors');

function getVersion(req, res) {
    res.json({
        name: 'vreddit-direct',
        message: 'NAMASKAR MANDALI 🙏'
    });
}

module.exports = allowCors(getVersion);
