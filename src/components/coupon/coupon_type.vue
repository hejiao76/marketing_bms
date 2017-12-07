//基础设置模块
<template>
  <div>
    <el-form :model="typeItemForm" :rules="rules" ref="typeItemForm" size="small" label-width="120px" class="demo-ruleForm" label-position="left">
      <el-row>
        <el-col :span="24">
          <el-form-item label="抵扣类型" prop="ticketName">
            <el-checkbox-group v-model="typeItemForm.type">
              <el-checkbox :label="1">抵扣车款</el-checkbox>
              <el-checkbox :label="2" @change="showGiftItem">其他权益</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="this.isShowGiftItem ">
        <div v-if="this.typeItemForm.gift_Obj.id" class="saleticket-list colorsaletickstyle">
          <div class="saleticket-list_header">
            <p>抵扣券名称名称名称名</p>
            <span>有效日期：2017-02-11  00：00：00至2018-09-11  00：00：00</span>
            <div class="headericon">
              <img src="../../assets/images/saleticketsleft.png" class="iconleft" alt="">
              <img src="../../assets/images/saleticketsright.png" class="iconright" alt="">
            </div>
          </div>
          <div class="saleticket-content">
            <ul>
              <li>
                <div class="sal-con-tit">
                  加油卡：
                </div>
                <div class="sal-con_txt">
                  <span>¥100X2</span>
                </div>
              </li>
              <li>
                <div class="sal-con-tit">
                  雨伞：
                </div>
                <div class="sal-con_txt">
                  <span>¥100X2</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="saleticket-footer">
            <div class="headericon">
              <img src="../../assets/images/saleticketsleft.png" class="iconleft" alt="">
              <img src="../../assets/images/saleticketsright.png" class="iconright" alt="">
            </div>
            <table>
              <tr>
                <td>345<em>(礼包金额)</em></td>
              </tr>
            </table>
          </div>
        </div>
        <div v-else class="saleticket-list newlist cur"  @click="addCoupon">
          <div class="saleticket-list_header">
            <div class="headericon">
              <img src="../../assets/images/saleticketsleft.png" class="iconleft" alt="">
              <img src="../../assets/images/saleticketsright.png" class="iconright" alt="">
            </div>
          </div>
          <div class="saleticket-content">
            <p data-toggle="modal" data-target="#aaa"><img src="../../assets/images/jia.png" alt="">添加礼品包</p>
          </div>
          <div class="saleticket-footer">
            <div class="headericon">
              <img src="../../assets/images/saleticketsleft.png" class="iconleft" alt="">
              <img src="../../assets/images/saleticketsright.png" class="iconright" alt="">
            </div>
            <table>
              <tr>
                <td>&nbsp;</td>
              </tr>
            </table>
          </div>
        </div>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
    <!--<V-Addcouponlist  ref="ticketDialog"></V-Addcouponlist>-->
    <v-add-gift-bag-list ref="ticketDialog"></v-add-gift-bag-list>
  </div>
</template>

<script>
import Api from "./../../fetch/api"
import Final from "./../../util/Final";
import * as util from "./../../util/util";
import VTipMsg from "./../tipMsg.vue";
import TestData from "./../../util/TestData";
import VAddGiftBagList from "./../../components/coupon/add_gift_bag_list.vue";
export default {
  props:['couponDetail',"isEdit"],
  data () {
    return {
      isShowGiftItem:false,
      typeItemForm:{
        type:[],
        gift_Obj:{},
        gift_ids:'',
      },
      rules: {
        type: [
          { required: true, type: 'array', message: '请选择抵扣类型', trigger: 'change' }
        ]
      },
    }
  },
  components :{
    VTipMsg,
    VAddGiftBagList,
  },
  watch : {
    couponDetail (val, oldval) {
      this.cloneTypeInfo();
    }
  },
  created () {
  },
  mounted () {
//    this.cloneTypeInfo();
  },
  methods:{
    editSave (){
      this.$emit("editSaveCall");
    },
    showGiftItem (checked){
        if(checked){
          this.isShowGiftItem=true;
          if(this.typeItemForm.gift_ids){
            this.requestGiftItemInfo();
          }
        }else{
          this.isShowGiftItem=false;
          this.typeItemForm.gift_Obj={};
        }

    },
    requestGiftItemInfo (giftId){
        Api.base_sys_gift_info({})
          .then(res => {
            if (res.status == true) {
              console.log(res);
              this.typeItemForm.gift_Obj =res.result;
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg:res.message,
                type:"error"
              });
            }
          }).catch(err => {

        });
      },
    cloneTypeInfo() {
      this.typeItemForm={
        type:[],
        gift_Obj:{},
        gift_ids:'',
      }
      if(this.couponDetail && this.couponDetail.type){
          let type = [];
          if(this.couponDetail.type==3){
              type= [1,2]
//              if(this.couponDetail.gift_ids){
//                  this.requestGiftItemInfo(this.couponDetail.gift_ids);
//              }
          }else{
              type.push(this.couponDetail.type);
          }
         this.typeItemForm.type=type,
         this.typeItemForm.gift_ids=this.couponDetail.gift_ids

      }
    },
    validTypeItem () {
      let validStatus=true;
      this.$refs['typeItemForm'].validate((valid) => {
        if (!valid) {
          this.$refs.tipMsgRef.showTipMsg({
            msg:"基础设置填写有误",
            type:"error"
          });
          validStatus=false;
          return false;
        }
      });
      return validStatus;
    },
    getTypeItem(){
        let newTypeItem = Object.assign({},this.typeItemForm);
        return newTypeItem;
    },
    /**
     *  下一步 抵扣券类型设置
     * @param ticketId
     */
    saveBaseItem(){
        if(this.validTypeItem()){
//              let newTypeItem = Object.assign({},this.typeItemForm);
              this.$emit("call",{op:"edit",tag:"type",callData:this.getTypeItem()});
        }
//
    },
    addCoupon(){
      this.$refs.ticketDialog.showDialog();
    },
    /**
     * 自定义验证规则
     * @returns
     */
    userValidate (){
        return {
      }
    },
  }
}
</script>

<!-- Add1111 "scoped" attribute to limit CSS to this component only -->
<style >
  /*.avatar-uploader .el-upload {*/
    /*border: 1px dashed #d9d9d9;*/
    /*border-radius: 6px;*/
    /*cursor: pointer;*/
    /*position: relative;*/
    /*overflow: hidden;*/
  /*}*/
  /*.avatar-uploader .el-upload:hover {*/
    /*border-color: #409EFF;*/
  /*}*/
  /*.avatar-uploader-icon {*/
    /*font-size: 28px;*/
    /*color: #8c939d;*/
    /*width: 100px;*/
    /*height: 100px;*/
    /*line-height: 100px;*/
    /*text-align: center;*/
  /*}*/
  /*.avatar {*/
    /*width: 100px;*/
    /*height: 100px;*/
    /*display: block;*/
  /*}*/
</style>
