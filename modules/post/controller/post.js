const postModel = require("../../../DB/model/post");
const paginate = require("../../../service/paginate");

const createPost = async (req, res) => {
    const { text } = req.body;
    if (req.fileError) {
        res.json({ message: "Invalid file Format" })
    }
    else {
        const imageUrls = []

        req.files.forEach(element => {
            imageUrls.push(`${req.finalDes}/${element.filename}`)
        });

        const newPost = new postModel({ text, image: imageUrls, createdBy: req.user._id })
        const savedPost = await newPost.save();
        res.json({ message: "Done", savedPost })
    }
}

const like = async (req, res) => {
    const { id } = req.params;
    const post = await postModel.findById(id)
    if (!post) {
        res.josn({ message: "in valid Post Id" })
    } else {
        await postModel.findByIdAndUpdate(post.id, { $push: { likes: req.user._id } })
        res.json({ message: "Done" })

    }

}
const unLike = async (req, res) => {
    const { id } = req.params;
    const post = await postModel.findById(id)
    if (!post) {
        res.josn({ message: "in valid Post Id" })
    } else {
        await postModel.findByIdAndUpdate(post.id, { $pull: { likes: req.user._id } })
        res.json({ message: "Done" })

    }

}


const postList = async (req, res) => {
    const {page , size} = req.query;
    const {skip ,limit} = paginate(page , size)
    const post = await postModel.find({}).limit(limit).skip(skip);


    res.json({ message: "Done", post })


}


module.exports = {
    createPost, like, unLike,postList
}