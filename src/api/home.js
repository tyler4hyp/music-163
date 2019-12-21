import { domain } from './domain'
const axios = require('axios');

export default {
    getBanner() {
        return axios.get(`${domain}/banner?type=1`)
    },

    getRecMusicList(params) {
        return axios.get(`${domain}/personalized`, {
            params
        })
    },

    getRecMusic() {
        return axios.get(`${domain}/personalized/newsong`)
    }
}