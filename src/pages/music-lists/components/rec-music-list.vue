<template>
    <router-link :to="'/musics/' + info.id">
        <div class="rec-music-list">
            <div class="img-wrap">
                <img :src="info.cover" />
            </div>
            <p class="text">{{ info.name }}</p>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        info: {
            type: Object
        }
    }
}
</script>

<style lang="scss" scoped>
.rec-music-list {
    display: inline-block;
    width: 28vw;
    overflow: hidden;
    margin-bottom: 1.5vw;

    .img-wrap {
        width: 28vw;
        height: 28vw;

        img {
            width: 100%;
            height: 100%;
            border-radius: 1vw;
        }
    }

    .text {
        line-height: 4vw;
        font-size: 2vw;
        color: #9f9fa6;
        margin-top: 1vw;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
}
</style>