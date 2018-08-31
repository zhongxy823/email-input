<template>
  <div>
    <el-select v-model.trim="emailInput"
               clearable
               filterable
               remote
               reserve-keyword
               default-first-option
               placeholder="请输入邮箱"
               :filter-method = "remoteMethod"
               @clear="handleSelectClear"
               @change="handleSelectChange"
               allow-create>
      <el-option v-for="item in emailOptions" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: '',
  data: function () {
    return {
      emailOptions: [],
      emailInput: [],
      list: [],
      loading: false,
      states: ['@qq.com', '@163.com', '@139.com', '@126.com']
    }
  },
  created () {},
  mounted () {
    this.list = this.states.map(item => {
      return { value: item, label: item }
    })
  },
  methods: {
    remoteMethod (query) {
      if (query !== '') {
        this.emailInput = query
        if (query.indexOf('@') > -1) {
          this.emailOptions = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        } else {
          this.list = this.states.map(item => {
            return { value: item, label: item }
          })
          this.list.forEach((item) => {
            item.value = `${query}${item.value}`
            item.label = `${query}${item.label}`
          })
          this.emailOptions = this.list.filter(() => {
            return true
          })
        }
      } else {
        this.emailOptions = []
      }
    },
    handleSelectClear (e) {
      this.emailOptions = []
    },
    handleSelectChange () {
      this.emailOptions = []
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped>
</style>
