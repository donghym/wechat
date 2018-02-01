<template>
    <div class="evaluate" v-title='"评价"' v-loading.fullscreen.lock="isLoading">
        <evaluated v-show='isEvaluate' :content = 'content' ></evaluated>
        <div v-show='!isEvaluate'>
            <h2>您对本次服务满意吗？</h2>
            <h2>{{thisdate}}</h2>
            <ul>
                <li v-for='item in worklist' v-loading.fullscreen.lock="worklist.length==0">
                    <div>
                        <p class="clearfix">
                            <span>服务人员:</span>
                            <strong>{{item.name}}</strong>
                        </p>
                        <p class="clearfix">
                            <span>联系电话:</span>
                            <strong>{{item.mobile}}</strong>
                        </p>
                    </div>
                    <div class="clearfix">
                        <span>处理结果:</span>
                        <div>
                            <strong class="result">{{item.ws_result}}</strong>
                        </div>
                    </div>
                </li>
            </ul>
          <el-rate
            v-model="ServiceFeedback__Satisfaction"
            :texts="['非常不满意', '不满意', '一般', '比较满意', '非常满意']"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            show-text>
          </el-rate>
          <el-input
            type="textarea"
            :rows="8"
            :maxlength='100'
            placeholder="请输入内容"
            v-model="ServiceFeedback__Evaluate">
          </el-input>
            <div class="clear10"></div>
            <div class="clear10"></div>
            <div class="clear10"></div>
            <el-row :gutter="10">
              <el-col :span="6" v-for='(item,index) in images.localId' :key='index'>
                <div class="show-img">
                    <img :src='item' @click='show_img(index)'>
                    <label @click='remove_img(index)'></label>
                    <i class="el-icon-close" @click='remove_img(index)'></i>
                </div>
              </el-col>
              <el-col :span="6" v-show="imgnum!==images.localId.length">
                <div class="add-img" @click="choiceImg">
                    <i class="el-icon-plus"></i>
                    <p>
                        添加图片
                        <br>
                        （{{images.localId.length}}/{{imgnum}}）
                    </p>
                </div>
              </el-col>
            </el-row>
            <div class="clear10"></div>
            <div class="clear10"></div>
            <div class="clear10"></div>
            <div class="text-center">
                <el-button type="danger" @click="submiteval">提 交</el-button>
            </div>
            <el-dialog
                :visible.sync="dialogVisible"
                width="70%"
                @close="handleClose"
                custom-class="evaluate_success"
                top='0'
              >
              <img src="./img/success.png" style="width:23%;margin:0 auto;display:block;">
              <div class="clear10"></div>
              <div class="clear10"></div>
              <h3 class="text-center">感谢您的评价！</h3>
            </el-dialog>

        </div>
    </div>
</template>
<script>
    import evaluated from './evaluated'
    import {workDetail,submitEval,getEval,getBasic,submitImgs} from '../service/getdata.js'
