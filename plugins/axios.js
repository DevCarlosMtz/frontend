export default function ({ $axios, store }) {
  // Captura de respuesta exitosa
  $axios.onResponse((response) => {
    if (response?.data?.message) {
      store?.dispatch('ui/dialogAlert/open', {
        type: 'success',
        text: response?.data?.message || 'Operación realizada con éxito',
      })
    }

    if (response?.data?.data) {
      return response.data.data
    }

    return response
  })

  // Captura de respuesta con error
  $axios.onError((error) => {
    if (error?.response?.data?.message) {
      store?.dispatch('ui/dialogAlert/open', {
        type: 'error',
        text: error?.response?.data?.message || 'Error en la operación',
      })
    }

    let apiErrors = {}

    if (error?.response?.data?.data?.validation === true) {
      apiErrors = {
        ...apiErrors,
        validationErrors: error?.response?.data?.data?.errors || [],
      }
    }

    throw {
      api: apiErrors,
      response: error?.response || {},
    }
  })
}
