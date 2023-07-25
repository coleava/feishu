Page({
  data: {
    networkType: '',
    networkQualityType: '',
    status: '',
    scanResult:""
  },
  a() {
    let _this = this
    tt.getNetworkQualityType({
      success(res) {
        console.log(JSON.stringify(res));
        _this.setData({ networkQualityType: res.networkQualityType })
      },
      fail(res) {
        console.log(`getNetworkQualityType fail: ${JSON.stringify(res)}`);
      }
    });
  },
  b() {
    let _this = this
    tt.getNetworkType({
      success(res) {
        console.log(JSON.stringify(res));
        _this.setData({ networkType: res.networkType })

      },
      fail(res) {
        console.log(`getNetworkType fail: ${JSON.stringify(res)}`);
      }
    });
  },
  c() {
    let _this = this
    tt.scanCode({
      scanType: [
        "barCode",
        "qrCode",
        "datamatrix",
        "pdf417"
      ],
      barCodeInput: true,
      success(res) {
        console.log(JSON.stringify(res));
        _this.setData({scanResult: res.result})
      },
      fail(res) {
        console.log(`scanCode fail: ${JSON.stringify(res)}`);
      }
    });
  },
  onLoad: function () {
    // console.log('Welcome to Mini Code')
  },
  onShow: function () {
    let _this = this
    // tt.scanCode({
    //   scanType: [
    //     "barCode",
    //     "qrCode",
    //     "datamatrix",
    //     "pdf417"
    //   ],
    //   barCodeInput: true,
    //   success(res) {
    //     console.log(JSON.stringify(res));
    //   },
    //   fail(res) {
    //     console.log(`scanCode fail: ${JSON.stringify(res)}`);
    //   }
    // });
    tt.onNetworkStatusChange(function (res) {
      _this.setData({ status: res.networkType })
      console.log(JSON.stringify(res));
    });

    tt.onNetworkQualityChange(function (res) {
      console.log(1111, JSON.stringify(res));
      _this.setData({ networkQualityType: res.networkQualityType })

    });
  }
})
