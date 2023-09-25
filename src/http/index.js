export default (url, options) => {
    return new Promise(resolve => {
        wx.request({
            url: `http://jiwaicat.top:9090${url}`,
            ...options,
            success: res => {
                resolve(res)
            }
        })
    })
}