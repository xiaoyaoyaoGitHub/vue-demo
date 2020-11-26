
<template>
  <div>
    <el-row :gutter="10">
      <el-col
        :span="3"
        class="labelName"
      ><div class="grid-content bg-purple" />出库单编号:</el-col>
      <el-col
        :span="6"
      ><div class="grid-content bg-purple" />{{ checkOrder.id }}</el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col
        :span="3"
        class="labelName"
      ><div class="grid-content bg-purple" />出库单创建时间:</el-col>
      <el-col
        :span="6"
      ><div class="grid-content bg-purple" />{{ checkOrder.createTime }}</el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col
        :span="3"
        class="labelName"
      ><div class="grid-content bg-purple" />出库总量:</el-col>
      <el-col
        :span="6"
      ><div class="grid-content bg-purple" />{{ checkOrder.outAmount }}</el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col
        :span="3"
        class="labelName"
      ><div class="grid-content bg-purple">出库状态:</div></el-col>
      <el-col
        :span="4"
      ><div class="grid-content bg-purple" style="display:inline">{{ checkOrder.status }}
      </div>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="createOrder">生成发货单</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col
        :span="3"
        class="labelName"
      ><div class="grid-content bg-purple" />出库时间:</el-col>
      <el-col
        :span="6"
      ><div class="grid-content bg-purple" />{{ checkOrder.status }}</el-col>
    </el-row>

    <!-- 表格 -->
    <!-- 表格 -->
    <el-table
      :data="orderLists"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <!-- <el-table-column type="selection" align="center" width="55" /> -->
      <el-table-column v-if="false" align="center" label="ID" width="95" />
      <el-table-column label="商品名称" width="110" property="prodName" />
      <el-table-column
        label="商品分类"
        property="prodClass"
        align="center"
        width="150"
      />
      <el-table-column label="商品条目" property="prodType" align="center" />
      <el-table-column
        label="商品规格"
        property="prodStandard"
        align="center"
      />
      <el-table-column
        align="center"
        prop="systemAmount"
        label="入库数量"
        width="200"
        property="systemAmount"
      />
    </el-table>
    <el-pagination
      v-if="orderLists"
      class="pageination"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="orderLists.length"
      :current-page="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 返回按钮 -->
    <el-form>
      <el-button @click="reset">返回</el-button>
    </el-form>
  </div>
</template>
<script>

import { getOrderDetailList } from '@/api/incomeManager'

export default {
  props: {
    checkOrder: {
      type: Object,
      default() {
        return {}
      }

    }
  },
  data() {
    return {
      orderLists: null,
      pageSize: '10',
      currentPage: 1
    }
  },
  mounted() {
    this.getOrderDetail()
  },
  methods: {
    //   获取表格数据
    getOrderDetail() {
      const { currentPage, pageSize } = this || {}
      getOrderDetailList({ currentPage, pageSize }).then(res => {
        this.orderLists = res.data.items
      })
    },
    createOrder() {
      this.$parent.createReceiveOrder()
    },
    reset() {
      this.$parent.handleISshowIncome(true)
    },
    // 分页处理
    handleSizeChange(val) {
      console.log(`每页`, val)
      this.pageSize = val
      this.getOrderDetail()
    },
    handleCurrentChange(val) {
      console.log(`当前页`, val)
      this.currentPage = val
      this.getOrderDetail()
    }
  }
}
</script>
<style lang="scss" scoped>
    .labelName {
        text-align: right;
    }
    .el-row {
        padding: 15px 0;
        font-weight: bold;
        font-size: 20px;
    }
    .el-form {
        padding: 15px 0;
        text-align: center;
    }
    .pageination {
  text-align: right;
  padding: 15px 0;
}
</style>
