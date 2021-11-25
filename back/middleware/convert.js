const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const ffprobe = require('ffprobe');
const fs = require('fs');
const { uuid } = require('uuidv4');

ffmpeg.setFfmpegPath(ffmpegPath);

const converter = (path) => {
    const name = uuid();
    const convertVideoPath = `public/video/${name}.mp4`;

    return new Promise((res, rej) => {
        ffmpeg(path)
            .format('mp4')
            .size('?x480')
            .on('error', function (err) {
                console.log('An сonverting error occurred: ' + err.message);
                rej(err.message)
            })
            .on('end', function () {
                fs.unlinkSync(path);
                console.log('Сonverting finished !');
                res({name, convertVideoPath});
            })
            .save(convertVideoPath);
    });
};

module.exports = converter;