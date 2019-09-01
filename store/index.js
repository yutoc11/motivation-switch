import Vue from 'vue'
import Vuex from 'vuex'

export const strict = false

export const state = () => ({
  loading: false,
})

export const mutations = {
  setLoading(state, payload){
    state.loading = payload
  }
}

export const actions = {
  setLoading ({ commit }, payload) {
    commit('setLoading', payload)
  }
}
