var app = getApp();
Page({
  data:{
      task_array:[],
      task_index:0,
      task_id:0
  },
  onLoad:function(options){
      var that = this;
      wx.request({
          url: app.globalData.requestHost + '/oa/apply-getall',
          data: {user_id: wx.getStorageSync('user_id')},
          header: {
              'content-type': 'application/json'
          },
          success: function (res) {
              console.log(res);
              /*if(res.data.apply_get_all_response){
                  that.setData({
                      'task_array':res.data.task_get_all_response.list
                  })
              }*/
          }
      })
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