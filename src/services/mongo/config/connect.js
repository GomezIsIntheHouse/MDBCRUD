const mongoose = require('mongoose')


const mongoConnect = async ()=>{
    let MONGO_URI;
    const MONGO_USER = process.env.MONGO_USER
    const MONGO_PASSWORD = process.env.MONGO_PASSWORD
    const MONGO_DB_NAME = process.env.MONGO_DB_NAME
    const MONGO_HOST = process.env.MONGO_HOST

    //de esta manera detecta automaticamente si nos estamos conectando de manera local o a una base de datos productiva en MONGO ATLAS
    if(!MONGO_USER){
        MONGO_URI = `${process.env.MONGO_URI}/${MONGO_DB_NAME}`
    }else{
        MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}` ;
    }
    console.log(MONGO_URI)
    try {
        await mongoose.connect(MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.info('MONGODB CONNECTED')
        
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = mongoConnect;