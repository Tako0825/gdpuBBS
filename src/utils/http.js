export default (url, options) => {
    return new Promise(resolve => {
        wx.request({
            url: `http://jiwaicat.top:9191${url}`,
            ...options,
            success: res => {
                resolve(res)
            }
        })
    })
}