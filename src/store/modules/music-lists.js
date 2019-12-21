import Api from '@api/music-lists'
import HomeApi from '@api/home'

export default {
    namespaced: true,

    state: () => ({
        list: []
    }),

    mutations: {
        setList(state, data) {
            state.list = data
        },

        addItems(state, data) {
            Array.prototype.push.apply(state.list, data)
        }
    },

    actions: {
        getHQMusicLists({commit}, params) {
            let reset = params.reset
            delete params.reset
            return Api.getHQMusicLists(params).then(res => {
                let data = res.data.playlists.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        cover: item.coverImgUrl
                    }
                })
                if (reset) {
                    commit('setList', data)
                } else {
                    commit('addItems', data)
                }
            })
        },

        getRecMusicList({commit}, params) {
            let reset = params.reset
            delete params.reset
            return HomeApi.getRecMusicList(params).then(res => {
                let data = res.data.result.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        cover: item.picUrl
                    }
                })
                if (reset) {
                    commit('setList', data)
                } else {
                    commit('addItems', data)
                }
            })
        },

        getMusicListsByTag({commit}, params) {
            let reset = params.reset
            delete params.reset
            return Api.getMusicListsByTag(params).then(res => {
                let data = res.data.playlists.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        cover: item.coverImgUrl
                    }
                })
                if (reset) {
                    commit('setList', data)
                } else {
                    commit('addItems', data)
                }
            })
        }
    }
}