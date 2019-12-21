<template>
    <div class="c-header">
        <i class="fa fa-navicon"></i>
        <router-link class="mine" :class="{'active': tab === 'me'}" to="/me">我的</router-link>
        <router-link class="disc" :class="{'active': tab === 'home'}" to="/home">发现</router-link>
    </div>
</template>

<script>
export default {
    computed: {
        tab() {
            return this.$store.state.common.header
        }
    }
}
</script>

<style lang="scss" scoped>
.c-header {
    box-sizing: border-box;
    width: 100%;
    padding: 4vw;
    color: #9f9fa6;
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 10;

    a {
        font-size: 5vw;
        line-height: 5vw;
        color: #9f9fa6;
        text-decoration: none;
    }

    i {
        font-size: 5vw;
    }

    .mine {
        margin-left: 10vw;
    }

    .disc {
        margin-left: 10vw;
    }

    .active {
        font-weight: bold;
        color: #333;
    }
}
</style>