<template>
  <div class="app-container">
    <div style="margin-bottom: 10px;font-size:10px;">选择：</div>
    <el-container style="height:100%">
      <el-aside width="200px" style="border: 1px silver solid">
        <!--部门-->
        <el-tree
          :data="data"
          :props="defaultProps"
          :default-expand-all="true"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </el-aside>
      <el-main style="padding:0 0 0 20px;">
        <el-row style="width: 100%">
          <!--排班日期分页-->
          <el-tag v-for="(item,index)  in  bookingScheduleList" :key ="item.id"
                  @click="selectDate(item.workDate, index)" :type ="index  ==  activeIndex ? ''  :  'info'"
                  style="height: 60px; margin-right: 5px; margin-right:15px;cursor:pointer;"
          >
            {{ item.workDate }} {{ item.dayOfWeek }}<br/>
            {{ item.availableNumber }} / {{ item.reservedNumber }}
          </el-tag>
          <el-pagination
            :current-page="page"
            :total="total"
            :page-size="limit"
            class="pagination"
            layout="prev,  pager,  next"
            @current-change="getPage"
          >
          </el-pagination>
        </el-row>
        <el-row style="margin-top: 20px;">
          <!--排班日期对应的排班医生-->
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getSchedule, getScheduleRule } from '@/api/hosptal'

export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'depname'
      },
      hoscode: null,
      activeIndex: 0,
      depcode: null,
      depname: null,
      workDate: null,

      bookingScheduleList: [],
      baseMap: {},

      page: 1, //  当前页
      limit: 7, //  每页个数
      total: 0 //  总页码
    }
  },
  created() {
    this.hoscode = this.$route.params.hoscode
    this.workDate = this.getCurDate()
    this.fetchData()
  },
  methods: {
    fetchData() {
      getSchedule(this.hoscode)
        .then(response => {
          this.data = response.data
          //  默认选中第一个
          if (this.data.length > 0) {
            this.depcode = this.data[0].children[0].depcode
            this.depname = this.data[0].children[0].depname
            this.getPage()
          }
        })
    },
    getPage(page = 1) {
      this.page = page
      this.workDate = null
      this.activeIndex = 0
      this.getScheduleRule()
    },
    getScheduleRule() {
      getScheduleRule(this.page, this.limit, this.hoscode, this.depcode).then(response => {
        this.bookingScheduleList = response.data.bookingScheduleRuleList

        this.total = response.data.total

        this.scheduleList = response.data.scheduleList
        this.baseMap = response.data.baseMap

        //  分页后workDate=null，默认选中第一个
        if (this.workDate == null) {
          this.workDate = this.bookingScheduleList[0].workDate
        }
      })
    },

    handleNodeClick(data) {
      //  科室大类直接返回
      if (data.children != null) return
      this.depcode = data.depcode
      this.depname = data.depname

      this.getPage(1)
    },

    selectDate(workDate, index) {
      this.workDate = workDate
      this.activeIndex = index
    },
    getCurDate() {
      var datetime = new Date()
      var year = datetime.getFullYear()
      var month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
      var date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
      return year + '-' + month + '-' + date
    }
  }
}

</script>

<style scoped>

</style>
