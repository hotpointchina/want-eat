import Vue from 'vue'
import Vuex from 'vuex'
import {
  imgQuery
} from '../assets/api/api.js'

Vue.use(Vuex)
let res = null;

const formatData = arr =>{
  return arr.map(it=>({
    ...it,
    salesCount: parseInt( Math.random() * Math.pow(10,4) ),
    price: parseInt( Math.random() * Math.pow(10,2) ),
    selectNumber:0
  }))
};


export default new Vuex.Store({
  state: {
    chinaFoods: {},
    menu:[],
    pickedList:[]
  },
  
  mutations: {
    // 将获取到的数据整理后存入 state
    setChinaFoods(state,res){
      console.log( ' Mutations setChinaFoods res --> ', res );
      if(res.statusText!=="OK") return;

      state.chinaFoods[ res.queryKeyWord.key ] = {
        title: res.queryKeyWord.word,
        data: formatData( res.data.response )
      };
      
      state.menu = Object.keys(state.chinaFoods).map((key,id)=>({
        key,id,
        title:state.chinaFoods[key].title
      }));

      console.log( ' @@ Mutations menu Object.keys(state.chinaFoods) --> ', Object.keys(state.chinaFoods) );
    },
    // 设置单个项目
    setSingleItem( state, obj ){
      console.log( ' Mutations setSingleItem obj --> ', obj );
      let arr = state.chinaFoods[obj.obj.categoryType].data;
      for( let i=0; i<arr.length; i++ ){
        if( arr[i].imgUrl === obj.obj.imgUrl ){
          arr[i].selectNumber = obj.action === 'up' ? arr[i].selectNumber+1 : arr[i].selectNumber-1;
          arr[i].selectNumber = arr[i].selectNumber<0 ? 0 : arr[i].selectNumber;
          break;
        }
      }
      arr = null;
    },
    // 设置用户的订单
    setPickedList( state, data ){
      console.log( ' Mutations this --> ', this );
      console.log( ' Mutations setPickedList data --> ', data );
      
      if( data.action === 'up' ){
        if( state.pickedList.some(it=>it.imgUrl===data.obj.imgUrl) ){ return }
        state.pickedList.push(data.obj);
      }else{
        for( let i=0; i<state.pickedList.length; i++ ){
          if(    state.pickedList[i].imgUrl === data.obj.imgUrl 
              && state.pickedList[i].selectNumber === 0
          ){
            state.pickedList.splice(i,1);
            break;
          }
        }
      }
    },
    // 清空用户订单 - 购物车
    reqealPickedList(state){
      let arr = state.pickedList.map(it=>({
        url:it.imgUrl,
        type:it.categoryType
      }));
      let pArray = [];
      console.log( ' Actions 清空用户订单 - 购物车 arr --> ', arr );
      arr.forEach(it=>{
        pArray = state.chinaFoods[it.type].data;
        for(let i=0; i<pArray.length; i++){
          if( it.url === pArray[i].imgUrl ){
            pArray[i].selectNumber = 0;
            break;
          }
        }
      });
      console.log( ' Actions 清空用户订单 - 购物车 state.chinaFoods --> ', state.chinaFoods );
      state.pickedList.length = 0;
    }
  },
  actions: {
    async queryFood({commit}, query ){
      console.log( ' Actions query --> ', query );
      res = await imgQuery(query.key);
      console.log( ' Actions res --> ', res );

      res.queryKeyWord = query;
      commit('setChinaFoods', res );
      return res;
    }
  },
  // getters: {
  //   zmenu(state){
  //     console.log( ' @@ Getters menu state.chinaFoods --> ', state.chinaFoods );
  //     console.log( ' @@ Getters menu Object.keys(state.chinaFoods) --> ', Object.keys(state.chinaFoods) );

  //     const arr = Object.keys(state.chinaFoods).map((key,id)=>({
  //       key,id,
  //       title:state.chinaFoods[key].title
  //     }));
  //     // console.log( ' @@ Getters menu arr --> ', arr );
  //     return Object.keys(state.chinaFoods);
  //   },
  //   count(state){
  //     console.log( ' @@ Getters count  --> ',  );
  //     return 3
  //   }
  // },
})


