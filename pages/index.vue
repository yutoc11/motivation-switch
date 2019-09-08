<template lang="pug">
  section.section
    v-container
      v-stepper.pb-6(v-model="e6" vertical)
        v-stepper-step.py-2(:complete="e6 > 1" step="1") 今のモチベーションは？
        v-stepper-content.rating-section.py-0.mx-0.px-0(step="1")
          v-layout.rating-wrapper.py-4(justify-center)
            v-rating(
              v-model="rating"
              length=5
              empty-icon="mdi-heart-outline"
              full-icon="mdi-heart"
              hover=true
              size=50
              dense=true
              color="red lighten-3"
              background-color="red lighten-3"
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
          v-layout.mx-0.my-2.py-4.px-0(row wrap justify-space-around)
            .fuwafuwa_1.btn-circle しゅうぞう
            .fuwafuwa_2.btn-circle いじん
            .fuwafuwa_3.btn-circle ゆるゆる
            .fuwafuwa_4.btn-circle いやし
            .fuwafuwa_5.btn-circle めんたる
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
          
    v-layout.my-3.pb-3(justify-center)
      v-btn(
        text
        @click="testJSON"
        ) JSONテスト
      ul(v-if="displayJSON")
        li(v-for="(famousQuotes, index) in famousQuotesShuzo" v-bind:key="famaousQuotes.motivation_level") LEVEL：{{famousQuotes.motivation_level}}名言1：{{famousQuotes.famous_1}}名言2：{{famousQuotes.famous_2}}名言3：{{famousQuotes.famous_3}}名言4：{{famousQuotes.famous_4}}名言5：{{famousQuotes.famous_5}}
          
</template>

<script>
import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'
import famousQuotesShuzo from '~/static/famous_quotes_shuzo.json'

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
      displayJSON: false,
      famaousQuotes: '',
      motivation_level: '',
    };
  },

  asyncData(context) {
    return {
      resultWaiting: false,
    }
  },
  
  asyncData ({ params }) {
    return {
      famousQuotesShuzo
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
    
    // getJSON(){
    //   this.$axios.$get('../static/famous_quotes_shuzo.json').then(function(response){
    //     //完了したらfamaousQuotesに代入
    //     this.famous_quotes_shuzo = response.data
    //   }.bind(this)).catch(function(e){
    //     console.error(e)
    //   })
    // },
    
    testJSON(){
      this.displayJSON = true;
      console.log('テストJSONなう')
      console.log(this.famousQuotesShuzo);
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

.fuwafuwa_1 {
  animation: fuwafuwa_1 2.5s infinite;
}

.fuwafuwa_2{
  animation: fuwafuwa_2 4s infinite;
}

.fuwafuwa_3{
  animation: fuwafuwa_3 5s infinite;
}

.fuwafuwa_4{
  animation: fuwafuwa_4 3.5s infinite;
}

.fuwafuwa_5{
  animation: fuwafuwa_5 4.5s infinite;
}

.btn-circle {
  display: inline-block;
  margin-bottom: 10px;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  width: 150px;
  height: 150px;
  line-height: 150px;
  border-radius: 50%;
  text-align: center;
  overflow: hidden;
  background-image: linear-gradient(45deg, #709dff 0%, #91fdb7 100%);
  transition: .4s;
}

.btn-circle:hover {
  cursor: pointer;
}

.rating-section{
  position:relative;
}

.rating-wrapper::before{
  content:'◀︎やる気皆無';
  display: block;
  font-size: 0.6rem;
  color: #999;
  position: absolute;
  top:7px;
  left:20%;
}

.rating-wrapper::after{
  content:'やる気MAX！▶︎';
  display: block;
  font-size: 0.6rem;
  color: #999;
  position: absolute;
  top:7px;
  right:20%;
}

@keyframes fuwafuwa_1 {
  0% { transform:translateX(0px); }
  50% { transform:translateX(5px) translateY(5px); }
  100% { transform:translateX(  0px); }
}

@keyframes fuwafuwa_2 {
  0% { transform:translateY(0px); }
  50% { transform:translateY(5px); }
  100% { transform:translateY(  0px); }
}

@keyframes fuwafuwa_3 {
  0% { transform:translateY(0px); }
  50% { transform:translateY(5px) translateX(-5px); }
  100% { transform:translateY(  0px); }
}

@keyframes fuwafuwa_4 {
  0% { transform:translateY(0px); }
  50% { transform:translateY(-2px) translateX(-5px); }
  100% { transform:translateY(  0px); }
}

@keyframes fuwafuwa_5 {
  0% { transform:translateY(0px); }
  50% { transform:translateY(-5px) translateX(5px); }
  100% { transform:translateY(  0px); }
}

@media screen and (max-width: 700px) {
  .famous-quotes-result{
    width: 80vw;
    height: 42vw;
    line-height: 42vw;
  }
  
  .btn-circle{
    width: 100px;
    height: 100px;
    line-height: 100px;
    font-size: 14px;
  }
  
  .rating-wrapper::before{
    left:30px;
  }
  
  .rating-wrapper::after{
    right: 30px;
  }
  
}

@media screen and (max-width: 348px) {
  .btn-circle{
    width: 75px;
    height: 75px;
    line-height: 75px;
    font-size: 12px;
  }
}
  
</style>
