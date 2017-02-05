//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
      // wx.login({
      //     success: function() {
      //         wx.getUserInfo({
      //           success: function (res) {
      //               console.log(res);
      //
      //               // if (res.code) {
      //               //     console.log(res);
      //               //
      //               //     //发起网络请求
      //               //   /*wx.request({
      //               //    url: 'https://test.com/onLogin',
      //               //    data: {
      //               //    code: res.code
      //               //    }
      //               //    })*/
      //               // } else {
      //               //     console.log('获取用户登录态失败！' + res.errMsg)
      //               // }
      //           }
      //         })
      //
      //     }
      // });


    //console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo222(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
    
    // wx.request({
    //   url: getApp().globalData.requestHost+'/site/sdadsadsa', //仅为示例，并非真实的接口地址
    //   data:{},
    //   header: {





    //       'content-type': 'application/json'
    //   },



    //   success: function(res) {
    //     console.log(res)
    //   }
    // })

  }
})
