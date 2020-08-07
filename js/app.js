console.log('Loaded app.js!');

let videoId = null;

let qualityIndex = null;

pageOnLoad();

function videoLinkUpdate() {
    console.log('videoLinkUpdate');

    var formInput = document.getElementById('video-link-form').value;
    console.log(formInput);

    let vid = formInput.slice(18);
    if (vid.indexOf('/') != -1) {
        vid = vid.slice(0, vid.indexOf('/'));
    }

    videoId = vid;
    console.log('Updated videoId -', videoId);

    var str = window.location.search;
    str = replaceQueryParam('vid', videoId, str);
    window.location = window.location.pathname + str;

    loadPageContent();
}

function pageOnLoad() {
    const urlParams = new URLSearchParams(window.location.search);
    let vid = urlParams.get('vid');

    if (!vid) {
        return;
    }

    qualityIndex = urlParams.get('q');

    videoId = vid;
    console.log('Updated videoId -', videoId);

    loadPageContent();
}

function loadPageContent() {
    document.getElementById('api-loading-bar').style.visibility = 'visible';
    document.getElementById('video-loading-indicator').style.visibility = 'visible';

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch('https://vreddit.vercel.app/api/direct?id=' + videoId, requestOptions)
        .then((response) => {
            response.json().then(function (body) {
                console.log('/api/direct response -', body);

                let videoIndex = 0;
                if (qualityIndex) {
                    videoIndex = qualityIndex - 1;
                }

                let videoUrl = body.videoChannelUrls[videoIndex];
                let videoE = document.getElementById('media-video');
                videoE.src = videoUrl;
                videoE.oncanplay = function () {
                    document.getElementById('video-loading-indicator').style.display = 'none';
                    document.getElementById('video-group').style.visibility = 'visible';
                };

                let audioUrl = body.audioChannelUrl;
                let audioE = document.getElementById('media-audio');
                audioE.src = audioUrl;

                mediaSync();

                let qualityButtonDiv = document.getElementById('quality-buttons');
                qualityButtonDiv.innerHTML = '';

                body.videoChannelUrls.forEach((videoChannelUrl, index) => {
                    let basePath = 'https://v.redd.it/' + videoId;
                    let dashPath = '/DASH_';

                    let prettyQuality = videoChannelUrl.slice(basePath.length);

                    if (prettyQuality.startsWith(dashPath)) {
                        prettyQuality = prettyQuality.slice(dashPath.length);
                    }

                    let qualityButton = document.createElement('a');
                    qualityButton.type = 'button';

                    if (qualityIndex - 1 == index) {
                        qualityButton.className = 'waves-effect waves-teal btn';
                    } else {
                        qualityButton.className = 'waves-effect waves-teal btn-flat';
                    }

                    qualityButton.innerHTML = prettyQuality;

                    qualityButton.onclick = function () {
                        let q = index + 1;

                        console.log('Changing quality to - ', q);

                        var str = window.location.search;
                        str = replaceQueryParam('q', q, str);
                        window.location = window.location.pathname + str;

                        return;
                    };

                    qualityButtonDiv.appendChild(qualityButton);
                });
            });
        })
        .catch((error) => {
            console.log('Caught error in /api/direct - ', error);
        });

    fetch('https://vreddit.vercel.app/api/metadata?id=' + videoId, requestOptions)
        .then((response) => {
            document.getElementById('api-loading-bar').style.display = 'none';

            response.json().then(function (body) {
                console.log('/api/metadata response -', body);

                let metadataGroup = document.getElementById('metadata-group');
                let title = document.createElement('h5');
                title.innerHTML = body.title;
                metadataGroup.appendChild(title);
            });
        })
        .catch((error) => {
            console.log('Caught error in /api/direct - ', error);
        });
}

function mediaSync() {
    var medias = {
            audio: Popcorn('#media-audio'),
            video: Popcorn('#media-video')
        },
        loadCount = 0,
        events = 'play pause timeupdate seeking'.split(/\s+/g);

    Popcorn.forEach(medias, function (media, type) {
        media
            .on('canplayall', function () {
                this.emit('sync');
            })
            .on('sync', function () {
                if (++loadCount == 2) {
                    events.forEach(function (event) {
                        medias.audio.on(event, function () {
                            if (event === 'timeupdate') {
                                if (!this.media.paused) {
                                    return;
                                }
                                medias.video.emit('timeupdate');

                                return;
                            }

                            if (event === 'seeking') {
                                medias.video.currentTime(this.currentTime());
                            }

                            if (event === 'play' || event === 'pause') {
                                medias.video[event]();
                            }
                        });
                    });
                }
            });
    });
}

function replaceQueryParam(param, newval, search) {
    var regex = new RegExp('([?;&])' + param + '[^&;]*[;&]?');
    var query = search.replace(regex, '$1').replace(/&$/, '');

    return (query.length > 2 ? query + '&' : '?') + (newval ? param + '=' + newval : '');
}
