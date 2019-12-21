import { domain } from './domain'
const axios = require('axios');

export default {
    getMusicsDetail(id) {
        return axios.get(`${domain}/playlist/detail?id=${id}`)
    }
}