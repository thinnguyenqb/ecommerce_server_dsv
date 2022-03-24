const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,

})

const uploadController = {
    uploadImg: (req, res) => {
        try {
            const file = req.files.file;
            cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: 'Ecommerce', crop: "fill"
            }, async (err, result) => {
                if(err) throw err;
                res.json({url: result.secure_url})
            })
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    }

}

module.exports = uploadController