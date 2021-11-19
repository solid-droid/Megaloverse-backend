const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')

const app = express()
const router = express.Router();
app.use(cors())

router.get('/',(req,res)=>{
    res.json({
        map1:
            {
                images : [
                    {
                        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
                    }
                ],
                iframes : [
                    {
                    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
                    }
                ],
                label: [
                    {
                        text:'MAP 1'
                    }
                ],
                space: [
                    {
                    showCode: true,
                    showDemo: true,
                    showTeam: true,
                    code: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
                    demo: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
                    team: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
                    }
                ],
              },
        map2:
            {
                images : [],
                iframes : [
                            {
                            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
                            }
                        ],
                label: [],
                space: [],
            }
    })
});


app.use('/.netlify/functions/api',router);
module.exports.handler = serverless(app)