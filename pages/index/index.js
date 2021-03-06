// pages/index/index.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],//轮播图数据
    recommendList:[],//推荐歌单
    topList:[] //排行榜数据
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:  async function (options) {
    let bannerListData = await request('/banner', {type: 1});
    this.setData({
      bannerList:bannerListData.banners
    })
    let recommendListData=await request('/personalized',{limit:10});
    this.setData({
      recommendList:recommendListData.result
    })
    // 需要根据idx获取对应的数据 根据idx 返回0-4  发送五次请求
    let index=0;
    let resultArr=[]
    while(index<5){
      index++;
      let topListData=await request('/top/list',{idx:index++})
      // splice 会对原数据修改   slice   不会对原数据修改
      let topListItem={name:topListData.playlist.name,tracks:topListData.playlist.tracks.slice(0,3)}
      resultArr.push(topListItem)
      //不需要等待五次请求全部结束才更新
      this.setData({
        topList:resultArr
      })
    }
  //  更新toplist的状态值   发送的请求过多 导致长时间白屏
  // this.setData({
  //   topList:resultArr
  // })
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