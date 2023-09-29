export default (time) => {
    const now = new Date()
    const date = new Date(time)
    const diff = now - date
    const minute = 60 * 1000
    const hour = 60 * minute
    const day = 24 * hour
    
    if(diff < 5 * minute) {
        return "刚刚"
    }
    else if(diff < hour) {
        const minutes = Math.floor(diff / minute)
        return `${minutes}分钟前`
    }
    else if(diff < day) {
        const hours = Math.floor(diff / hour)
        return `${hours}小时前`
    }
    else if(diff < 3 * day) {
        const days = Math.floor(diff / day)
        return `${days}天前`
    }
    else {
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }
}
