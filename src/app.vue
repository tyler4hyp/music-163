<template>
    <div id="app">
        <router-view></router-view>
        <music-player></music-player>
    </div>
</template>

<script>
import MusicPlayer from '@com/music-player.vue'

export default {
    components: {
        MusicPlayer
    }
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    font-size: 0;
}
</style>