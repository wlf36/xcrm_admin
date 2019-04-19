<template>
  <div class="container">
    <div v-auth="['导入数据']">
      <div class="title">导入数据</div>
      <lin-1px></lin-1px>
      <div class="wrap">
        <el-upload
          class="upload-demo"
          :action="uploadExcelApi"
          :headers="headers"
          :auto-upload="true"
        >
          <el-button size="small" type="primary">点击上传excel文件</el-button>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
import Config from "@/config/index";
import { getToken } from "@/lin/utils/cookie";

export default {
  data() {
    return {
      headers: {
        Authorization: getToken("access_token")
      },
      uploadExcelApi: `${Config.baseUrl}/cms/upload/excel`
    };
  }
};
</script>

<style scoped lang="scss">
@import "~assets/styles/variable.scss";
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    text-indent: 40px;
  }
  .wrap {
    padding: 20px;
    .condition {
      display: flex;
    }
    .el-button {
      margin-left: 15px;
    }
  }
}
</style>
