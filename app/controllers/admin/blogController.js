const { mongoose } = require('mongoose');
const blogModel = require('../../models/admin/blogModel')

exports.create = async (req, res) => {
    try {
        const output = await blogModel.findOne({ blog_title: req.body.blog_title }).countDocuments().exec();
        if (output == 1) {
            res.json({
                error: true,
                message: 'blogs Already Exist'
            })
        } else {
            let blog_category = req.body.blog_category;
            let blog_title = req.body.blog_title;
            let blog_desc = req.body.blog_desc;
            var blogs;
            if (req.file) {
                const blog_image = req.file.filename;
                blogs = new blogModel({
                    blog_category,
                    blog_title,
                    blog_desc,
                    blog_image
                })
            } else {
                blogs = new blogModel({
                    blog_category,
                    blog_title,
                    blog_desc
                })
            }
            await blogs.save().then((blog) => {
                res.status(200).json({
                    success: true,
                    id: blog._id,
                    message: 'Record Add Successfully'
                })
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}

exports.update = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const count = await blogModel.findOne({ _id: id }).countDocuments().exec();
        if (count > 0) {
            let data;
            let blog_category = req.body.blog_category;
            let blog_title = req.body.blog_title;
            let blog_desc = req.body.blog_desc;
            if (req.file) {
                data = {
                    blog_category,
                    blog_title,
                    blog_desc,
                    blog_image: req.file.filename,
                }
            } else {
                data = {
                    blog_category,
                    blog_title,
                    blog_desc,
                }
            }
            const update = await blogModel.findByIdAndUpdate(
                {
                    _id: id
                },
                data,
                {
                    new: true,
                    upsert: true

                })
            if (update) {
                res.status(200).json({
                    success: true,
                    id: update._id,
                    message: 'Record Edit Successfully'
                })
            }

        } else {
            res.json({
                error: true,
                message: "blogs Does Not Exist"
            })
        }
    } catch (err) {
        console.log(err)
    }
}

exports.getById = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const output = await blogModel.findOne({ _id: id }, { __v: 0 });
        if (output) {
            res.status(200).json({
                success: true,
                record: output
            })
        } else {
            res.json({
                error: true,
                message: "blogs Does Not Exist"
            })
        }
    } catch (err) {
        console.log(err)
    }
}

exports.getAll = async (req, res) => {
    try {
        const output = await blogModel.find({}, { __v: 0 }).sort("-updatedAt");
        if (output) {
            res.status(200).json({
                success: true,
                record: output
            })
        }
    } catch (err) {
        console.log(err)
    }
}

exports.getAllPagination = async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.pageNumber) || 0;
        const limit = parseInt(req.query.limit) || 2;
        const result = {};
        const totalPosts = await blogModel.countDocuments().exec();
        let startIndex = pageNumber * limit;
        const endIndex = (pageNumber + 1) * limit;
        result.totalPosts = totalPosts;
        if (startIndex > 0) {
            result.previous = {
                pageNumber: pageNumber - 1,
                limit: limit,
            };
        }
        // if (endIndex < (await blogModel.countDocuments().exec())) {
            if (endIndex < totalPosts) {
            result.next = {
                pageNumber: pageNumber + 1,
                limit: limit,
            };
        }
        result.record = await blogModel.find()
            .sort("-createdAt")
            .skip(startIndex)
            .limit(limit)
            .exec();
        result.rowsPerPage = limit;
        return res.json({ success: true, data: result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Sorry, something went wrong" });
    }
}

exports.deleteById = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const count = await blogModel.findOne({ _id: id }).countDocuments().exec();
        if (count > 0) {
            const deleteData = await blogModel.findOneAndDelete({ _id: id });
            if (deleteData) {
                res.status(200).json({
                    success: true,
                    message: 'Record Edit Successfully'
                })
            }

        } else {
            res.json({
                error: true,
                message: "blogs Does Not Exist"
            })
        }
    } catch (err) {
        console.log(err)
    }
}