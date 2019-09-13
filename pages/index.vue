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
              v-if="rating == 0"
              color="teal lighten-2"
              rounded
              outlined
              disabled= true
              ) こんな気分！
            v-btn.white--text.font-weight-bold(
              v-else
              color="teal lighten-2"
              @click="e6 = 2"
              rounded
              outlined
              ) こんな気分！

      v-stepper.pb-6(v-model="e6" vertical)
        v-stepper-step.py-2(:complete="e6 > 2" step="2") どれが好み？
        v-stepper-content.py-0.mx-0.px-0(step="2")
          v-layout.mx-0.my-2.py-4.px-0(row wrap justify-space-around)
            .fuwafuwa_1.btn-circle(@click="shuzoClick" v-bind:class='{shuzoClass:isActiveType01}') しゅうぞう
            .fuwafuwa_2.btn-circle(@click="izinClick" v-bind:class='{izinClass:isActiveType02}') いじん
            .fuwafuwa_3.btn-circle(@click="yuruClick" v-bind:class='{yuruClass:isActiveType03}') ゆるゆる
            .fuwafuwa_4.btn-circle(@click="iyashiClick" v-bind:class='{iyashiClass:isActiveType04}') いやし
            .fuwafuwa_5.btn-circle(@click="mentalClick" v-bind:class='{mentalClass:isActiveType05}') めんたる
          v-layout.my-3.pb-3(justify-center)
            v-btn(
              text
              @click="backStep1"
              ) もどる
            v-btn.white--text.font-weight-bold(
              v-if="type==0"
              color="teal lighten-2"
              outlined
              rounded
              disabled = true
              ) やる気スイッチON！
            v-btn.white--text.font-weight-bold(
              v-else
              color="teal lighten-2"
              @click="motivationSwitch()"
              outlined
              rounded
              disabled = false
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
        v-layout.py-2(
          justify-center
          )
          .famous-quotes-result-wrapper(id="result_to_image")
            .famous-quotes-result-content {{famousQuotesResult}}
        v-layout.mt-4.py-2(justify-center)
          v-btn.white--text.font-weight-bold(
            @click="twitterShare"
            large
            color="#00acee"
            rounded
            ) Twitterにシェア
        v-layout.py-2.px-10(justify-space-around)
          v-btn(small rounded @click="retry") もう一度
          a(
            href=""
            id="ss"
            download="モチベーションをあげる名言.png"
            )
            v-btn(small rounded) 画像をDL

    v-container.output_image_wrapper
      .html2canvas_test(id="output_image")


    //-v-layout.my-3.pb-3(justify-center)
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
import famousQuotesIzin from '~/static/famous_quotes_izin.json'
import famousQuotesYuru from '~/static/famous_quotes_yuru.json'
import famousQuotesIyashi from '~/static/famous_quotes_iyashi.json'
import famousQuotesMental from '~/static/famous_quotes_mental.json'
import html2canvas from 'html2canvas'

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
      rating: 0,
      type:0,
      isPushType : false,
      isActiveType01 : false,
      isActiveType02 : false,
      isActiveType03 : false,
      isActiveType04 : false,
      isActiveType05 : false,
      famous_quotes : '',
      famousQuotesResult: '',
      famousQuotesList : '',
      output: null,
    };
  },

  asyncData(context) {
    return {
      resultWaiting: false,
    }
  },

  asyncData ({ params }) {
    return {
      famousQuotesShuzo,
      famousQuotesIzin,
      famousQuotesYuru,
      famousQuotesIyashi,
      famousQuotesMental,
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
    //this.capturecanvas()
  },

  methods: {
    ...mapActions(['setLoading']),

    html2canvasCreate() {
        html2canvas(document.querySelector("#result_to_image")).then(function(canvas){
          var result = document.querySelector("#output_image");
  				result.innerHTML = '';
  				result.appendChild(canvas)
          var imgData = canvas.toDataURL();
          document.getElementById("ss").href = imgData;
        })
    },

    motivationSwitch(){
      this.e6 = 3;
      this.$store.commit("setLoading", true)
      this.result = true;
      var randNum = Math.floor(Math.random()*(5-1)+1);

      var rating = this.rating-1;
      console.log(rating);

      var famousType = this.type;

      switch( famousType ){
        case 1:
          switch( randNum ){
            case 1:
              this.famousQuotesResult = this.famousQuotesShuzo[rating].famous_1;
              console.log(this.famousQuotesShuzo[rating].famous_1);
              break;
            case 2:
              this.famousQuotesResult = this.famousQuotesShuzo[rating].famous_2;
              console.log(this.famousQuotesShuzo[rating].famous_2);
              break;
            case 3:
              this.famousQuotesResult = this.famousQuotesShuzo[rating].famous_3;
              console.log(this.famousQuotesShuzo[rating].famous_3);
              break;
            case 4:
              this.famousQuotesResult = this.famousQuotesShuzo[rating].famous_4;
              console.log(this.famousQuotesShuzo[rating].famous_4);
              break;
            case 5:
              this.famousQuotesResult = this.famousQuotesShuzo[rating].famous_5;
              console.log(this.famousQuotesShuzo[rating].famous_5);
              break;
            }
          break;

      case 2:
        switch( randNum ){
          case 1:
            this.famousQuotesResult = this.famousQuotesIzin[rating].famous_1;
            console.log(this.famousQuotesIzin[rating].famous_1);
            break;
          case 2:
            this.famousQuotesResult = this.famousQuotesIzin[rating].famous_2;
            console.log(this.famousQuotesIzin[rating].famous_2);
            break;
          case 3:
            this.famousQuotesResult = this.famousQuotesIzin[rating].famous_3;
            console.log(this.famousQuotesIzin[rating].famous_3);
            break;
          case 4:
            this.famousQuotesResult = this.famousQuotesIzin[rating].famous_4;
            console.log(this.famousQuotesIzin[rating].famous_4);
            break;
          case 5:
            this.famousQuotesResult = this.famousQuotesIzin[rating].famous_5;
            console.log(this.famousQuotesIzin[rating].famous_5);
            break;
          }
        break;

      case 3:
        switch( randNum ){
          case 1:
            this.famousQuotesResult = this.famousQuotesYuru[rating].famous_1;
            console.log(this.famousQuotesYuru[rating].famous_1);
            break;
          case 2:
            this.famousQuotesResult = this.famousQuotesYuru[rating].famous_2;
            console.log(this.famousQuotesYuru[rating].famous_2);
            break;
          case 3:
            this.famousQuotesResult = this.famousQuotesYuru[rating].famous_3;
            console.log(this.famousQuotesYuru[rating].famous_3);
            break;
          case 4:
            this.famousQuotesResult = this.famousQuotesYuru[rating].famous_4;
            console.log(this.famousQuotesYuru[rating].famous_4);
            break;
          case 5:
            this.famousQuotesResult = this.famousQuotesYuru[rating].famous_5;
            console.log(this.famousQuotesYuru[rating].famous_5);
            break;
          }
        break;

      case 4:
        switch( randNum ){
          case 1:
            this.famousQuotesResult = this.famousQuotesIyashi[rating].famous_1;
            console.log(this.famousQuotesIyashi[rating].famous_1);
            break;
          case 2:
            this.famousQuotesResult = this.famousQuotesIyashi[rating].famous_2;
            console.log(this.famousQuotesIyashi[rating].famous_2);
            break;
          case 3:
            this.famousQuotesResult = this.famousQuotesIyashi[rating].famous_3;
            console.log(this.famousQuotesIyashi[rating].famous_3);
            break;
          case 4:
            this.famousQuotesResult = this.famousQuotesIyashi[rating].famous_4;
            console.log(this.famousQuotesIyashi[rating].famous_4);
            break;
          case 5:
            this.famousQuotesResult = this.famousQuotesIyashi[rating].famous_5;
            console.log(this.famousQuotesIyashi[rating].famous_5);
            break;
          }
        break;

      case 5:
        switch( randNum ){
          case 1:
            this.famousQuotesResult = this.famousQuotesMental[rating].famous_1;
            console.log(this.famousQuotesMental[rating].famous_1);
            break;
          case 2:
            this.famousQuotesResult = this.famousQuotesMental[rating].famous_2;
            console.log(this.famousQuotesMental[rating].famous_2);
            break;
          case 3:
            this.famousQuotesResult = this.famousQuotesMental[rating].famous_3;
            console.log(this.famousQuotesMental[rating].famous_3);
            break;
          case 4:
            this.famousQuotesResult = this.famousQuotesMental[rating].famous_4;
            console.log(this.famousQuotesMental[rating].famous_4);
            break;
          case 5:
            this.famousQuotesResult = this.famousQuotesMental[rating].famous_5;
            console.log(this.famousQuotesMental[rating].famous_5);
            break;
          }
        break;
      }

      //ローディングうまくいかぬ
      console.log('ウェイティングなう')
      console.log(this.$store.state.loading)
      this.$store.commit("setLoading", false)
      console.log('ウェイティングおわり')
      console.log(this.$store.state.loading)

      this.$nextTick(() => {
        this.html2canvasCreate();
        console.log('canvasできた？')
        console.log(this.resultFilename)
      });
    },

    shuzoClick(){
      this.type = (this.type != 1) ? 1 : 0 ;

      this.isActiveType01 = !this.isActiveType01;
      this.isActiveType02 = false;
      this.isActiveType03 = false;
      this.isActiveType04 = false;
      this.isActiveType05 = false;
    },

    izinClick(){
      this.type = (this.type != 2) ? 2 : 0 ;
      this.isActiveType02 = !this.isActiveType02;
      this.isActiveType01 = false;
      this.isActiveType03 = false;
      this.isActiveType04 = false;
      this.isActiveType05 = false;
    },

    yuruClick(){
      this.type = (this.type != 3) ? 3 : 0 ;
      this.isActiveType03 = !this.isActiveType03;
      this.isActiveType01 = false;
      this.isActiveType02 = false;
      this.isActiveType04 = false;
      this.isActiveType05 = false;
    },

    iyashiClick(){
      this.type = (this.type != 4) ? 4 : 0 ;
      this.isActiveType04 = !this.isActiveType04;
      this.isActiveType01 = false;
      this.isActiveType02 = false;
      this.isActiveType03 = false;
      this.isActiveType05 = false;
    },

    mentalClick(){
      this.type = (this.type != 5) ? 5 : 0 ;
      this.isActiveType05 = !this.isActiveType05;
      this.isActiveType01 = false;
      this.isActiveType02 = false;
      this.isActiveType03 = false;
      this.isActiveType04 = false;
    },

    backStep1(){
      this.e6 = 1;
      this.isActiveType01 = false;
      this.isActiveType02 = false;
      this.isActiveType03 = false;
      this.isActiveType04 = false;
      this.isActiveType05 = false;
      this.type = 0;
    },

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
      this.isActiveType01 = false;
      this.isActiveType02 = false;
      this.isActiveType03 = false;
      this.isActiveType04 = false;
      this.isActiveType05 = false;
      this.type = 0;
      this.rating = 0;
      this.isActiveType01 = false;
      this.isActiveType02 = false;
      this.isActiveType03 = false;
      this.isActiveType04 = false;
      this.isActiveType05 = false;
      this.type = 0;
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
    },
  }

}
</script>

