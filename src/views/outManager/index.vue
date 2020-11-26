<template>
  <div class="app-container">
    <!-- 入库单管理 -->
    <div v-if="isShowIncomeManager">
      <el-form ref="form" :inline="true" :model="form" label-width="120px">
        <el-form-item label="出库单编号">
          <el-input v-model="form.identifier" />
        </el-form-item>
        <el-form-item label="创建时间">
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
              placeholder="Pick a date"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <!-- <el-button @click="onCancel">Cancel</el-button> --> </el-form-item><br>
        <el-form-item class="btns" label="状态:">
          <el-button
            status="0"
            :class="form.status === '0' ? 'checked' : ''"
            @click="orderStatus"
          >全部</el-button>
          <el-button
            status="1"
            :class="form.status === '1' ? 'checked' : ''"
            @click="orderStatus"
          >未入库</el-button>
          <el-button
            status="2"
            :class="form.status === '2' ? 'checked' : ''"
            @click="orderStatus"
          >已拒绝</el-button>
          <el-button
            status="3"
            :class="form.status === '3' ? 'checked' : ''"
            @click="orderStatus"
          >已入库</el-button>
        </el-form-item>
        <br>
        <el-form-item label="">
          <el-button type="primary" @click="createOrder">创建出库单</el-button>
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
      >
        <!-- <el-table-column type="selection" align="center" width="55" /> -->
        <el-table-column
          align="center"
          property="id"
          label="出库单编号"
          width="200"
        />
        <el-table-column label="创建时间" width="110" property="createTime" />
        <el-table-column
          label="出库总量"
          property="outAmount"
          align="center"
          width="150"
        />
        <el-table-column label="出库状态" property="status" align="center" />
        <el-table-column
          align="center"
          prop="handle"
          label="操作"
          property="handle"
          width="200"
        >
          <template slot-scope="scoped">
            <span class="btnCheck" @click="checkDetail(scoped)">查看</span>
            <span
              class="btnCheck"
              @click="createReceiveOrder(scoped)"
            >生成发货单</span>
          </template>
        </el-table-column>
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
    <!-- 创建出库单 -->
    <out-manger v-if="isShowOutOrder" />
    <!-- 生成出库单 -->
    <create-out-manager v-if="showOutOrderDetail" :check-order="checkOrder" />
  </div>
</template>

<script>
import { getOutOrder, createOutOrder } from '@/api/outManager'
import OutManger from './outManager'
import CreateOutManager from './createOuterManager'

export default {
  components: {
    OutManger,
    CreateOutManager
  },
  data() {
    return {
      list: null,
      listLoading: false,
      checkOrder: {},
      isShowIncomeManager: true,
      isShowOutOrder: false,
      showOutOrderDetail: false,
      currentPage: 1,
      pageSize: '10',
      form: {
        identifier: '',
        startTime: '',
        endTime: '',
        buyer: '',
        checker: '',
        status: '0'
      }
    }
  },
  created() {
    this.getOutOrderLists()
  },
  methods: {
    onSubmit() {
      // this.$message('submit!')
      console.log(this.form)
      this.getOutOrderLists()
    },
    // 获取入库单列表
    getOutOrderLists() {
      const { form } = this || {}
      this.listLoading = true
      getOutOrder({
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
      this.getOutOrderLists()
    },
    // 查看
    checkDetail({ col, row }) {
      this.checkOrder = row
      this.showDetail()
    },
    showDetail() {
      this.isShowIncomeManager = false
      this.isShowOutOrder = false
      this.showOutOrderDetail = true
    },
    createOrder() {
      this.isShowIncomeManager = false
      this.isShowOutOrder = true
      this.showOutOrderDetail = false
    },
    //
    handleISshowIncome() {
      this.isShowIncomeManager = true
      this.isShowOutOrder = false
      this.showOutOrderDetail = false
    },
    // 创建发货单
    createReceiveOrder({ col, row } = {}) {
      row = row || this.checkOrder
      this.$confirm('是否生成发货单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          createOutOrder(row).then(res => {
            this.$message({
              type: 'success',
              message: '生成成功'
            })
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        })
    },
    // 分页处理
    handleSizeChange(val) {
      console.log(`每页`, val)
      this.pageSize = val
      this.getOutOrderLists()
    },
    handleCurrentChange(val) {
      console.log(`当前页`, val)
      this.currentPage = val
      this.getOutOrderLists()
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
