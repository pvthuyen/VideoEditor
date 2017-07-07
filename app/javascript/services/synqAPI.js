const apiKey = "23ca46c8717243e0aa46e4d9a71b891d";

function checkStatus(response) {
    console.log(response);
    if (response.status === 200) {
        return response.json();
    }
    else {
        return null;
    }
}

export function createVideo(callback) {
    let form = new FormData();
    form.append('api_key', apiKey);
    fetch('https://api.synq.fm/v1/video/create',
    {
        method: 'POST',
        headers: {
        },
        body: form
    })
        .then(checkStatus)
        .then(json => {
            json && callback(json.video_id);
        });
}

export function getUploader(videoId, callback) {
    let form = new FormData();
    form.append('api_key', apiKey);
    form.append('video_id', videoId)
    fetch('https://api.synq.fm/v1/video/uploader',
    {
        method: 'POST',
        headers: {
        },
        body: form
    })
        .then(checkStatus)
        .then(json => {
            json && callback(json.uploader_url);
        });
}