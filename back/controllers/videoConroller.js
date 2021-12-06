const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
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
const mongooseFindAndFilter = require('mongoose-find-and-filter');
const converter = require('../middleware/convert');
const takeScreenshot = require('../middleware/screenshot');
ffmpeg.setFfmpegPath(ffmpegPath);

exports.getVideo = async (req, res, next) => {
    try {
        const video = await Video.findOne({ id: req.params.id })
        res.json({
            video: video.videoPath,
            name: video.name,
            photo: video.screenPath
        });
    } catch (err) {
        next(err);
    };
};

exports.uploadVideo = async (req, res, next) => {
    try {
        const video = await converter(req.file.path);
        const photoPath = await takeScreenshot(video.name, video.convertVideoPath);
        const videoName = await Video.findOne({id: video.name});
        const uploadVideo = await Video.create({
            id: video.name,
            name: req.body.name,
            videoPath: video.convertVideoPath.slice(7),
            screenPath: photoPath,
            user: req.body.userId,
            category: req.body.categoryId
        });
        res.json({
            id: video.name,
            video: video.convertVideoPath.slice(7),
            name: req.body.name,
            user: req.body.userId,
            category: req.body.categoryId
        });
    } catch (err) {
        next(err);
    };
};

exports.getFilterVideo = async (req, res, next) => {
    try {
        const query = {};
        Object.keys(req.query).forEach((key) => {
            query[key] = req.query[key];
        })
        const videos = await Video.find(query).sort({createdAt: -1}).populate("user");
        res.send(videos)
    } catch (err) {
        next(err);
    };
};

exports.getViewsVideo = async (req, res, next) => {
    try {
        const views = await Video.findOneAndUpdate(
            { id: req.query.videoId },
            { $inc: { views: 1 } }
        )
        res.json(views)
        console.log(views)
    } catch (err) {
        next(err);
    };
};