<template>
    <div class="music" @click="play">
        <div class="seq-num">{{ seq }}</div>
        <div class="info">
            <p class="name">{{ info.name }}</p>
            <p class="singer">{{ info.singer }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        info: {
            type: Object
        },

        seq: {
            type: Number
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
.music {
    margin-bottom: 2vw;

    .seq-num {
        display: inline-block;
        vertical-align: top;
        line-height: 12vw;
        font-size: 5vw;
        color: #9f9fa6;
        width: 10vw;
        text-align: center;
    }

    .info {
        display: inline-block;
        vertical-align: top;
        width: 78vw;
        margin-left: 4vw;

        .name {
            font-size: 4vw;
            line-height: 6vw;
            color: #333;
        }

        .singer {
            font-size: 2vw;
            line-height: 6vw;
            color: #9f9fa6;
        }
    }
}
</style>