<template lang="pug">
  v-app
    v-toolbar.white--text(dense color="teal lighten-2")
      v-toolbar-title
        nuxt-link.header-link.white--text.font-weight-bold(to="/") モチベーションスイッチ

    v-content
      v-container
        nuxt/

    v-footer.white--text(color="teal lighten-2")
      v-layout.font-weight-bold(
        color="teal lighten-2"
        text-xs-center
        white--text
        xs12
        justify-center
        )  &copy;2019 — モチベーションスイッチ
</template>

<script>
//import firebase from '@/plugins/firebase'
//import store from '~/store/index.js'
//import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
    }
  },

  asyncData () {
    return {
    }
  },

  computed: {
  },

  methods: {
  }


}
</script>

<style>
header{
  max-height: 50px;
}

body,
main,
.v-content__wrap{
  background-image: url("../assets/background.jpg");
  background-repeat : repeat;
}

.v-content__wrap::before{
  /* 透過した黒を上から重ねるイメージ */
  /* background-color: rgba(255,255,255,0.4); */
  /* 自由に位置指定 */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  content: ' ';
}

.header-link{
  text-decoration: none;
}
</style>
