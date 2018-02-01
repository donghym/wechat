<template>
	<div class="service-list" v-title='"服务跟踪列表"'>
        <div class="item text-center" v-if="noservice">
            <img src="./img/no-service.png" alt="">
            <p>还没有预约任何服务</p>
        </div>
        <ul>
            <li v-for='item in servicelist' :key = 'item.service_id' v-loading.fullscreen.lock="servicelist.length==0" @click.stop='toOrderDetial(item.service_id)'>
                <p>
                    <span>预约时间：</span>
                    <strong>{{item.time}}</strong>
                    <em :class="item.status | classFilter">{{item.status | fontFilter}}</em>
                </p>
                <p>
                    <span>预约内容：</span>
                    <strong>{{item.content}}</strong>
                    <em class="fr" v-show="item.status==7 || item.status==6">
                        <el-button type="danger" plain size="mini" @click.stop='toEvaluate(item.service_id)'> 评 价 </el-button>
                    </em>
                </p>
                <i class="el-icon-arrow-right"></i>
            </li>
        </ul>
  </div>
</template>
<script>
import {serviceList} from '../service/getdata.js'
export default {
    data() {
      return {
        noservice:false, //解决当加载数据时出现‘没有服务图片’闪现的问题
        servicelist: [
            // {tiem:'4565456',status:1,content:'47545'},
            // {tiem:'4565456',status:2,content:''},
            // {tiem:'4565456',status:3,content:'47545'},
            // {tiem:'4565456',status:4,content:'47545'},
            // {tiem:'',status:'',content:''},
            // {tiem:'4565456',status:6,content:'47545'},
        ],
    }
  },
    methods:{
        async getServiceList(){
            let infojson = {
              'action':'getOrderList',
              'open_id':window.localStorage.getItem('open_id')
            }
            let reqData = await serviceList(infojson);
            if(reqData.data.code ==1){
            }else{
                this.servicelist = reqData.data
                this.noservice=!this.servicelist.length
            }
        },
        toOrderDetial(service_id){
            this.$router.push({ path: 'orderDetial', query: { 'service_id':service_id}})
        },
        toEvaluate(service_id){
            this.$router.push({ path: 'evaluate', query: { 'service_id':service_id}})
        }
    },
    filters:{
        classFilter: function (_class) {
            switch (_class){
                case 1:
                    return 'fr start'
                break;
                case 2:
                    return 'fr on'
                break;
                case 3:
                    return 'fr before'
                break;
                case 4:
                    return 'fr end'
                break;
                case 5:
                    return 'fr on'
                break;
                case 6:
                    return 'fr on'
                break;
                case 7:
                    return 'fr on'
                break;
            }
        },
        fontFilter:function(_font){
            switch (_font){
                case 1:
                    return '待派工'
                break;
                case 2:
                    return '已派工'
                break;
                case 3:
                    return '已受理'
                break;
                case 4:
                    return '已提交'
                break;
                case 5:
                    return '不处理'
                break;
                case 6:
                    return '处理完成'
                break;
                case 7:
                    return '处理完成'
                break;
            }
        }
    },
    created(){
        this.getServiceList();
    }
}
</script>
<style scoped>
	.service-list{background-color: #e7e8ed;margin:1em 0;}
	a{text-decoration: none;}
	li{padding:0 1.25em;border-bottom:solid 1px #c8cbd2;position:relative;background-color: #fff;}
	li p{line-height: 2.25em;}
	li span{color: #48576a;font-size: 0.875em;}
	li strong{color: #030303;font-weight: normal;font-size: 0.875em;}
	li em{font-style:normal;margin-right: 1.25em;font-size: 0.875em;}
	/*已提交*/li em.start{color:#777;}
    /*已受理*/li em.on{color:#1d9db8;}
    /*已受理*/li em.before{color:#1d9db8;}
	/*已派工*/li em.end{color:#2dc6a8;}
    li em button{margin-right: 5px;}
	li i{color: #8c8c8c;position: absolute;top: 1.875em;right: 1.25em;font-size: 1em;}
    .item{background-color: #fff;}
    .item img{width: 60%;margin-top: 20%;}
    .item p{color: #777;line-height:3;}
</style>
