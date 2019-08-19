<template>
  <div>
    <div id="allmap" ref="allmap" :style="mapStyle"></div>
    <div id="r-result"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      map: '',
      address:''
    }
  },
  props: {
    height: {
      type: Number,
      default: 400
    },
    width: {
      type: Number,
      default: 800
    },
    keyWords: {//搜索地址的关键字
      type: [String]
    },
    setPosition: {
      type: [String]
    },
    position: {//地图对应的经纬度（坐标）
      type: Object
    }
  },
  methods: {
    //init
    showMap() {
      this.map = new BMap.Map(this.$refs.allmap) // 创建Map实例
      var point = new BMap.Point(121.47, 31.23)
      this.map.centerAndZoom('上海',12)
      var marker = new BMap.Marker(point) // 创建标注
      this.map.addOverlay(marker) // 将标注添加到地图中
      this.map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
      this.map.disableDragging() //禁止拖拽
      let vm = this
      setTimeout(function() {
        vm.map.enableDragging() //两秒后开启拖拽
      }, 2000)
      this.map.addEventListener('click', this.add_overlay)
    },
    //添加覆盖物
    add_overlay(e) {
      this.remove_overlay()
      var point = new BMap.Point(e.point.lng, e.point.lat)
      var marker = new BMap.Marker(point) // 创建标注
      this.map.addOverlay(marker) // 将标注添加到地图中
      marker.enableDragging()
      this.addressByPoint(e.point)
    },
    //清除覆盖物
    remove_overlay() {
      this.map.clearOverlays()
    },
    //获取第一个智能搜索的结果添加标注
    setPlace(point) {
      this.map.clearOverlays() //清除地图上所有覆盖物
      var pp = point //获取第一个智能搜索的结果
      this.setZoom([pp])
      // this.map.centerAndZoom(pp, this.setZoom(pp));
      let marker = new BMap.Marker(pp)
      this.map.addOverlay(marker) //添加标注
      marker.enableDragging()
      this.addressByPoint(point)
      //拖拽结束事件
      let vm = this
      marker.addEventListener('dragend', function(e) {
        vm.addressByPoint(e.point)
      })
    },
    //搜索
    searchKeyWords(word) {
      let vm = this
      var options = {
        onSearchComplete: function(results) {
          // 判断状态是否正确
          if (local.getStatus() == BMAP_STATUS_SUCCESS) {
            //返回搜索结果
            vm.$emit('on-result', results)
          }
        }
      }
      var local = new BMap.LocalSearch(this.map, options)
      local.search(word)
    },
    //根据点坐标获取地址信息
    addressByPoint(e) {
      let vm = this
      var geocoder = new BMap.Geocoder()
      geocoder.getLocation(e, function(rs) {
        let obj=rs.addressComponents
        obj.address=rs.address
        let data =obj
        let address
        if(vm.address == ''){
          address=rs.address
        }else{
          address=vm.address
        }
        //地图坐标发生变化，返回地址数据
        vm.$emit('on-change', data,address)
        vm.address=''
      })
    },
		 // 根据点的数组自动调整缩放级别  
		 setZoom(bPoints) {  
      var view = this.map.getViewport(bPoints)  
      var mapZoom = view.zoom  
      var centerPoint = view.center  
      this.map.centerAndZoom(centerPoint, mapZoom)  
				 
    }  
  },
  mounted() {
    this.showMap()
  },
  computed: {
    mapStyle() {
      let render = {}
      render.height = this.height + 'px'
      render.width = this.width + 'px'
      render.margin = '0 auto'
      return render
    }
  },
  watch: {
    keyWords() {
      this.searchKeyWords(this.keyWords)
    },
    position() {
      this.address=''
      this.address=this.position.address
      let point=this.position.point
      if (JSON.stringify(point) != '{}') {
        this.setPlace(point)
      }
    }
  }
}
</script>
<style scoped>
</style>
