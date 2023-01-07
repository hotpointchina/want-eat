<template>
  <li>
      <img :src="item.imgUrl" />
      <div class="right">
        <section>
          <h2>{{item.title}}</h2>
          <span>月售 {{item.salesCount}}</span>
        </section>

        <div class="sale">
          <h2>￥{{item.price}}</h2>

          <div class="count">
            <i class="el-icon-remove-outline" @click="down"></i>
            {{item.selectNumber}}
            <i class="el-icon-circle-plus" @click="up"></i>
          </div>

          <!-- <clickCount 
            @Up="btnFN" @Down="btnFN" 
            :item='item'
            keyWord='selectNumber'
          /> -->
        </div>
      </div>
   
  </li>
</template>

<script>
// import clickCount from '@/components/clickCount.vue';
export default {
  name: 'cart',
  props: {
    item: {
      type: Object,
      default: ()=>({})
    }
  },
  // components:{ clickCount },
  methods:{
     up(){
      this.$emit('up', this.item );
    },
    down(){
      this.$emit('down',this.item);
    }
  }
}
</script>


<style lang="less">
.row{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;  
}
.column{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

li {
  .row;
  justify-content: space-between;
  width: 100%;
  padding: 4vw;
  box-sizing: border-box;

  & img{
    width: 20vw; height: 20vw;
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  & .right{
    .column;
    width: calc(100% - 22vw);
    height: 20vw;
    background: white;
  }
  & .right section{
    .column;
    width: 100%; height: 16vw;
    // background: blanchedalmond;

    & h2{
      margin: 0px; padding: 0px;
      color: #333;
    }
    & span{
      color: rgb(139, 139, 139);
    }
  }
  & .right .sale{
    .row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0px 8px;
    box-sizing: border-box;

    & h2{
      width: 70%;
      margin: 0px; padding: 0px;
      color: rgb(223, 10, 10);
      text-align: left;
    }
    & .count{
      width: 30%;
      text-align: right;
      // background: skyblue;

      & i{
        cursor: pointer;
      }
    }
  }
}


</style>
