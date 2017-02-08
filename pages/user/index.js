// pages/user/index.js
var app = getApp();
Page({
    data : {
        ucenterUserInfo:'',
        username:'',
        name:'',
        user_id:''
    },
    onLoad:function(options){

    // 页面初始化 options为页面跳转所带来的参数
    },
    onReady:function(){
    // 页面渲染完成
    },

    onShow:function(){
        app.checkLogin();
        this.setData({
            username :wx.getStorageSync('username'),
            name : wx.getStorageSync('name'),
            user_id :wx.getStorageSync('user_id')
        });
      // wx.login({
      //     success: function(res) {
      //         console.log(res);
      //         var code = res.code;
      //         wx.request({
      //             url: getApp().globalData.requestHost+'/user/wx-code-to-session',
      //             data:{code:res.code},
      //             header: {
      //                 'content-type': 'application/json'
      //             },
      //             success: function(res2) {
      //                 console.log('login');
      //                 console.log(res2.data.wx_code_to_session_response.result.session_key);
      //                 wx.getUserInfo({
      //                     success: function (res) {
      //                         console.log(res);
      //                         wx.request({
      //                             url: getApp().globalData.requestHost+'/user/wx-encrypted-data',
      //                             data:{
      //                                 session_key:res2.data.wx_code_to_session_response.result.session_key,
      //                                 encryptedData:res.encryptedData,
      //                                 iv:res.iv
      //                             },
      //                             header: {
      //                                 'content-type': 'application/json'
      //                             },
      //                             success: function(res2) {
      //                                 console.log(res2);
      //                             }
      //                         })
      //
      //                         // if (res.code) {
      //                         //     console.log(res);
      //                         //
      //                         //     //发起网络请求
      //                         //   /!*wx.request({
      //                         //    url: 'https://test.com/onLogin',
      //                         //    data: {
      //                         //    code: res.code
      //                         //    }
      //                         //    })*!/
      //                         // } else {
      //                         //     console.log('获取用户登录态失败！' + res.errMsg)
      //                         // }
      //                     }
      //                 })
      //             }
      //         })
      //
      //
      //     }
      // });



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




      // wx.checkSession({
      //     success: function(){
      //         //登录态未过期  微信服务端Session已存在
      //         /*var logs = wx.getStorageSync('logs') || []
      //          logs.unshift(Date.now())
      //          wx.setStorageSync('logs', logs)*/
      //
      //         wx.login({
      //             success: function (res) {
      //                 wx.getUserInfo({
      //                     success: function (res2) {
      //                         console.log(res2);
      //                     }
      //                 });
      //
      //                 wx.request({
      //                     url: getApp().globalData.requestHost+'/user/wx-code-to-session',
      //                     data:{code:res.code},
      //                     header: {
      //                         'content-type': 'application/json'
      //                     },
      //                     success: function(res3) {
      //                         console.log(res3);
      //                     }
      //                 })
      //             }
      //         })
      //
      //     },
      //     fail: function(){
      //         //登录态过期
      //         wx.login({
      //             success: function() {
      //                 wx.getUserInfo({
      //                     success: function (res) {
      //                         console.log(res);
      //
      //                         // if (res.code) {
      //                         //     console.log(res);
      //                         //
      //                         //     //发起网络请求
      //                         //   /*wx.request({
      //                         //    url: 'https://test.com/onLogin',
      //                         //    data: {
      //                         //    code: res.code
      //                         //    }
      //                         //    })*/
      //                         // } else {
      //                         //     console.log('获取用户登录态失败！' + res.errMsg)
      //                         // }
      //                     }
      //                 })
      //
      //             }
      //         });
      //     }
      // })




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
    },
    unbindUcenter:function(){
        wx.request({
            url: app.globalData.requestHost+'/user/wx-unbind-user',
            data:{user_id:wx.getStorageSync('user_id'),session_3rd:wx.getStorageSync('session_3rd')},
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                if(res.data.wx_unbind_user_response){
                    wx.setStorageSync('ucenterUserInfo', null);
                    wx.setStorageSync('username', '');
                    wx.setStorageSync('name',  '');
                    wx.setStorageSync('user_id','');
                    wx.showToast({
                        title: '解绑成功',
                        icon: 'success',
                        duration: 2000
                    });
                    setTimeout(function(){
                        wx.navigateTo({
                            url: '../index/index'
                        })
                    },2000);
                }else{
                    console.log(res.data.error_response.msg);
                }
            }
        })
    }
});