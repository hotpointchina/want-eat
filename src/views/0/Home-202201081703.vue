<template>
  <div class="home">
    <div class="seek">
      <el-input v-model="searchValue" placeholder="吃点啥" class="search_value" @change="search"></el-input>
      <el-button type="primary" round class="btn" @click="tujingling">上菜谱</el-button>
    </div>
 
    
    <div class="content">
      <template v-if="true">
        <div class="menu">
          <div class="box">
            <div
              class="button"
              v-for="btn in menu"
              :key="btn.title"
              @click="showTab(btn)"
            >{{btn.title}}</div>

            <!-- <div class="button on">凉菜</div>
            <div class="button">酒水</div> -->
          </div>
        </div>

        <ul class="good">
          <li>
            <img src="http://pic.616pic.com/ys_img/00/51/86/7kuWfRO0S3.jpg" />
            <div class="right">
              <section>
                <h2>梅菜扣肉</h2>
                <span>月售 180</span>
              </section>

              <div class="sale">
                <h2>￥29</h2>
                <div class="count">
                  <i class="el-icon-remove-outline"></i>
                  1234
                  <i class="el-icon-circle-plus"></i>
                </div>
              </div>
            </div>
          </li>

          <!--  
            <li>
              <img src="http://pic.616pic.com/ys_img/00/51/86/7kuWfRO0S3.jpg" />

              <div class="right">
                <section>
                  <h2>梅菜扣肉</h2>
                  <span>月售 180</span>
                </section>

                <div class="sale">
                  <h2>￥29</h2>
                  <div class="count">
                    <i class="el-icon-remove-outline"></i>
                    1234
                    <i class="el-icon-circle-plus"></i>
                  </div>
                </div>
              </div>
            </li>
          -->







        </ul>
      </template>
      
      <template v-else>
        <div class="empty">
          <el-empty description="您需要一份菜单"></el-empty>
        </div>
      </template>

    </div>



  </div>
</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex';
import pinyin from 'pinyin';

export default {
  name: 'Home',
  data(){
    return {
      searchValue:'',
      menuList:[]
    }
  },
  computed:{
    ...mapState({
      chinaFoods: state=> state.chinaFoods,
      menu: state=> state.menu,
    }),
    
  },
  

  methods:{
    ...mapActions([
      'queryFood'
    ]),

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
      this.tujingling( obj );
    },
    getApiWord(str){
      return pinyin(str,{ style: pinyin.STYLE_NORMAL, heteronym: true }).flat().join('');
    },

    async tujingling(obj){
      // console.log( ' tujingling reachValue -->> ', this.reachValue );
      console.log( ' tujingling obj -->> ', obj  );
      const response = await this.queryFood( obj );
			console.log( ' tujingling response -->> ', response );
			console.log( ' tujingling 【 chinaFoods 】 -->> ', this.chinaFoods );
			
    },

    showTab(obj){

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
  width: 100vw;
  background: white;
}
.seek{
  .row;
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
    }
  }





  & .good{
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
  }
}
</style>
