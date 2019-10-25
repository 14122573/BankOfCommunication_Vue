<template>
  <div class="routerWapper" style="width:100%">
    <div class='layoutMargin contentPadding'>
      <cpdf :pdfurl='"http://iftp.omniview.pro/group1/M00/00/16/CgAB212oLYqABmhpAAODjgte9WM808.pdf"'></cpdf>
    </div>
  </div>
</template>

<script>
import cpdf from '@/components/theThreeParty/pdf.vue'
export default {
  components: { cpdf },
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
