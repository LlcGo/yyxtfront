<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <div>
        <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
      </div>
    </el-form>
    <!-- table -->
    <el-table :data="list" @selection-change="handleSelectionChange" stripe style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="50" />
      <el-table-column prop="hosname" label="医院名称" />
      <el-table-column prop="hoscode" label="医院编号" />
      <el-table-column prop="apiUrl" label="api基础路径" width="200" />
      <el-table-column prop="contactsName" label="联系人姓名" />
      <el-table-column prop="contactsPhone" label="联系人手机" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">{{ scope.row.status === 1 ? '可用' : '不可用' }}</template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeById(scope.row.id)"
          ></el-button>
          <el-button
            v-if="scope.row.status==1"
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="lockHostSet(scope.row.id,0)"
          >锁定</el-button>
          <el-button
            v-if="scope.row.status==0"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="lockHostSet(scope.row.id,1)"
          >取消锁定</el-button>
          <router-link :to="'/hospSet/edit/'+scope.row.id" style="margin-left:8px">
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding:30px 0 ;text-align:center;"
      layout="total,prev,pager,next,jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import {
  gethospsetList,
  deleteHospSet,
  removeRows,
  lockHospSet
} from "../../api/hospset";
export default {
  data() {
    return {
      current: 1,
      limit: 3,
      searchObj: {
        hosname: "",
        hoscode: ""
      },
      //接收所有用户信息
      list: [],
      total: 0,
      //选中的信息
      multipleSelection: []
    };
  },
  methods: {
    //设置锁定
    lockHostSet(id, status) {
      this.$confirm("此操作将永久删除医院是设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //开始修改锁定的数据
        lockHospSet(id, status).then(response => {
          //提示
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.getList(1);
        });
      });
    },
    //选定的时候触发
    handleSelectionChange(selection) {
      console.log("handleSelectionChange :", selection);
      this.multipleSelection = selection;
    },
    //批量删除根据id
    removeRows() {
      this.$confirm("此操作将永久删除医院是设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //确定执行then方法
        var idList = [];
        //遍历数组得到每个id值，设置到idList里面
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var obj = this.multipleSelection[i];
          var id = obj.id;
          idList.push(id);
        }
        //调用接口
        removeRows(idList).then(response => {
          //提示
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          //刷新页面
          this.getList(1);
        });
      });
    },
    //根据id删除
    removeById(id) {
      this.$confirm("此操作将永久删除医院是设置信息,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //确定执行then方法
        //调用接口
        deleteHospSet(id).then(response => {
          this.$message({
            type: "success",
            message: response.message
          });
          console.log("removeById :", response);
          this.getList(1);
        });
      });
    },
    //page 默认为1传入的时候
    getList(page = 1) {
      this.current = page;
      //   console.log(this.current)
      gethospsetList(this.current, this.limit, this.searchObj)
        .then(response => {
          console.log("getList :", response);
          (this.list = response.data.records),
            (this.total = response.data.total);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style>
</style>