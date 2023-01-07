<template>
  <div class="order">
    <div class="toptitle">
      <div class="icon">
        <router-link to="/">
          <i class="el-icon-arrow-left"></i>
        </router-link>
      </div>
      <h2 class="word">订单提交</h2>
    </div>

    <div class="eat_form">
      <div class="box" :style="{ height: editingAddress ? '270px' : '100px' }">
        <el-form ref="orderForm" :model="ruleForm" :rules="rules">
          <el-form-item class="line" prop="address">
            <h2 class="title">收货地址</h2>
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>

          <div class="detal_form">
            <div class="top">
              <el-form-item class="line">
                <h2 class="title">姓名</h2>
                <el-input v-model="ruleForm.name" @blur="checkInfo"></el-input>
              </el-form-item>
              <el-form-item class="line">
                <h2 class="title">电话</h2>
                <el-input
                  v-model="ruleForm.cell"
                  @blur="checkInfo('cell')"
                ></el-input>
              </el-form-item>
            </div>
            <el-form-item class="line">
              <h2 class="title">收货地址</h2>
              <el-input
                v-model="ruleForm.addressDetail"
                @blur="checkInfo"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <i
        v-if="editingAddress"
        class="el-icon-arrow-up hand"
        @click="closeDetailAddr"
      ></i>
      <i v-else class="el-icon-arrow-down hand" @click="editDetailAddr"></i>
    </div>

    <div class="content">
      <div class="wrap">
        <ul :class="['good', editingAddress ? 'short' : '']">
          <unit
            v-for="item in pickedList"
            :key="item.imgUrl"
            :item="item"
            @up="clickCountUp"
            @down="clickCountDown"
          />
        </ul>
      </div>
    </div>

    <div class="cart_box">
      <cart
        submitTitle="去支付"
        :money="bill"
        :count="pickedCount"
        @submit="checkOrder"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import unit from "@/components/unit.vue";
import cart from "@/components/cart.vue";

