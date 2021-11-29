const mongoose = require('mongoose');
const Video = mongoose.model('Video');
const bcrypt = require('bcryptjs');;
const jwt = require('jsonwebtoken');
const ApiError = require('../exceptions/api-error');
const { Router } = require('express');
const fileMiddleware = require('../middleware/file');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const ffprobe = require('ffprobe');
const router = Router();;
const fs = require('fs');
const { getVideoDurationInSeconds } = require('get-video-duration');
const converter = require('../middleware/convert');
const takeScreenshot = require('../middleware/screenshot');
ffmpeg.setFfmpegPath(ffmpegPath);

exports.getVideo = async (req, res, next) => {
    try {
        const photoDirectoryPath = `public/video-screen/${req.params.id}/`;
        const photo = [];
        fs.readdirSync(photoDirectoryPath).forEach(file => photo.push(`video-screen/${req.params.id}/${file}`));
        photo.sort((a, b) => a.split("/")[2].split(".")[0] - b.split("/")[2].split(".")[0]);
        const video = await Video.findOne({ name: req.params.id })
        res.json({
            video: video.videoPath,
            name: video.name,
            photo: photo
        });
    } catch (err) {
        res.status(500).send(err);
    };
}

exports.updateVideo = async (req, res, next) => {
    try {
        const video = await converter(req.file.path);
        const photoPath = await takeScreenshot(video.name, video.convertVideoPath);
        const videoName = await Video.findOne({name: video.name});
        if (videoName) {
            throw ApiError.BadRequest('This videoname already exists');
        };
        const updateVideo = await Video.create({
            name: video.name,
            videoPath: video.convertVideoPath.slice(7),
            screenPath: photoPath
        });
        res.json({
            video: video.convertVideoPath.slice(7),
            id: video.name
        });
    } catch (err) {
        next(err);
    };
}

exports.getAllVideo = async (req, res, next) => {
    try {
        const video = await Video.find()
        console.log(video)
        res.json(video)
    } catch (err) {
        next(err);
    };
}