<template>
  <div>
    <v-text-field
      v-model="search"
      label="Buscar"
      type="search"
      prepend-inner-icon="mdi-magnify"
      class="search-input mt-4 mb-3"
      clearable
      single-line
      hide-details
    />
    <v-data-table
      :loading="loading"
      :search="search"
      :headers="headers"
      :items="items"
      :items-per-page="itemsPerPage"
      loading-text="Cargando información..."
      no-data-text="No hay información"
      :no-results-text="
        `No se encontraron resultados con la busqueda: ${search}`
      "
      :header-props="{
        sortByText: 'Ordenar por',
      }"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
        'items-per-page-text': 'Datos por página',
        'items-per-page-all-text': 'Todos',
        'page-text': '{0}-{1} de {2}',
      }"
    >
      <template v-for="(slot, name) in $scopedSlots" v-slot:[name]="item">
        <slot :name="name" v-bind="item"></slot>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "Datatable",
  props: {
    loading: false,
    headers: null,
    items: null,
  },
  data: () => ({
    search: "",
    itemsPerPage: 10,
  }),
};
</script>

<style scoped>
.search-input {
  width: 450px;
  margin-left: auto;
  margin-right: 0;
}
</style>
