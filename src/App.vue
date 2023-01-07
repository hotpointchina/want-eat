<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">菜单</router-link> |
      <router-link to="/order">订单</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
body{
  margin: 0px; padding: 0px;
}
#app {
  position: relative;
  width: 100vw; 
  font-family: 'Microsoft YaHei', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

#nav {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0px; left: 0px;
  z-index: 9999;
  width: 96vw; 
  padding: 0vw 2vw;
  background: white none;
  box-shadow: 0px -1px 9px 0px rgba(0,0,0, 0.3);

  & a{
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    width: 40%;;
    padding: 2vw 20px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
  }
}

#nav a {
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
