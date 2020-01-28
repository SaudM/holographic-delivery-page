<template>
  <div class="wrapper">
    123456{{userid}}
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
  export default {
    data () {
      return {

      }
    },
    components: {},
    props: [],
    watch: {

    },
    computed: {
      ...mapState(['userid'])

    },
    methods: {
      ...mapMutations(['setUserid'])

    },
    created () {
      this.setUserid('888')
    },
    mounted () {

    }
  }
</script>
<style scoped>

</style>