import Api from '@api/musics'

export default {
    namespaced: true,

    state: () => ({
        info: {},
        list: []
    }),

    mutations: {
        setInfo(state, data) {
            state.info = data
        },

        setList(state, data) {
            state.list = data
        }
    },

    actions: {
        getMusicsDetail({commit}, id) {
            return Api.getMusicsDetail(id).then(res => {
                let d = res.data.playlist
                commit('setInfo', {
                    cover: d.coverImgUrl,
                    name: d.name,
                    avatar: d.creator.avatarUrl,
                    creator: d.creator.nickname,
                    desc: d.description
                })
                commit('setList', d.tracks.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        singer: item.ar[0].name
                    }
                }))
            })
        }
    }
}