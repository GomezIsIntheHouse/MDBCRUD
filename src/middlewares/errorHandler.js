const errorHandler = (err, req, res, next)=>{
    console.error(err)
    resizeBy.status(500).json({
        success:false,
        error: err.message
    })
}

module.exports = errorHandler;