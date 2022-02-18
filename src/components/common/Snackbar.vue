<template>
  <v-snackbar
      v-model="showSnackBar"
      :timeout="2000"
      :color="snackbarColor"
      text
      top
      elevation="2"
      @input="reset"
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbarColor"
          text
          v-bind="attrs"
          @click="reset"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
import { SNACKBAR_TYPE } from '../../common/constants'

export default {
  name: 'Snackbar',
  props: {
    random: {
      type: String,
      default: ''
    },
    snackbarType: {
      type: String,
      default: 'success'
    },
    snackbarText: {
      type: String,
      default: ''
    }
  },
  watch: {
    random: {
      handler: function (val) {
        if (this.snackbarType === SNACKBAR_TYPE.SUCCESS.text) {
          this.snackbarColor = SNACKBAR_TYPE.SUCCESS.value
        } else if (this.snackbarType === SNACKBAR_TYPE.ERROR.text) {
          this.snackbarColor = SNACKBAR_TYPE.ERROR.value
        }

        this.showSnackBar = true
      }
    }
  },
  data: () => ({
    showSnackBar: false,
    snackbarColor: 'success'
  }),
  methods: {
    reset () {
      this.showSnackBar = false
    }
  }
}
</script>
