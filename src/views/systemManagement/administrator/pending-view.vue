<template>
    <a-card :style="{margin:'14px 0 0 14px'}" :bordered="false">
        <a-row type="flex" slot="title" justify="space-between" align="middle">
            <a-col>
                查看
            </a-col>
            <a-col >
                <a-button type="primary" @click="$router.back()" ghost>返回</a-button>
                <a-button type="primary" @click="toDistribution">权限分配</a-button>
            </a-col>
        </a-row>
        <UserDetail :id="$route.query.id" />
    </a-card>
</template>
<script>
import UserDetail from './user-detail'
export default {
  name: 'pendingPermissions-view',
  components:{UserDetail},
  methods:{
    toDistribution(){
      this.$router.push({
        name:'/systemManagement/administrator/distribution',
        query:{
            id:this.$route.query.id
        }
      })
    }
  }
}
</script>

