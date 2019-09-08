<template>
<div class="routerWapper">
  <div v-if="$route.name == '/expertManagement/talent'" class="layoutMargin layoutPadding">
    <a-form class="protalForm" :form="searchForm">
      <a-row type="flex" justify="space-between" class="formItemLine">
        <a-col span="6">
          <a-form-item label="姓名" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input v-decorator="['name']" placeholder="请输入"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="6">
          <a-form-item label="账号" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="6">
          <a-form-item label="所属系统" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select v-decorator="['sysId']" placeholder="请选择" :options="options.sysList" allowClear></a-select>
          </a-form-item>
        </a-col>
        <a-col span="6">
          <a-form-item label="职称" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select v-decorator="['jobId']" placeholder="请选择" :options="options.jobList" allowClear></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between" align='middle' class="formItemLine">
        <!-- <a-col span="6">
            <a-form-item label="省级认定" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-radio-group v-decorator="['isPro']" :options="options.proList"></a-radio-group>
            </a-form-item>
        </a-col>
        <a-col span="6">
            <a-form-item label="部级认定" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-radio-group v-decorator="['isLev']" :options="options.levList"></a-radio-group>
            </a-form-item>
        </a-col> -->
        <a-col span="6">
          <a-form-item label="用户状态" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-checkbox-group v-decorator="['userStatus']" :options="options.statusList"></a-checkbox-group>
          </a-form-item>
        </a-col>
        <a-col span="6" style="text-align:right;">
          <a-button @click="reset" >重置</a-button>
          <a-button type="primary" @click="search">搜索</a-button>
        </a-col>
      </a-row>
    </a-form>
    <p class="gayLine"></p>
    <div class="portalTableOperates">
      <a-button icon='plus' type="primary" @click="add">新增人才</a-button>
      <a-button icon='download' @click="upload">批量导入人才</a-button>
    </div>
    <a-table class="portalTable" size="small" :dataSource="data" :columns="columns">
      <span slot="status" slot-scope="text, record"> <userStatus :status="record.status"/> </span>
        <span slot="action" slot-scope="text, record">
          <span class="actionBtn"  @click="viewBtn(record)">查看</span>
          <a-divider type="vertical" />
          <span class="actionBtn" @click="editBtn(record)">修改</span>
          <a-divider type="vertical" />
          <a-dropdown>
            <span class="actionBtn" > 更多 <a-icon type="down" /> </span>
            <a-menu slot="overlay" @click='(event)=>{showOpeations(event.key,record)}'>
              <a-menu-item class="actionBtn" key="2"> 重置密码 </a-menu-item>
              <a-menu-item class="actionBtn" key="1"> 启用 </a-menu-item>
              <a-menu-item class="actionBtn" key="3"> 注销 </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
    </a-table>
  </div>
  <RouterWapper v-else></RouterWapper>
</div>
</template>
<script>
import userStatus from '../../systemManagement/components/user-status'
import testStrong from '@/components/testPwd'
export default {
  name: 'Talent',
  components: { userStatus, testStrong },
  data() {
    return {
      searchForm: this.$form.createForm(this),
      options: {
        proList: [{ label: '是', value: '1' }, { label: '否', value: '0' }],
        levList: [{ label: '是', value: '1' }, { label: '否', value: '0' }],
        statusList: [
          { label: '正常', value: '1' },
          { label: '已注销', value: '8' }
        ]
      },
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      params: {},
      total: 0,
      data: [],
      columns: [
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '账号', dataIndex: 'phone', key: 'phone' },
        { title: '工作单位', dataIndex: 'dept', key: 'dept' },
        { title: '所属系统', dataIndex: 'sysId', key: 'sysId' },
        { title: '职称', dataIndex: 'job', key: 'job' },
        { title: '省级认定', dataIndex: 'isPro', key: 'isPro' },
        { title: '部级认定', dataIndex: 'isLev', key: 'isLev' },
        {
          title: '用户状态',
          dataIndex: 'userStatus',
          key: 'userStatus',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    // 查询
    search() {},
    // 重置
    reset() {},
    // 新增
    add() {
      this.$router.push({
        name: '/expertManagement/talent/create'
      })
    },
    // 导入
    upload() {
      this.$router.push({
        name: '/expertManagement/talent/upload'
      })
    },
    viewBtn(item) {},
    editBtn(item) {},
    showOpeations(key, item) {}
  }
}
</script>
<style scoped>
.table {
  margin-top: 10px;
}
</style>


