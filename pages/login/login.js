// pages/login/login.js
import request from '../../utils/request'
Page({
/**
 * 登录流程
 * 1收集表单数据
 * 2前端验证
 * 3后端验证
 */
  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleInput(event){
    // let type=event.currentTarget.id  id 传值
    // console.log(type, event.detail.value)
    let type=event.currentTarget.dataset.type //data-key=value 文档里面的实例
    this.setData({
      [type]:event.detail.value//[type]是一个变量
    })
  },
  // 登录的回调
  async login(){
    let{phone,password}=this.data
    //前端验证
    if(!phone){
      wx.showToast({
        title:'手机号不能为空',
        icon:'error'
      })
      return;
    }
    // 正则表达式
    let phoneReg= /^1(3|4|5|6|7|8|9)\d{9}$/
    if(!phoneReg.test(phone)){
      wx.showToast({
        title:'手机号格式错误',
        icon:'error'
      })
      return;
    }
    if(!password){
      wx.showToast({
        title:'密码不能为空',
        icon:'error'
      })
      return;
    }
    wx.showToast({
      title:'正在登陆',
      icon:'loading'
    })
    // 后端验证
    let result=await request('/login/cellphone', {phone,password,isLogin:true});
    if(result.code===200){
      wx.showToast({
        title:'登录成功',
        icon:'success'
      })
      //跳转至个人中心
      wx.reLaunch({
        url: '/pages/personal/personal',
      })
      //将用户的信息存储本地
      wx.setStorageSync('userInfo',JSON.stringify(result.profile) )//转成json对象


    }else if(result.code===400){
      wx.showToast({
        title:'手机号错误',
        icon:'error'
      })
    }else if(result.code===502){
      wx.showToast({
        title:'密码错误',
        icon:'error'
      })
    }else{
      wx.showToast({
        title:'登录失败，请重新登录',
        icon:'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})