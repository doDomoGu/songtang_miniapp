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
      var that = this;
      wx.checkSession({
          success: function(){
              console.log(222);
              //登录态未过期
          },
          fail: function(){
              console.log(333)
              //登录态过期
              wx.login()
          }
      })



      app.getUcenterUserInfo(function(ucenterUserInfo){
            that.setData({
              ucenterUserInfo:ucenterUserInfo
            })
          }
      )

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