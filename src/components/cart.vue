<template>
  <div class="cart">
    <el-badge :value="count" class="elbadge">
      <i class="el-icon-s-claim icon" @click="btnHandler('showOrder')"></i>
    </el-badge>

    <div class="info">
      <section>
        <em>￥</em>
        <span>{{pay}}</span>
      </section>
      <div class="send">
        <em>已减 {{money[1]}} 元</em>
        <span>另需配送费 ￥{{money[2]-money[1]}} <del>￥{{money[2]}}</del></span>
      </div>
    </div>

    <div class="submit_button" @click="btnHandler('submit')">{{submitTitle}}</div>
  </div>
</template>

<script>
export default {
  name: 'cart',
  props: {
    // [订单价，减免，运费]
    money: {
      type: Array,
      default: ()=>([])
    },
    count:{
      type:Number,
      default:0
    },
    submitTitle:{
      type:String,
      default:'去结算'
    }
  },
  data(){
    return{
      pay:0
    }
  },
  watch:{
    'money':{
      deep:true,
      immediate:true,
      handler:function(val){
        console.log( ' money 【watch】 val --> ', val );
        this.pay = val[0]===0? 0 : val[0]+(val[2]-val[1]);
      }
    }
  },
  methods:{
    btnHandler(str){
      this.$emit(str);
    },

  }
}
</script>


<style lang="less" scoped>
.row{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
em{
  font-style: normal;
}
.cart{
  .row;
  
  width: calc(100% - 70px); height: 60px;
  background: #3a3a3a none;
  border-radius: 50px;
}
.elbadge{
  /deep/ .el-badge__content.el-badge__content--undefined.is-fixed{
    background: rgb(220, 20, 20);
  }
}
.icon{
  padding: 10px;
  background: black;
  border: 5px solid white;
  border-radius: 40px;
  color:rgb(220, 20, 20);;
  font-size:40px;
  cursor: pointer;
}
.info{
  .row;
  width: 60%;

  & section{
    .row;
    align-items: flex-end;
    margin: 0px 12px;
    color: white;

    & span{
      font-size: 36px; line-height: 36px;
      font-style: normal;
      font-weight: bold;
    }
  }

  & .send{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    
    & em{
      color: #FFC300;
    }
    & span{
      color:#909191;
    }
  }
}
.submit_button{
  .row;
  justify-content: center;
  width: 30%; height: 60px;
  margin-right: -1px;
  background: #FFC300;
  border-radius: 60px;
  color: #3a3a3a;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
}
</style>