export default {
  name: "order",
  components: {
    unit,
    cart,
  },
  data() {
    return {
      // [订单价，减免，运费]
      bill: [0, 3, 9],
      // 一共挑选了多少件
      pickedCount: 0,
      ruleForm: {
        address: "",
        name: "",
        cell: "",
        addressDetail: "",
      },
      rules: {
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 2, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
      },
      editingAddress: false,
    };
  },
  computed: {
    ...mapState({
      pickedList: (state) => state.pickedList,
    }),
  },

  watch: {
    pickedList: {
      deep: true,
      immediate: true,
      handler: function (val) {
        console.log(" 【watch】 val --> ", val);

        if (val.length === 0) {
          console.log(" 清空【watch】 val --> ", val);
          this.pickedCount = 0;
          this.$set(this.bill, 0, 0);
          return;
        }
        let [count, pay] = [0, 0];
        val.forEach((it) => {
          count += it.selectNumber;
          pay += it.price * it.selectNumber;
        });
        this.pickedCount = count;
        this.$set(this.bill, 0, pay);
        [count, pay] = [0, 0];
        console.log(
          " 【watch】 pickedList pickedCount,bill[0] --> ",
          this.pickedCount,
          this.bill[0]
        );
      },
    },
  },

  mounted() {
    console.log(" Order mounted ");
    if (this.pickedList.length === 0) {
      this.$message({
        message: "您还没有挑选任何餐品...",
        type: "warning",
      });
      setTimeout(() => {
        this.$router.push("Home");
      }, 2222);
    }
  },

  methods: {
    ...mapMutations([
      // 设置单个项目
      "setSingleItem",
      // 设置用户的订单
      "setPickedList",
      // 清空用户订单 - 购物车
      "reqealPickedList",
    ]),

    clickCountUp(obj) {
      console.log(" clickCountUp obj --> ", obj);
      let sendData = {
        obj,
        // menuKey: this.menuflag,
        action: "up",
      };

      // 设置单个项目
      this.setSingleItem(sendData);
      console.log(" clickCountUp pickedList --> ", this.pickedList);

      // 设置用户的订单
      this.setPickedList(sendData);

      sendData = null;
    },
    clickCountDown(obj) {
      console.log(" clickCountDown obj --> ", obj);

      let sendData = {
        obj,
        // menuKey: this.menuflag,
        action: "down",
      };

      // 设置单个项目
      this.setSingleItem(sendData);

      // 设置用户的订单
      this.setPickedList(sendData);

      sendData = null;
    },

    // 结算
    checkOrder() {
      const self = this;
      // console.log(' 结算 ruleForm --> ', this.ruleForm );
      this.$refs.orderForm.validate((valid) => {
        // console.log(' 结算 valid --> ', valid );
        if (valid) {
          // alert("submit!");
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          setTimeout(() => {
            loading.close();
            self.$router.push('success');
            self.reqealPickedList();
          }, 1000);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    editDetailAddr() {
      console.log(" 展开更多编辑框");
      this.editingAddress = true;
    },
    closeDetailAddr() {
      console.log(
        " 关闭更多编辑框 this.ruleForm.cell --> ",
        this.ruleForm.cell
      );

      // if( !this.checkCell() ){
      //   return this.$message.error('手机号有误...');
      // }
      // let name = this.ruleForm.name===''?'吃货':this.ruleForm.name;

      // this.ruleForm.address = `${name} [${this.ruleForm.cell}] ${this.ruleForm.addressDetail}`;
      this.editingAddress = false;
    },
    checkCell() {
      return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(Number(this.ruleForm.cell));
    },
    checkInfo(key) {
      console.log(
        " 关闭更多编辑框 this.ruleForm.cell --> ",
        this.ruleForm.cell
      );

      if (!this.checkCell() && key === "cell") {
        return this.$message.error("手机号有误...");
      }
      let name = this.ruleForm.name === "" ? "吃货" : this.ruleForm.name;
      let cell = this.ruleForm.cell.length > 0 ? `[${this.ruleForm.cell}]` : "";
      this.ruleForm.address = `${name} ${cell} ${this.ruleForm.addressDetail}`;
    },
  },
};
</script>

<style lang="less" scoped>
.row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
.rowcenter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.columnalcenter {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.hand {
  cursor: pointer;
}

//
.order {
  .columnalcenter;
  position: relative;
  width: 100vw;
  height: 100vh;
  background: whitesmoke;
}

.toptitle {
  .row;
  align-items: center;
  width: 92vw;
  padding: 4vw;
  background: #ffc300 none;

  & .icon {
    .rowcenter;
    width: 30px;
  }
  & .word {
    width: 82vw;
    margin: 0px;
    padding: 0px;
  }
}

.eat_form {
  .columnalcenter;
  width: 92vw;
  margin: 20px 0px;
  padding: 4vw;
  background: white;
  border-radius: 20px;
  box-sizing: border-box;

  & .box,
  /deep/ .el-form {
    width: 100%;
  }
  & .box {
    overflow: hidden;
  }

  & .line {
    width: 100%;

    & .title {
      margin: 0px;
      color: #e3731c;
      text-align: left;
    }
  }

  & .detal_form {
    .columnalcenter;
    width: 100%;

    & .top {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    & .top .line {
      width: calc(50% - 10px);
    }
    & .line {
      width: 100%;

      & .title {
        margin: 0px;
        color: #3b3b3b;
        font-size: 16px;
        line-height: 22px;
        font-weight: normal;
        text-align: left;
      }
    }
  }
}

.content {
  .column;
  width: 92vw;
  margin-bottom: 20px;
  padding: 4vw;
  background: white;
  border-radius: 20px;
  box-sizing: border-box;
  overflow: hidden;

  & .wrap {
    width: 84vw;
    overflow: hidden;
  }
}

.good {
  .column;

  width: 100%;
  height: 54vh;
  margin: 0px -13px 0px 0px;
  padding: 0px 13px 0px 0px;
  background: white;
  list-style: none;
  overflow-y: auto;

  & li {
    .row;
    justify-content: space-between;
    width: 100%;
    padding: 4vw;
    box-sizing: border-box;

    & img {
      width: 20vw;
      height: 20vw;
      border: 1px solid lightgray;
      border-radius: 10px;
    }
    & .right {
      .column;
      width: calc(100% - 22vw);
      height: 20vw;
      background: white;
    }
    & .right section {
      .column;
      width: 100%;
      height: 16vw;
      // background: blanchedalmond;

      & h2 {
        margin: 0px;
        padding: 0px;
        color: #333;
      }
      & span {
        color: rgb(139, 139, 139);
      }
    }
    & .right .sale {
      .row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0px 8px;
      box-sizing: border-box;

      & h2 {
        width: 70%;
        margin: 0px;
        padding: 0px;
        color: rgb(223, 10, 10);
        text-align: left;
      }
      & .count {
        width: 30%;
        text-align: right;
        // background: skyblue;

        & i {
          cursor: pointer;
        }
      }
    }
  }
  & li:last-child {
    padding-bottom: 60px;
  }
}
.good.short {
  height: 36vh;
}

.cart_box {
  .row;
  justify-content: center;
  position: fixed;
  bottom: 50px;
  left: 0px;
  z-index: 9998;
  width: 100vw;
  // background: white;
}
</style>