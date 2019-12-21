import Api from '@api/home'

export default {
    namespaced: true,

    state: () => ({
        banner: [],
        recMusicList: [],
        recMusic: []
    }),

    mutations: {
        setBanner(state, data) {
            state.banner = data
        },

        setRecMusicList(state, data) {
            state.recMusicList = data
        },

        setRecMusic(state, data) {
            state.recMusic = data
        }
    },

    actions: {
        getBanner({commit}, params) {
            return Api.getBanner().then(res => {
                commit('setBanner', res.data.banners)
            })
        },

        getRecMusicList({commit}, params) {
            return Api.getRecMusicList(params).then(res => {
                commit('setRecMusicList', res.data.result.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        cover: item.picUrl
                    }
                }))
            })
        },

        getRecMusic({commit}, params) {
            return Api.getRecMusic().then(res => {
                if (res.data.result.length > 6) {
                    res.data.result.splice(6)
                }
                commit('setRecMusic', res.data.result.map(item => {
                    return {
                        id: item.id,
                        cover: item.song.album.picUrl,
                        name: item.name,
                        singer: item.song.artists[0].name
                    }
                }))
            })
        },
    },
}