<template>
  <div>
    <div class="card-wrapper">
      <a-card
        class="card"
        :loading="loading"
        title="通知公告"
        :bordered="false"
        size="small"
      >
        <a slot="extra" href="#">更多 >></a>
        <div class="noti-list">
          <a-list item-layout="horizontal" :data-source="list">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-list-item-meta
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              >
                <a slot="title" href="https://www.antdv.com/">{{
                  item.title
                }}</a>
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
      </a-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      list   : [
        {
          title: 'Ant Design Title 1'
        },
        {
          title: 'Ant Design Title 2'
        },
        {
          title: 'Ant Design Title 3'
        },
        {
          title: 'Ant Design Title 4'
        }
      ]
    }
  },
  methods: {
    handleClick() {
      this.loading = !this.loading
    }
  }
}
</script>

<style scoped>
.card-wrapper {
  height: 400px;
  overflow: scroll;
  margin: 30px 50px 30px 50px;
}

.card-wrapper .card {
  text-align: left;
}
</style>
