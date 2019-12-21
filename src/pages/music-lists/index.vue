<template>
    <div class="page-music-lists">
        <back-nav title="歌单广场"></back-nav>
        <music-type :current="current" @chooseType="chooseType"></music-type>
        <div class="content">
            <div v-for="item in list"
                :key="item.id">
                <rec-music-list :info="item"></rec-music-list>
            </div>
        </div>
        <more-loading size="14"></more-loading>
    </div>
</template>

<script>
import MusicListsModule from '@store/modules/music-lists'

import BackNav from '@com/back-nav.vue'
import MusicType from './components/music-type.vue'
import RecMusicList from './components/rec-music-list.vue'
import MoreLoading from '@com/more-loading.vue'

export default {
    components: {
        BackNav,
        MusicType,
        RecMusicList,
        MoreLoading
    },

    asyncData ({ store, route }) {
        store.registerModule('musicLists', MusicListsModule)
        let arr = [
            store.dispatch('musicLists/getRecMusicList', {
                reset: true
            })
        ]
        if (!store.state.common.music.url) {
            arr.push(store.dispatch('common/getMusic', store.state.common.initID))
        }
        return Promise.all(arr)
    },

    mounted() {
        this.$store.registerModule('musicLists', MusicListsModule, {
            preserveState: true
        })
    },

    destroyed () {
        this.$store.unregisterModule('musicLists')
    },

    data() {
        return {
            current: '推荐'
        }
    },

    computed: {
        list() {
            return this.$store.state.musicLists.list
        }
    },

    methods: {
        chooseType(type) {
            if (type === this.current) {
                return
            }
            this.current = type
            switch(this.current) {
                case '推荐':
                    this.$store.dispatch('musicLists/getRecMusicList', {
                        reset: true,
                        limit: 30
                    })
                    break;
                case '精品':
                    this.$store.dispatch('musicLists/getHQMusicLists', {
                        reset: true,
                        limit: 30
                    })
                    break;
                default:
                    this.$store.dispatch('musicLists/getMusicListsByTag', {
                        reset: true,
                        cat: type,
                        limit: 30
                    })
                    break;
            }
        },

        loadMore() {

        },

        bindloadMore() {
        }
    }
}
</script>

<style lang="scss" scoped>
.page-music-lists {
    padding-bottom: 18vw;

    .content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        align-content: space-between;
        padding: 4vw;
    }
}
</style>