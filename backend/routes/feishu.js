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
  // 鉴权实现  自建应用获取 tenant_access_token
  let address = 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal'
  let res = yield axios.post(address, {
    app_id,
    app_secret,
  })

  // 获取jsapi_ticket票据
  let result = yield axios.post(
    'https://open.feishu.cn/open-apis/jssdk/ticket/get',
    {},
    {
      headers: {
        Authorization: `Bearer ${res.data.tenant_access_token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
    }
  )
  let timestamp = new Date().getTime()
  let nonceStr = randomString(16)

  // 签名生成规则
  // 将所有待签名参数按照字段名的 ASCII 码从小到大排序（字典序）后，使用 URL 键值对的格式，即key1=value1&key2=value2…拼接成字符串 verifyStr，对拼成的字符串 verifyStr 做 sha1 加密，得到签名 signature

  
  // 出于安全考虑，开发者必须在服务器端实现签名的逻辑。
  // 拼接字符串 verifyStr 的所有参数名均为小写字符。
  // 字段名和字段值都采用原始值，不进行 URL 转义

  // 根据 jsapi_ticket、noncestr、timestamp、url 的顺序拼接成字符串 verifyStr
  let verifyStr = `jsapi_ticket=${result.data.data.ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
  
  // 签名规则加密 verifyStr 进行 sha1 签名，得到 signature
  let hash = crypto.createHash('sha1')
  hash.update(verifyStr)
  let signature = hash.digest('hex')
  this.body = {
    signature,
    appId: app_id,
    nonceStr,
    timestamp,
  }
})

module.exports = router
