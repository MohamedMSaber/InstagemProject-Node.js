const commentModel = require("../../../DB/model/comment");
const postModel = require("../../../DB/model/post");

const comment = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    const post = await postModel.findById(id)
    if (!post) {
        res.json({ message: "Invalid Post" })
    } else {
        const comment = new commentModel({ text, createdBy: req.user._id, postId: post._id })
        const savedPost = await comment.save();
        res.json({message:"Done" , savedPost})
    }
}



module.exports = {
    comment
}