<template>
	<div style="margin-top:-24px">
		<div class='input_span' >
			<span id="one" :style="returnStyle"></span>
			<span id="two" :style="returnStyle"></span>
			<span id="three" :style="returnStyle"></span>
		</div>
	</div>
</template>

<script>
export function checkStrong(sValue) {
  var modes = 0
  //正则表达式验证符合要求的
  if (sValue.length < 1) return modes
  if (/\d/.test(sValue)) modes++ //数字
  if (/[a-z]/.test(sValue)) modes++ //小写
  if (/[A-Z]/.test(sValue)) modes++ //大写
  if (/\W/.test(sValue)) modes++ //特殊字符
  //逻辑处理
  switch (modes) {
  case 1:
    return 1
    break
  case 2:
    return 2
    break
  case 3:
  case 4:
    return sValue.length < 10 ? 3 : 4
    break
  default:
    break
  }
  return modes
}
export default {

  props: {
    pwd: {
      type: String,
      default(){
        return ''
      }
    },
    width: {
      type: [ String,Number ]
    }
  },
  data() {
    return {
      msgText: '',
    }
  },
  computed: {
    returnStyle(){
      if(this.width){
        return{
          width: this.width+'px'
        }
      }
    }
  },
  watch: {
    pwd(newValue, oldValue) {
      this.msgText = checkStrong(newValue)
      if (this.msgText > 1 || this.msgText == 1) {
        document.getElementById('one').style.backgroundColor = 'red'
      } else {
        document.getElementById('one').style.backgroundColor = '#eee'
      }
      if (this.msgText > 2 || this.msgText == 2) {
        document.getElementById('two').style.backgroundColor = 'orange'
      } else {
        document.getElementById('two').style.backgroundColor = '#eee'
      }
      if (this.msgText == 4) {
        document.getElementById('three').style.backgroundColor = '#00D1B2'
      } else {
        document.getElementById('three').style.backgroundColor = '#eee'

      }
    }
  },
}
</script>

<style scoped>
	#inputValue {
		width: 240px;
		margin-left: 20px;
		padding-left: 10px;
		border-radius: 3px;
	}
	.input_span {
		height: 24px;
	}
	.input_span span {
		display: inline-block;
		width: 84px;
		height: 6px;
		background: #eee;
		line-height: 20px;
	}
	#one {
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		border-right: 0px solid;
		margin-right: 5px;
	}
	#two {
		border-left: 0px solid;
		border-right: 0px solid;
		margin-left: -5px;
		margin-right: 5px;
	}
	#three {
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		border-left: 0px solid;
		margin-left: -5px;
	}

	#font {
		font-size: 12px;
	}

	#font span:nth-child(1) {
		color: red;
		margin-left: 35px;
	}

	#font span:nth-child(2) {
		color: orange;
		margin: 0 60px;
	}

	#font span:nth-child(3) {
		color: #00D1B2;
	}
</style>
