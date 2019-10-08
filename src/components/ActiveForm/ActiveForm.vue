<template>
  <a-form :form="form">
    <slot name="title"/>
    <a-row v-for="(row, rowIndex) in layout" :key="rowIndex">
      <a-col v-for="(item, key) in row" :key="key" :span="item.width">
        <ActiveFormItem
          :entry="key"
          :model="model"
          :item="item"
          :labelWidth="labelWidth"
        />
      </a-col>
    </a-row>
    <slot />
  </a-form>
</template>

<script>
import moment from 'moment'
import ActiveFormItem from './ActiveFormItem'
export default {
  name: 'ActiveForm',
  components: {
    ActiveFormItem
  },
  props: {
    layout: {
      type: Array,
      required: true
    },
    model: {
      type: Object,
      default () {
        return {}
      }
    },
    labelWidth: {
      type: Number,
      default () {
        return 5
      }
    }
  },
  created () {
    this.filterDateItem()
  },
  data () {
    return {
      form: this.$form.createForm(this, {
        // 当表单值变化时同时赋给model
        onValuesChange: (e, val) => {
          this.model = Object.assign(this.model, this.operateDateItem(val, true))
        }
      }),
      dateItems: {}
    }
  },
  mounted () {
    const model = this.filterDataModel(this.model)
    // 根据model初始化表单值
    this.form.setFieldsValue(this.operateDateItem(model, false))
  },
  methods: {
    // 表单验证，上级组件可以通过this.$refs来调用此函数
    validate (callback) {
      this.form.validateFields((err, values) => {
        callback(err, values)
      })
    },
    // 筛选layout中的日期组件
    filterDateItem () {
      const result = {}
      this.layout.forEach(item => {
        for (const key in item) {
          if (item[key].type && (item[key].type == 'date' || item[key].type == 'daterange')) {
            result[key] = item[key]
          }
        }
      })
      this.dateItems = result
    },
    // 由于antd的日期组件都是moment格式，这里进行了转化成字符串
    operateDateItem (obj, isMomentToString) {
      const model = { ...obj }
      for (const key in model) {
        const dateItem = this.dateItems[key]
        if (!dateItem) return model
        if (dateItem.type == 'date') {
          if (isMomentToString) {
            if (!moment.isMoment(model[key])) return model
            model[key] = moment(model[key]).format(dateItem.format || 'YYYY-MM-DD')
          } else {
            model[key] = moment(model[key], dateItem.format || 'YYYY-MM-DD')
          }
        } else if (dateItem.type == 'daterange') {
          if (isMomentToString) {
            if (!moment.isMoment(model[key][0]) || !moment.isMoment(model[key][1])) return model
            model[key] = [moment(model[key][0]).format(dateItem.format || 'YYYY-MM-DD'), moment(model[key][1]).format(dateItem.format || 'YYYY-MM-DD')]
          } else {
            model[key] = [moment(model[key][0], dateItem.format || 'YYYY-MM-DD'), moment(model[key][1], dateItem.format || 'YYYY-MM-DD')]
          }
        }
      }
      return model
    },
    // 过滤掉layout中不存在的字段，防止You cannot set a form field before rendering a field associated with the value.的错误
    filterDataModel (model) {
      const keys = Object.keys(model)
      if (keys.length <= 0) return {}
      const list = []
      if (this.layout.length > 0) {
        this.layout.forEach(item => {
          list.push(...Object.keys(item))
        })
      }
      const result = {}
      keys.forEach(key => {
        if (list.indexOf(key) >= 0) {
          result[key] = model[key]
        }
      })
      return result
    }
  },
  watch: {
    model (cur, past) {
      // 通过监听model来判断reset表单或给表单重新设置值
      const keys = Object.keys(cur)
      const result = this.filterDataModel(cur)
      if (keys.length <= 0) {
        this.form.resetFields()
      } else {
        this.form.resetFields()
        this.form.setFieldsValue(this.operateDateItem(result, false))
      }
    }
  }
}
</script>
