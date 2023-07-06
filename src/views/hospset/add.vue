
<template>
  <div class="app-container">
    <!--       医院设置添加 -->
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname" />
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode" />
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl" />
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName" />
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import {addHospSet,getHospSet,updateHospSet} from '../../api/hospset'
export default {

  data() {
    return {
        hospitalSet:{},
    };
  },
  methods:{
    getHospset(id){
        getHospSet(id).then(response =>{
            this.hospitalSet = response.data
        })
    },
    save(){
        this.$confirm("您确定要增加这个医院吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=>{
        addHospSet(this.hospitalSet).then(_ =>{
            this.$message({
                type:'success',
                message:_.message
            })
            //跳转列表页面，使用路由跳转方式实现
            this.$router.push({path:'/hospSet/list'})
        })
      })
    },
    update(){
      updateHospSet(this.hospitalSet).then(response=>{
        this.$message({
                type:'success',
                message:response.message
            })
         this.$router.push('/hospSet/list')   
      })
    },
    saveOrUpdate(){
        if(this.hospitalSet.id == null){
          this.save();
        }else{
          this.update();
        }
    }
  },
  created() {
    console.log('created getid :',this.$route.params.id)
    if(this.$route.params.id && this.$route.params){
      console.log('created enter',)
      this.getHospset(this.$route.params.id)
    }else{
      this.hospitalSet ={}
    }
  }
};
</script>

<style>
</style>