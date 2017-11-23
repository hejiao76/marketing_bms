<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div style="color:red;">组件部分结束</div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: '这里是组件部分'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
