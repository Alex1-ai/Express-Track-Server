const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middleware/requireAuth')


const Track = mongoose.model('Track');

const router = express.Router();

// This make sure that before the user can access the track route he/she needs to be signin
router.use(requireAuth);


router.get('/tracks', async(req, res)=>{
    const tracks  = await Track.find({userId: req.user._id})

    res.send(tracks)
})

router.post ('/tracks', async (req, res)=>{
    const { name, locations } = req.body;

    if (!name || !locations){
        return res.status(422)
        .send({error:'You must provide a name and locations '})
    }
    try{
        const track = new Track({ name: name , locations:locations,userId: req.user._id})

        await track.save();
        res.send(track)
    }catch(err){
        res.status(422).send({error: err.message})
    }
})

module.exports = router