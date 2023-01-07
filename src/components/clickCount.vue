<template>
  <div class="count">
    <i class="el-icon-remove-outline" @click="Down"></i>
    {{item[keyWord]}}
    <i class="el-icon-circle-plus" @click="Up"></i>
  </div>
</template>

<script>
export default {
  name: 'clickCount',
  props: {
    item: {
      type: Object,
      default: ()=>({})
    },
    keyWord:{
      type: String,
      default:''
    }
  },
  methods:{
    Up(){
      this.$emit('Up', {
        fnName:'Up',
        obj:this.item
      });
    },
    Down(){
      this.$emit('Down',{
        fnName:'Down',
        obj:this.item
      });
    }
  }
}
</script>


<style lang="less" scoped>
.count{
  width: 30%;
  text-align: right;
  & i{
    cursor: pointer;
  }
}
</style>
