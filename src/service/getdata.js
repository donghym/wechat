import axios from 'axios'
import qs from 'qs'
let changejson = (json)=>{
	json.orgcode = window.localStorage.getItem('orgcode');
	return json
}

//获取配置参数:
export const getBasic		= (json) =>new axios.get("/wxorder/wxevaluate.php",{'params':changejson({'action':'signature'})});// -列表

//服务预约	

export const orderList		= (json) =>new axios.get("/wxorder/wxorderedit.php",{'params':changejson(json)});// -列表

export const orderSubmit	= (json) =>new axios.post("/wxorder/wxorderedit.php",qs.stringify(json));// 提交

// 服务跟踪列表

export const serviceList	= (json) =>new axios.get("/wxorder/wxorderfunc.php",{'params':changejson(json)});

//预约详情

export const orderDetail	= (json) =>new axios.get("/wxorder/wxorderfunc.php",{'params':changejson(json)});

// 派工详情

export const workDetail		= (json) =>new axios.get("/wxorder/wxorderfunc.php",{'params':changejson(json)});

// 查看评价

export const getEval		= (json) => new axios.get("/wxorder/wxevaluate.php",{'params':changejson(json)});	//获取评价

export const submitEval		= (json) => new axios.post("/wxorder/wxevaluate.php?action=save",qs.stringify(json));//保存评价

