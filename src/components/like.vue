<template>
    <img v-if="status" src="@/static/is_like.png" alt="已点赞">
    <img v-else src="@/static/like.png" alt="未点赞">
</template>

<script>
export default {
    props: [
        "status"
    ]
}
</script>

<style scoped lang="less">
    img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
    }
</style>