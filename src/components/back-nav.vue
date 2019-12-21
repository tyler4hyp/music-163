<template>
    <div class="back-nav">
        <div @click="back">
            <svg width="8vw" height="8vw" viewbox="0 0 30 30">
                <polyline points="10,5 0,15 10,25" stroke-width="2" stroke="#333" fill="#fff"/>
                <line x1="0" y1="15" x2="25" y2="15" stroke-width="2" stroke="#333"/>
            </svg>
        </div>
        <p class="title">{{ title }}</p>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        }
    },

    methods: {
        back() {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
.back-nav {
    padding: 3vw 4vw;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .title {
        height: 8vw;
        line-height: 8vw;
        font-size: 5vw;
        color: #333;
        margin-left: 2vw;
    }
}
</style>