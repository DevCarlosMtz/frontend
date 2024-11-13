const INITIAL_STATE = {
  activo: false,
}

/**
 * State
 */
export const state = () => ({
  data: INITIAL_STATE,
})

/**
 * Actions
 */
export const actions = {
  reset({ commit }) {
    commit('setData', INITIAL_STATE)
  },
  open({ commit }) {
    commit('mutOpen')
  },
  close({ commit }) {
    commit('mutClose')
  },
}

/**
 * Getters
 */
export const getters = {
  getData(state) {
    return state?.data
  },
}

/**
 * Mutations
 */
export const mutations = {
  mutSetData(state, objectData) {
    state.data = objectData
  },
  mutOpen(state) {
    state.data.activo = true
  },
  mutClose(state) {
    state.data.activo = false
  },
}
