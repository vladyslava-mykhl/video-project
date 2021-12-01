const { Router } = require('express');
const fileMiddleware = require('../middleware/file');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const ffprobe = require('ffprobe');
const router = Router();
const { uuid } = require('uuidv4');
const {body} = require('express-validator');
const authController = require('../controllers/authConroller');
const videoController = require('../controllers/videoConroller');
const fs = require('fs');
const { getVideoDurationInSeconds } = require('get-video-duration');
const converter = require('../middleware/convert');
const takeScreenshot = require('../middleware/screenshot');
ffmpeg.setFfmpegPath(ffmpegPath);

/** Video */

router.post('/upload-video', fileMiddleware.single('video'),  videoController.updateVideo);
router.post('/uploaded-video/:id', videoController.getVideo);
router.post('/get-all-video', videoController.getAllVideo);
router.post('/get-user-video', videoController.getUserVideo);


/** User */

router.post('/registration',
    body('password').isLength({ min: 5, max: 32 }),
    authController.registerUser
);
router.post('/login', authController.login);

module.exports = router;


// router.post('/upload-video', fileMiddleware.single('video'), async(req, res) => {
//     try {
//         const video = await converter(req.file.path);
//         const photoPath = await takeScreenshot(video.name, video.convertVideoPath);
//         res.json({
//             video: video.convertVideoPath.slice(7),
//             id: video.name
//         });
//     } catch (err) {
//         res.status(500).send(err);
//     };
// });

// router.post('/uploaded-video/:id', async(req, res) => {
//     try {
//         const videoPath = `public/video/${req.params.id}.mp4`;
//         const photoDirectoryPath = `public/video-screen/${req.params.id}/`;
//         const photo = [];
//         fs.readdirSync(photoDirectoryPath).forEach(file => photo.push(`video-screen/${req.params.id}/${file}`));
//         photo.sort((a, b) => a.split("/")[2].split(".")[0] - b.split("/")[2].split(".")[0]);
//         res.json({
//             video: videoPath.slice(7),
//             photo: photo
//         });
//     } catch (err) {
//         res.status(500).send(err);
//     };
// });
