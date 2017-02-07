//app.js
App({
  onLaunch: function () {
      




    //调用API从本地缓存中获取数据
    /*var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)*/
    //console.log(11);
  },
  common:function(){
    // console.log('common start');
    // console.log(getApp().globalData.userInfo);
    // console.log('common end');
  },
  getUcenterUserInfo:function(cb){
      var that = this
      if(this.globalData.ucenterUserInfo){
          typeof cb == "function" && cb(this.globalData.ucenterUserInfo)
      }else{
          wx.request({
              url: getApp().globalData.requestHost+'/user/info-get', //仅为示例，并非真实的接口地址
              data:{id:10000},
              header: {
                  'content-type': 'application/json'
              },
              success: function(res) {
                  if(res.data.user_get_response){
                      that.globalData.ucenterUserInfo = res.data.user_get_response.info;
                      typeof cb == "function" && cb(that.globalData.ucenterUserInfo)
                  }else{
                      console.log(res.data.error_response.msg);
                  }
              }
          })
      }

  },
    checkUcenterLogin:function(){
        wx.navigateTo({
            url: '../user/login'
        })
    },
    checkLogin:function(){
        var that = this;
        wx.login({
            success: function (res) {
                //console.log(res);
                // wx.getUserInfo({
                //     success: function (res2) {
                //         console.log(res2);
                //     }/*,
                //     fail:function (res32){
                //         console.log('userinfo fail');
                //         console.log(res32);
                //     }*/
                // });
                var session_3rd = wx.getStorageSync('session_3rd');
                //查看session_3rd是否存在
                if(session_3rd!=''){
                    //查看user_id是否存在
                    var user_id = wx.getStorageSync('user_id');
                    if(user_id!=''){
                        wx.setStorageSync('ucenterUserInfo', {
                            username :wx.getStorageSync('username'),
                            name : wx.getStorageSync('name'),
                            user_id :user_id
                        });

                    }else{
                        //不存在 转去职员账号登录页面
                        that.checkUcenterLogin();
                    }
                }else{
                    //不存在，使用code 去获取openid session_key  最后返回3rd_session
                    wx.request({
                        url: that.globalData.requestHost+'/user/wx-get-3rd-session',
                        data:{code:res.code},
                        header: {
                            'content-type': 'application/json'
                        },
                        success: function(res) {
                            session_3rd = res.data.wx_get_3rd_session_response.result.session_3rd;
                            wx.setStorageSync('session_3rd', session_3rd);
                            that.checkUcenterLogin();
                        }
                    })
                }
            }
        })
    },

  // getUserInfo222:function(cb){
  //   var that = this
  //   if(this.globalData.userInfo){
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   }else{
  //     //调用登录接口
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             that.globalData.userInfo = res.userInfo
  //             typeof cb == "function" && cb(that.globalData.userInfo)
  //           }
  //         })
  //       }
  //     })
  //   }
  // },
  globalData:{
    userInfo:null,
    ucenterUserInfo:null,
    requestHost:"http://api.localsongtang.net",
    //requestHost:"https://api.songtang.net",
    appid : "wxfeb4bdcd2e97f17b",
    appsecret : "558f4d98ab4a03e9ccb5e20270806436",
  }
})