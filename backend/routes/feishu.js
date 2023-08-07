const router = require('koa-router')()
const lark = require('@larksuiteoapi/node-sdk')
const axios = require('axios')
const crypto = require('crypto')
// const CryptoJS = require('crypto-js')
const app_id = 'cli_a4324e02edf9500d'
const app_secret = 'KXuK9MuYvkfPIRlubWPWLgNCCPCdDtqM'


const randomString = (e) => {
  e = e || 32
  let t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length,
    n = ''
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}

router.prefix('/feishu')

router.get('/', function* (next) {
  this.body = 'this is a fei111111shu!'
})

router.get('/tenant/token', function* (next) {
  const url = this.query.url
  // let address = 'https://open.feishu.cn/open-apis/authen/v1/access_token'
  let address = 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal'
  // app_access_token
  let res = yield axios.post(address, {
    app_id,
    app_secret,
  })


  let result = yield axios.post(
    'https://open.feishu.cn/open-apis/jssdk/ticket/get',
    {},
    {
      headers: {
        Authorization: `Bearer ${res.data.tenant_access_token}`,
        // Authorization: `Bearer ${res.data.app_access_token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
    }
  )
  let timestamp = new Date().getTime()
  // let nonceStr = 'Y7a8KkqX041bsSwT'
  let nonceStr = randomString(16)

  let verifyStr = `jsapi_ticket=${result.data.data.ticket}=&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
  console.log('verifyStr',verifyStr);
  let hash = crypto.createHash('sha1')
  hash.update(verifyStr)
  let signature = hash.digest('hex')
  // let signature = CryptoJS.SHA1(verifyStr).toString(CryptoJS.enc.Hex)
  // this.body = result.data
  console.log('signature',signature);
  this.body = {
    // jsapi_ticket: result.ticket,
    signature,
    appId: app_id,
    nonceStr,
    timestamp,
    // jsapi_ticket: result.data.ticket
  }
})

module.exports = router
