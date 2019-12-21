<template>
    <div class="c-circle-nav">
        <div class="circle">
            <i :class="info.classObj"></i>
        </div>
        <span class="text">{{ info.text }}</span>
    </div>
</template>

<script>
export default {
    props: {
        info: {
            type: Object
        }
    }
}
</script>

<style lang="scss" scoped>
.c-circle-nav {
    display: inline-block;
    text-align: center;

    .circle {
        width: 14vw;
        height: 14vw;
        background: #f22;
        border-radius: 50%;
        text-align: center;
        margin-bottom: 1vw;

        i {
            font-size: 7vw;
            color: #fff;
            margin-top: 3.5vw;
        }
    }

    .text {
        font-size: 1.5vw;
    }
}
</style>