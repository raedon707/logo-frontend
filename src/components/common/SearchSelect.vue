<template>
  <v-select
    :items="tempItems"
    :label="label"
    :item-text="itemText"
    :item-value="itemValue"
    item-disabled="isDeleted"
    dense
    outlined
    cache-items
    clearable
    @input="changeLabel"
  >
    <template v-slot:prepend-item>
      <v-list-item>
        <v-list-item-content>
          <v-text-field
            v-model="searchTerm"
            placeholder="Search Sports"
            append-icon="mdi-magnify"
            @input="searchItems">
          </v-text-field>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>
    </template>
  </v-select>
</template>

<script>
export default {
  name: 'Home',
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    },
    label: {
      type: String,
      default: 'Default label'
    },
    itemText: {
      type: String,
      default: 'Item text'
    },
    itemValue: {
      type: String,
      default: 'Item value'
    }
  },
  data () {
    return {
      searchTerm: '',
      tempItems: this.items
    }
  },
  watch: {
    items: {
      handler () {
        this.tempItems = this.items
      },
      deep: true
    }
  },
  methods: {
    changeLabel (event) {
      this.$emit('item-selected', { id: event, type: this.label })
    },
    searchItems () {
      this.tempItems = this.tempItems.filter(item => {
        return item[this.itemText].toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
      })
    }
  }
}
</script>

<style scoped>
.v-toolbar__content {
  display: inline-flex !important;
}
.v-select {
  padding: 20px !important;
  padding-left: 0 !important;
}
</style>
