export default (time) => {
    const now = new Date()
    const date = new Date(time)
    const diff = now - date
    const minute = 60 * 1000
    const hour = 60 * minute
    const day = 24 * hour
    
    switch(diff) {
        case(diff < 5 * minute): {
            return "刚刚"
        }
        case(diff < hour): {
            const minutes = Math.floor(diff / minute)
            return `${minute}分钟前`
        }
        case(diff < day): {
            const hours = Math.floor(diff / hour)
            return `${hours}小时前`
        }
        case(diff < 3 * day): {
            const days = Math.floor(diff / day)
            return `${days}天前`
        }
        default: {
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
        }
    }
}