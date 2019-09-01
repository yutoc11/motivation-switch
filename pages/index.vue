<template lang="pug">
  section.section
    v-container
      v-stepper.pb-6(v-model="e6" vertical)
        v-stepper-step.py-2(:complete="e6 > 1" step="1") 正直、今の気分は？
        v-stepper-content.py-0.mx-0.px-0(step="1")
          v-card(
            color="grey lighten-1" height="200px"
            )
          v-layout.my-3.pb-3(justify-center)
            v-btn.white--text.font-weight-bold(
              color="teal lighten-2"
              @click="e6 = 2"
              rounded
              outlined
              ) こんな気分！
          
      v-stepper.pb-6(v-model="e6" vertical)
        v-stepper-step.py-2(:complete="e6 > 2" step="2") どれが好み？
        v-stepper-content.py-0.mx-0.px-0(step="2")
          v-card(
            color="grey lighten-1" height="200px"
            )
          v-layout.my-3.pb-3(justify-center)
            v-btn(
              text
              @click="e6 = 1"
              ) もどる
            v-btn.white--text.font-weight-bold(
              color="teal lighten-2"
              @click="motivationSwitch()"
              outlined
              rounded
              ) やる気スイッチON！
              
    v-container(v-if="result")
      v-container(v-show="$store.state.loading")
        v-progress-linear(
          indeterminate
          rounded
          height="6"
          )
        p.caption あなたにピッタリな名言を検索中
      
      v-container
        v-layout.py-2(justify-center)
          .famous-quotes-result ここに結果が入ります
        v-layout.py-2(justify-center)
          v-btn.white--text.font-weight-bold(
            @click="twitterShare"
            large
            color="#00acee"
            rounded) Twitterにシェア
        v-layout.py-2(justify-center)
          v-btn(rounded @click="retry") もう一度
          v-btn.ml-5(rounded @click="imagegDownload") 画像をDL  
          
</template>

<script>
//import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {

  head() {
    return {
      title:'モチベーションスイッチ',
      titleTemplate: ''
    }
  },

  data () {
    return {
      title: 'トップ',
      e6: 1,
      result: false,
    };
  },

  asyncData(context) {
    return {
      resultWaiting: false,
    }
  },
  
  watch: {
    
  },

  components: {
  },

  computed: {
    ...mapState(['loading']),
  },

  created: function(){
  },

  mounted: function () {

  },

  methods: {
    ...mapActions(['setLoading']),
    
    motivationSwitch(){
      this.e6 = 3;
      this.$store.commit("setLoading", true)
      this.result = true;
      
      //ローディングうまくいかぬ
      console.log('ウェイティングなう')
      console.log(this.$store.state.loading)
      this.$store.commit("setLoading", false)
      console.log('ウェイティングおわり')
      console.log(this.$store.state.loading)
    },
    
    twitterShare(){
      
    },
    
    retry(){
      this.e6= 1;
      this.result = false;
    },
    
    imagegDownload(){
      
    },
    
    sleep(a){
      var dt1 = new Date().getTime();
      var dt2 = new Date().getTime();
      while (dt2 < dt1 + a){
        dt2 = new Date().getTime();
      }
      return;
    }
    
  }
}
</script>

<style>

.famous-quotes-result{
  background-color: #999999;
  text-align: center;
  line-height: 315px;
  color: #fff;
  font-weight: bold;
  width: 600px;
  height: 315px
}

@media screen and (max-width: 700px) {
  .famous-quotes-result{
    width: 80vw;
    height: 42vw;
    line-height: 42vw;
  }
}
  
</style>
