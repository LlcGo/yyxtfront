<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select
          v-model="searchObj.provinceCode"
          placeholder="请选择省"
          @change="provinceChanged"
        >
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="searchObj.cityCode"
          placeholder="请选择市"
          @change="cityChanged"
        >
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- banner列表 -->
    <el-table v-loading=" listLoading"
              :data="list"
              border
              fit
              highlight-current-row
    >
      <el-table-column
        label="序号"
        width="60"
        align="center"
      >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="医院logo">
        <template slot-scope="scope">
          <img :src="'data:image/jpeg;base64,'+scope.row.logoData" width="80">
        </template>
      </el-table-column>
      <el-table-column prop="hosname" label="医院名称"/>
      <el-table-column prop="param.hostypeString" label="等级" width="90"/>
      <el-table-column prop="param.fullAddress" label="详情地址"/>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 0 ? '未上线' : '已上线' }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column label="操作" width="230" align="center">
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="current"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="fetchData"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
import { gethosptList,findByDictCode,findByParentId} from '../../api/hosptal'
export default {
  data() {
    return {
      current: 1,
      limit: 3,
      searchObj: {
        provinceCode: '',
        cityCode: ''
      },
      listLoading: false,
      // 接收所有用户信息
      provinceList: [],
      list: [],
      cityList: [],
      total: 0,
      districtList: []
    }
  },
  methods: {
    //   加载banner列表数据
    fetchData(page = 1) {
      console.log('翻页。。。' + page)
      //   异步获取远程数据（ajax）
      this.page = page
      gethosptList(this.page, this.limit, this.searchObj).then(
        response => {
          this.list = response.data.content
          this.total = response.data.totalElements
          //   数据加载并绑定成功
          this.listLoading = false
        }
      )
    },
    //   当页码发生改变的时候
    changeSize(size) {
      console.log(size)
      this.limit = size
      this.fetchData(1)
    },

    //   重置查询表单
    resetData() {
      console.log('重置查询表单')
      this.searchObj = {}
      this.fetchData()
    },
    provinceChanged() {
      this.cityList = []
      this.searchObj.cityCode = null
      this.districtList = []
      this.searchObj.districtCode  =  null
      findByParentId(this.searchObj.provinceCode).then(response => {
        this.cityList = response.data
      })
    }
  }
}

</script>

<style>
</style>
