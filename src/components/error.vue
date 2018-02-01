<template>
  <div>
      <div class="text-center">
        <img src='./img/404.png' alt="404">
        <div>
            <el-button type="primary" round>
                <router-link to="/">返回首页</router-link>
            </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style scoped> 
  img{width: 80%;margin:20px 10px;}
  a{text-decoration: none;color: #fff;}
</style>