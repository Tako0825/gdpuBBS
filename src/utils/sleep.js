export default async (duration = 100) => {
    return new Promise(resolve => {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            resolve()
        }, duration)
    })
}