<template>
  <div class="upload">
    <Snackbar :snackbarText="snackbarText" :snackbarType="snackbarType" :random="snackbarRandom"/>
    <v-file-input
      accept="image/*"
      label="Upload Icon"
      @change="setIcon"
    ></v-file-input>
    <v-btn
      :loading="loading"
      :disabled="loading"
      color="blue-grey"
      class="ma-2 white--text"
      @click="submitIcon(item)"
    >
      <v-icon dark>
        mdi-cloud-upload
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { SNACKBAR_TYPE } from '../../common/constants'
import Snackbar from '@/components/common/Snackbar.vue'
import { mapActions } from 'vuex'

export default {
  name: 'FileUpload',
  props: {
    item: Object,
    type: String
  },
  data () {
    return {
      snackbarText: '',
      snackbarType: '',
      snackbarRandom: '',
      loading: false
    }
  },
  components: {
    Snackbar
  },
  methods: {
    ...mapActions(['uploadIcon']),
    async submitIcon (item) {
      this.loading = true
      if (item.file) {
        let isIconUploaded = false
        try {
          await this.uploadIcon({ item: this.item, uploadType: this.type })
          isIconUploaded = true
          this.snackbarText = 'File uploaded successfully'
          this.snackbarType = SNACKBAR_TYPE.SUCCESS.text
        } catch (error) {
          isIconUploaded = false
          this.snackbarText = error.message
          this.snackbarType = SNACKBAR_TYPE.ERROR.text
        }
        this.$emit('file-uploaded', isIconUploaded)
      } else {
        this.snackbarText = 'Please select a file'
        this.snackbarType = SNACKBAR_TYPE.ERROR.text
      }

      this.loading = false
      this.snackbarRandom = String(+new Date())
    },
    setIcon (file) {
      file ? this.item.file = file : delete this.item.file
    }
  }
}
</script>

<style scoped>
.upload {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
