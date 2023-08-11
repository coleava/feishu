import './App.css'
import { useEffect, useState } from 'react'
import TransportLayer from './resquest'

function App() {
  let [networkQualityType, setNetworkQualityType] = useState('')
  let [networkType, setNetworkType] = useState('')
  let [n, setN] = useState(0)
  let [scanResult, setScanResult] = useState('')

  useEffect(() => {
    if (window.h5sdk) {
      TransportLayer.getTicket().then((res) => {
        setN(1)
        window.h5sdk.config({
          appId: res.appId,
          timestamp: res.timestamp,
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: ['tt.getSystemInfo', 'tt.getNetworkType', 'tt.getScreenBrightness', 'tt.scanCode', 'tt.startBeaconDiscovery'],
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
          tt.getUserInfo({
            // getUserInfo API 调用成功回调
            success(res) {
              console.log(`getUserInfo success: ${JSON.stringify(res)}`)
              // 单独定义的函数showUser，用于将用户信息展示在前端页面上
              // showUser(res.userInfo)
            },
            // getUserInfo API 调用失败回调
            fail(err) {
              console.log(`getUserInfo failed, err:`, JSON.stringify(err))
            },
          })
          tt.getNetworkType({
            success(res) {
              setNetworkType(res.networkType)
            },
            fail(res) {
              console.log(`getNetworkType fail: ${JSON.stringify(res)}`)
            },
          })

          tt.startLocationUpdate({
            type: 'gcj02',
            success(res) {
              console.log('startLocationUpdate', JSON.stringify(res))
              tt.startBeaconDiscovery({
                uuids: ['FDA50693-A4E2-4FB1-AFCF-C6EB07647825'],
                // ignoreBluetoothAvailable: true,
                success(res) {
              
                },
                fail(res) {
                  console.log(`startBeaconDiscovery fail: ${JSON.stringify(res)}`)
                },
              })
              tt.getBeacons({
                success(res) {
                  console.log('beacon', JSON.stringify(res))
                },
                fail(res) {
                  console.log(`getBeacons fail: ${JSON.stringify(res)}`)
                },
              })
            },
            fail(res) {
              console.log(`startLocationUpdate fail: ${JSON.stringify(res)}`)
            },
          })

          tt.scanCode({
            barCodeInput: true,
            success(res) {
              setScanResult(res.result)
              console.log('scan',JSON.stringify(res))
            },
            fail(res) {
              console.log(`scanCode fail: ${JSON.stringify(res)}`)
            },
          })

          tt.getNetworkQualityType({
            success(res) {
              setNetworkQualityType(res.networkQualityType)
              // console.log(JSON.stringify(res));
            },
            fail(res) {
              console.log(`getNetworkQualityType fail: ${JSON.stringify(res)}`)
            },
          })
          // console.log(window.tt.onNetworkQualityChange)
          tt.onNetworkQualityChange((res) => {
            console.log('rerere', res)
            setNetworkQualityType(res.networkQualityType)
          })
        })
      })
    }
  }, [])

  //
  return (
    <div className="App">
      <div>状态:{networkType}</div>
      <div>质量:{networkQualityType}</div>
      <div>扫码结果:{scanResult}</div>
    </div>
  )
}

export default App
