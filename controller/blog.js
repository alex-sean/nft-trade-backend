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

module.exports = {
    addBlog
}