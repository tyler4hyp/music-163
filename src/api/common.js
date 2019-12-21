import { domain } from './domain'
const axios = require('axios');

export default {
    getMusicInfo(id) {
        return axios.get(`${domain}/song/detail?ids=${id}`)
    },

    getMusicRes(id) {
        return axios.get(`${domain}/song/url?id=${id}`)
    }
}