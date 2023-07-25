import './App.css'
import { useEffect, useState } from 'react'
import TransportLayer from './resquest'

function App() {
  let [networkQualityType, setNetworkQualityType] = useState('')
  let [networkType, setNetworkType] = useState('')
  useEffect(() => {
    if (window.h5sdk) {
      TransportLayer.getTicket().then((res) => {
        window.h5sdk.config({
          appId: res.appId,
          timestamp: res.timestamp,
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: ['tt.getSystemInfo', 'tt.getNetworkType', 'tt.getScreenBrightness','tt.scanCode'],
          // jsApiList: [],
          //鉴权成功回调
          onSuccess: (res) => {
            // setT(JSON.stringify(res))
            console.log(`config success: ${JSON.stringify(res)}`)
          },
          //鉴权失败回调
          onFail: (err) => {
            console.log('err', err)
            // throw `config failed: ${JSON.stringify(err)}`
          },
        })
        window.h5sdk.ready(() => {
          tt.getNetworkType({
            success(res) {
              setNetworkType(res.networkType)
            },
            fail(res) {
              console.log(`getNetworkType fail: ${JSON.stringify(res)}`)
            },
          })

          // tt.getScreenBrightness({
          //   success(res) {
          //     console.log('getScreenBrightness', JSON.stringify(res))
          //   },
          //   fail(res) {
          //     console.log(`getScreenBrightness fail: ${JSON.stringify(res)}`)
          //   },
          // })

          // tt.showModal({
          //   title: '提示',
          //   content: '当前飞书版本过低，无法使用该功能，请升级到最新飞书版本后重试。'
          // })
          tt.scanCode({
            // barCodeInput: true,
            success(res) {
              console.log(JSON.stringify(res))
            },
            fail(res) {
              console.log(`scanCode fail: ${JSON.stringify(res)}`)
            },
          })
          // tt.getNetworkQualityType({
          //   success(res) {
          //     console.log(44444);
          //     setNetworkQualityType(res.networkQualityType)
          //     // console.log(JSON.stringify(res));
          //   },
          //   fail(res) {
          //     console.log(66666);
          //     console.log(`getNetworkQualityType fail: ${JSON.stringify(res)}`)
          //   },
          // })
          // // console.log(window.tt.onNetworkQualityChange)
          // tt.onNetworkQualityChange((res) => {
          //   console.log('rerere', res)
          //   setNetworkQualityType(res.networkQualityType)
          // })
        })
      })
    }
  }, [])
  //
  return (
    <div className="App">
      <div>状态:{networkType}</div>
      <div>质量:{networkQualityType}</div>
    </div>
  )
}

export default App
