<template>
  <SportTable/>
</template>

<script>
import SportTable from '@/components/tables/SportTable.vue'

export default {
  name: 'Sports',
  components: {
    SportTable
  }
}
</script>

<style scoped>
.v-data-table {
  margin: 50px !important;
}
</style>
