import { domain } from './domain'
const axios = require('axios');

export default {
    getHQMusicLists(params) {
        return axios.get(`${domain}/top/playlist/highquality`, {
            params
        })
    },

    getMusicListsByTag(params) {
        return axios.get(`${domain}/top/playlist`, {
            params
        })
    }
}