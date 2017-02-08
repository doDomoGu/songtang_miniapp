var app = getApp();
Page({
    data : {
        username:'',
        password:'',
        errmsg:''
    },

    onLoad:function(options){

    // 页面初始化 options为页面跳转所带来的参数
    },
    onReady:function(){
    // 页面渲染完成
    },

    onShow:function(){

    // 页面显示
    },
    onHide:function(){
    // 页面隐藏
    },
    onUnload:function(){
    // 页面关闭
    },
    usernameInput:function(e){
        this.setData({
             username: e.detail.value
        })
    },
    passwordInput:function(e){
        this.setData({
            password: e.detail.value
        })
    },
    login:function(){
        var that = this;
        that.setData({'errmsg':''});
        wx.request({
            url: app.globalData.requestHost+'/user/login',
            data:{username:that.data.username,password:that.data.password},
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                if(res.data.user_login_response){
                    var user_id = res.data.user_login_response.userinfo.user_id;
                    that.ucenterBind(user_id);
                }else{
                    that.setData({'errmsg':res.data.error_response.msg});
                }

            }
        })
    },
    ucenterBind:function(user_id){
        var that = this;
        that.setData({'errmsg':''});
        wx.request({
            url: app.globalData.requestHost+'/user/wx-bind-user',
            data:{user_id:user_id,session_3rd:wx.getStorageSync('session_3rd')},
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                if(res.data.wx_bind_user_response){
                    var username = res.data.wx_bind_user_response.result.username;
                    var name = res.data.wx_bind_user_response.result.name;

                    wx.setStorageSync('ucenterUserInfo', {
                        username : username,
                        name : name,
                        user_id :user_id
                    });

                    wx.setStorageSync('username', username);
                    wx.setStorageSync('name',  name);
                    wx.setStorageSync('user_id',user_id);
                    wx.showToast({
                        title: '绑定成功',
                        icon: 'success',
                        duration: 2000,
                        mask:true
                    });
                    setTimeout(function(){
                        wx.navigateBack({
                            delta :1
                        })
                    },2000)
                }else{
                    that.setData({'errmsg':res.data.error_response.msg});
                }

            }
        })
    },
    returnIndex:function(){
        wx.switchTab({
            url : '../index/index'
        })
    }
});