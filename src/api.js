const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')

const mongoose = require('mongoose')
const schema = require('./dolbyMap')

const app = express()
const router = express.Router();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

router.get('/', async (req,res)=>{
    try{
        const products = await schema.find();
        res.status(200).json({success: true, data: products})
    } catch(err)
    {
        res.status(409).json({success: false, data: [], error: err})
        console.log(err)
    }
});

router.get('/:map', async (req,res)=>{
    try{
        const {map} = req.params
        const product = await schema.find({map});
        res.status(200).json({success: true, data: product})
    } catch(err)
    {
        res.status(409).json({success: false, data: [], error: err})
        console.log(err)
    }
});

router.post('/createMap', async (req,res)=>{
    try{
        const {map, data} = req.body
        console.log(req.body);
        const products = await schema.find();
     if(!products.find(product => product.map === map)){
        const product = new schema({ map, data });
        const saveProduct = await product.save();
        res.status(200).json({success: true, exists: false, data: saveProduct})
     }else{
         res.status(200).json({success: true, exists : true})
     }
    } catch(err)
    {
        res.status(409).json({success: false, data: [], error: err})
        console.log(err)
    }
});



router.post('/updateMap', async (req,res)=>{
    try{
        const {map, data} = req.body
        const products = await schema.find();
        let product = products.find(product => product.map === map);
     if(product){
        product.data = data;
        const saveProduct = await product.save();
        res.status(200).json({success: true, notFound: false, data: saveProduct})
     }else{
         res.status(200).json({success: true, notFound : true})
     }
    } catch(err)
    {
        res.status(409).json({success: false, data: [], error: err})
        console.log(err)
    }
});

mongoose.connect('mongodb+srv://nikhil:qwerty1234@cluster0.87dy8.mongodb.net/DolbyMaps?retryWrites=true&w=majority', () => console.log('DB connected'))

app.use('/.netlify/functions/api',router);
module.exports.handler = serverless(app)