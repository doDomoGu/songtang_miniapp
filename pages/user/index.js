// pages/user/index.js
var app = getApp();
Page({
  data : {
     ucenterUserInfo:null
  },
  onLoad:function(options){
    
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
      wx.login({
          success: function(res) {
              console.log(res);
              var code = res.code;
              wx.request({
                  url: getApp().globalData.requestHost+'/user/wx-code-to-session',
                  data:{code:res.code},
                  header: {
                      'content-type': 'application/json'
                  },
                  success: function(res2) {
                      console.log('login');
                      console.log(res2.data.wx_code_to_session_response.result.session_key);
                      wx.getUserInfo({
                          success: function (res) {
                              console.log(res);
                              wx.request({
                                  url: getApp().globalData.requestHost+'/user/wx-encrypted-data',
                                  data:{
                                      session_key:res2.data.wx_code_to_session_response.result.session_key,
                                      encryptedData:res.encryptedData,
                                      iv:res.iv
                                  },
                                  header: {
                                      'content-type': 'application/json'
                                  },
                                  success: function(res2) {
                                      console.log(res2);
                                  }
                              })

                              // if (res.code) {
                              //     console.log(res);
                              //
                              //     //发起网络请求
                              //   /!*wx.request({
                              //    url: 'https://test.com/onLogin',
                              //    data: {
                              //    code: res.code
                              //    }
                              //    })*!/
                              // } else {
                              //     console.log('获取用户登录态失败！' + res.errMsg)
                              // }
                          }
                      })
                  }
              })


          }
      });



      // wx.checkSession({
      //     success: function () {
      //         //登录态未过期
      //         wx.login({
      //             success: function (res) {
      //                 wx.request({
      //                     url: getApp().globalData.requestHost + '/user/wx-code-to-session', //仅为示例，并非真实的接口地址
      //                     data: {code: res.code},
      //                     header: {
      //                         'content-type': 'application/json'
      //                     },
      //                     success: function (res2) {
      //                         console.log('checksession');
      //                         console.log(res2.data.wx_code_to_session_response.result);
      //                     }
      //                 })
      //             }
      //         })
      //
      //     },
      //     fail: function () {
      //     }
      // })

      /*wx.checkSession({
          success: function(){
              //登录态未过期
              wx.login({
                  success: function (res) {
                      wx.request({
                          url: getApp().globalData.requestHost+'/user/wx-code-to-session', //仅为示例，并非真实的接口地址
                          data:{code:res.code},
                          header: {
                              'content-type': 'application/json'
                          },
                          success: function(res2) {
                              console.log(res2);
                          }
                      })
                  }
              })

          },
          fail: function(){
              //登录态过期
              wx.login({
                  success: function() {
                      wx.getUserInfo({
                          success: function (res) {
                              console.log(res);

                              // if (res.code) {
                              //     console.log(res);
                              //
                              //     //发起网络请求
                              //   /!*wx.request({
                              //    url: 'https://test.com/onLogin',
                              //    data: {
                              //    code: res.code
                              //    }
                              //    })*!/
                              // } else {
                              //     console.log('获取用户登录态失败！' + res.errMsg)
                              // }
                          }
                      })

                  }
              });
          }
      })*/




      // var that = this;

      // wx.checkSession({
      //     success: function(){
      //         console.log(222);
      //         //登录态未过期
      //     },
      //     fail: function(){
      //         console.log(333)
      //         //登录态过期
      //         wx.login()
      //     }
      // })



      // app.getUcenterUserInfo(function(ucenterUserInfo){
      //       that.setData({
      //         ucenterUserInfo:ucenterUserInfo
      //       })
      //     }
      // )

    //app.getUserInfo();
    //console.log(this);
    //this.data.userInfo = getApp().globalData.userInfo
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
});