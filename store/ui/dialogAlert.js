const INITIAL_STATE = {
  activo: false,
  type: 'warning',
  text: 'No se ha definido el texto del mensaje',
}

/**
 * State
 */
export const state = () => ({
  data: INITIAL_STATE
})

/**
 * Actions
 */
export const actions = {
  reset({ commit }) {
    commit('mutSetData', INITIAL_STATE)
  },
  open({ commit }, object) {
    commit('mutSetData', {
      activo: true,
      ...object,
    })
  },
  close({ commit }) {
    commit('mutClose')
  }
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
  mutClose(state) {
    state.data.activo = false
  }
}
