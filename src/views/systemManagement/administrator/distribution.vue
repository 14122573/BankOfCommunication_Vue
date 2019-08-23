<template>
    <span class="distribution-span">
        <a-card :bordered="false">
            <a-row type="flex" slot="title" justify="space-between" align="middle">
                <a-col>
                    权限分配
                </a-col>
                <a-col >
                    <a-button type="primary" @click="$router.back();" ghost>返回</a-button>
                    <a-button type="primary">保存</a-button>
                </a-col>
            </a-row>
            <UserDetail/>
        </a-card>
        <a-divider style="margin-top:0px;"  dashed />
        <a-card :bordered="false">
            <a-form :form="formData">
            <a-row>
                <a-col span="8">
                    <a-form-item
                        label="角色名称："
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                    <a-select 
                        placeholder="请选择"
                        v-model="formData.space"
                        :options='[]'
                    />
                    </a-form-item>
                </a-col>
                <a-col span="8">
                    <a-form-item
                        label="组织机构："
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                    <a-select 
                        placeholder="请选择"
                        v-model="formData.space"
                        :options='[]'
                    />
                    </a-form-item>
                </a-col>
                <a-col span="8">
                    <a-form-item
                        label="所属行政区域："
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
    </span>
</template>
<script>
import UserDetail from './user-detail'
export default {
  name: 'pendingPermissions-distribution',
  components:{UserDetail},
  data(){
    return{
      formData:{},
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
  methods:{
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    onCheck(checkedKeys, info) {
      console.log('onCheck', checkedKeys, info)
    }
  }
}
</script>
<style scoped>
    .distribution-span{
        background: #fff;
        display: block;
    }
</style>



