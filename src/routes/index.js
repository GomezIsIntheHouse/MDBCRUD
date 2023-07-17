const express = require('express')
const router = express.Router()


router.get('/health', async (_req, res)=>{
    const environment = process.env.ENVIRONMENT || 'undefined'
    res.status(200).json({
        health:'up',
        environment
    })
})

module.exports = router; //se exporta aca y se importa en app.js