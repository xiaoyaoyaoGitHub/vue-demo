<template>
  <div class="app-container">
    <!-- 入库单管理 -->
    <div v-if="isShowIncomeManager">
      <el-form ref="form" :inline="true" :model="form" label-width="120px">
        <el-form-item label="订单编号">
          <el-input v-model="form.identifier" />
        </el-form-item>
        <el-form-item label="下单时间">
          <el-col :span="11">
            <el-date-picker
              v-model="form.startTime"
              type="date"
              placeholder="Pick a date"
              style="width: 100%;"
            />
          </el-col>
          <el-col :span="2" class="line">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="form.endTime"
              type="date"
              placeholder="Pick a time"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button><br>
        </el-form-item><br>
        <el-form-item>
          <el-button @click="reset">取消</el-button>
          <el-button type="primary" @click="createOutOrder">生成出库单</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column
          align="center"
          property="id"
          label="入库单编号"
          width="200"
        />
        <el-table-column label="下单时间" width="110" property="createTime" />
        <el-table-column
          label="商品信息"
          property="info"
          align="center"
          width="150"
        />
        <el-table-column label="收货人" property="receiver" align="center" />
        <el-table-column label="收货人手机号" property="recePhone" align="center" />
        <el-table-column
          align="center"
          prop="checker"
          label="收货地址"
          width="200"
          property="address"
        />
      </el-table>
      <el-pagination
        v-if="list"
        class="pageination"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.length"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getOutList, createOutOrder } from '@/api/outManager'

export default {
  components: {

  },
  data() {
    return {
      list: null,
      listLoading: false,
      checkOrder: {},
      isShowIncomeManager: true,
      multipleSelection: [], // 表格选中结果
      currentPage: 1,
      pageSize: '10',
      form: {
        identifier: '',
        startTime: '',
        endTime: ''
      }
    }
  },
  created() {
    this.getOutList()
  },
  methods: {
    // 搜索
    onSubmit() {
      // this.$message('submit!')
      this.getOutList()
    },
    // 取消
    reset() {
      this.$parent.handleISshowIncome()
    },
    // 生成出库单
    createOutOrder() {
      const { multipleSelection } = this || {}
      if (multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择最少一条数据'
        })
        return
      }
      // this.$parent.createOutOrder = multipleSelection
      // this.$parent.showDetail()
      this.createOutOrderList()
    },
    createOutOrderList() {
      const { multipleSelection } = this || {}
      createOutOrder(multipleSelection).then(res => {
        this.$message({
          type: 'success',
          message: '生成成功'
        })
      })
    },
    hanleCreateOutOrder(status) {
      this.isShowIncomeManager = status
    },
    // 获取入库单列表
    getOutList() {
      const { form } = this || {}
      this.listLoading = true
      getOutList({
        ...form,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data.items
        this.listLoading = false
      })
    },
    // 按钮订单状态
    orderStatus(e) {
      const { target } = e || {}
      if (target.localName === 'button') {
        this.form.status = target.getAttribute('status')
      } else {
        this.form.status = target.parentNode.getAttribute('status')
      }
      this.getIncomeList()
    },
    // 查看
    checkDetail({ col, row }) {
      // console.log(row)
      this.checkOrder = row
      this.handleISshowIncome(false)
    },
    //
    handleISshowIncome(status) {
      this.isShowIncomeManager = status
    },
    // 分页处理
    handleSizeChange(val) {
      console.log(`每页`, val)
      this.pageSize = val
      this.getOutList()
    },
    handleCurrentChange(val) {
      console.log(`当前页`, val)
      this.currentPage = val
      this.getOutList()
    },
    // 表格选中
    handleSelectionChange(val) {
      // console.log(this.multipleSelection)
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped lang="scss">
.btns {
  .checked {
    background-color: #409eff;
    color: #fff;
  }
}
.btnCheck {
  color: #409eff;
  text-decoration: underline;
  cursor: pointer;
}
.pageination {
  text-align: right;
  padding: 15px 0;
}
</style>
