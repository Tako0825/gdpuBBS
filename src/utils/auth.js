import store from "@/store/index"
export default () => {
    const { user } = store.state
    if(!user || !user.id) {
        return false
    }
    return true
}