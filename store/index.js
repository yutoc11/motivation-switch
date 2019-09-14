import Vue from 'vue'
import Vuex from 'vuex'

export const strict = false

export const state = () => ({
  loading: false,
  resultImage: null,
})

export const mutations = {
  setLoading(state, payload){
    state.loading = payload
  },
  setresultImage(state, payload){
    state.resultImage = payload
  }
}

export const actions = {

  setLoading ({ commit }, payload) {
    commit('setLoading', payload)
  },

  setresultImage(state, payload){
    state.resultImage = payload
  },
}
