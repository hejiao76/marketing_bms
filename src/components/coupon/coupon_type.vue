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
      <el-row v-if="isShowGiftItem ">
        <div v-if="typeItemForm.gift_obj.giftGroupId" class="saleticket-list colorsaletickstyle">
          <div class="isfill">
            <span @click="removeGiftGroup" style="display:block;width: 20px;height: 20px;background: #fff;text-align: center;line-height: 20px;border: 1px solid #ccc;color: #ccc;border-radius: 10px;">X</span>
          </div>
          <div class="saleticket-list_header">
            <p>{{typeItemForm.gift_obj.giftGroupName}}</p>
            <span>有效日期：{{typeItemForm.gift_obj.effectiveDate}}</span>
            <div class="headericon">
              <img src="../../assets/images/saleticketsleft.png" class="iconleft" alt="">
              <img src="../../assets/images/saleticketsright.png" class="iconright" alt="">
            </div>
          </div>
          <div class="saleticket-content">
            <ul>
              <li v-for="giftItem in typeItemForm.gift_obj.giftInfoList">
                <div class="sal-con-tit">
                  {{giftItem.giftName}}：
                </div>
                <div class="sal-con_txt">
                  <span>¥{{giftItem.giftPrice || 0}}X{{giftItem.giftCount}}</span>
                </div>
              </li>
              <!--<li>-->
                <!--<div class="sal-con-tit">-->
                  <!--雨伞：-->
                <!--</div>-->
                <!--<div class="sal-con_txt">-->
                  <!--<span>¥100X2</span>-->
                <!--</div>-->
              <!--</li>-->
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
            <el-button v-if="isEdit" type="primary" @click="editSave">保存</el-button>
            <el-button v-if="!isEdit" type="primary" @click="saveBaseItem()">创建</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <v-tip-msg ref="tipMsgRef"></v-tip-msg>
    <!--<V-Addcouponlist  ref="ticketDialog"></V-Addcouponlist>-->
    <v-add-gift-bag-list @call="syncGiftIds" :tmpSeriesData="tmpSeriesData" ref="ticketDialog"></v-add-gift-bag-list>
  </div>
</template>

<script>
import Api from "./../../fetch/api"
import Final from "./../../util/Final";
import * as util from "./../../util/util";
import VTipMsg from "./../tipMsg.vue";
import TestData from "./../../util/TestData";
import VAddGiftBagList from "./add_gift_group_list.vue";
export default {
  props:['couponDetail',"isEdit","tmpSeriesData"],
  data () {
    return {
      isShowGiftItem:false,
//      tmpSeriesDataObj:{},
      typeItemForm:{
        type:[],
        gift_obj:{},
        giftId:'',
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
    },
//    tmpSeriesData : {
//        handler(val, oldval){
//          console.log("watch----111111111111111111------tmpSeriesData",this.tmpSeriesData);
//          this.tmpSeriesDataObj=this.tmpSeriesData
//        },
//        deep:true
//    }
  },
  created () {
  },
  mounted () {
      console.log("加载抵扣类型");
//    this.cloneTypeInfo();
  },
  methods:{
    editSave (){
      this.$emit("editSaveCall");
    },
    /**
     * 显示礼品包详情
     */
    showGiftItem (checked){
        if(checked){
          this.isShowGiftItem=true;
          if(this.typeItemForm.giftId){
            this.requestGiftItemInfo();
          }
        }else{
          this.isShowGiftItem=false;
          this.typeItemForm.gift_obj={};
          this.typeItemForm.giftId='';
        }

    },
    /**
     * 请求礼品包详情
     */
    requestGiftItemInfo (){
        Api.base_sys_gift_info({giftGroupId:this.typeItemForm.giftId})
          .then(res => {
            if (res.status == true) {
              console.log(res);
              this.typeItemForm.gift_obj=res.result;
            }else {
              this.$refs.tipMsgRef.showTipMsg({
                msg:res.message,
                type:"error"
              });
            }
          }).catch(err => {

        });
      },
    /**
     * 克隆礼品券类型信息
     */
    cloneTypeInfo() {
      this.typeItemForm={
        type:[],
        gift_obj:{},
        giftId:'',
      }
      if(this.couponDetail && this.couponDetail.type){
          let type = [];
          if(this.couponDetail.type==3){
              type= [1,2]
//              if(this.couponDetail.giftId){
//                  this.requestGiftItemInfo(this.couponDetail.giftId);
//              }
          }else{
              type.push(this.couponDetail.type);
          }
         this.typeItemForm.type=type,
         this.typeItemForm.giftId=this.couponDetail.giftId;
          if(this.typeItemForm.giftId){
              this.showGiftItem(true);
          }

      }
    },
    /**
     * 同步已选择的礼品包ID
     */
    syncGiftIds (data) {
        console.log("选择礼品-----回到父级",JSON.stringify(data));
        if(data && data.giftGroupId){
            this.typeItemForm.giftId =data.giftGroupId;
            this.requestGiftItemInfo();
        }
    },
    /**
     * 验证抵扣信息类型填写是否正确
     */
    validTypeItem () {
      let validStatus=true;
      this.$refs['typeItemForm'].validate((valid) => {
        if (!valid) {
//          this.$refs.tipMsgRef.showTipMsg({
//            msg:"抵扣类型填写有误",
//            type:"error"
//          });
          this.$emit("errorTipMsg",{msg:"抵扣类型填写有误"});
          validStatus=false;
          return false;
        }else {
          validStatus = this.validCheckGiftGroup();
        }
      });
      return validStatus;
    },
    /**
     * 验证勾选其他权益后是否选择礼包
     */
    validCheckGiftGroup (){
      if(this.typeItemForm.type.includes(2) && !this.typeItemForm.giftId){
//          this.$refs.tipMsgRef.showTipMsg({
//            msg:"请添加礼包",
//            type:"error"
//          });
          this.$emit("errorTipMsg",{msg:"请添加礼包"});
          return false;
      }else{
        return true;
      }
    },
    /**
     * 获取抵扣券类型信息
     */
    getTypeItem(){
        let newTypeItem = Object.assign({},this.typeItemForm);
        delete newTypeItem.gift_obj;
        newTypeItem.type = newTypeItem.type.length==2 ?  3 : newTypeItem.type[0];
        return newTypeItem;
    },
    /**
     *  下一步 抵扣券类型设置
     * @param ticketId
     */
    saveBaseItem(){
        if(this.validTypeItem()){
//              let newTypeItem = Object.assign({},this.typeItemForm);
              this.$emit("call",{tag:"type",callData:this.getTypeItem()});
        }
//
    },
    removeGiftGroup () {
        this.typeItemForm.gift_obj = {}
    },

    addCoupon(){
        if(this.tmpSeriesData.serialType==2 && this.tmpSeriesData.serialIds.length<=0){
          this.$emit("errorTipMsg",{msg:"请先选择车系"});
        }else{
          this.$refs.ticketDialog.showDialog();
        }

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
