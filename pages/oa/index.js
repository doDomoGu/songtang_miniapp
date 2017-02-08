// pages/oa/index.js
var app = getApp();
Page({
  data:{
      username:'',
      name:'',
      user_id:''
  },
  onLoad:function(options){
    app.common();
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
      app.checkLogin();
      this.setData({
          username :wx.getStorageSync('username'),
          name : wx.getStorageSync('name'),
          user_id :wx.getStorageSync('user_id')
      });
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})