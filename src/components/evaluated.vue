<template>
    <div class="evaluated" v-title='"已评价"'>
        <h2>{{content.time}}</h2>
        <el-rate
            v-model="content.satisfaction-1001"
            :texts="['非常不满意', '不满意', '一般', '比较满意', '非常满意']"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            text-color='#99A9BF'
            disabled-void-color='#c0c4cc'
            disabled
            show-text>
        </el-rate>
        <p class="evaluate-content">{{content.evaluate}}</p>
        <el-row :gutter="10" v-if="content.img_url.length">
          <el-col v-for='(item,index) in content.img_url' :key='index' :span="content.img_url|changenum">
            <div class="show-img">
                <img :src='item' @click='show_img(index)'>
            </div>
          </el-col>
        </el-row>
        <div class="show-img-no" v-else>
            <img src='./img/noimg.png'>
            <p>没有上传图片</p>
        </div>
        <div class="clear10"></div>
        <div class="clear10"></div>
        <div class="clear10"></div>
        <div class="clear10"></div>
        <div class="clear10"></div>
        <div class="text-center">
            <el-button size="medium" class='evaluated-btn' disabled>已评价</el-button>
        </div>
    </div>
</template>
<script>
export default {
    props:['content'],
    name:'evaluated',
    data() {
        return {}
    },
    methods:{
        show_img(index){
            wx.previewImage({
                current:this.content.img_url[index],
                urls:this.content.img_url
            });
        }
    },
    filters:{
        changenum(val){
            let _length = val.length;
            let _num = (_length<2?12:24/_length)
            return _num
        }
    }
}
</script>
<style scoped>
    .evaluated{padding:20px;}
    h2{margin-bottom: 40px;margin-top: 20px;}
    .evaluate-content{font-size: 16px;color: #777;line-height: 30px;margin-bottom: 20px;}
    /*显示图片*/
    .show-img{width: 100%;overflow: hidden;background-color: #f0f0f0;position:relative;border: 1px solid #c0ccda;border-radius: 6px;-webkit-box-sizing: border-box;box-sizing: border-box;margin: 0 8px 8px 0;}
    .show-img:after{content: '';display: block;margin-top: 100%;}
    .show-img img{width: 100%;height: 100%;position: absolute;top: 0;left: 0;}
    .show-img label{position: absolute;right: -15px;top: -6px;width: 40px;height: 24px;text-align: center;-webkit-transform: rotate(45deg);transform: rotate(45deg);-webkit-box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);box-shadow: 0 0 1px 1px rgba(0,0,0,.2);}
    .show-img i{position: absolute;top: 3px;right:3px;cursor: pointer;color: #606060;font-weight: bold;font-size: 11px;}
    .evaluated-btn{background-color: transparent;  border: 1px solid #dcdfe6;}
    .show-img-no{text-align: center;}
    .show-img-no img{height: 80%;width: 20%;}
    .show-img-no p{font-size: 11px;color: #ccc;}
</style>
<style>
    .el-rate__icon{font-size: 30px;margin:0 10px;}
    .el-rate__text{display: block;line-height: 70px;font-size: 16px;font-weight: bold;}
    .el-rate{height:auto;text-align: center;}
    @media screen and (max-width: 321px){
        .el-rate__icon{margin:0 8px;}
    }
</style>
