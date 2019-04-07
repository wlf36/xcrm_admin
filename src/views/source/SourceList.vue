<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">渠道列表</div>
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
    <source-edit
      v-else
      @editClose="editClose"
      :editSourceID="editSourceID"
    ></source-edit>

  </div>
</template>

<script>
import source from '@/lin/models/source'
import LinTable from '@/base/table/lin-table'
import SourceEdit from './SourceEdit'

export default {
  components: {
    LinTable,
    SourceEdit,
  },
  data() {
    return {
      tableColumn: [{ prop: 'name', label: '名称' }, { prop: 'description', label: '简介' }],
      tableData: [],
      operate: [],
      showEdit: false,
      editSourceID: 1,
    }
  },
  async created() {
    this.loading = true
    this.getSources()
    this.operate = [{
      name: '编辑', func: 'handleEdit', type: 'edit', auth: '编辑渠道',
    }, {
      name: '删除', func: 'handleDelete', type: 'del', auth: '删除渠道',
    }]
    this.loading = false
  },
  methods: {
    async getSources() {
      const sources = await source.getSources()
      this.tableData = sources
    },
    handleEdit(val) {
      this.showEdit = true
      this.editSourceID = val.row[val.index].id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await source.delectSource(val.row[val.index].id)
        if (res.error_code === 0) {
          this.getSources()
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
      this.getSources();
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
