require('dotenv').config();
const BlogModel = require('../model/blog');
const FileUtils = require('../common/file_util');

async function addBlog(params) {
    try {
        const thumbPath = await FileUtils.uploadFile(params.thumbnail, process.env.DIR_BLOG_THUMBNAIL);
        params.thumbnail = thumbPath;

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
            params.where = {}
            if (params.title)
                params.where.title = ['like', `%${params.title}%`]
            if (params.content)
                params.where.description = ['like', `%${params.content}%`]
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

module.exports = {
    addBlog,
    getBlogList,
    deleteBlog
}