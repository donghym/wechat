<template>
	<div class="ordered" v-title='"服务预约"'>
		<el-form :model="ordered" :rules="rules" ref="ordered" label-width="100px" v-loading.fullscreen.lock="order.length==0 || isLoading">
			<el-form-item v-for='(item,index) in order' key='item.dict_type+index' :prop=item.dict_name :label=item.wx_label_name 
				 v-bind:class="{'is-required':item.necessary && (item.dict_type=='date'||item.dict_type=='select')}"
				 >
				<el-input type='input' :placeholder="'请输入'+item.wx_label_name" v-model = "ordered[item.dict_name]" v-if='item.dict_type=="mobile"||item.dict_type=="input"'></el-input>
				<el-input type='textarea' :placeholder="'请输入'+item.wx_label_name" v-model = "ordered[item.dict_name]" v-if='item.dict_type=="textarea"'></el-input>
				<el-date-picker
					v-if='item.dict_type=="date"'
					v-model="ordered[item.dict_name]"
				  	style='width:100%;'
					type="date"
  					value-format="yyyy-MM-dd"
					placeholder="选择日期"
					focus="this.blur();">
				</el-date-picker>
				<el-select 
					v-if='item.dict_type=="select"'
					v-model = "ordered[item.dict_name]" 
					:placeholder="'请选择'+item.wx_label_name" 
					style='width:100%;'
				>
					<el-option v-for='option in item.options' :label='option.value' :value='option.key' key='option.key'></el-option>
				</el-select>
			</el-form-item>
			<div class='text-center'>
				<el-button type="danger" @click="submitForm('ordered')">提交</el-button>
			</div> 
		</el-form>
		<el-dialog
		:visible.sync="dialogVisible"
		title=" "
		:show-close=true
		:close-on-click-modal=false
		custom-class="orderdialog"
		>
		<div class="text-center">提交成功</div>
		<div slot="footer" class="text-center dialog-footer">
			<el-button type="danger">确 定</el-button>
		</div>
		</el-dialog>
  </div>
</template>
<script>
import {orderList,orderSubmit} from '../service/getdata.js'
export default {
    data() {
      	return {
      		ordered:{
      			'ServiceRequest__OpenID':window.localStorage.getItem('open_id'),
      		},
      		rules:{
      		},
        	dialogVisible: false,
			order: [],
			isLoading:false
    	}
	},
    methods:{
		async addrules(){ 
            let infojson = {
                'action':'getPageInfo'
            }
            let infoList = await orderList(infojson);
            this.order = {...infoList.data}
	    	let mobileRules = (rule,value,callback)=>{
	    		var telreg = /^1[3|5|8|4|7]\d{9}$/ , phonereg = /^0\d{2,3}-?\d{7,8}$/;
				if(!telreg.test(value)){ 
					return callback(new Error('请输入有效的手机号码'));
				}
	          	if (!Number.isInteger(value)) {
	              	callback();
	          	} 
	    	};
			infoList.data.map((val,index)=>{
				this.rules[val.dict_name]=[];
				let trigger = '';
				if(val.dict_type=='input'||val.dict_type=='textarea'||val.dict_type=='mobile'){
					trigger = 'blur'
				}else{
					trigger = 'change'
				}
		      	let otherRules = (rule, value, callback) => {
		        	if (!value) {
		         		return callback(new Error('请选择'+val.wx_label_name));
		        	}else{
		        		callback();
		        	}
		      	};
				if(val.necessary && (val.dict_type!='date' && val.dict_type!='select')){
					this.rules[val.dict_name].push({required:true,message:(val.dict_type=='select'?'请选择':'请输入')+val.wx_label_name,trigger:trigger})
				}else if(val.necessary && (val.dict_type=='date'||val.dict_type=='select')){
					this.rules[val.dict_name].push({ validator: otherRules, trigger: 'change' })
				}
				if(val.dict_type=='mobile'){
					this.rules[val.dict_name].push({ validator: mobileRules, trigger: 'blur' })
				}else if(val.dict_type!='date' && val.dict_type!='select'){
					this.rules[val.dict_name].push({min:0,max:val.dict_length,message:'长度在 0 到'+val.dict_length+'个字符',trigger:trigger})
				}

			})
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.isLoading = true
					let _this = this;
		            (async function(){
		                let req = await orderSubmit(_this.ordered);
		                if(req.data.code==1){ 	//错误提交
		                	_this.$confirm(req.data.message);
							this.isLoading = false
		                }else{
		                	_this.$router.push({path:'/serviceList'});
		                }
		            })()
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		}
    },
    created(){
    	this.addrules();
    },
	mounted() {

	}
}
</script>
<style scoped>
	.ordered{margin:1em 0;font-size: 0.875em;}
	.orderdialog{width: 70%;}
	.el-form-item{padding-right:1.25em;border-bottom: #ccc solid 1px;padding-bottom:1.25em;margin-bottom: 1.25em;}
</style>
