<template>
    <div class="music-player">
        <audio id="audio" src=""></audio>
        <div class="bottom-player" @click="openFullScreen">
            <div class="left">
                <img :src="info.cover" />
                <div class="music-info">
                    <p class="name">{{ info.name }}</p>
                    <p class="ar-name">{{ info.singer }}</p>
                </div>
            </div>
            <div class="right">
                <div class="on-off-wrap" @click.stop="toggle">
                    <svg width="8vw" height="8vw" viewbox="0 0 30 30">
                        <defs>
                            <g id="pause">
                                <line x1="12" y1="10" x2="12" y2="20" stroke-width="1" stroke="#f22"/>
                                <line x1="18" y1="10" x2="18" y2="20" stroke-width="1" stroke="#f22"/>
                            </g>
                            <g id="play">
                                <polygon points="12 10, 12 20, 18 15" stroke-width="1" stroke="#9f9fa6" fill="#9f9fa6"/>
                            </g>
                        </defs>
                        <circle cx="15" cy="15" :r="r" stroke-width="1" stroke="#9f9fa6" fill="none"></circle>
                        <circle cx="15" cy="15" :r="r" stroke-width="1" stroke="#f22" fill="none" transform="matrix(0,-1,1,0,0,30)" :stroke-dasharray="strokeDasharray"></circle>
                        <use :xlink:href="status"/>
                    </svg>
                </div>
                <div class="list-wrap">
                    <svg width="10vw" height="8vw" viewbox="0 0 35 30">
                        <line x1="10" y1="5" x2="35" y2="5" stroke-width="1" stroke="#9f9fa6"/>
                        <line x1="10" y1="15" x2="35" y2="15" stroke-width="1" stroke="#9f9fa6"/>
                        <line x1="10" y1="25" x2="35" y2="25" stroke-width="1" stroke="#9f9fa6"/>
                    </svg>
                </div>
            </div>
        </div>
        <div v-show="false" class="full-screen">
            <div class="back-wrap">
                <div @click="back">
                    <svg width="8vw" height="8vw" viewbox="0 0 30 30">
                        <polyline points="10,5 0,15 10,25" stroke-width="2" stroke="#fff" fill="#666"/>
                        <line x1="0" y1="15" x2="25" y2="15" stroke-width="2" stroke="#fff"/>
                    </svg>
                </div>
                <p class="title">{{ info.name }}</p>
            </div>
            <img class="cover" :style="{'transform': coverTransform}" :src="info.cover" />
            <div class="progress-wrap">
                <span class="current-time">{{ currentTime }}</span>
                <div class="progress-bg">
                    <div class="progress" :style="{'width': progressWidth + 'vw'}"></div>
                </div>
                <span class="total-time">{{ totalTime }}</span>
            </div>
            <div class="btns-wrap">
                <svg width="16vw" height="16vw" viewbox="0 0 30 30" @click.stop="toggle">
                    <defs>
                        <g id="pause">
                            <line x1="12" y1="10" x2="12" y2="20" stroke-width="1" stroke="#fff"/>
                            <line x1="18" y1="10" x2="18" y2="20" stroke-width="1" stroke="#fff"/>
                        </g>
                        <g id="play">
                            <polygon points="12 10, 12 20, 18 15" stroke-width="1" stroke="#9f9fa6"/>
                        </g>
                    </defs>
                    <circle cx="15" cy="15" :r="r" stroke-width="1" stroke="#9f9fa6" fill="none"></circle>
                    <use :xlink:href="status"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
let audio = null
let radius = 14
let perimeter = Math.PI * 2 * radius
let timer = null

