// const CracoLessPlugin = require('craco-less')
const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  // babel: {
  //   plugins: [
  //     //第一个 style 为 true ,需要配置 craco-less一起才能生效
  //     ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  //   ],
  // },
  // plugins: [
  //   {
  //     plugin: CracoLessPlugin,
  //     options: {
  //       lessLoaderOptions: {
  //         lessOptions: {
  //           javascriptEnabled: true,
  //           modifyVars: {
  //             '@primary-color': '#2462F2',
  //             '@text-color-secondary': 'rgba(68,81,95,0.65)',
  //             '@text-color': '#44515F',
  //             '@disabled-color': 'rgba(68,81,95,0.45)',
  //             'border-color-base': '#e8e8e8',
  //             'border-radius-base': '8px',
  //           },
  //         },
  //       },
  //     },
  //   },
  // ],
  devServer: {
    proxy: {
      "/feishu": {
        target: 'http://localhost:4000/',
        changeOrigin: true,
      }
    }
  }
}
