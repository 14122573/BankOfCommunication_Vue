<template>
  <div class="container">
    <div class="card" v-for="item in list" :key="item.id" @click="showQrcode(item.id)">
      <img src="@/assets/images/qrcode.png" alt="qrcode"/>
      <p>{{item.name}}</p>
      <p>{{$com.formatDate(item.startTime, 'MM-DD')}} ~ {{$com.formatDate(item.endTime, 'MM-DD')}}</p>
    </div>
    <a-modal title="二维码" v-model="visible" :footer="null" width="20%">
      <div class="qr-wrapper">
        <Qrcode v-if="visible" :value="url"/>
      </div>
    </a-modal>
  </div>
</template>

<script>
import Qrcode from '@chenfengyuan/vue-qrcode'
export default {
  name: 'VoteQrCard',
  components: {
    Qrcode,
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      visible: false,
      url: null,
    }
  },
  methods: {
    showQrcode(id) {
      this.url = `http://iftp.omniview.pro/wx/vote?id=${id}`
      this.visible = true
    },
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
}
.container > .card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  border: 1px solid #eff7ff;
  width: 150px;
  height: 170px;
  text-align: center;
  margin: 8px;
  cursor: pointer;
  box-shadow: 0 0 3px 1px #eff7ff;
}
.container > .card:hover {
  box-shadow: 0 0 10px 6px #eff7ff;
}
.container > .card > img {
  width: 40px;
}
.container > .card > p {
  margin: 0;
}
.container > .card > p:last-child {
  color: #aaa;
}

.qr-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
