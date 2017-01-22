module.exports.setHeaders = function () {
    return {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token')
    }
}

module.exports.setFileHeaders = function () {
    return {
        // 'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token')
    }
}
