<template lang="pug">
  section.section
    v-container
      p テスト
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
import uuid from 'uuid'

export default {

  head() {
    return {
      title:'モチベーションスイッチ',
      titleTemplate: ''
    }
  }

}
</script>

<style>


</style>
