<template>
  <div class="left_card_select">
    <div>
      <span>请选择年份：</span>
      <a-select
        :default-value="yearOne"
        class="select_left"
        @change="handleYear"
      >
        <a-select-option class="card_select_select-option" :value="item" v-for="(item,index) in heros" :key="index">
          <span>{{item}}</span>
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    year: {
      type   : String,
      default: () => {}
    },
    yearList: {
      type   : Array,
      default: () => []
    }
  },
  data() {
    return {
      heros  : this.yearList,
      yearOne: (new Date().getFullYear() - 1).toString()
    }
  },
  watch: {
    yearOne(val) {
      this.$emit('update:year', this.yearOne)
    },
    yearList(val) {
      this.heros = this.yearList
    }
  },
  methods: {
    handleYear(value) {
      this.yearOne = value
    }
  }
}
</script>
