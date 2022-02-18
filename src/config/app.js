export default {
  env: process.env.NODE_ENV || 'development',
  log_level: process.env.LOG_LEVEL || 'debug',
  aws_s3_icons_bucket_url: process.env.VUE_APP_S3_ICONS_BUCKET_URL || 'https://s3.amazonaws.com/icons-frontend-icons'
}
