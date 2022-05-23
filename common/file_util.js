const Crypto = require('crypto');
const move = require('mv');

async function uploadFile(file, baseDir) {
    const oldPath = file.path;
    const randomToken = Crypto.randomBytes(12).toString('hex');
    const newPath = `${baseDir}${randomToken}_${file.name}`;
    move(oldPath, newPath, (err) => {
        if (err) throw err;
    });
    return `${randomToken}_${file.name}`;
}

module.exports = {
    uploadFile
}