export default (time) => {
    const date = new Date(time)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString("it-IT")}`
}