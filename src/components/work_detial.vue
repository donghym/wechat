<template>
	<div class="work-list" v-title='"派工详情"'>
    <el-card class="box-card" v-if="noworklist">
        <div class="text item text-center">没有您的派工信息</div>
    </el-card>
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
  </div>
</template>
<script>
import {workDetail} from '../service/getdata.js'
export default {
  name:'work_detial',
    data() {
      return {
        noworklist:false,
        worklist:[]
    }
  },
    methods:{
        async getWorkDetial(){
            let infojson = {
              'action':'getDispatchDetail',
              'service_id':this.$route.query.service_id
            }
            let reqData = await workDetail(infojson);
            if(reqData.data.code ==1){

            }else{
				this.worklist   = reqData.data
				this.noworklist =!this.worklist.length
            }
        }
    },
    created(){
        this.getWorkDetial();
    }
}
</script>
<style scoped>
  .work-list{background-color: #e7e8ed;margin:1em 0;}
  li{padding:0 1.25em;border-bottom:solid 1px #c8cbd2;position:relative;background-color: #fff;line-height: 2.25em;}
  li *{font-size:1em;}
  li p{width:49%;float: left;}
  li span{color: #48576a;float: left;width: 5em;}
  li strong{color: #030303;font-weight: normal;}
  li>div>div{margin-left:5em;}
</style>
