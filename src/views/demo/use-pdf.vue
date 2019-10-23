<template>
  <div class="routerWapper" style="width:100%">
    <div class='layoutMargin contentPadding'>
      <ViewPDF :src='"http://iftp.omniview.pro/group1/M00/00/16/CgAB212oLYqABmhpAAODjgte9WM808.pdf"'></ViewPDF>
    </div>
  </div>
</template>

<script>
import ViewPDF from '@/components/theThreeParty/viewPdf.vue'
export default {
  components: { ViewPDF },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>
