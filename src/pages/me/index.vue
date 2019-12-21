<template>
    <div class="page-me">
        <c-header></c-header>
    </div>
</template>

<script>
import CHeader from '@com/c-header.vue'

export default {
    asyncData ({ store, route }) {
        store.commit('common/setHeader', 'me')
    },

    components: {
        CHeader
    }
}
</script>