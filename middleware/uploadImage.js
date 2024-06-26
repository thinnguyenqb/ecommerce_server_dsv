module.exports = async function(req, res, next) {
    try {
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: "No files were uploaded."})
            
        const file = req.files.file;

        if(file.size > 5 * 1024 * 1024){
            return res.status(400).json({msg: "Size too large."})
        } // 5mb

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            return res.status(400).json({msg: "File format is incorrect."})
        }

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
