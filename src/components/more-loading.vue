<template>
    <div class="loader">
        <div v-for="(item, index) in list"
            :key="index"
            class="dot"
            :style="{'width': size + 'px', 'height': size + 'px'}"></div>
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            default: 10
        }
    },

    data() {
        return {
            list: new Array(5).fill(0)
        }
    }
}
</script>

<style lang="scss" scoped>
.loader {
    text-align: center;
}

.dot {
    background: #3ac;
    border-radius: 100%;
    display: inline-block;
    animation: slide 1s infinite;
}

.dot:nth-child(1) {
    animation-delay: .1s;
    background: rgba(50, 170, 204, 1);
}

.dot:nth-child(2) {
    animation-delay: .2s;
    background: rgba(100, 170, 204, 1);
}

.dot:nth-child(3) {
    animation-delay: .3s;
    background: rgba(150, 170, 204, 1);
}

.dot:nth-child(4) {
    animation-delay: .4s;
    background: rgba(200, 170, 204, 1);
}

.dot:nth-child(5) {
    animation-delay: .5s;
    background: rgba(250, 170, 204, 1);
}

@keyframes slide {
    0% { transform: scale(1) }
    50%{ opacity: .3; transform: scale(2) }
    100%{ transform: scale(1) }
}
</style>