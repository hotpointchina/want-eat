<template>
  <div class="home">
    <div class="seek">
      <el-input 
        v-model="searchValue"
        ref="searchInput"
        placeholder="吃点啥" 
        class="search_value"
        @change="search"
      ></el-input>
      <el-button type="primary" round class="btn" @click="search">上菜谱</el-button>
    </div>
     
    <div class="content">
      <template v-if="menu.length>0">
        <div class="menu">
          <div class="box">
            <div
              :class="['button', menu.length===1 || btn.key === menuflag ? 'on' : '']"
              v-for="btn in menu"
              :key="btn.title"
              @click="showTab(btn)"
            >{{btn.title}}</div>
          </div>
        </div>

        <ul class="good">
          <unit 
            v-for="item in contentList"
            :key="item.imgUrl"
            :item="item" @up="clickCountUp" @down="clickCountDown" 
          />
        </ul>
      </template>
      
      <template v-else>
        <div class="empty">
          <el-empty description="看来您需要一份菜单，请在输入框输入餐品类型"></el-empty>
        </div>
      </template>

    </div>


    <el-drawer
      title="我是标题"
      :visible.sync="showDrawer"
      :with-header="false"
      :append-to-body="true"
      direction="btt"
      size="70%"
      class="zdrawer"
    >
      <div class="reqeal">
        <span @click="reqealCart">清空购物车</span>
      </div>
      <ul class="good zdheight">
        <unit 
          v-for="item in pickedList"
          :key="item.imgUrl"
          :item="item" @up="clickCountUp" @down="clickCountDown" 
        />
      </ul>
    </el-drawer>


    <div class="cart_box">
      <cart 
        :money="bill" :count="pickedCount" 
        @showOrder="showOrder"
        @submit="checkOrder"
      />
    </div>

  </div>
</template>

<script>

import { mapActions, mapMutations, mapState } from 'vuex';
import pinyin from 'pinyin';
import unit from '@/components/unit.vue';
import cart from '@/components/cart.vue';


export default {
  name: 'Home',
  components:{
    unit,
    cart
  },
  data(){
    return {
      searchValue:'',
      menuflag:'',
      contentList:[],
      // pickedList:[],
      // [订单价，减免，运费]
      bill:[0,3,9],
      // 一共挑选了多少件
      pickedCount:0,
      showDrawer:false
    }
  },
  computed:{
    ...mapState({
      chinaFoods: state=> state.chinaFoods,
      menu: state=> state.menu,
      pickedList: state=> state.pickedList,
    }),
  },
  watch:{
    'menu':{
      deep:true,
      immediate:true,
      handler:function(val){
        this.menuflag = val.length===1 ? val[0].key : this.menuflag;
      }
    },
    'pickedList':{
      deep:true,
      immediate:true,
      handler:function(val){
        console.log( ' 【watch】 val --> ', val );

        if( val.length===0 ){
          console.log( ' 清空【watch】 val --> ', val );
          this.pickedCount = 0;
          this.$set(this.bill,0,0);
          return;
        }
        let [count,pay] = [0,0];
        val.forEach(it=>{
          count += it.selectNumber;
          pay += it.price * it.selectNumber;
        });
        this.pickedCount = count;
        this.$set(this.bill,0,pay);
        [count,pay] = [0,0];
        console.log( ' 【watch】 pickedList pickedCount,bill[0] --> ', this.pickedCount,this.bill[0] );
      }
    }
  },
  
  mounted(){
    let keys = null;
    if( this.menu.length>0 ){
      keys = Object.keys(this.chinaFoods);
      this.contentList = this.chinaFoods[keys[0]].data;
      this.menuflag = keys[0];
    }
    keys = null;
    this.$refs.searchInput.focus();

    console.log( ' mounted pickedCount --> ', this.pickedCount );
  },

  methods:{
    ...mapActions([
      'queryFood'
    ]),
    ...mapMutations([
      // 设置单个项目
      'setSingleItem',
      // 设置用户的订单
      'setPickedList',
      // 清空用户订单 - 购物车
      'reqealPickedList'
    ]),
    
    // 用户在 input 中完成输入
    search(){
      this.searchValue = this.searchValue.trim();
      if( this.searchValue === '' ){
        return this.$message({
          message: '您还没有输入有效内容...',
          type: 'warning'
        });
      }

      console.log( ' search -->', this.searchValue );
      console.log( ' search pinyin -->', this.getApiWord(this.searchValue) );

      let obj = {};
      obj.key = this.getApiWord(this.searchValue);
      obj.word = this.searchValue;
      this.letMeChoose( obj );
    },
    getApiWord(str){
      return pinyin(str,{ style: pinyin.STYLE_NORMAL, heteronym: true }).flat().join('');
    },

    // 查询 获取数据
    async letMeChoose(obj){
      // console.log( ' letMeChoose reachValue -->> ', this.reachValue );
      console.log( ' letMeChoose obj -->> ', obj  );
      const response = await this.queryFood( obj );

      this.searchValue = '';
      if( response.statusText !== "OK" ){
        return this.$message.error('没有找到此类菜品...');
      }

      console.log( ' letMeChoose chinaFoods -->> ', this.chinaFoods  );
      this.showTab(obj);
    },

    // 点击了菜单项
    showTab(obj){
      console.log( ' 点击了菜单项 obj -->> ', {...obj} );
      this.menuflag = obj.key;
			this.contentList = this.chinaFoods[obj.key].data;
    },

    
    clickCountUp(obj){
      console.log( ' clickCountUp obj --> ', obj );
      let sendData = {
        obj,
        // menuKey: this.menuflag,
        action: 'up'
      };

      // 设置单个项目
      this.setSingleItem(sendData);
      console.log( ' clickCountUp pickedList --> ', this.pickedList );

      // 设置用户的订单
      this.setPickedList(sendData);

      sendData = null;
    },
    clickCountDown(obj){
      console.log( ' clickCountDown obj --> ', obj );

      let sendData = {
        obj,
        // menuKey: this.menuflag,
        action: 'down'
      };

      // 设置单个项目
      this.setSingleItem(sendData);

      // 设置用户的订单
      this.setPickedList(sendData);

      sendData = null;      
    },

    // 显示弹窗 菜单
    showOrder(){
      console.log( ' showOrder --> ', );
      if( this.pickedList.length<1 ){
        return this.$message.error('您还没有选取任何菜品...');
      }
      this.showDrawer = true;
    },
    // 结算
    checkOrder(){
      console.log( ' checkOrder pickedList --> ', this.pickedList );
      if( this.pickedList.length<1 ){
        return this.$message.error('您还没有选取任何菜品...');
      }
      this.$router.push('order');
    },
    // 清空购物车
    reqealCart(){
      // 清空用户订单 - 购物车
      this.reqealPickedList();
      this.pickedCount = 0;
      this.$set(this.bill,0,0);
      this.showDrawer = false;
    }


  }
    
   

}
</script>


