const utils = {}

utils.generateRandomArchiveNumber = require("./randomArchiveNumber.js")
utils.uploadArchive = require("./archiveFile").upload
utils.deleteFile = require("./archiveFile").deleteFile

module.exports = utils