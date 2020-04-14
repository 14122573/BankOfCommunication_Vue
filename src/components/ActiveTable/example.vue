<template>
  <ActiveTable
    rowKey="id"
    :columns="columns"
    :data="list"
    @on-page-change="test"
    @on-select-change="select"
    :currentPage="currentPage"
    :total="total"
    showPager
  >
    <div slot="test" slot-scope="{ text, record }">
      <span>{{ text }}</span>
      <a-input :value="record.gender"></a-input>
    </div>
  </ActiveTable>
</template>

<script>
export default {
  name: 'TableExample',
  data () {
    return {
      total      : 30,
      currentPage: 1,
      columns    : [ {
        title      : 'Test',
        dataIndex  : 'test',
        scopedSlots: { customRender: 'test' }
      }, {
        title    : 'Name',
        dataIndex: 'name',
        type     : 'link',
        align    : 'center',
        onClick  : this.testClick
      }, {
        title         : 'Gender',
        dataIndex     : 'gender',
        align         : 'center',
        type          : 'input',
        placeholder   : '请输入',
        filterMultiple: false,
        filters       : [
          { text: 'Male', value: 'male' },
          { text: 'Female', value: 'female' }
        ]
      }, {
        title      : 'Email',
        dataIndex  : 'email',
        align      : 'center',
        type       : 'select',
        placeholder: '请选择',
        options    : [
          { label: 'qq', value: '@qq.com' },
          { label: 'gmail', value: '@gmail.com' }
        ]
      } ],
      list: [
        { test: 'aa', id: '1', name: 'test', gender: 'male', email: '@qq.com' },
        { id: '2', name: 'test', gender: 'male', email: '@qq.com' },
        { id: '3', name: 'test', gender: 'female', email: '@qq.com' },
        { id: '4', name: 'test', gender: 'male', email: '@qq.com' }
      ]
    }
  },
  methods: {
    log (a, b) {
      console.log(a, b)
    },
    test ({ current }) {
      console.log(current)
      this.currentPage = current
    },
    select (a, b) {
      console.log('select', a, b)
    },
    testClick (data) {
      console.log('click', data)
    }
  }
}
</script>
