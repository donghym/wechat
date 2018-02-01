<template>
	<div class="service-detial" v-title='"预约详情"' v-loading.fullscreen.lock="orderData.status==''">
        <div class="clearfix">
            <span>预约时间：</span>
            <div>
                <strong>{{orderData.create_time}}</strong>
            </div>
        </div>
        <div class="clearfix">
            <span>预约类型：</span>
            <div>
                <strong>{{orderData.type_name}}</strong>
            </div>
        </div>
        <div class="clearfix">
            <span>产品类型：</span>
            <div>
                <strong>{{orderData.ylproduct}}</strong>
            </div>
        </div>
        <div class="clearfix">
            <span>购买时间：</span>
            <div>
                <strong>{{orderData.buy_time  }}</strong>
            </div>
        </div>
        <div class="clearfix">
            <span>购买门店：</span>
            <div>
            <strong>{{orderData.buyshop  }}</strong>
            </div>
        </div>
        <div class="clearfix">
            <span>预约内容：</span>
            <div>
                <strong>{{orderData.service_subject  }}</strong>
            </div>
        </div>
        <div class="clearfix">
            <span>姓名：</span>
            <div>
                <strong>{{orderData.new_contract_id  }}</strong>
            </div>
        </div>
        <div class="clearfix">
            <span>手机号：</span>
            <div>
                <strong>{{orderData.mobile  }}</strong>
            </div>
        </div>
        <div class="clearfix">
            <span>地址：</span>
            <div>
                <strong>{{orderData.service_addr  }}</strong>
            </div>
        </div>
        <div class="clearfix">
            <span>执行情况：</span>
            <div>
                <strong>{{orderData.status | changeState}}</strong>
            </div>
        </div>
        <!-- 娜娜Vin:
            服务请求 无需派工关闭 有两个状态不处理，和处理完成
            娜娜Vin:
            这时候这个派工信息漏出来了
            这个派工详情在没有派工人员信息表的时候不应该露出来 -->
        <div class="clearfix" v-if="orderData.status ==2 || orderData.status ==7">
            <span>派工详情：</span>
            <div>
                <strong>
                    <router-link :to="{ path: 'workDetial', query: { 'service_id': this.$route.query.service_id}}">
                        查看派工详情
                    </router-link>
                </strong>
            </div>
        </div>
        <div class="text-center" v-show='orderData.status==7 || orderData.status==6'>
            <div class="clear10"></div>
            <el-button type="danger"><router-link :to="{ path: 'evaluate', query: { 'service_id':this.$route.query.service_id}}" class='evaluate'>  评 价 </router-link></el-button>
        </div>
    </div>
</template>
<script>
import {orderDetail} from '../service/getdata.js'
export default {
    data() {
        return {
            orderData:{
                status:''
            }
        }
    },
    methods:{
        async getOrderDetial(){
            let infojson = {
              'action':'getOrderDetail',
              'service_id':this.$route.query.service_id
            }
            let reqData = await orderDetail(infojson);
            console.log(reqData.data)
            if(reqData.data.code ==1){

            }else{
                this.orderData = {...reqData.data}
            }
        },
    },
    filters:{
        changeState:function(val){
            switch (val){
                case 1:
                    return '待派工';
                    break;
                case 2:
                    return '已派工';
                    break;
                case 3:
                    return '已受理';
                    break;
                case 4:
                    return '已提交';
                    break;
                case 5:
                    return '不处理';
                    break;
                case 6:
                    return '处理完成';
                    break;
                case 7://无需派工关闭
                    return '处理完成';
                    break;
            }
        }
    },
    created(){
        this.getOrderDetial();
    }
}
</script>
<style scoped> 
.service-detial{margin:1em 0;}
.service-detial>div:not(:last-child){padding-right:20px;border-bottom: #ccc solid 1px;}
.service-detial>div span{text-align:right;float: left;color: #48576a;padding-right: 0.75em;box-sizing: border-box;width: 6.25em;line-height:2.25em;}
.service-detial>div strong{color: #030303;font-weight: normal;}
.service-detial>div div{margin-left: 6.25em;line-height:2.25em;}
.evaluate{color: #fff;text-decoration: none;}
</style>
