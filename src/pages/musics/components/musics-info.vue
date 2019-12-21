<template>
    <div class="detail">
        <img class="cover" :src="info.cover" />
        <div class="right">
            <p class="name">{{ info.name }}</p>
            <div class="creator-wrap">
                <img class="avatar" :src="info.avatar" />
                <div class="creator">{{ info.creator }}</div>
            </div>
            <p class="desc">{{ info.desc }}</p>
        </div>
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
.detail {
    padding: 0 4vw;

    .cover {
        width: 40vw;
        height: 40vw;
        border-radius: 1vw;
        margin-right: 2vw;
    }

    .right {
        display: inline-block;
        vertical-align: top;
        box-sizing: border-box;
        width: 50vw;

        .name {
            font-size: 5vw;
            line-height: 8vw;
            height: 16vw;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

        .creator-wrap {
            margin-top: 5vw;
            height: 8vw;

            .avatar {
                width: 8vw;
                height: 8vw;
                border-radius: 50%;
            }

            .creator {
                display: inline-block;
                vertical-align: top;
                font-size: 4vw;
                line-height: 4vw;
                margin-top: 2vw;
                margin-left: 2vw;
            }
        }

        .desc {
            margin-top: 3vw;
            font-size: 2vw;
            line-height: 4vw;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
    }
}
</style>