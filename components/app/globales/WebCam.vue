<template>
  <div :ot="ot" :tipo_imagen="tipo_imagen" :disk="disk">
    <v-btn small fab icon @click="toggleCamera()">
      <v-icon> mdi-camera </v-icon>
    </v-btn>

    <div class="text-center">
      <v-dialog persistent v-model="dialog" max-width="450">
        <v-card>
          <v-toolbar color="primary" flat>
            <v-toolbar-title class="text-h5">
              <v-icon color="white" left>mdi-camera</v-icon>
              <span class="white--text">Tomar foto</span>
            </v-toolbar-title>
          </v-toolbar>

          <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box" :class="{ flash: isShotPhoto }">
            <div class="camera-shutter" :class="{ flash: isShotPhoto }"></div>


            <video v-show="!isPhotoTaken" ref="camera" :width="450" :height="337.5" autoplay />

            <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="450" :height="337.5"></canvas>
          </div>

          <div v-if="isCameraOpen && !isLoading" class="text-center d-flex align-center justify-space-around">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon @click="takePhoto">
                  <v-icon v-if="!isPhotoTaken" x-large v-bind="attrs" v-on="on">
                    mdi-camera-iris
                  </v-icon>
                  <v-icon v-else x-large v-bind="attrs" v-on="on">
                    mdi-camera-off-outline
                  </v-icon>
                </v-btn>
              </template>
              <span v-if="!isPhotoTaken">Tomar Fotografía</span>
              <span v-else>Eliminar Fotografía</span>
            </v-tooltip>
          </div>
          <v-divider class="my-3" />

          <div class="text-right pa-2">
            <v-btn color="error" @click="toggleCamera">
              <span>Cancelar</span>
              <v-icon right>mdi-close-thick</v-icon>
            </v-btn>
            <v-btn :disabled="!isPhotoTaken || !isCameraOpen" color="primary" @click="guardarFoto()">
              <span>Guardar</span>
              <v-icon right>mdi-content-save</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { dataURIToBlob } from '~/helpers/Methods'
import vForm from 'vform'
import InputTextReadOnly from '~/components/app/globales/InputTextReadOnly.vue'

export default {
  props: {
    ot: {
      type: String,
    },
    tipo_imagen: {
      type: String,
    },
    disk: {
      type: String,
    },
  },
  components: {
    InputTextReadOnly,
  },
  data: () => ({
    isCameraOpen: false,
    isPhotoTaken: false,
    isShotPhoto: false,
    isLoading: false,
    link: '#',
    dialog: false,
    errors: [],

    form: new vForm({
      ot: '',
      fotos: '',
      tipo_imagen: '',
      disk: ''
    }),
  }),

  methods: {
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false
        this.isPhotoTaken = false
        this.isShotPhoto = false
        this.stopCameraStream()
        this.dialog = false
      } else {
        this.dialog = true
        this.isCameraOpen = true
        this.createCameraElement()
      }
    },

    createCameraElement() {
      this.isLoading = true

      const constraints = (window.constraints = {
        audio: false,
        video: true,
      })

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.$refs.camera.srcObject = stream
        })
        .catch((error) => {
          this.$store.dispatch('ui/dialogAlert/open', {
            type: 'error',
            text: 'Puede que el navegador no sea compatible o haya algunos errores.',
          })
        })

      this.isLoading = false
    },

    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks()

      tracks.forEach((track) => {
        track.stop()
      })
    },

    takePhoto() {
      if (!this.isPhotoTaken) {
        this.isShotPhoto = true

        const FLASH_TIMEOUT = 50

        setTimeout(() => {
          this.isShotPhoto = false
        }, FLASH_TIMEOUT)
      }

      this.isPhotoTaken = !this.isPhotoTaken

      const context = this.$refs.canvas.getContext('2d')
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5)

      const canvas = document
        .getElementById('photoTaken')
        .toDataURL('image/png')
      //.replace("image/jpeg", "image/octet-stream");
      this.form.fotos = canvas
    },

    async guardarFoto() {
      this.$store.dispatch('ui/dialogLoader/open')

      try {
        this.errors = []

        //Crear un formData para enviar los datos
        let formData = new FormData()

        // Agregamos el ot, tipo de imagen y el disco al formData
        formData.append('ot', this.form.ot)
        formData.append('tipo_imagen', this.form.tipo_imagen)
        formData.append('disk', this.form.disk)

        // Convertimos la imagen a blob
        let foto = dataURIToBlob(this.form.fotos)

        //Numero aleatorio para evitar que se sobreescriba la foto
        let random = Math.floor(Math.random() * 1000000)

        //Agregamos el filelist al formData
        formData.append('fotos[]', foto, `foto_${random}.jpg`)

        //Enviamos los datos al servidor
        await this.$services.galeria.store(formData)

        //Cerramos el dialogo
        this.toggleCamera()

      } catch (error) {
        console.error('Error: guardarFoto()', error)
        this.errors = error?.api?.validationErrors || []
      }

      this.$store.dispatch('ui/dialogLoader/close')
    },
  },

  created() {
    this.form.ot = this.ot
    this.form.tipo_imagen = this.tipo_imagen
    this.form.disk = this.disk
  },
}
</script>
