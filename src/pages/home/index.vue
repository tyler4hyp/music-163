<template>
    <div class="page-home">
        <c-header></c-header>
        <c-carousel :banner="banner"></c-carousel>
        <div class="nav-wrap">
            <router-link v-for="(item, index) in navs"
                :key="index"
                :to="item.path">
                <c-circle-nav :info="item"></c-circle-nav>
            </router-link>
        </div>
        <div class="module">
            <p class="title">推荐歌单</p>
            <div class="list">
                <div v-for="(item, index) in recMusicList"
                    :key="index">
                    <rec-music-list :info="item"></rec-music-list>
                </div>
            </div>
        </div>
        <div class="module">
            <p class="title">新歌</p>
            <div class="list">
                <div v-for="(item, index) in recMusic"
                    :key="index">
                    <rec-music :info="item"></rec-music>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 在这里导入模块，而不是在 `store/index.js` 中
import HomeModule from '@store/modules/home'

import CHeader from '@com/c-header.vue'
import CCarousel from '@com/c-carousel.vue'
import CCircleNav from '@com/c-circle-nav.vue'
import RecMusicList from './components/rec-music-list.vue'
import RecMusic from './components/rec-music.vue'
import { nav } from './conf'

export default {
    components: {
        CHeader,
        CCarousel,
        CCircleNav,
        RecMusicList,
        RecMusic
    },

    asyncData ({ store, route }) {
        store.registerModule('home', HomeModule)
        store.commit('common/setHeader', 'home')
        let arr = [
            store.dispatch('home/getBanner'),
            store.dispatch('home/getRecMusicList', {
                limit: 6
            }),
            store.dispatch('home/getRecMusic')
        ]
        if (!store.state.common.music.url) {
            arr.push(store.dispatch('common/getMusic', store.state.common.initID))
        }
        return Promise.all(arr)
    },

    mounted() {
        this.$store.registerModule('home', HomeModule, {
            preserveState: true
        })
    },

    destroyed () {
        this.$store.unregisterModule('home')
    },

    data() {
        return {
            navs: nav
        }
    },

    computed: {
        banner() {
            return this.$store.state.home.banner
        },

        recMusicList() {
            return this.$store.state.home.recMusicList
        },

        recMusic() {
            return this.$store.state.home.recMusic
        }
    }
}
</script>

<style lang="scss" scoped>
.page-home {
    padding: 13vw 4vw 14vw 4vw;
}

.nav-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #9f9fa6;
    padding: 4vw 0;
}

.module {

    .title {
        font-size: 4.5vw;
        font-weight: bold;
        color: #333;
        margin-bottom: 2.5vw;
    }

    .list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        align-content: space-between;
    }
}
</style>