export default {
    data() {
        return {
            r: radius,
            strokeDasharray: `0 ${perimeter}`,
            status: '#play',
            fullScreen: false,
            currentTime: '00:00',
            totalTime: '00:00',
            progressWidth: 0,
            angle: 0
        }
    },

    computed: {
        info() {
            return this.$store.state.common.music
        },

        autoPlay() {
            return this.$store.state.common.autoPlay
        },

        coverTransform() {
            return `rotate(${this.angle}deg)`
        }
    },

    mounted() {
        const self = this
        audio = document.querySelector('#audio')
        audio.loop = true
        audio.addEventListener('timeupdate', self.updateProgress)
        audio.addEventListener('canplay', self.playMusic)
        this.setAudio()
    },

    beforeDestroy() {
        audio.removeEventListener('timeupdate', self.updateProgress)
        audio.addEventListener('canplay', self.playMusic)
    },

    methods: {
        setAudio() {
            if (!this.info.url) {
                return
            }
            audio.pause()
            this.strokeDasharray = `0 ${perimeter}`
            this.status = '#play'
            audio.src = this.info.url
        },

        toggle() {
            if (this.status === '#play') {
                audio.play()
                this.status = '#pause'
                this.totalTime = this.formatTime(audio.duration)
                this.animation()
            } else {
                audio.pause()
                this.status = '#play'
            }
        },

        updateProgress() {
            if (audio.duration) {
                this.currentTime = this.formatTime(audio.currentTime)
                let percent = audio.currentTime / audio.duration
                let len = perimeter * percent
                this.strokeDasharray = `${len} ${perimeter}`
                this.progressWidth = 68 * percent
            }
        },

        formatTime(time) {
            let s = Math.floor(time)
            let tenM = Math.floor(s / 600)
            let m = Math.floor((s - tenM * 600) / 60)
            let tenS = Math.floor((s - tenM * 600 - m * 60) / 10)
            let ss = s - tenM * 600 - m * 60 - tenS * 10
            return `${tenM}${m}:${tenS}${ss}`
        },

        playMusic() {
            if (this.autoPlay) {
                this.toggle()
            }
        },

        back() {
            this.fullScreen = false
        },

        openFullScreen() {
            this.fullScreen = true
        },

        animation() {
            clearInterval(timer)
            timer = setInterval(() => {
                this.angle++
            }, 100)
        }
    },

    watch: {
        info(newValue, oldValue) {
            if (newValue.url !== oldValue.url) {
                this.setAudio()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#audio {
    position: fixed;
    left: 0;
    top: -100vw;
}

.music-player {
    position: fixed;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 2vw 4vw 0 4vw;
    height: 14vw;
    background: #fff;
    box-shadow: 0px -1px 0px #eee;
    z-index: 10;
}

.bottom-player {

    .left {

        img {
            width: 10vw;
            height: 10vw;
            border-radius: 50%;
        }

        .music-info {
            display: inline-block;
            vertical-align: top;
            margin-left: 2vw;
            color: #9f9fa6;
            max-width: 57vw;

            p {
                width: 100%;
                font-size: 2vw;
                line-height: 5vw;
                height: 5vw;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .name {
                font-size: 2.5vw;
                font-weight: bold;
            }
        }
    }

    .right {
        position: absolute;
        right: 4vw;
        top: 3vw;

        .on-off-wrap {
            display: inline-block;
            vertical-align: top;
        }

        .list-wrap {
            display: inline-block;
            vertical-align: top;
        }
    }
}

.full-screen {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #666;
    text-align: center;
    color: #fff;
    z-index: 10000;

    .back-wrap {
        padding: 3vw 4vw;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        text-align: left;

        .title {
            height: 8vw;
            line-height: 8vw;
            font-size: 5vw;
            color: #fff;
            margin-left: 2vw;
        }
    }

    .cover {
        width: 50vw;
        height: 50vw;
        border-radius: 50%;
        padding: 10vw;
        background: #333;
        border: 2vw solid rgba(255, 255, 255, 0.5);
        margin-top: 10vh;
    }

    .progress-wrap {
        position: absolute;
        left: 0;
        bottom: 20vh;
        padding: 0 4vw;
        text-align: left;

        span {
            display: inline-block;
            vertical-align: top;
            width: 10vw;
            font-size: 1vw;
            line-height: 1vw;
        }

        .progress-bg {
            display: inline-block;
            vertical-align: top;
            box-sizing: border-box;
            width: 68vw;
            height: 1px;
            background: rgba(250, 235, 215, 0.5);
            margin: 0.5vw 2vw 0;

            .progress {
                display: inline-block;
                vertical-align: top;
                box-sizing: border-box;
                height: 1px;
                background: #fff;
                position: relative;
                width: 0;
            }

            .progress::after {
                position: absolute;
                content: '';
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background: #fff;
                top: -2px;
                right: 0;
            }
        }
    }

    .btns-wrap {
        position: absolute;
        left: 0;
        bottom: 0;
        box-sizing: border-box;
        width: 100vw;
        height: 20vh;
        padding: 0 4vw;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
}
</style>