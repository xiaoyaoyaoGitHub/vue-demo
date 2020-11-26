<template>
  <!-- 库存列表 -->
  <div class="app-container">
    <div v-if="showInventory">
      <!-- 输入框 集合-->
      <el-form
        ref="form"
        :inline="true"
        :model="searchTypes"
        label-width="80px"
      >
        <el-form-item label="商品名称">
          <el-input v-model="searchTypes.name" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select
            v-model="searchTypes.productType"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>

      <el-row class="commonPadding">
        <el-button
          type="primary"
          @click="createInventory"
        >创建入库单</el-button>
        <el-button @click="leadOut">导出</el-button>
      </el-row>
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
          label="系统库存"
          width="200"
          property="systemAmount"
        />
        <el-table-column
          align="center"
          prop="wareHouseAmount"
          label="仓库库存"
          property="wareHouseAmount"
          width="200"
        />
      </el-table>
      <el-pagination
        v-if="list"
        class="pageination"
        background
        layout="prev, pager, next"
        :total="list.length"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 创建订单库 -->
    <create-inventory
      v-if="!showInventory && multipleSelection.length !== 0"
      :multiple-selection="toCreateMultipleSections"
    />
  </div>
</template>

<script>
import { getList, getProdTypes, inventoryLeadOut } from '@/api/inventory'
import CreateInventory from './createInventory'

export default {
  components: {
    CreateInventory
  },
  filters: {},
  data() {
    return {
      list: null,
      listLoading: true,
      searchTypes: {
        name: '',
        productType: ''
      },
      currentPage: 1, // 当前页数
      types: null,
      showInventory: true, // 展示库存列表
      multipleSelection: [], // 表格选中结果
      toCreateMultipleSections: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 搜索
    onSubmit() {
      this.getInventory({ ...this.searchTypes, currentPage: this.currentPage })
    },
    // 获取表格 和商品分类
    fetchData() {
      this.getInventory()
      this.getInventoryTypes()
    },
    // 请求表格订购方式
    getInventory(params = {}) {
      this.listLoading = true
      this.multipleSelection = []
      getList(params).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    // 请求商品类型
    getInventoryTypes() {
      getProdTypes().then(res => {
        this.types = res.data.types
      })
    },
    // 表格点击触发方法
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 创建入库订单
    createInventory() {
      const { multipleSelection } = this || {}
      if (multipleSelection.length === 0) {
        this.$message({
          message: '请先选中一条数据',
          type: 'warning'
        })
        return
      }
      this.toCreateMultipleSections = this.multipleSelection.slice()
      this.handleInventory(false)
    },
    // 创建入库订单是否展示
    handleInventory(status) {
      this.showInventory = status
      if (status) this.getInventory()
    },
    // 分页处理
    handleSizeChange(val) {
      // console.log(`每页`, val)
    },
    handleCurrentChange(val) {
      console.log(`当前页`, val)
      this.currentPage = val
      this.getInventory({ ...this.searchTypes, currentPage: this.currentPage })
    },
    leadOut() {
      inventoryLeadOut().then(res => {
        this.$message({
          type: 'success',
          message: '导出成功'
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
.commonPadding {
  padding: 15px;
}
.pageination {
  text-align: right;
  padding: 15px 0;
}
</style>
