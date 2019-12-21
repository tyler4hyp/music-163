<template>
    <div class="music-type">
        <div class="inner">
            <span v-for="(item, index) in types"
                :key="index"
                class="type"
                :class="{'active': item === current}"
                @click="chooseType(item)">{{ item }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        current: {
            type: String
        }
    },

    data() {
        return {
            types: ['推荐', '精品', '华语', '流行', '民谣', '轻音乐', 'ACG']
        }
    },

    methods: {
        chooseType(type) {
            this.$emit('chooseType', type)
        }
    }
}
</script>


<style lang="scss" scoped>
.music-type {
    width: 100%;
    overflow: scroll;

    .inner {
        white-space: nowrap;
        font-size: 0;

        .type {
            display: inline-block;
            vertical-align: top;
            height: 10vw;
            line-height: 10vw;
            padding: 0 4vw;
            font-size: 2.5vw;
            color: #9f9fa6;
            border-bottom: 2px solid rgba(159,159,166, 0.2);
        }

        .active {
            position: relative;
            color: #f22;
        }

        .active::after {
            position: absolute;
            content: '';
            left: 50%;
            bottom: 0;
            width: 3vw;
            height: 1px;
            border-radius: 1px;
            background: #f22;
            transform: translateX(-50%);
        }
    }
}

.music-type::-webkit-scrollbar {
    display: none;
}
</style>