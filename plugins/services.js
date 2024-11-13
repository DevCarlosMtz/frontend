import empresasService from '~/services/empresas.service'
import perfilesService from '~/services/perfiles.service'
import puestosService from '~/services/puestos.service'
import usuariosService from '~/services/usuarios.service'
import galeriaService from '~/services/galeria.service'
import authPerfilService from '~/services/auth/perfil.service'
import permisosService from '~/services/permisos.service'
import dashboardAdminService from '~/services/dashboardAdmin.service'

export default ({ $axios }, inject) => {
  const services = {
    auth: {
      perfil: authPerfilService($axios),
    },

    usuarios: usuariosService($axios),
    empresas: empresasService($axios),
    perfiles: perfilesService($axios),
    puestos: puestosService($axios),
    galeria: galeriaService($axios),
    permisos: permisosService($axios),
    dashboardAdmin: dashboardAdminService($axios),

  }

  inject('services', services)
}
