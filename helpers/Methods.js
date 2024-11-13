/**
 * Recorre un objeto y lo convierte en un formData
 *
 * @param {Object|FormData} object
 * @param {String} method
 * @returns {FormData}
 */
export function objectToFormData(object, method) {
  // Si el parámetro object es un formData, lo retornamos
  if (object instanceof FormData) {
    return object
  }

  // Creamos el formData
  const FORM_DATA = new FormData()

  //Si llega el parámetro method lo agregamos al objeto
  if (method) {
    object = {
      _method: method,
      ...object,
    }
  }

  // Recorremos el objeto
  for (const key in object) {
    // Si el valor es un array, lo recorremos y lo agregamos al formData
    if (Array.isArray(object[key])) {
      object[key].forEach((value) => {
        FORM_DATA.append(`${key}[]`, value)
      })
    } else {
      FORM_DATA.append(key, object[key])
    }
  }

  return FORM_DATA
}

/**
 * Data URI a blob
 *
 * @param {String} base64Data
 * @param {String} contentType
 * @returns {Blob}
 */
export function dataURIToBlob(dataURI) {
  const splitDataURI = dataURI.split(',')
  const byteString =
    splitDataURI[0].indexOf('base64') >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i)

  return new Blob([ia], { type: mimeString })
}
