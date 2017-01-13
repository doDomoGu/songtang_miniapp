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
      var code;
      //var encryptedData;
      //var iv;
      var wx_login_session = wx.getStorageSync('wx_login_session_key')
      if(wx_login_session!=''){
        console.log(wx_login_session)
      }else{
  //调用登录接口
        wx.login({
          success: function (res) {
            console.log(res);
            code = res.code;
            



            wx.getUserInfo({
              success: function (res) {
                that.globalData.userInfo = res.userInfo
                //console.log(res);
                //encryptedData = res.encryptedData;
                //iv = res.iv;
                typeof cb == "function" && cb(that.globalData.userInfo)

                wx.request({
              url: that.globalData.requestHost+"/ucenter/login/index", //仅为示例，并非真实的接口地址
              method: "POST",
              data: {
                code : code,
                //encryptedData :encryptedData,
                //iv: iv
              },
              header: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              success: function(res) {
                console.log(res.data)
                if(res.data.result=='success'){

  //                  if(wx_login_session!=''){
  // console.log(wx_login_session);
  //                  }else{
   wx.setStorageSync('wx_login_session_key',res.data.session_key);
  //                  }
                  
                // 
                }else{
                  console.log(res.data.msg);
                }
              }
            })
              }
            })

            
          }
        })
      }
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