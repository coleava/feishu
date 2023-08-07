import axios from 'axios'

class TransportLayer {
  constructor(token) {
    this.client = axios.create()
    this.client.interceptors.request.use((cfg) => {
      let url = new URL(window.location.href)
      let originValue = `${url.origin}/feishu/`
      cfg.baseURL = originValue

      // if (token) {
      //   cfg.headers = _.assign(cfg.headers, { Authorization: `Bearer ${token}` })
      // }
      return cfg
    })

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          Cookies.remove('device_token')
        }
        return Promise.reject(error)
      }
    )
  }

  async getTicket(){
    let url = encodeURIComponent(location.href.split('#')[0])
    let result = await this.client.get(`/tenant/token?url=${url}`);
    return result.data
  }
}

export default new TransportLayer()
