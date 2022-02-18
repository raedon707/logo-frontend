import Axios from 'axios'

export default Axios.create({
  url: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
})
