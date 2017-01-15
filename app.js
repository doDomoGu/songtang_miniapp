//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    /*var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)*/
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    requestHost:"http://api.localsongtang.net",
    //requestHost:"https://api.songtang.net",
    appid : "wxfeb4bdcd2e97f17b",
    appsecret : "558f4d98ab4a03e9ccb5e20270806436",
  }
})