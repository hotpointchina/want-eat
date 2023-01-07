<template>
  <div>
    <h1>
      <el-empty description="我们还没有这一页"></el-empty>
      404
    </h1>
    <router-link to="/">
      <el-button type="success" round>回首页</el-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "notFound404",
};
</script>
