<template>
  <div class="wrapper">
    123456{{userid}}
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Axios from '../../request/request'
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
      ...mapMutations(['setUserid']),
      async getUrl() {
        let getresult =  await Axios('/api/meta/getsubareas?areaid=33&isarea=0', {lala: 123}, '', 'true', 'true');
        console.log(getresult)
      },

    },
    created () {
      this.setUserid('888');
      this.getUrl();
      
    },
    mounted () {

    }
  }
</script>
<style scoped>

</style>