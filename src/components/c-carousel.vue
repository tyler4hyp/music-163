<template>
    <div class="c-carousel">
        <div class="inner" :style="{'transform': transform, 'transition': transition}">
            <div v-for="(item, index) in banner"
                :key="index"
                class="img-wrap"
                @click="chooseMusic(item)">
                <img :src="item.pic" />
            </div>
            <div v-if="banner.length > 1" class="img-wrap" @click="chooseMusic(banner[0])">
                <img :src="banner[0].pic" />
            </div>
        </div>
        <div class="point-wrap">
            <div v-for="(item, index) in banner"
                :key="index"
                class="point"
                :class="{'active': point === index}"></div>
        </div>
    </div>
</template>

<script>
let transitionCss = 'transform 200ms ease-in-out'
let timer = null

export default {
    props: {
        banner: {
            type: Array,
            default: () => {
                return []
            }
        }
    },

    computed: {
        transform() {
            return `translate(${this.offset}vw, 0)`
        },

        offset() {
            return -1 * this.current * 92
        },

        point() {
            return this.current % this.banner.length
        }
    },

    data() {
        return {
            current: 0,
            transition: transitionCss
        }
    },

    mounted() {
        this.initTimer()
    },

    methods: {
        initTimer() {
            timer = setInterval(() => {
                if (this.current === this.banner.length) {
                    this.transition = ''
                    this.current = 0
                }
                setTimeout(() => {
                    if (this.transition === '') {
                        this.transition = transitionCss
                    }
                    this.current++
                }, 100)
            }, 3000)
        },

        chooseMusic(item) {
            if (item.targetType === 1 && item.song && item.song.id) {
                this.$store.commit('common/setAutoPlay', true)
                this.$store.dispatch('common/getMusic', item.song.id)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.c-carousel {
    width: 100%;
    overflow: hidden;
    position: relative;
    border-radius: 1vw;

    .inner {
        white-space: nowrap;
        font-size: 0;
        position: relative;

        .img-wrap {
            display: inline-block;
            width: 100%;

            img {
                width: 100%;
            }
        }
    }

    .point-wrap {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 4vw;
        text-align: center;
        font-size: 0;

        .point {
            display: inline-block;
            width: 1.5vw;
            height: 1.5vw;
            border-radius: 50%;
            background: #9f9fa6;
            margin: 0 1vw;
        }

        .active {
            background: #f22;
        }
    }
}
</style>