export default {
  name:'work_detial',
    data() {
      return {
        isLoading                     :true,
        isEvaluate                    :false,
        dialogVisible                 :false,
        ServiceFeedback__Satisfaction :5,
        ServiceFeedback__Evaluate     :'',
        worklist                      :[],
        imgnum                        :4,
        images:{
            localId  : [],
            serverId : []
        },
        content:{
            time         :'2010-02-41',
            evaluate     :'sdsdsddada',
            satisfaction :1004,
            img_url      :[]
        }
    }
  },
  components:{
    evaluated
  },
  computed:{
    thisdate(){
        let now = new Date();
        let year = now.getFullYear();       //年
        let month = now.getMonth() + 1;     //月
        let day = now.getDate();            //日
        let clock = year + "-";
        if(month < 10)
            clock += "0";
        clock += month + "-";
        if(day < 10)
            clock += "0";
        clock += day;
        return clock
    }
  },
    methods:{
        async basicjosn(){
            let data = await getBasic();
            let localData = data.data;
            wx.config({
                debug: false,
                appId: localData.appId,
                timestamp: localData.timestamp,
                nonceStr: localData.nonceStr,
                signature: localData.signature,
                jsApiList: [
                    'checkJsApi',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'getLocalImgData',
                    'downloadImage',
                ]
            });
            wx.checkJsApi({
                jsApiList: [
                    'chooseImage',  
                    'previewImage',
                    'uploadImage',
                    'getLocalImgData'
                ],
                success: function (res) {
                    // alert(JSON.stringify(res));
                }
            });
        },
        handleClose(){
            this.geteval()
        },
        choiceImg(){
            let _this = this;
            wx.chooseImage({
                count      : _this.imgnum-_this.images.localId.length,//还可以上传几张图片
                sizeType   : ['original', 'compressed'],
                sourceType : ['album', 'camera'],
                success:function (res) {
                    _this.images.localId.push(...res.localIds);
                    if(res.localIds.indexOf("wxlocalresource") != -1){
                        res.localIds = res.localIds.replace("wxlocalresource", "wxLocalResource");
                    }
                    let i = 0, length = res.localIds.length;
                    function upload() {
                        wx.uploadImage({
                            localId: res.localIds[i],
                            success: function (res) {
                                i++;
                                _this.images.serverId.push(res.serverId);
                                if (i < length) {
                                    upload();
                                }
                            },
                            fail: function (res) {
                              alert(JSON.stringify(res));
                            }
                        });
                    }
                    upload();
                }
            });
        },
        remove_img(index){
            this.images.localId.splice(index, 1);
            this.images.serverId.splice(index, 1);
        },
        show_img(index){
            let _this = this;
            wx.previewImage({
                current :_this.images.localId[index],
                urls    :_this.images.localId
            });
        },
        async geteval(){
            let json = {
                action     :'view',
                service_id :this.$route.query.service_id
            }
            let data = await getEval(json);
            this.isLoading  = false
            if(data.data.success){
                if(!data.data.content.satisfaction){    //未评价
                    this.basicjosn();
                    this.isEvaluate = false
                }else{                                  //已评价
                    this.content    = data.data.content    
                    this.isEvaluate = true
                }
            }else{
                this.$message.error('获取评价失败');
            }
        },
        async submiteval(){
            this.isLoading = true
            let json = {
                ServiceFeedback__RelatedToID:this.$route.query.service_id,
                ServiceFeedback__Satisfaction:this.ServiceFeedback__Satisfaction+1001,
                ServiceFeedback__Evaluate:this.ServiceFeedback__Evaluate,
                img_ids:this.images.serverId,
            }
            let data       = await submitEval(json);
            this.isLoading = false
            if(data.data.success){
                this.dialogVisible =true
            }else{
                this.$message.error('提交失败');
            }
        }
    },
    created(){
        this.geteval();
    }
}
</script>
<style scoped>
    .evaluate{padding:20px;}
    h2{margin-bottom: 40px;}
    .evaluate-content{font-size: 16px;color: #777;line-height: 30px;margin-bottom: 20px;}
    .success{width: 60%;display: block;margin: 0 auto;}
    /*显示图片*/
    .show-img{width: 100%;overflow: hidden;background-color: #f0f0f0;position:relative;border: 1px solid #c0ccda;border-radius: 6px;-webkit-box-sizing: border-box;box-sizing: border-box;margin: 0 8px 8px 0;}
    .show-img:after{content: '';display: block;margin-top: 100%;}
    .show-img img{width: 100%;height: 100%;position: absolute;top: 0;left: 0;}
    .show-img label{position: absolute;right: -15px;top: -6px;width: 40px;height: 24px;text-align: center;-webkit-transform: rotate(45deg);transform: rotate(45deg);-webkit-box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);}
    .show-img i{position: absolute;top: 3px;right:3px;cursor: pointer;color: #606060;font-weight: bold;font-size: 11px;}
    /*添加图片*/
    .add-img{background-color: #fbfdff;border: 1px dashed #c0ccda;border-radius: 6px;box-sizing: border-box;vertical-align: top;position: relative;}
    .add-img:after{content: '';display: block;margin-top: 100%;}
    .add-img i{position:absolute;left: 50%;top: 28%;transform: translate(-50%,-50%);font-weight: bolder;}
    .add-img p{position:absolute;left: 50%;top: 62%;transform: translate(-47%,-50%);font-size: 12px;text-align: center;text-overflow: ellipsis;white-space: nowrap;line-height: 16px;}
</style>
<style>
    .el-rate__icon{font-size: 30px;margin:0 10px;}
    .el-rate__text{display: block;line-height: 70px;font-size: 16px;font-weight: bold;}
    .el-rate{height:auto;text-align: center;}
    .evaluate_success{background-color: #ebebeb;position: absolute;top: 50%; left: 50%;transform: translate(-50%,-60%);margin: 0}
</style>
