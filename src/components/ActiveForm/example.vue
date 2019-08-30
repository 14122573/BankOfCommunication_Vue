/** ActiveForm 使用示例 */

// 首先在入口文件引入并use组件
// import ActiveForm from '@/components/ActiveForm'
// Vue.use(ActiveForm)

<template>
<a-card>
  <ActiveForm :layout="layout" :label-width="7" ref="exampleForm" :model="model">
    <div slot="title">
      <h2>ActiveForm Title（可选, 样式自己定)</h2>
    </div>
    <div style="text-align:right">
      <a-button @click="handleSearch" type="primary">查询</a-button>
      <a-button @click="handleReset">重置</a-button>
    </div>
  </ActiveForm>
</a-card>
</template>

<script>
export default {
  name: 'ExampleComponent',
  data() {
    return {
      layout: [
        {
          example1: {
            label: '输入',
            type: 'input',
            width: 8,
            validate: {
              rules: [{required: true, message: '请输入'}]
            }
          },
          example2: {
            label: '单选',
            type: 'radio',
            width: 8,
            options: [
              {label: '男', value: '1'},
              {label: '女', value: '0'},
            ]
          },
          example3: {
            label: '选择',
            type: 'select',
            width: 8,
            options: [
              {label: '苹果', value: '苹果'},
              {label: '香蕉', value: '香蕉'},
            ],
            disabled: true
          },
          example4: {
            label: '日期',
            type: 'date',
            width: 8,
            validate: {
              rules: [{required: true, message: '请选择日期'}]
            }
          },
          example5: {
            label: '日期区间',
            type: 'daterange',
            width: 8,
            validate: {
              rules: [{required: true, message: '请选择'}]
            }
          },
          example6: {
            label: '级联',
            type: 'cascader',
            width: 8,
            options: [{
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [{
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [{
                  value: 'xihu',
                  label: 'West Lake',
                }],
              }],
            }, {
              value: 'jiangsu',
              label: 'Jiangsu',
              children: [{
                value: 'nanjing',
                label: 'Nanjing',
                children: [{
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                }],
              }],
            }]
          },
          example7: {
            label: '多选框',
            type: 'checkbox',
            width: 8,
            options: [
              {label: '龙', value: '龙'},
              {label: '蛇', value: '蛇'},
            ],
            validate: {
              rules: [{required: true, message: '请选择'}]
            }
          },
          example8: {
            label: '查看文件',
            type: 'view',
            width: 8,
            onClick: this.handleClick, // 点击后触发的回调，返回对应的url
          },
        },
        {
          example9: {
            label: '上传',
            type: 'upload',
            txt: '上传文件', // 上传按钮的名字，不传的话默认是‘上传’
            width: 8,
            remove: this.remove, // remove动作会自动完成，没有其他特殊要求的操作可以不用调用了
            customRequest: this.customRequest, // 上传请求
            beforeUpload: this.beforeUpload, // 上传前的校验，没有其他特殊要求的操作可以不用调用了
            validate: {
              rules: [{required: true, message: '请上传'}]
            }
          },
          example10: {
            label: '文字',
            type: 'text',
            width: 8,
          }
        }
      ],
      model: {
        example4: '2019/08/23',
        example5: ['2019/08/23', '2019/08/24'],
        example7: ['龙'],
        example8: {
          name: 'accounts.xlsx',
          fileType: 'file', // file为新开页下载，pic根据你的event回调来定
          url: 'http://iftp.omniview.pro/temp/1567069629359-634052a98b43d554976a440bf07a35af.xlsx',
        },
        example9:  [
          {
            name: 'accounts.xlsx',
            objId: null,
            response: null,
            status: null,
            type: null,
            uid: 'f58ba55c2ce847a0bc7ea0ca74fadcb9',
            url: 'http://iftp.omniview.pro/temp/1567069629359-634052a98b43d554976a440bf07a35af.xlsx',
          }
        ],
        example10: '纯展示数据用',
      },
    }
  },
  methods: {
    handleSearch() {
      console.log('example-model', this.model)
      this.$refs.exampleForm.validate(err => {
        if (err) return
        // TODO  这里做接下来的其他操作
        this.model.example10 = JSON.stringify(this.model)
      })
    },
    handleReset() {
      this.model = {
        example8: {
          name: 'accounts.xlsx',
          fileType: 'file',
          url: 'http://iftp.omniview.pro/temp/1567069629359-634052a98b43d554976a440bf07a35af.xlsx',
        },
      }
    },
    // 上传的请求
    customRequest(data, fn) { // data是数据，可修改data来同步更新model；fn用来调用onProgress、onSuccess、onError这些函数
      setTimeout(() => { // 模拟请求完成后的操作
        // 这里可以修改data的一些所需的字段值，比如插入url什么的
        data.url = 'http://www.baidu.com'
        // ！！有一点不同的是没必要再手动插入model中了，model会自动更新
        fn.onSuccess()
      }, 500)
    },
    // remove动作会自动完成，如果没有其他特殊要求的操作可以去掉了
    remove(data) {
      console.log('remove', data)
    },
    // 上传前的校验，没有其他特殊要求的操作可以去掉了
    beforeUpload(data) {
      console.log('before', data)
    },
    handleClick(data) {
      console.log('click', data)
    },
  }
}
</script>
