<template>
    <a-card :bordered="false">
        <a-row type="flex" slot="title" justify="space-between" align="middle">
            <a-col>
                新增角色
            </a-col>
            <a-col >
                <a-button type="primary" @click="$router.back();" ghost>取消</a-button>
                <a-button type="primary">保存</a-button>
            </a-col>
        </a-row>
        <a-form :form="formData">
            <a-row>
                <a-col span="6">
                    <a-form-item
                        label="角色名称："
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                    <a-input
                        placeholder="请输入"
                        v-model="formData.name"
                    />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <a-tree
                checkable
                :treeData="treeData"
                v-model="checkedKeys"
                @select="onSelect"
                @check="onCheck"
            />
    </a-card>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
      treeData: [
        {
          title: 'parent 1',
          key: '0-0',
          children: [
            {
              title: 'parent 1-0',
              key: '0-0-0',
              children: [
                { title: 'leaf', key: '0-0-0-0'},
                { title: 'leaf', key: '0-0-0-1' }
              ]
            },
            {
              title: 'parent 1-1',
              key: '0-0-1',
              children: [{ key: '0-0-1-0' }]
            }
          ]
        }
      ],
      checkedKeys: []
    }
  },
  methods: {
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    onCheck(checkedKeys, info) {
      console.log('onCheck', checkedKeys, info)
    }
  },
  mounted() {
    console.log(this.$route)
  }
}
</script>
