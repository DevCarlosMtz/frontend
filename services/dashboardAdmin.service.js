import { objectToFormData } from '~/helpers/Methods'

/**
 * URL del servicio
 *
 * @type {string}
 */
const URL = '/dashboard-administrador'

export default ($axios) => {
  return {

    /**
     * Obtiene la cantidad de OTs en Proceso
     *
     * @param {Object} objectShow
     */
    async show(objectShow) {
      return await $axios.get(`${URL}/show`, {
        params: objectShow,
      })
    },

    /**
     * Obtiene las OTs en Proceso
     * @param {Object} objectShow
     */
    async showDetalleOtProceso(objectShow) {
      return await $axios.get(`${URL}/showDetalleOtProceso`, {
        params: objectShow,
      })
    },

    /**
     * Obtiene la cantidad de OTs en Revision
     *
     * @param {Object} objectShowRevision
     */
    async showRevision(objectShowRevision) {
      return await $axios.get(`${URL}/showOtRevision`, {
        params: objectShowRevision,
      })
    },

    /**
     * Obtiene las OTs en Revision
     * @param {Object} objectShow
     *
    */
    async showDetalleOtRevision(objectShow) {
      return await $axios.get(`${URL}/showDetalleOtRevision`, {
        params: objectShow,
      })
    },


    /**
     * Obtiene la cantidad de OTs en Finalizadas
     *
     * @param {Object} objectShowFinalizadas
     */
    async showFinalizadas(objectShowFinalizadas) {
      return await $axios.get(`${URL}/showOtFinalizadas`, {
        params: objectShowFinalizadas,
      })
    },
/**
 * Obtiene las OTs en Finalizadas
 *
 * @param {Object} objectShow
 */
    async showOtDetalleFinalizadas(objectShow) {
      return await $axios.get(`${URL}/showOtDetalleFinalizadas`, {
        params: objectShow,
      })
    },
    /**
     * Obtiene la cantidad de OTs Pendientes
     *
     * @param {Object} objectShow
     */
    async showPendientes(objectShowPendientes) {
      return await $axios.get(`${URL}/showOtPendientes`, {
        params: objectShowPendientes,
      })
    },
    /**
     * Obtiene las OTs Pendientes
     *
     * @param {Object} objectShow
     */
    async showDetalleOtPendientes(objectShow) {
      return await $axios.get(`${URL}/showOtDetallePendientes`, {
        params: objectShow,
      })
    },
    /**
     * Obtiene el porcentaje de OTs Finalizadas
     *
     * @param {Object} objectShowPorcentaje
     */
    async showPorcentaje(objectShowPorcentaje) {
      return await $axios.get(`${URL}/showOtPorcentajeCumplimiento`, {
        params: objectShowPorcentaje,
      })
    },
    /**
     * Obtiene los Estatus de las OTs
     *
     * @param {Object} objectShowEstatus
     */
    async showEstatus(objectShowEstatus) {
      return await $axios.get(`${URL}/showOrdenesEstatus`, {
        params: objectShowEstatus,
      })
    },

  }
}
