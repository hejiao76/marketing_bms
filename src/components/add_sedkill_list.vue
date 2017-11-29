<template>
  <div>
  <div class="mask" style="z-index: 12000;"></div>
  <div class="choose-hd">

    <div class="choose-hd_close">
      <img src="./../assets/images/choose-hd-close.png" alt="">
    </div>
    <div class="choose-hd_header">选择秒杀券</div>
  <div class="choose-copntent">
    <div class="choose-copntent_body">
      <ul>
        <li v-for="item in listobj">
          <div class="newhd-header">
            <p class="newhd-tit">{{item.name}}</p>
            <div class="newhd-time">
              <p>有效时间：{{item.starTime}}至{{item.endTime}}</p>
              <p>创建时间：{{item.creatTime}}</p>
            </div>
          </div>
          <div class="newhd-content">
            <a href="javascript:;">选择绑定</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
  import Api from "./../fetch/api"
  import Final from "./../util/Final"
export default {
  name: 'header',
  data () {
    return {
        listobj:[
          {
            name:'500元迈腾购车秒杀券',
            starTime:'2017-11',
            endTime:'2017-11',
            creatTime:'2017-11 10:52'
          },
          {
            name:'500元迈腾购车秒杀券',
            starTime:'2017-11',
            endTime:'2017-11',
            creatTime:'2017-11 10:52'
          },
          {
            name:'500元迈腾购车秒杀券',
            starTime:'2017-11',
            endTime:'2017-11',
            creatTime:'2017-11 10:52'
          },
          {
            name:'500元迈腾购车秒杀券',
            starTime:'2017-11',
            endTime:'2017-11',
            creatTime:'2017-11 10:52'
          },
          {
            name:'500元迈腾购车秒杀券',
            starTime:'2017-11',
            endTime:'2017-11',
            creatTime:'2017-11 10:52'
          },
          {
            name:'500元迈腾购车秒杀券',
            starTime:'2017-11',
            endTime:'2017-11',
            creatTime:'2017-11 10:52'
          },
        ]
    }
  },
  created () {

  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .choose-hd {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -320px;
    margin-left: -450px;
    z-index: 13000;
    width: 900px;
    height: 640px;
    background: #fff
  }

  .choose-hd.olderdetail {
    display: none;
    width: 620px;
    height: 520px;
    margin-left: -310px;
    margin-top: -260px
  }

  .choose-hd.olderdetail .choose-copntent {
    padding: 20px 0;
    margin: 0 20px
  }

  .choose-hd .choose-hd_close {
    top: 10px;
    right: 20px;
    width: 20px;
    height: 20px;
    cursor: pointer
  }

  .choose-hd .choose-hd_header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #404C73;
    background: #F6F7FB
  }

  .choose-hd .choose-copntent {
    height: 470px;
    background: #fff;
    overflow-x: hidden;
    overflow-y: auto
  }

  .choose-hd .choose-copntent .choose-copntent_body {
    padding: 20px 0;
    margin: 0 30px
  }

  .choose-hd .choose-copntent .choose-copntent_body ul {
    width: 100%;
    overflow: hidden
  }

  .choose-hd .choose-copntent .choose-copntent_body ul li {
    width: 260px;
    float: left;
    margin: 0 20px 20px 0;
    overflow: hidden;
    background: #faf9ff;
    border-radius: 7px!important;
    border: 1px solid #ebeaf6;
    box-shadow: 0 0 3px 3px rgba(235,234,246,.6)
  }

  .choose-hd .choose-copntent .choose-copntent_body ul li .newhd-header {
    width: 100%;
    height: 111px;
    background: url(./../assets/images/sks_h.png) no-repeat
  }

  .choose-hd .choose-copntent .choose-copntent_body ul li .newhd-header p.newhd-tit {
    font-size: 20px;
    line-height: 30px;
    color: #fff;
    text-align: center;
    padding: 15px 0;
    margin: 0 5px;
    border-bottom: 1px dashed #6c5fae
  }

  .choose-hd .choose-copntent .choose-copntent_body ul li .newhd-header .newhd-time {
    width: 100%;
    margin-top: 5px;
    overflow: hidden;
    font-size: 12px;
    color: #d5cefc
  }

  .choose-hd .choose-copntent .choose-copntent_body ul li .newhd-header .newhd-time p {
    text-align: center;
    line-height: 20px
  }

  .choose-hd .choose-copntent .choose-copntent_body ul li .newhd-content {
    height: 50px;
    line-height: 50px
  }

  .choose-hd .choose-copntent .choose-copntent_body ul li .newhd-content a {
    display: block;
    text-align: center;
    font-size: 14px;
    color: #9384E3;
    text-decoration: none
  }

  .choose-hd .choose-copntent .choose-copntent_body ul li .newhd-content a:hover {
    text-decoration: none
  }

  .choose-hd .choose-footer {
    height: 120px;
    background: #F6F7FB
  }
</style>
