<template>
    <div class="rec-music" @click="play">
        <div class="img-wrap">
            <img :src="info.cover" />
        </div>
        <p class="name">{{ info.name }}</p>
        <p class="singer">{{ info.singer }}</p>
    </div>
</template>

<script>
export default {
    props: {
        info: {
            type: Object
        }
    },

    methods: {
        play() {
            this.$store.commit('common/setAutoPlay', true)
            this.$store.dispatch('common/getMusic', this.info.id)
        }
    }
}
</script>

<style lang="scss" scoped>
.rec-music {
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

    p {
        height: 4vw;
        line-height: 4vw;
        font-size: 2vw;
        color: #9f9fa6;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .name {
        margin-top: 1vw;
    }
}
</style>