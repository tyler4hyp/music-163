import Api from '@api/common'

export default {
    namespaced: true,

    state: () => ({
        header: 'home',
        music: {},
        autoPlay: false,
        initID: 432698441
    }),

    mutations: {
        setHeader(state, data) {
            state.header = data
        },

        setMusic(state, data) {
            state.music = data
        },

        setAutoPlay(state, data) {
            state.autoPlay = data
        }
    },
    actions: {
        getMusic({commit}, id) {
            return Promise.all([
                Api.getMusicInfo(id),
                Api.getMusicRes(id)
            ]).then(res => {
                commit('setMusic', {
                    cover: res[0].data.songs[0].al.picUrl,
                    name: res[0].data.songs[0].name,
                    singer: res[0].data.songs[0].ar[0].name,
                    url: res[1].data.data[0].url
                })
            })
        }
    }
}