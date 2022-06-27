require('dotenv').config();
const BlogModel = require('../model/blog');
const FileUtils = require('../common/file_util');

async function addBlog(params) {
    try {
        const thumbPath = await FileUtils.uploadFile(params.thumbnail, process.env.DIR_BLOG_THUMBNAIL);
        params.thumbnail = thumbPath;
        const image1Path = await FileUtils.uploadFile(params.image1, process.env.DIR_BLOG_THUMBNAIL);
        params.image1 = image1Path;
        const image2Path = await FileUtils.uploadFile(params.image2, process.env.DIR_BLOG_THUMBNAIL);
        params.image2 = image2Path;

        if (await BlogModel.register(params)) {
            return true;
        }

        return false;
    } catch (err) {
        return false;
    }
}

async function getBlogList(params) {
    try {
        if (params.title || params.content || params.status) {
            params.where = {base64: []}
            if (params.title)
                params.where.base64.push(['title', params.title])
            if (params.content)
                params.where.base64.push(['description', params.content])
            if (params.status)
                params.where.status = params.status
        }

        const blogs = await BlogModel.findAll(params.where, '*', [], params.limit, params.offset);
        const total = await BlogModel.getCount(params.where);

        return {
            blogs: blogs,
            total: total
        }
    } catch (err) {
        return null;
    }
}

async function deleteBlog(params) {
    try {
        return await BlogModel.deleteById(params.id);
    } catch (err) {
        return false;
    }
}

async function getBlog(id) {
    try {
        return await BlogModel.findOne({id: id});
    } catch (err)  {
        return null;
    }
}

module.exports = {
    addBlog,
    getBlogList,
    deleteBlog,
    getBlog
}