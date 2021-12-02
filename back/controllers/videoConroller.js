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
        res.json({
            video: video.videoPath,
            name: video.name,
            photo: video.screenPath
        });
    } catch (err) {
        res.status(500).send(err);
    };
}

exports.uploadVideo = async (req, res, next) => {
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
}

exports.getAllVideo = async (req, res, next) => {
    try {
        const video = await Video.find().populate('user').sort({createdAt: -1})
        console.log(video)
        res.json(video);
    } catch (err) {
        next(err);
    };
}

// exports.getUserVideo = async (req, res, next) => {
//     try {
//         const video = await Video.find().sort({createdAt: -1})
//             .populate({
//                 path: 'user',
//                 match: {_id: { $eq: req.query.userId }}
//             });
//         res.json(video.filter(video => video.user !== null));
//     } catch (err) {
//         next(err);
//     };
// };

exports.getFilterVideo = async (req, res, next) => {
    console.log(req.query.categoryId === undefined)
    try {
        const video = await Video.find().sort({createdAt: -1})
            .populate({
                path: 'category',
                match: {_id: { $eq: req.query.categoryId}}
            })
            .populate({
                path: 'user',
                match: {_id: { $eq: req.query.userId }}
            });
        console.log(video)
        res.json(video.filter(video => video.category !== null).filter(video => video.user !== null));
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
        res.status(500).send(err);
    };
};