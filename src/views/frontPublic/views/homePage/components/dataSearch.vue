<template>
  <div class="background">
    <div class="searchWrapper">
      <a-row
        align="middle"
        justify="start"
        type="flex"
        style="height: 300px; margin: 0px 56px 0px 36px;"
      >
        <a-col :span="11">
          <a-list :split=false>
            <a-list-item>
              <a-col style="font-weight:bold">数据查询</a-col>
            </a-list-item>
            <a-list-item>
              <a-input placeholder="请输入查询信息" />
              <span>&nbsp;&nbsp;&nbsp;</span>
              <a-button type="primary" icon="search" @click="jumpToPage">查询</a-button>
            </a-list-item>
          </a-list>
        </a-col>
        <!-- <a-col :span="11">
          <a-row type="flex" align="bottom">
            <a-col style="font-weight:bold">数据查询</a-col>
          </a-row>
          <a-row type="flex" align="top">
            <a-col :span="18"><a-input placeholder="请输入查询信息"/></a-col>
            <a-col :span="6"
              ><a-button type="primary" icon="search" :size="size"
                >查询</a-button
              ></a-col
            >
          </a-row>
        </a-col> -->
        <a-col :span="2">
          <a-divider type="vertical" />
        </a-col>
        <a-col :span="11" class="right-content">
          <a-list :split="false">
            <a-list-item>
              连续文字表示“并且”关系，如“北京小龙虾”表示“和北京以及小麦相关数据”
            </a-list-item>
            <a-list-item>
              “空格”分割文本之间为“或者”关系，如“北京小龙虾
              河北小龙虾”表示“和北京或者天津以及小龙虾相关的数据”
            </a-list-item>
          </a-list>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    jumpToPage() {
      this.$router.push({
        name: 'dataSearch'
      })
    }
  },
}
</script>

<style scoped>
.description {
  margin: 0px;
  padding: 0px;
  font-size: 14px;
  color: #616669;
  text-align: left;
}
.background {
  height: 300px;
  margin: 20px 0px 20px 0px;
}

.searchWrapper {
  height: 300px;
  max-width: 1000px;
  margin: 0 auto;
}

.background .right-content {
  text-align: left;
  margin: 0px;
}
</style>
