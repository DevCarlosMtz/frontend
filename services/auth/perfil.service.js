/**
 * URL del servicio
 *
 * @type {string}
 */
const URL = '/auth/perfil'

/**
 * Recorre un objeto y lo convierte en un formData
 *
 * @param {Object} object
 * @returns {FormData}
 */
const objectToFormData = (object) => {
  const FORM_DATA = new FormData()

  for (const key in object) {
    FORM_DATA.append(key, object[key])
  }

  return FORM_DATA
}

export default ($axios) => {
  return {
    /**
     * Actualiza el perfil
     *
     * @param {Object} objectUpdate
     * @returns {Promise}
     */
    async actualizar(objectUpdate) {
      objectUpdate = {
        _method: 'PUT',
        ...objectUpdate,
      }

      let formData = objectToFormData(objectUpdate)
      return await $axios.post(`${URL}`, formData)
    },
  }
}
