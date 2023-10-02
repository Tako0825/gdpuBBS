export default async (duration = 250) => {
    return new Promise(resolve => {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            resolve()
        }, duration)
    })
}