<template>
  <div>
    <el-col :sm="12" :lg="6">
      <el-result icon="success" title="支付成功" subTitle="返回主页">
        <template slot="extra">
          <router-link to="/">
            <el-button type="primary" size="medium">返回</el-button>
          </router-link>
        </template>
      </el-result>
    </el-col>
  </div>
</template>

<script>
export default {
    name:"success"
};
</script>

<style lang="scss" scoped>
</style>