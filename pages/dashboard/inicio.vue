<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">¡Bienvenido!</h5>
      <p class="card-text">Te doy la bienvenida a mi aplicación, es mi examen práctico. ¡Espero que tengas una excelente experiencia!</p>
    </div>
  </div>
</template>

<script>
import vForm from 'vform'

export default {
  layout: 'dashboard',
  middleware: 'auth',

  head: () => ({
    title: 'Inicio',
  }),

  components: {
  
  }
}
</script>
