const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')

const app = express()
const router = express.Router();
app.use(cors())

router.get('/',(req,res)=>{
    res.json({
        message: 'Hello World'
    })
});


app.use('/.netlify/functions/api',router);
module.exports.handler = serverless(app)