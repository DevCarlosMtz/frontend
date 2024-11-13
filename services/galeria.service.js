import { objectToFormData } from '~/helpers/Methods'

/**
 * URL del servicio
 *
 * @type {string}
 */
//const URL = '/galeria'
const URL ='/galeria'

export default ($axios) => {
  return {
    /**
     * Obtiene una lista de items
     *
     * @returns {Promise}
     */
    async index(objectIndex) {
      return await $axios.get(`${URL}`, {
        params: objectIndex,
      })
    },
    /**
     * Crea un item
     *
     * @param {Object} objectStore
     * @returns {Promise}
     */
    async store(objectStore) {
      let formData = objectToFormData(objectStore)
      return await $axios.post(`${URL}`, formData)
    },

    /**
     * Actualiza un item
     *
     * @param {Object} objectUpdate
     * @returns {Promise}
     */
    async update(objectUpdate) {
      objectUpdate = {
        _method: 'PUT',
        ...objectUpdate,
      }

      let formData = objectToFormData(objectUpdate)
      return await $axios.post(`${URL}`, formData)
    },

    /**
     * Elimina un item
     *
     * @param {Object} objectDestroy
     * @returns {Promise}
     */
    async destroy(objectDestroy) {
      objectDestroy = {
        _method: 'DELETE',
        ...objectDestroy,
      }

      let formData = objectToFormData(objectDestroy)
      return await $axios.post(`${URL}`, formData)
    },
    async showGalery(objectShowOt) {
      return await $axios.get(`${URL}/galery`, {
        params: objectShowOt,
      })
    },

  }
}