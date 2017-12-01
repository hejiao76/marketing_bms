<template>
  <div>

    <el-dialog class="choose-hd" center title="选择秒杀券" :visible.sync="dialogTableVisible">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--<div class="mask" style="z-index: 12000;"></div>-->
      <!--<div class="choose-hd">-->

          <!--<div class="choose-hd_close" @click="closeAddList">-->
            <!--<img src="./../assets/images/choose-hd-close.png" alt="">-->
          <!--</div>-->
          <!--<div class="choose-hd_header">选择秒杀券</div>-->
          <!--<div class="choose-copntent">-->
            <!--<div class="choose-copntent_body">-->
              <!--<ul>-->
                <!--<li v-for="item in listobj">-->
                  <!--<div class="newhd-header">-->
                    <!--<p class="newhd-tit">{{item.name}}</p>-->
                    <!--<div class="newhd-time">-->
                      <!--<p>有效时间：{{item.starTime}}至{{item.endTime}}</p>-->
                      <!--<p>创建时间：{{item.creatTime}}</p>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div class="newhd-content">-->
                    <!--<a href="javascript:;">选择绑定</a>-->
                  <!--</div>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="choose-footer">-->
            <!--<div class="row">-->
              <!--<div class="col-md-12 text-center">-->
                <!--<el-button type="primary">确认取消</el-button>-->
                <!--<el-button>默认按钮</el-button>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
      <!--</div>-->
  </div>
</template>

<script>
  import Api from "./../fetch/api"
  import Final from "./../util/Final"
export default {
  name: 'header',
  data () {
    return {
        dialogTableVisible:false,
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
    showDialog () {
        this.dialogTableVisible=true;
    },
    closeAddList(){
      $('.choose-hd,.mask').hide();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 .choose-hd .el-dialog--center .el-dialog__header {
   padding-top:10px;
 }
</style>
