const { Router } = require('express');
const fileMiddleware = require('../middleware/file');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const ffprobe = require('ffprobe')
const router = Router()
const { uuid } = require('uuidv4');
const {body} = require('express-validator');
const authController = require('../controllers/authConroller');
const fs = require('fs');
const { getVideoDurationInSeconds } = require('get-video-duration');
let converter = require('../middleware/convert');
const takeScreenshot = require('../middleware/screenshot');
ffmpeg.setFfmpegPath(ffmpegPath);


router.post('/upload-video', fileMiddleware.single('video'), async(req, res) => {
    console.log(req.file.path)
    try {
        const video = await converter(req.file.path)
        const photoPath = await takeScreenshot(video.name, video.convertVideoPath)
        res.json({
            video: video.convertVideoPath.slice(7),
            id: video.name
        })
    } catch (err) {
        res.status(500).send(err)
    }
})
router.post('/uploaded-video/:id', async(req, res) => {
    try {
        const videoPath = `public/video/${req.params.id}.mp4`
        const photoDirectoryPath = `public/video-screen/${req.params.id}/`
        const photo = []
        fs.readdirSync(photoDirectoryPath).forEach(file => photo.push(`video-screen/${req.params.id}/${file}`));
        photo.sort((a, b) => a.split("/")[2].split(".")[0] - b.split("/")[2].split(".")[0])
        res.json({
            video: videoPath.slice(7),
            photo: photo
        })
    } catch (err) {
        res.status(500).send(err)
    }
})

/** User */
router.post('/registration',
    body('password').isLength({ min: 5, max: 32 }),
    body('phone').
    authController.registerUser
);

module.exports = router