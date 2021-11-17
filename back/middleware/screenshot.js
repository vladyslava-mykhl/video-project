
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const ffprobe = require('ffprobe')
const extractFrames = require('ffmpeg-extract-frames')
const fs = require('fs')
const { getVideoDurationInSeconds } = require('get-video-duration')
ffmpeg.setFfmpegPath(ffmpegPath);


const takeScreenshot = (fileName, videoPath) => {
    return new Promise((res, rej) => {
        const photo = []
        const offsets = []
        getVideoDurationInSeconds(videoPath).then((duration) => {
            for (let i = 0; i <= duration; i += 5) {
                offsets.push(i*1000)
                const screenName = `video-screen/${fileName}/${i}.jpg`
                photo.push(screenName)
            }
            extractFrames({
                input: videoPath,
                output: `./public/video-screen/${fileName}/%s.jpg`,
                offsets: offsets
            }).then(() => res(photo)).catch(err => rej(err))
        })
    })
}

module.exports = takeScreenshot