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