<template>
  <div  tabindex="1" id="box">
    <el-input :readonly="true" @click.native="boxIsShow" v-model="showContent" placeholder="请选择活动区域"></el-input>
    <!--<div class="city-box-wrop" @click="boxIsShow()">-->
      <!--<span v-if="!newCityArr">请选择活动区域</span>-->
      <!--<span v-if="newCityArr" v-for="item in newCityArr">{{item}},</span>-->
    <!--</div>-->
    <el-row v-if="ifShow" >
      <el-col :span="24">

        <div class="form-group">
          <div class="">
            <div class="" style="position: relative;">
              <div class="select-box form-control cur">
                <!--全部-->
              </div>
              <div class="city-box">
                <div class="city">
                  <div class="city-title">
                    城市列表
                  </div>
                  <div class="city-body">
                    <div class="city-body-right" v-for="item in cityTree">
                      <div class="city-body-title" >
                        <el-checkbox v-model="parentCheckedMenuCode"   @change="handleCheckAllChange($event,item)" :label="item.provinceId" :key="item.provinceId" class="fw">{{item.provinceName}}</el-checkbox>
                      </div>
                        <div class="city-body-content">
                          <el-col :span="6" v-for="childItem in item.cityVmList">
                            <el-checkbox v-model="childCheckedMenuCode"  @change="handleCheckedChildChange($event,childItem)" :label="childItem.cityId" :key="childItem.cityId">{{childItem.cityName}}</el-checkbox>
                          </el-col>
                        </div>

                    </div>
                  </div>
                </div>
                <div class="city-sidebar">
                  <div class="col-md-12 city-title">
                    已选城市
                  </div>
                  <div class="city-body">
                    <div class="city-body-title" v-for="item in childCheckedMenuName">
                      {{item}}
                    </div>
                  </div>
                </div>
                <el-row style="width: 100%;" class="city-footer">
                  <el-col :span="12"> <el-checkbox @change="allChecked($event)" class="fw">全选</el-checkbox></el-col>
                  <el-col :span="12" class="col-md-8 text-right">
                    <el-button size="small" class="fr mr20 " style="margin-top:3px;" @click="cityBoxhide()">取消</el-button>
                    <el-button type="primary" size="small" @click="checkedCity()" class="fr mr20 " style="margin-right:20px;margin-top:3px;">确认</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>

















        <!--<el-dropdown size="small">-->
        <!--<el-button type="primary" style="padding:10px 50px;background:none;">-->
        <!--省份选择<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
        <!--</el-button>-->
        <!--<el-dropdown-menu slot="dropdown" placement="bottom" style="width: 180px;height: 300px;overflow-y: auto">-->
        <!--<el-dropdown-item><el-checkbox @change="allChecked($event)" class="fw">全选</el-checkbox></el-dropdown-item>-->
        <!--<el-dropdown-item v-for="item in userData.optionalMenusTree">-->
        <!--<el-checkbox v-model="checkedMenuCodeArray"  @change="handleCheckAllChange($event,item.menucode,item.children)" :label="item.menucode" :key="item.menucode" class="fw">{{item.menuName}}</el-checkbox>-->
        <!--<span @click="linkchild(item.children,item.menucode)"><i class="el-icon-caret-right"></i></span>-->
        <!--</el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
        <!--</el-col>-->
        <!--<el-col :span="12">-->
        <!--<ul style="width: 180px;height: 300px;overflow-y: auto;" v-if="childItems.length>0">-->
        <!--<li><el-checkbox v-model="isAllChild" @change="allChildrenChecked($event)" class="fw">全选</el-checkbox></li>-->
        <!--<li  v-for="childItem in childItems" >-->
        <!--<el-checkbox  v-model="checkedMenuCodeArray" @change="handleCheckedChildChange($event,thismenucode)" :label="childItem.menucode" :key="childItem.menucode">{{childItem.menuName}}</el-checkbox>-->
        <!--</li>-->
        <!--</ul>-->
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import Api from "./../fetch/api";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";

  export default {
    components: {
      ElInput
    },
    data () {
      return{
        tableData: [],
        showContent:"",
        ifShow:false,
        currentPage: 1,
        tpageSize: 10,
        totalRow: 0,
        childItems　:[],
        showChild:false,
        settingSm:{
          set_smPhone:''
        },
        userData: {
          userNum: '',
          userName: '',
          roleName: '',
          menus: [],
          optionalMenus: []
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
//        treeDefaultCheck:[],
//        checkedMenus: [],
        dialogFormVisible: false,
        ruleForm: {
          userNum: '',
          menus: ''
        },
        rules: {
        },
        allMenuCodeArray:[], //所有可选权限数组
        checkedMenuCodeArray:[], //已选择权限数组
        newCityArr :[],
        cityTree:[],
        parentCheckedMenuCode:[],
        childCheckedMenuCode:[],
        parentCheckedMenuName:[],
        childCheckedMenuName:[]
      }
    },
    created () {
      console.log('>>>>>>>>>>>>>>>树形模板')
      let res ={"status":true,"code":0,"message":null,"result":[{"provinceId":1,"provinceName":"安徽省","cityVmList":[{"cityId":101,"cityName":"合肥"},{"cityId":102,"cityName":"安庆"},{"cityId":103,"cityName":"蚌埠"},{"cityId":104,"cityName":"巢湖"},{"cityId":105,"cityName":"池州"},{"cityId":106,"cityName":"阜阳"},{"cityId":107,"cityName":"淮北"},{"cityId":108,"cityName":"淮南"},{"cityId":109,"cityName":"六安"},{"cityId":110,"cityName":"马鞍山"},{"cityId":113,"cityName":"铜陵"},{"cityId":114,"cityName":"芜湖"},{"cityId":115,"cityName":"宣城"},{"cityId":116,"cityName":"滁州"},{"cityId":118,"cityName":"黄山"},{"cityId":120,"cityName":"宿州"},{"cityId":125,"cityName":"亳州"}],"provinceSpell":"anhui"},{"provinceId":2,"provinceName":"北京市","cityVmList":[{"cityId":201,"cityName":"北京"}],"provinceSpell":"beijing"},{"provinceId":3,"provinceName":"福建省","cityVmList":[{"cityId":301,"cityName":"福州"},{"cityId":302,"cityName":"厦门"},{"cityId":303,"cityName":"龙岩"},{"cityId":305,"cityName":"漳州"},{"cityId":306,"cityName":"莆田"},{"cityId":307,"cityName":"泉州"},{"cityId":314,"cityName":"南平"},{"cityId":315,"cityName":"宁德"},{"cityId":318,"cityName":"三明"}],"provinceSpell":"fujian"},{"provinceId":4,"provinceName":"甘肃省","cityVmList":[{"cityId":401,"cityName":"兰州"},{"cityId":402,"cityName":"定西"},{"cityId":405,"cityName":"平凉"},{"cityId":409,"cityName":"酒泉"},{"cityId":410,"cityName":"张掖"},{"cityId":411,"cityName":"庆阳"},{"cityId":412,"cityName":"武威"},{"cityId":415,"cityName":"天水"},{"cityId":416,"cityName":"嘉峪关"},{"cityId":417,"cityName":"金昌"},{"cityId":418,"cityName":"白银"},{"cityId":421,"cityName":"陇南"},{"cityId":422,"cityName":"甘南"},{"cityId":622900,"cityName":"临夏回族自治州"}],"provinceSpell":"gansu"},{"provinceId":5,"provinceName":"广东省","cityVmList":[{"cityId":501,"cityName":"广州"},{"cityId":502,"cityName":"深圳"},{"cityId":503,"cityName":"珠海"},{"cityId":504,"cityName":"东莞"},{"cityId":505,"cityName":"中山"},{"cityId":507,"cityName":"汕头"},{"cityId":510,"cityName":"潮州"},{"cityId":511,"cityName":"韶关"},{"cityId":513,"cityName":"湛江"},{"cityId":514,"cityName":"肇庆"},{"cityId":515,"cityName":"茂名"},{"cityId":516,"cityName":"梅州"},{"cityId":518,"cityName":"佛山"},{"cityId":520,"cityName":"惠州"},{"cityId":521,"cityName":"江门"},{"cityId":522,"cityName":"揭阳"},{"cityId":524,"cityName":"清远"},{"cityId":528,"cityName":"云浮"},{"cityId":532,"cityName":"阳江"},{"cityId":535,"cityName":"河源"},{"cityId":552,"cityName":"汕尾"}],"provinceSpell":"guangdong"},{"provinceId":6,"provinceName":"广西壮族自治区","cityVmList":[{"cityId":601,"cityName":"南宁"},{"cityId":602,"cityName":"柳州"},{"cityId":603,"cityName":"桂林"},{"cityId":604,"cityName":"北海"},{"cityId":605,"cityName":"百色"},{"cityId":606,"cityName":"贺州"},{"cityId":607,"cityName":"河池"},{"cityId":608,"cityName":"贵港"},{"cityId":610,"cityName":"玉林"},{"cityId":612,"cityName":"钦州"},{"cityId":613,"cityName":"梧州"},{"cityId":615,"cityName":"防城港"},{"cityId":619,"cityName":"来宾"},{"cityId":621,"cityName":"崇左"}],"provinceSpell":"guangxi"},{"provinceId":7,"provinceName":"贵州省","cityVmList":[{"cityId":701,"cityName":"贵阳"},{"cityId":702,"cityName":"遵义"},{"cityId":705,"cityName":"安顺"},{"cityId":708,"cityName":"六盘水"},{"cityId":714,"cityName":"黔东南"},{"cityId":715,"cityName":"黔南"},{"cityId":717,"cityName":"毕节地区"},{"cityId":718,"cityName":"黔西南"},{"cityId":719,"cityName":"铜仁地区"}],"provinceSpell":"guizhou"},{"provinceId":8,"provinceName":"海南省","cityVmList":[{"cityId":801,"cityName":"海口"},{"cityId":803,"cityName":"三亚"},{"cityId":810,"cityName":"琼北"},{"cityId":811,"cityName":"琼南"},{"cityId":469000,"cityName":"省直辖县级行政区划"}],"provinceSpell":"hainan"},{"provinceId":9,"provinceName":"河北省","cityVmList":[{"cityId":901,"cityName":"石家庄"},{"cityId":902,"cityName":"唐山"},{"cityId":903,"cityName":"邢台"},{"cityId":905,"cityName":"秦皇岛"},{"cityId":906,"cityName":"廊坊"},{"cityId":907,"cityName":"邯郸"},{"cityId":908,"cityName":"衡水"},{"cityId":909,"cityName":"沧州"},{"cityId":910,"cityName":"保定"},{"cityId":911,"cityName":"张家口"},{"cityId":912,"cityName":"承德"}],"provinceSpell":"hebei"},{"provinceId":10,"provinceName":"河南省","cityVmList":[{"cityId":1001,"cityName":"郑州"},{"cityId":1002,"cityName":"洛阳"},{"cityId":1003,"cityName":"周口"},{"cityId":1004,"cityName":"信阳"},{"cityId":1005,"cityName":"新乡"},{"cityId":1006,"cityName":"商丘"},{"cityId":1007,"cityName":"三门峡"},{"cityId":1008,"cityName":"濮阳"},{"cityId":1009,"cityName":"南阳"},{"cityId":1010,"cityName":"漯河"},{"cityId":1011,"cityName":"焦作"},{"cityId":1013,"cityName":"开封"},{"cityId":1014,"cityName":"安阳"},{"cityId":1016,"cityName":"鹤壁"},{"cityId":1018,"cityName":"平顶山"},{"cityId":1021,"cityName":"驻马店"},{"cityId":1023,"cityName":"许昌"},{"cityId":419000,"cityName":"省直辖县级行政区划"}],"provinceSpell":"henan"},{"provinceId":11,"provinceName":"黑龙江省","cityVmList":[{"cityId":1101,"cityName":"哈尔滨"},{"cityId":1102,"cityName":"大庆"},{"cityId":1103,"cityName":"齐市"},{"cityId":1104,"cityName":"鹤岗"},{"cityId":1106,"cityName":"佳木斯"},{"cityId":1107,"cityName":"鸡西"},{"cityId":1108,"cityName":"牡丹江"},{"cityId":1109,"cityName":"七台河"},{"cityId":1112,"cityName":"伊春"},{"cityId":1113,"cityName":"黑河"},{"cityId":1123,"cityName":"双鸭山"},{"cityId":1131,"cityName":"绥化"},{"cityId":1136,"cityName":"兴安"}],"provinceSpell":"heilongjiang"},{"provinceId":12,"provinceName":"湖北省","cityVmList":[{"cityId":1201,"cityName":"武汉"},{"cityId":1202,"cityName":"十堰"},{"cityId":1203,"cityName":"襄阳"},{"cityId":1204,"cityName":"随州"},{"cityId":1205,"cityName":"仙桃"},{"cityId":1207,"cityName":"宜昌"},{"cityId":1208,"cityName":"黄石"},{"cityId":1209,"cityName":"荆门"},{"cityId":1210,"cityName":"荆州"},{"cityId":1216,"cityName":"鄂州"},{"cityId":1217,"cityName":"咸宁"},{"cityId":1229,"cityName":"孝感"},{"cityId":1236,"cityName":"黄冈"},{"cityId":422800,"cityName":"恩施土家族苗族自治州"},{"cityId":429000,"cityName":"省直辖县级行政区划"}],"provinceSpell":"hubei"},{"provinceId":13,"provinceName":"湖南省","cityVmList":[{"cityId":1301,"cityName":"长沙"},{"cityId":1302,"cityName":"郴州"},{"cityId":1303,"cityName":"常德"},{"cityId":1304,"cityName":"衡阳"},{"cityId":1305,"cityName":"怀化"},{"cityId":1306,"cityName":"娄底"},{"cityId":1307,"cityName":"株洲"},{"cityId":1308,"cityName":"岳阳"},{"cityId":1309,"cityName":"湘潭"},{"cityId":1310,"cityName":"邵阳"},{"cityId":1312,"cityName":"永州"},{"cityId":1313,"cityName":"益阳"},{"cityId":1315,"cityName":"张家界"},{"cityId":1333,"cityName":"湘西"}],"provinceSpell":"hunan"},{"provinceId":14,"provinceName":"吉林省","cityVmList":[{"cityId":1401,"cityName":"长春"},{"cityId":1402,"cityName":"吉林"},{"cityId":1403,"cityName":"通化"},{"cityId":1405,"cityName":"辽源"},{"cityId":1406,"cityName":"白山"},{"cityId":1412,"cityName":"白城"},{"cityId":1425,"cityName":"松原"},{"cityId":1428,"cityName":"延边"},{"cityId":1616,"cityName":"四平"}],"provinceSpell":"jl"},{"provinceId":15,"provinceName":"江苏省","cityVmList":[{"cityId":1501,"cityName":"南京"},{"cityId":1502,"cityName":"苏州"},{"cityId":1503,"cityName":"无锡"},{"cityId":1505,"cityName":"常州"},{"cityId":1507,"cityName":"淮安"},{"cityId":1510,"cityName":"连云港"},{"cityId":1511,"cityName":"南通"},{"cityId":1512,"cityName":"盐城"},{"cityId":1513,"cityName":"扬州"},{"cityId":1515,"cityName":"镇江"},{"cityId":1517,"cityName":"泰州"},{"cityId":1518,"cityName":"徐州"},{"cityId":1520,"cityName":"宿迁"}],"provinceSpell":"jiangsu"},{"provinceId":16,"provinceName":"江西省","cityVmList":[{"cityId":1601,"cityName":"南昌"},{"cityId":1602,"cityName":"上饶"},{"cityId":1603,"cityName":"萍乡"},{"cityId":1604,"cityName":"新余"},{"cityId":1605,"cityName":"宜春"},{"cityId":1606,"cityName":"九江"},{"cityId":1607,"cityName":"赣州"},{"cityId":1609,"cityName":"吉安"},{"cityId":1612,"cityName":"景德镇"},{"cityId":1613,"cityName":"抚州"},{"cityId":1615,"cityName":"鹰潭"}],"provinceSpell":"jiangxi"},{"provinceId":17,"provinceName":"辽宁省","cityVmList":[{"cityId":1701,"cityName":"沈阳"},{"cityId":1702,"cityName":"丹东"},{"cityId":1703,"cityName":"抚顺"},{"cityId":1704,"cityName":"阜新"},{"cityId":1705,"cityName":"葫芦岛"},{"cityId":1707,"cityName":"朝阳"},{"cityId":1708,"cityName":"大连"},{"cityId":1709,"cityName":"本溪"},{"cityId":1710,"cityName":"鞍山"},{"cityId":1711,"cityName":"锦州"},{"cityId":1713,"cityName":"辽阳"},{"cityId":1714,"cityName":"营口"},{"cityId":1716,"cityName":"盘锦"},{"cityId":1717,"cityName":"铁岭"}],"provinceSpell":"liaoning"},{"provinceId":18,"provinceName":"内蒙古自治区","cityVmList":[{"cityId":1801,"cityName":"呼市"},{"cityId":1802,"cityName":"包头"},{"cityId":1803,"cityName":"赤峰"},{"cityId":1804,"cityName":"通辽"},{"cityId":1805,"cityName":"乌海"},{"cityId":1808,"cityName":"鄂市"},{"cityId":1812,"cityName":"呼盟"},{"cityId":1814,"cityName":"兴安"},{"cityId":1824,"cityName":"巴盟"},{"cityId":1825,"cityName":"乌盟"},{"cityId":1829,"cityName":"锡盟"},{"cityId":1830,"cityName":"阿拉善"}],"provinceSpell":"neimenggu"},{"provinceId":19,"provinceName":"宁夏回族自治区","cityVmList":[{"cityId":1901,"cityName":"银川"},{"cityId":1902,"cityName":"吴忠"},{"cityId":1903,"cityName":"固原"},{"cityId":1905,"cityName":"石嘴山"},{"cityId":1907,"cityName":"中卫"}],"provinceSpell":"ningxia"},{"provinceId":20,"provinceName":"青海省","cityVmList":[{"cityId":2001,"cityName":"西宁"},{"cityId":2023,"cityName":"海北"},{"cityId":2024,"cityName":"黄南"},{"cityId":2025,"cityName":"果洛"},{"cityId":2026,"cityName":"玉树"},{"cityId":2027,"cityName":"海西"},{"cityId":2029,"cityName":"海东"},{"cityId":2030,"cityName":"海南"}],"provinceSpell":"qinghai"},{"provinceId":21,"provinceName":"山东省","cityVmList":[{"cityId":1015,"cityName":"德州"},{"cityId":2101,"cityName":"济南"},{"cityId":2102,"cityName":"青岛"},{"cityId":2103,"cityName":"烟台"},{"cityId":2104,"cityName":"威海"},{"cityId":2105,"cityName":"潍坊"},{"cityId":2106,"cityName":"泰安"},{"cityId":2107,"cityName":"枣庄"},{"cityId":2109,"cityName":"淄博"},{"cityId":2110,"cityName":"东营"},{"cityId":2112,"cityName":"菏泽"},{"cityId":2113,"cityName":"滨州"},{"cityId":2114,"cityName":"聊城"},{"cityId":2117,"cityName":"临沂"},{"cityId":2118,"cityName":"济宁"},{"cityId":2120,"cityName":"日照"},{"cityId":2126,"cityName":"烟威"},{"cityId":2132,"cityName":"莱芜"}],"provinceSpell":"shandong"},{"provinceId":22,"provinceName":"山西省","cityVmList":[{"cityId":2201,"cityName":"太原"},{"cityId":2202,"cityName":"大同"},{"cityId":2203,"cityName":"晋城"},{"cityId":2204,"cityName":"晋中"},{"cityId":2205,"cityName":"临汾"},{"cityId":2206,"cityName":"长治"},{"cityId":2207,"cityName":"运城"},{"cityId":2210,"cityName":"忻州"},{"cityId":2218,"cityName":"阳泉"},{"cityId":2219,"cityName":"朔州"},{"cityId":2227,"cityName":"吕梁"}],"provinceSpell":"shanxi"},{"provinceId":23,"provinceName":"陕西省","cityVmList":[{"cityId":2301,"cityName":"西安"},{"cityId":2302,"cityName":"咸阳"},{"cityId":2303,"cityName":"渭南"},{"cityId":2304,"cityName":"榆林"},{"cityId":2305,"cityName":"宝鸡"},{"cityId":2306,"cityName":"安康"},{"cityId":2307,"cityName":"汉中"},{"cityId":2308,"cityName":"延安"},{"cityId":2310,"cityName":"铜川"},{"cityId":2313,"cityName":"商洛"}],"provinceSpell":"shaanxi"},{"provinceId":24,"provinceName":"上海市","cityVmList":[{"cityId":2401,"cityName":"上海"}],"provinceSpell":"shanghai"},{"provinceId":25,"provinceName":"四川省","cityVmList":[{"cityId":2501,"cityName":"成都"},{"cityId":2502,"cityName":"绵阳"},{"cityId":2503,"cityName":"遂宁"},{"cityId":2504,"cityName":"攀枝花"},{"cityId":2506,"cityName":"宜宾"},{"cityId":2507,"cityName":"雅安"},{"cityId":2508,"cityName":"自贡"},{"cityId":2509,"cityName":"资阳"},{"cityId":2510,"cityName":"广元"},{"cityId":2511,"cityName":"德阳"},{"cityId":2512,"cityName":"乐山"},{"cityId":2513,"cityName":"南充"},{"cityId":2514,"cityName":"眉山"},{"cityId":2516,"cityName":"巴中"},{"cityId":2517,"cityName":"泸州"},{"cityId":2519,"cityName":"内江"},{"cityId":2530,"cityName":"广安"},{"cityId":2532,"cityName":"达州"},{"cityId":2535,"cityName":"阿坝"},{"cityId":2536,"cityName":"甘孜"},{"cityId":2537,"cityName":"凉山"}],"provinceSpell":"sichuan"},{"provinceId":26,"provinceName":"天津市","cityVmList":[{"cityId":2601,"cityName":"天津"}],"provinceSpell":"tianjin"},{"provinceId":27,"provinceName":"西藏自治区","cityVmList":[{"cityId":2701,"cityName":"拉萨"},{"cityId":2703,"cityName":"日喀则"},{"cityId":2704,"cityName":"山南"},{"cityId":2705,"cityName":"那曲"},{"cityId":2707,"cityName":"阿里"},{"cityId":2708,"cityName":"山南地区"},{"cityId":2709,"cityName":"昌都"},{"cityId":2710,"cityName":"林芝"}],"provinceSpell":"xizang"},{"provinceId":28,"provinceName":"新疆维吾尔自治区","cityVmList":[{"cityId":2801,"cityName":"乌市"},{"cityId":2803,"cityName":"克市"},{"cityId":2821,"cityName":"博州"},{"cityId":2822,"cityName":"巴州"},{"cityId":2823,"cityName":"伊犁"},{"cityId":2828,"cityName":"喀什地区"},{"cityId":2829,"cityName":"阿克苏地区"},{"cityId":2830,"cityName":"和田地区"},{"cityId":2831,"cityName":"塔城地区"},{"cityId":2832,"cityName":"吐鲁番地区"},{"cityId":2833,"cityName":"哈密地区"},{"cityId":2834,"cityName":"阿勒泰地区"},{"cityId":2835,"cityName":"克州"},{"cityId":652300,"cityName":"昌吉回族自治州"},{"cityId":659000,"cityName":"自治区直辖县级行政区划"}],"provinceSpell":"xinjiang"},{"provinceId":29,"provinceName":"云南省","cityVmList":[{"cityId":2901,"cityName":"昆明"},{"cityId":2902,"cityName":"玉溪"},{"cityId":2903,"cityName":"曲靖"},{"cityId":2907,"cityName":"保山"},{"cityId":2911,"cityName":"临沧"},{"cityId":2914,"cityName":"文山"},{"cityId":2915,"cityName":"版纳"},{"cityId":2918,"cityName":"昭通"},{"cityId":2922,"cityName":"丽江"},{"cityId":2923,"cityName":"红河"},{"cityId":2925,"cityName":"德宏"},{"cityId":2927,"cityName":"怒江"},{"cityId":2928,"cityName":"迪庆"},{"cityId":2929,"cityName":"普洱"},{"cityId":532300,"cityName":"楚雄彝族自治州"},{"cityId":532900,"cityName":"大理白族自治州"}],"provinceSpell":"yunnan"},{"provinceId":30,"provinceName":"浙江省","cityVmList":[{"cityId":3001,"cityName":"杭州"},{"cityId":3002,"cityName":"宁波"},{"cityId":3003,"cityName":"温州"},{"cityId":3005,"cityName":"嘉兴"},{"cityId":3006,"cityName":"金华"},{"cityId":3009,"cityName":"丽水"},{"cityId":3011,"cityName":"湖州"},{"cityId":3012,"cityName":"衢州"},{"cityId":3015,"cityName":"台州"},{"cityId":3016,"cityName":"绍兴"},{"cityId":3020,"cityName":"舟山"},{"cityId":339000,"cityName":"余慈"},{"cityId":339100,"cityName":"乐清地区"}],"provinceSpell":"zhejiang"},{"provinceId":31,"provinceName":"重庆市","cityVmList":[{"cityId":3101,"cityName":"重庆"}],"provinceSpell":"chongqing"}]}
//      this.cityTree=res.result;
      this.initCityTree(res.result);
//      this.parentCheckedMenuCode[]
//   this.userData = res.result;
//      this.initTreeData(res.result.optionalMenus);
//      this.initCheckedMenuCodeArray(res.result.optionalMenus);
//      this.initAllMenuCodeArray(res.result.optionalMenus);

    },
    mounted(){
      this.requestLocationList();
      let _self=this;
//      document.getElementById('box').onblur = function(){
//        if(document.getElementById('box').contains(window.event.srcElement)){
//            console.log(window.event.srcElement)
//        }else{
//          _self.ifShow=false;
//        }
//
//      };
    },
    methods:{
      initCityTree (cityTree){
        for(let i = 0 ;i <cityTree.length;i++){
          let item = cityTree[i];
          item.selected=false;
            for(let j = 0 ; j < item.cityVmList.length; j ++ ){
              let childItem = item.cityVmList[j];
              childItem.selected=false;
            }
        }
        this.cityTree= cityTree;
      },
      requestLocationList(){
        Api.base_sys_location({})
          .then(res => {
            if (res.status == true) {
              this.userData.optionalMenus=res.result;
            }else {}
          }).catch(err => {

        });
      },
      boxIsShow1(){
        this.ifShow = true;
      },
      boxIsShow(){
        this.ifShow = true;
        document.getElementById('box').focus();
      },
      cityBoxhide(){
        this.ifShow = false;
      },
      handleCheckAllChange(event,parentNode) {
        let provinceId= parentNode.provinceId;
        let provinceName=parentNode.provinceName;
        if(provinceId){
          console.log("parent-----start--------->");
          let checked=event;
          let parentCheckedMenuCodeSet = new Set (this.parentCheckedMenuCode);
          let childCheckedMenuCodeSet = new Set (this.childCheckedMenuCode);
          let parentCheckedMenuNameSet = new Set (this.parentCheckedMenuName);
          let childCheckedMenuNameSet = new Set (this.childCheckedMenuName);
          checked==true ? parentCheckedMenuCodeSet.add(provinceId) : parentCheckedMenuCodeSet.delete(provinceId);
          checked==true ? parentCheckedMenuNameSet.add(provinceName) : parentCheckedMenuNameSet.delete(provinceName);
          console.log("parent-----start-----checked---->",checked);
          for(let i = 0 ; i<this.cityTree.length;i++){
            let item=this.cityTree[i];
            if(item.provinceId==provinceId){
                for(let j = 0; j<item.cityVmList.length;j++){
                    let childItem = item.cityVmList[j];
                  console.log("parent-----start-----childItem---->",childItem);
                  if(checked){
                    childCheckedMenuCodeSet.add(childItem.cityId);
                    childCheckedMenuNameSet.add(childItem.cityName);
                    childItem.selected=true;
                  }else {
                    childCheckedMenuCodeSet.delete(childItem.cityId);
                    childCheckedMenuNameSet.delete(childItem.cityName);
                    childItem.selected=false;
                  }
                }
                item.selected = true;

            }
          }
//          let parentCheckedMenuCodeSet = new Set (this.parentCheckedMenuCode);

          this.childCheckedMenuCode=Array.from(childCheckedMenuCodeSet);
          this.parentCheckedMenuCode=Array.from(parentCheckedMenuCodeSet);

          this.childCheckedMenuName=Array.from(childCheckedMenuNameSet);
          this.parentCheckedMenuName=Array.from(parentCheckedMenuNameSet);
          this.parentCheckedMenuName=Array.from(parentCheckedMenuNameSet);
          this.childCheckedMenuName=Array.from(childCheckedMenuNameSet);
//          console.log('1111111',this.checkedMenuCodeArray);
          console.log("checkParent---parentCode--11111111111--",JSON.stringify(this.parentCheckedMenuCode));
          console.log("checkParent---childCode----",JSON.stringify(this.childCheckedMenuCode));
          console.log("checkParent---parentName----",JSON.stringify(this.parentCheckedMenuName));
          console.log("checkParent---childName----",JSON.stringify(this.childCheckedMenuName))
//          console.log("checkParent---treeObj----",this.cityTree)
        }
      },
      getParentByChildId (cityId){
        let parentItem;
        for(let i = 0 ; i<this.cityTree.length;i++){
          let item=this.cityTree[i];
          for(let j = 0; j<item.cityVmList.length;j++){
            let childItem = item.cityVmList[j];
            if(childItem.cityId==cityId){
              parentItem = item;
              break;
            }
          }
        }
        return parentItem;
      },
      handleCheckedChildChange(event,childNode) {
        let cityId =childNode.cityId
        console.log("checkChild---treeObj-----start-",this.childCheckedMenuCode);
        if(cityId){
          let checked = event;
          let menuCodeArray=[];
          let menuCodeNameArray = [];
          let parentItem= this.getParentByChildId(cityId);
          let childCheckedMenuCodeSet = new Set (this.childCheckedMenuCode);
          let parentCheckedMenuCodeSet = new Set (this.parentCheckedMenuCode);

          let parentCheckedMenuNameSet = new Set (this.parentCheckedMenuName);
          let childCheckedMenuNameSet = new Set (this.childCheckedMenuName);

          checked==true ? childCheckedMenuCodeSet.add(childNode.cityId) : childCheckedMenuCodeSet.delete(childNode.cityId);
          checked==true ? childCheckedMenuNameSet.add(childNode.cityName) : childCheckedMenuNameSet.delete(childNode.cityName);

          if(parentItem) {
              for(let i = 0 ; i<parentItem.cityVmList.length;i++){
                  if(parentItem.cityVmList[i].cityId == cityId){
                    parentItem.cityVmList[i].selected=event;
                    console.log("checkChild---treeObj----child---item",parentItem.cityVmList[i]);
                  }
                  menuCodeArray.push(parentItem.cityVmList[i].cityId);
                  menuCodeNameArray.push(parentItem.cityVmList[i].cityName);
              }
             console.log("checkChild---treeObj-----parentItem-",parentItem);
            let menuCodeArraySet = new Set (menuCodeArray);

            console.log("checkChild---treeObj-----menuCodeArray-",menuCodeArray);

            let hasChildArraySet = new Set([...menuCodeArraySet].filter(x => childCheckedMenuCodeSet.has(x))); //获取当前一级权限下所有子权限 和 已选择权限 交集
            console.log("checkChild---treeObj---hasChild---Size-",hasChildArraySet.size);
            if(hasChildArraySet.size>0){
              console.log("checkChild---treeObj---hasChild-",hasChildArraySet);
              parentCheckedMenuCodeSet.add(parentItem.provinceId);
              parentCheckedMenuNameSet.add(parentItem.provinceName);
              parentItem.selected=true;
            }else {
              parentCheckedMenuCodeSet.delete(parentItem.provinceId);
              parentCheckedMenuNameSet.delete(parentItem.provinceName);
              parentItem.selected=false;
            }
            this.parentCheckedMenuCode=Array.from(parentCheckedMenuCodeSet);
            this.childCheckedMenuCode=Array.from(childCheckedMenuCodeSet);
            this.parentCheckedMenuName=Array.from(parentCheckedMenuNameSet);
            this.childCheckedMenuName=Array.from(childCheckedMenuNameSet);
            console.log("checkChild---treeObj----",this.cityTree);
            console.log("checkChild---parentCode----",JSON.stringify(this.parentCheckedMenuCode));
            console.log("checkChild---childCode----",JSON.stringify(this.childCheckedMenuCode))
            console.log("checkChild---parentName----",JSON.stringify(this.parentCheckedMenuName));
            console.log("checkChild---childName----",JSON.stringify(this.childCheckedMenuName))
//            console.log('22222222',this.checkedMenuCodeArray);

          }

        }
      },
      allChecked(event){
        let checked=event;
        let checkedMenuCodeArraySet = new Set (this.checkedMenuCodeArray);
        if(checked){
          for(let i = 0 ; i< this.userData.optionalMenusTree.length;i++){
            let item=this.userData.optionalMenusTree[i];
            checkedMenuCodeArraySet.add(item.menucode);
            for(let x = 0 ; x<this.userData.optionalMenus.length;x++){
              let val=this.userData.optionalMenus[x];
              if(val.parentMenuCode==item.menucode){
                checkedMenuCodeArraySet.add(val.menucode);
              }
            }
          }
        }else{
          for(let i = 0 ; i< this.userData.optionalMenusTree.length;i++){
            let item=this.userData.optionalMenusTree[i];
            checkedMenuCodeArraySet.delete(item.menucode)
            for(let x = 0 ; x<this.userData.optionalMenus.length;x++){
              let val=this.userData.optionalMenus[x];
              if(val.parentMenuCode==item.menucode){
                checkedMenuCodeArraySet.delete(val.menucode);
              }
            }
          }
        }
        this.checkedMenuCodeArray=Array.from(checkedMenuCodeArraySet);
      },
      checkedCity(){
        let allCodeArray = this.parentCheckedMenuCode.concat(this.childCheckedMenuCode);
        let allNameArray = this.parentCheckedMenuName.concat(this.childCheckedMenuName);
        let allCodeStr=allCodeArray.join(",");
        let allNameStr=allNameArray.join(",");
        console.log(JSON.stringify(allCodeArray));
        console.log(JSON.stringify(allNameArray));
        this.$emit("call",{allCode:allCodeStr,allName:allNameStr});
//        this.newCityArr = this.childCheckedMenuName;
        this.ifShow = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .city-box-wrop{
    width: 40%;
    height: 34px;
    line-height: 34px;
    position: relative;
    border:1px solid #d8dce5;
    text-align: center;
    color: #d8dce5;
    border-radius: 4px;
  }
  .city-box {
    /*position: absolute;*/
    z-index: 999;
    overflow: hidden;
    /*padding-right: 15px;*/
    background: #fff
  }

  .city {
    width: 80%;
    float: left;
    line-height: 34px;
    color: #404C73;
    font-size: 14px;
    background: #fff
  }

  .city input {
    vertical-align: -2px;
    margin-right: 9px
  }
  .select-box{
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.428571429;
    color: #404C73;
    vertical-align: middle;
    background-color: #ffffff;
    border: 1px solid #E3E5E8;
  }

  .city .city-title {
    height: 34px;
    border-left: 1px solid #E3E5E8
  }

  .city-body {
    border: 1px solid #E3E5E8;
    border-bottom: none;
    height: 200px;
    overflow: scroll;
    background: #fff;
    padding-top: 18px;
    padding-left:20px;
  }

  .city-body .city-body-left {
    width: 5%;
    float: left;
    color: #404C73
  }

  .city-body .city-body-right {
    width: 95%;
    float: left;
    color: #ABB3C8
  }

  .city-body .city-body-right .city-body-title {
    color: #404C73;
    font-weight: 900
  }

  .city-body .city-body-right .city-body-content label {
    margin: 0 0 10px;
    line-height: 20px;
    padding-left: 0
  }

  .city-sidebar {
    width: 20%;
    float: left;
    line-height: 34px;
    color: #404C73;
    font-size: 14px;
    border-right: 1px solid #E3E5E8;
    background: #fff
  }

  .city-sidebar input {
    vertical-align: -2px;
    margin-right: 9px
  }

  .city-sidebar .city-body {
    border: none;
    border-top: 1px solid #E3E5E8
  }

  .city-sidebar label {
    margin: 0;
    line-height: 20px;
    color: #ABB3C8
  }

  .city-footer {
    height: 40px;
    padding-left:20px;
    padding-right:20px;
    line-height: 40px;
    background: #fff;
    float: left;
    border: 1px solid #E3E5E8;
  }
</style>
