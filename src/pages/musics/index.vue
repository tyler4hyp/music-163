<template>
    <div class="page-musics">
        <back-nav title="歌单"></back-nav>
        <musics-info :info="info"></musics-info>
        <div class="list">
            <div v-for="(item, index) in list"
                :key="index">
                <music :info="item" :seq="index"></music>
            </div>
        </div>
    </div>
</template>

<script>
import MusicsModule from '@store/modules/musics'

import BackNav from '@com/back-nav.vue'
import MusicsInfo from './components/musics-info.vue'
import Music from './components/music.vue'

export default {
    components: {
        BackNav,
        MusicsInfo,
        Music
    },

    asyncData ({ store, route }) {
        store.registerModule('musics', MusicsModule)
        let arr = [
            store.dispatch('musics/getMusicsDetail', route.params.id)
        ]
        if (!store.state.common.music.url) {
            arr.push(store.dispatch('common/getMusic', store.state.common.initID))
        }
        return Promise.all(arr)
    },

    computed: {
        info() {
            return this.$store.state.musics.info
        },

        list() {
            return this.$store.state.musics.list
        }
    },

    mounted() {
        this.$store.registerModule('musics', MusicsModule, {
            preserveState: true
        })
    },

    destroyed () {
        this.$store.unregisterModule('musics')
    }
}
</script>

<style lang="scss" scoped>
.page-musics {
    padding-bottom: 14vw;

    .list {
        padding: 0 4vw;
        margin-top: 5vw;
    }
}
</style>