<template>
    <img v-if="status" src="@/static/is_star.png" alt="已收藏">
    <img v-else src="@/static/star.png" alt="未收藏">
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