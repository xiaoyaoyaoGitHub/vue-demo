<template>
  <div>
    <!-- 表单 -->
    <el-form ref="form" :model="form" label-width="80px" class="createForm">
      <el-form-item label="供应商">
        <el-input
          v-model="form.desc"
          type="textarea"
          placeholder="请填写供应商"
        />
      </el-form-item>
      <el-form-item label="采购员">
        <el-input v-model="form.buyer" type="input" placeholder="" />
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="multipleSelection"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @cell-click="cellclick"
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
      >
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isOK"
            ref="gain"
            v-model="scope.row.wareHouseAmount"
            size="mini"
            @keyup.native.enter="blurClick(scope)"
            @blur="blurClick(scope)"
          />
          <span v-else>{{ scope.row.wareHouseAmount }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 按钮 -->
    <el-form>
      <el-form-item class="commomPadding">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="onReset">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { createInventory } from '@/api/inventory'

export default {
  props: {
    multipleSelection: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      form: {
        desc: '', // 供应商
        buyer: '' // 采购员
      }
    }
  },
  mounted() {},
  methods: {
    //   立即创建
    onSubmit() {
      //   console.log('submit!')
      const { form, multipleSelection } = this || {}
      createInventory(form, multipleSelection).then(res => {
        if (res.code === 20000) {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          this.$parent.handleInventory(true)
        }
      })
    //   createInventory()
    },
    // 取消创建
    onReset() {
      this.$parent.handleInventory(true)
    },
    cellclick(row, column, cell, event) {
      if (column.property === 'wareHouseAmount') {
        this.$set(row, 'isOK', true)
      }
      this.$nextTick(() => {
        this.$refs.gain.focus()
      })
    },
    blurClick({ row, column }) {
      console.log(`column`, column)
      console.log(this.multipleSelection)
      if (column.property === 'wareHouseAmount') {
        this.$set(row, 'isOK', false)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.createForm {
  width: 50%;
}
.table {
  margin: auto;
}
.commomPadding {
  padding: 30px 0;
  text-align: center;
}
</style>
