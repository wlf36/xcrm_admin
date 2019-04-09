<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">科室列表</div>
      </div>
      <!-- 表格 -->
      <lin-table :tableColumn="tableColumn"
                :tableData="tableData"
                :operate="operate"
                @handleEdit="handleEdit"
                @handleDelete="handleDelete"
                @row-click="rowClick"
                v-loading="loading"></lin-table>
    </div>

    <!-- 编辑页面 -->
    <depart-edit
      v-else
      @editClose="editClose"
      :editDepartID="editDepartID"
    ></depart-edit>

  </div>
</template>

<script>
import depart from '@/lin/models/depart'
import LinTable from '@/base/table/lin-table'
import DepartEdit from './DepartEdit'

export default {
  components: {
    LinTable,
    DepartEdit,
  },
  data() {
    return {
      tableColumn: [{prop: 'id', label: 'ID'}, { prop: 'name', label: '名称' }, { prop: 'description', label: '简介' }],
      tableData: [],
      operate: [],
      showEdit: false,
      editDepartID: 1,
    }
  },
  async created() {
    this.loading = true
    this.getDeparts()
    this.operate = [{
      name: '编辑', func: 'handleEdit', type: 'edit', auth: '编辑科室'
    }, {
      name: '删除', func: 'handleDelete', type: 'del', auth: '删除科室',
    }]
    this.loading = false
  },
  methods: {
    async getDeparts() {
      const departs = await depart.getDeparts()
      this.tableData = departs
    },
    handleEdit(val) {
      this.showEdit = true
      // console.log(val)
      this.editDepartID = val.row[val.index].id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await depart.delectDepart(val.row[val.index].id)
        if (res.error_code === 0) {
          this.getDeparts()
          this.$message({
            type: 'success',
            message: `${res.msg}`,
          })
        }
      })
    },
    rowClick() {

    },
    editClose() {
      this.showEdit = false
      this.getDeparts();
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/variable.scss";
.container {
  padding: 0 30px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}

</style>
