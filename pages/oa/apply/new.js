// pages/oa/index.js
var app = getApp();
Page({
  data:{
      task_array:[],
      task_index:0,
      task_id:1,
      task_title:'',
      task_message:''
  },

    bindTaskPickerChange: function(e) {
        this.setData({
            task_index: e.detail.value,
            task_id:this.data.task_array[e.detail.value].id
        });
    },
    bindTitleInput: function(e) {
        this.setData({
            task_title: e.detail.value
        })
    },
    bindMessageInput: function(e) {
        this.setData({
            task_message: e.detail.value
        })
    },
    bindFormSubmit: function(){
        var that = this;
        wx.request({
            url: app.globalData.requestHost + '/oa/apply-create',
            data: {
                title:that.data.task_title,
                task_id:that.data.task_id,
                message:that.data.task_message,
                session_3rd:wx.getStorageSync('session_3rd')
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                if(res.data.apply_create_response){
                    wx.showToast({
                        title: '提交成功',
                        icon: 'success',
                        duration: 2000,
                        mask:true
                    });
                    setTimeout(function(){
                        wx.redirectTo({
                            url : 'oa/apply/my'
                        })
                    },2000)
                }else{
                    wx.showToast({
                        title: '提交失败，返回重试',
                        icon: 'fail',
                        duration: 2000,
                        mask:true
                    });
                    setTimeout(function(){
                        wx.redirectTo({
                            url : 'oa/apply/new'
                        })
                    },2000)
                }
            }
        })
    },
  onLoad:function(options){
      var that = this;
      wx.request({
          url: app.globalData.requestHost + '/oa/task-getall',
          data: {apply_user: wx.getStorageSync('user_id')},
          header: {
              'content-type': 'application/json'
          },
          success: function (res) {
              console.log(res);
              if(res.data.task_get_all_response){
                  that.setData({
                      'task_array':res.data.task_get_all_response.list
                  })
              }
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