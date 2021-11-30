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
        const video = await Video.findOne({ id: req.params.id })
        console.log(video)
        res.json({
            video: video.videoPath,
            name: video.name,
            photo: video.screenPath
        });
    } catch (err) {
        res.status(500).send(err);
    };
}

exports.updateVideo = async (req, res, next) => {
    try {
        const video = await converter(req.file.path);
        const photoPath = await takeScreenshot(video.name, video.convertVideoPath);
        const videoName = await Video.findOne({id: video.name});
        if (videoName) {
            throw ApiError.BadRequest('This videoname already exists');
        };
        const uploadVideo = await Video.create({
            id: video.name,
            name: req.body.name,
            videoPath: video.convertVideoPath.slice(7),
            screenPath: photoPath,
            userId: req.body.userId
        });
        res.json({
            id: video.name,
            video: video.convertVideoPath.slice(7),
            name: req.body.name,
            userId: req.body.userId,
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