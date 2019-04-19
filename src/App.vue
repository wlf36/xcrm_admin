<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Config from "@/config";

export default {
  data() {
    return {
      timer: null
    };
  },
  computed: {
    ...mapGetters(["stopTime"])
  },
  watch: {
    stopTime() {
      if (!Config.openAutoJumpOut) {
        return;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.loginOut();
        // this.$router.push('/login')
        const { origin } = window.location;
        window.location.href = origin;
      }, Config.stagnateTime);
    }
  },
  methods: {
    ...mapActions(["loginOut"])
  }
};
</script>


<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-transition-delay: 99999s;
    -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
  }
  .el-table .cell {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .el-table .cell:hover {
    // text-overflow:inherit;
    // overflow:visible;
    white-space: normal;
  }
}
</style>

<style>
::-webkit-scrollbar-track-piece {
  background-color: #eee;
}
::-webkit-scrollbar {
  width: 5px;
  height: 15px;
}
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  background-clip: padding-box;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #aaa;
}
</style>

<style>
.el-table thead tr th .cell {
  color: #333;
  font-weight: 500;
  font-size: 14px;
}
.el-table__body tbody {
  color: #555;
  font-weight: 400;
}
.customer-list .el-table__body tbody {
  color: #fff;
  font-weight: 400;
}
.rowVisit {
  background-color: #67c23a !important;
}
.rowReask {
  background-color: #f56c6c !important;
}
.rowOrder {
  background-color: #e6a23c !important;
}
.hover-row > td {
  background-color: #409eff !important;
}
.el-table__fixed::before, .el-table__fixed-right::before{
  height:0px!important;
}
</style>