<style>

.famous-quotes-result-wrapper{
  display: flex;
  align-items: center;
  text-align: center;
  font-weight: bold;
  width: 600px;
  height: 315px;
  word-break: normal;
  padding: 20px 30px;
  background-image: url("../assets/concrete.png");
  background-color: transparent;
  background-size:cover;
  z-index: 1000;
  border: solid 4px #4271C9;
}

.famous-quotes-result-content{
  flex: 1;
  font-size: 1.2rem;
  line-height: 2.5rem;
  letter-spacing: 0.2rem;
  color: #black;
  text-shadow: 1px 1px 2px silver;
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

.btn-circle.shuzoClass,
.btn-circle.izinClass,
.btn-circle.iyashiClass,
.btn-circle.yuruClass,
.btn-circle.mentalClass {
  background-image: none;
  background-color: #709dff;
}

.btn-circle:hover {
  cursor: pointer;
  opacity: 0.8;
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

#ss{
  text-decoration: none;
}

.output_image_wrapper{
  display:none;
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

  .famous-quotes-result-wrapper{
    width: 90vw;
    height: 47.3vw;
  }

  .famous-quotes-result-content{
    font-size: 1.0rem;
    line-height: 2.0rem;
    letter-spacing: 0.2rem;
  }

}

@media screen and (max-width: 480px) {

  .famous-quotes-result-content{
    font-size: 0.7rem;
    line-height: 1.4rem;
    letter-spacing: 0.15rem;
  }
}

@media screen and (max-width: 348px) {
  .btn-circle{
    width: 75px;
    height: 75px;
    line-height: 75px;
    font-size: 12px;
  }

  .famous-quotes-result-content{
    font-size: 0.6rem;
    line-height: 1.2rem;
    letter-spacing: 0.1rem;
  }
}

</style>
