<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="header-left">
          <p class="title">客户列表</p>
        </div>
        <div class="header-right">
          <lin-search @query="onQueryChange" ref="searchKeyword"/>

          <el-dropdown style="margin: 0 10px;" @command="handleCommandMeta">
            <el-button>
              {{searchMeta}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="['查询字段']">查询字段</el-dropdown-item>
              <el-dropdown-item
                v-for="(customer_meta, index) in customer_metas"
                :key="index"
                :command="[customer_meta]"
              >{{customer_meta}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown style="margin: 0 10px;" @command="handleCommandStatus">
            <el-button>
              {{searchStatus}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="['筛选客户']">筛选客户</el-dropdown-item>
              <el-dropdown-item
                v-for="(status, index) in customer_status"
                :key="index"
                :command="[status]"
              >{{status}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <lin-date-picker @dateChange="handleDateChange" ref="searchDate" class="date"></lin-date-picker>
        </div>
      </div>
      <!-- 表格 -->
      <lin-table
        :tableColumn="tableColumn"
        :tableData="tableData"
        :operate="operate"
        :selection="true"
        @handleEdit="handleEdit"
        @multipleSelection="handleSelectionChange"
        @handleUpdateVisit="handleUpdateVisit"
        @handleUpdateReask="handleUpdateReask"
        @row-click="rowClick"
        v-loading="loading"
      ></lin-table>
      <!-- 分页 -->
      <el-row>
        <el-col :lg="12" v-auth="['指派回访']">
          <el-dropdown style="margin: 20px 10px 20px 0;" @command="handleCommandReaskUser">
            <el-button>
              {{reask_user.nickname}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="[reask_user]">回访人员</el-dropdown-item>
              <el-dropdown-item
                v-for="item in reask_users"
                :key="item.id"
                :command="[item]"
              >{{item.nickname}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="primary" @click="updateReaskUser()">指定回访</el-button>
        </el-col>
        <el-col :lg="12" style="float:right">
          <div class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              :background="true"
              :page-size="pageCount"
              :current-page="currentPage"
              v-if="refreshPagination"
              layout="prev, pager, next, jumper"
              :total="total_nums"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 编辑页面 -->
    <!-- <customer-edit v-else @editClose="editClose" :editCustomerID="editCustomerID"></customer-edit> -->
    <customer-add v-else @editClose="editClose" :showEdit="showEdit" :editCustomerID="editCustomerID"></customer-add>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import User from "@/lin/models/user";
import customer from "@/lin/models/customer";
import LinTable from "@/base/table/lin-table";
// import CustomerEdit from "./CustomerEdit";
import CustomerAdd from "./CustomerAdd";
import LinSearch from "@/base/search/lin-search";
import LinDatePicker from "@/base/date-picker/lin-date-picker";

export default {
  components: {
    LinTable,
    // CustomerEdit,
    CustomerAdd,
    LinSearch,
    LinDatePicker
  },
  data() {
    return {
      downloadLoading: false,
      refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
      total_nums: 0, // 分组内的用户总数
      currentPage: 1, // 默认获取第一页的数据
      pageCount: 10, // 每页10条数据
      loading: false,
      tableColumn: [
        { prop: "name", label: "姓名", width: 80 },
        { prop: "gender", label: "性别", width: 60 },
        { prop: "age", label: "年龄", width: 60 },
        { prop: "phone", label: "手机", width: 120 },
        { prop: "address", label: "地址", width: 220 },
        { prop: "status", label: "状态", width: 60 },
        { prop: "disease", label: "疾病", width: 120 },
        { prop: "order_time", label: "预约时间", width: 110 },
        { prop: "depart", label: "预约科室", width: 95 },
        { prop: "source", label: "来源渠道", width: 95 },
        { prop: "order_name", label: "录入人员", width: 95 },
        { prop: "create_time", label: "录入时间", width: 110 },
        { prop: "reask_name", label: "回访人员", width: 95 },
        { prop: "reask_time", label: "回访时间", width: 110 }
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editCustomerID: 1,
      searchKeyword: null,
      meta: null,
      searchMeta: "查询字段",
      customer_metas: ["姓名", "手机号", "地址"],
      status: null,
      searchStatus: "筛选客户",
      customer_status: ["预约", "到诊", "回访"],
      searchDate: [],
      multipleSelection: [],
      reask_users: [],
      reask_user: { id: 0, nickname: "回访人员" }
    };
  },
  computed: {    
    ...mapGetters(['user']),
  },
  async created() {  
    // console.log(this.user)  
    this.loading = true;
    this.getCustomers();
    const { isSuper } = this.user
    if(isSuper) {
      this.getReaskUsers();
    }    
    this.operate = [
      {
        name: "编辑",
        func: "handleEdit",
        type: "edit",
        auth: "编辑客户"
      },
      {
        name: "到诊",
        func: "handleUpdateVisit",
        type: "del",
        auth: "更新到诊"
      },
      {
        name: "回访",
        func: "handleUpdateReask",
        type: "del",
        auth: "更新回访"
      }
    ];
    this.loading = false;
  },
  watch: {
    searchMeta(meta) {
      if (this.searchKeyword != null) {
        this.getCustomers();
      }
    },
    searchKeyword(newVal) {
      if (this.meta != null) {
        this.getCustomers();
      }
    },
    searchStatus(status) {
      this.getCustomers();
    },
    searchDate(newDate) {
      this.getCustomers();
    }
  },
  methods: {
    async updateReaskUser() {
      const res = await customer.updateReaskUser({
        ids: this.multipleSelection,
        reask_user: this.reask_user
      });
      if (res.error_code === 0) {
        this.getCustomers();
        this.$message({
          type: "success",
          message: `${res.msg}`
        });
      }
    },
    async getReaskUsers() {
      let res = await User.getReaskUsers()
      res.map((item)=>{
        console.log({id:item[0], nickname:item[1]})
        this.reask_users.push({id:item[0], nickname:item[1]})
      })
    },
    onQueryChange(query) {
      this.searchKeyword = query.trim();
    },
    handleSelectionChange(data) {
      this.multipleSelection = [];
      data.map(item => {
        this.multipleSelection.push(item.id);
      });
      // console.log(this.multipleSelection)
    },
    handleCommandReaskUser(val) {
      this.reask_user = val[0];
      console.log(this.reask_user);
    },

    handleCommandMeta(meta) {
      this.searchMeta = meta[0];
      if (meta[0] == "查询字段") {
        this.meta = null;
      }
      if (meta[0] == "姓名") {
        this.meta = "name";
      }
      if (meta[0] == "手机号") {
        this.meta = "phone";
      }
      if (meta[0] == "地址") {
        this.meta = "address";
      }
    },
    handleCommandStatus(status) {
      this.searchStatus = status[0];
      if (status[0] == "筛选客户") {
        this.status = null;
      }
      if (status[0] == "预约") {
        this.status = 1;
      }
      if (status[0] == "到诊") {
        this.status = 2;
      }
      if (status[0] == "回访") {
        this.status = 3;
      }
    },
    handleDateChange(date) {
      this.searchDate = date;
    },
    outDate(date) {
      return date.substring(0, 10);
    },
    async getCustomers() {
      let res;
      const currentPage = this.currentPage - 1;
      try {
        this.loading = true;
        console.log(status);
        res = await customer.getCustomers({
          count: this.pageCount,
          page: currentPage,
          keyword: this.searchKeyword,
          keymeta: this.meta,
          status: this.status,
          start: this.searchDate[0],
          end: this.searchDate[1]
        });
        this.loading = false;
        this.tableData = res.collection;
        this.total_nums = res.total_nums;
      } catch (e) {
        this.loading = false;
        console.log(e);
      }
    },
    // 切换table页
    async handleCurrentChange(val) {
      this.currentPage = val;
      this.loading = true;
      await this.getCustomers("changePage");
      this.loading = false;
    },
    handleEdit(val) {
      this.showEdit = true;
      this.editCustomerID = val.row[val.index].id;
    },
    async handleUpdateVisit(val) {
      this.$confirm("此操作将更新该客户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await customer.updateVisit(val.row[val.index].id);
        if (res.error_code === 0) {
          this.getCustomers();
          this.$message({
            type: "success",
            message: `${res.msg}`
          });
        }
      });
    },
    async handleUpdateReask(val) {
      this.$confirm("此操作将更新该客户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await customer.updateReask(val.row[val.index].id);
        if (res.error_code === 0) {
          this.getCustomers();
          this.$message({
            type: "success",
            message: `${res.msg}`
          });
        }
      });
    },
    handleDelete(val) {
      this.$confirm("此操作将永久删除该客户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await customer.delectCustomer(val.row[val.index].id);
        if (res.error_code === 0) {
          this.getCustomers();
          this.$message({
            type: "success",
            message: `${res.msg}`
          });
        }
      });
    },
    rowClick() {},
    editClose() {
      this.showEdit = false;
      this.getCustomers();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/variable.scss";
.container {
  padding: 0 20px 0 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-left {
      float: left;
      .title {
        height: 59px;
        line-height: 59px;
        color: $parent-title-color;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
      }
    }
    .header-right {
      float: right;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .date {
        padding-right: 0;
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>