<style lang="less" scoped>
.row{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;  
}
.rowcenter{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.column{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.home{
  .column;
  flex-wrap: nowrap;
  position: relative;
  width: 100vw; height: 98vh;
  background: white;
}
.seek{
  .row;
  justify-content: space-around;
  align-items: center;
  width: 92vw;
  padding: 4vw;
  background: #FFC300 none;

  & .search_value{
    width: 70vw;
  }
  & .btn{
    margin-left: 15px;
    background: #000 none;
    border: 0px;
    color: white;
  }
}

.content{
  --width:92vw;
  .row;
  flex-wrap: nowrap;
  width: var(--width);
  height: 79.8vh;
  margin: 4vw 4vw 0 4vw;
  // background: rgb(192, 192, 192) none;
  background: white none;
  border-radius:16px;
  box-shadow: 4px 2px 8px 0px rgba(0,0,0,0.3);
  overflow: hidden;

  & .empty{
    .rowcenter;
    width: var(--width);
    background: white;
  }
  & .menu{
    width: 15vw;
    height: 79.8vh;
    background: rgb(231, 231, 231);
    overflow-x: hidden;
    overflow-y: auto;

    & .box{
      margin-right: -13px; padding-right: 13px;
    }
    & .button{
      margin-bottom: 6px; padding: 20px 0px;
      // background: rgb(156, 182, 206);
      border-radius: 6px 0px 0px 6px;
      cursor: pointer;
    }
    & .button.on{
      // margin-left: 13px; padding-right: 13px;
      background:white none;
      font-weight: bold;
    }
  }

}

.good{
  .column;
  
  width: calc(var(--width) - 15vw + 16px);
  max-height: 79.8vh;
  margin: 0px -13px 0px 0px; padding: 0px;
  background: white;
  list-style: none;
  overflow-y: auto;

  & li{
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
  & li:last-child{
    padding-bottom: 60px;
  }
}

.cart_box{
  .row;
  justify-content: center;
  position: fixed;
  bottom: 50px; left: 0px;
  z-index: 9998;
  width: 100vw;
  // background: white;
}

.zdrawer{
  bottom: 30px;
  margin-right: -20px;
  padding-right: 20px;
  

  /deep/ .el-drawer__body{
    overflow: hidden;
  }
}
.zdheight{
  height: 66vh;
  margin: 0px -11px 0px 0px;
  & li:last-child{
    padding-bottom: 150px;
    // background: rosybrown
  }
}
.reqeal{
  .row;
  justify-content: flex-end;
  padding-right: 20px;
  border-bottom: 1px solid rgb(216, 216, 216);;

  & span{
    color: rgb(163, 163, 163);
    font-size: 22px;
    line-height: 40px;
    cursor: pointer;
  }
}
</style>
