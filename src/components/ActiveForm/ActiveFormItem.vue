<template>
  <a-form-item :label-col="{span:+ labelWidth}" :wrapper-col="{span: + (24 - labelWidth)}" :label="item.label">

    <a-input
      v-if="item.type == 'input'"
      v-decorator="validate"
      :placeholder="placeholder"
      :disabled="item.disabled" />

    <a-textarea
      v-if="item.type == 'textarea'"
      v-decorator="validate"
      :placeholder="placeholder"
      :disabled="item.disabled" />

    <a-checkbox-group
      v-if="item.type == 'checkbox'"
      v-decorator="validate"
      :options="item.options"
      :disabled="item.disabled" />

    <a-radio-group
      v-if="item.type == 'radio'"
      v-decorator="validate"
      :options="item.options"
      :disabled="item.disabled" />

    <a-select
      v-if="item.type == 'select'"
      v-decorator="validate"
      allowClear
      :placeholder="placeholder"
      :disabled="item.disabled">
      <a-select-option
        v-for="option in item.options"
        :key="option.value"
        :value="option.value">
        {{option.label}}
      </a-select-option>
    </a-select>

    <a-cascader
      v-if="item.type == 'cascader'"
      v-decorator="validate"
      allowClear
      :options="item.options"
      :placeholder="placeholder"
      :disabled="item.disabled" />

    <a-date-picker
      v-if="item.type == 'date'"
      style="width: 100%"
      v-decorator="validate"
      :format="item.format"
      allowClear
      :placeholder="placeholder"
      :disabled="item.disabled" />

    <a-range-picker
      v-if="item.type == 'daterange'"
      v-decorator="validate"
      :format="item.format"
      allowClear
      :placeholder="placeholder"
      :disabled="item.disabled" />

    <a-upload
      v-if="item.type == 'upload'"
      multiple
      v-decorator="validate"
      :customRequest="handleRequest"
      @change="handleChange"
      :remove="item.remove"
      accept='.jpg,.jpeg,.png,.gif,.doc,.docx,.xlsx,.xls,.xlsm,.txt,.pdf'
      :beforeUpload='item.beforeUpload'>
      <a-button>
        <a-icon type="upload" /> {{item.txt || '上传'}}
      </a-button>
    </a-upload>

    <a-button class="ActiveForm-view-btn" v-if="item.type == 'view'" v-decorator="validate" @click="handleClick">
      <a v-if="model[entry] && model[entry].fileType == 'file'" :href='model[entry].url' target="_blank">{{model[entry] && model[entry].name}}</a>
      <span v-else-if="model[entry] && model[entry].fileType == 'pic'">{{model[entry] && model[entry].name}}</span>
      <span v-else>{{model[entry] && model[entry].name}}</span>
    </a-button>

    <span v-if="item.type == 'text'" v-decorator="validate">
      {{model[entry]}}
    </span>
  </a-form-item>
</template>

<script>
export default {
  name: 'ActiveFormItem',
  props: {
    entry: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    labelWidth: {
      type: Number,
      default() {
        return 5
      }
    },
  },
  data() {
    return {
      curData: null,
    }
  },
  methods: {
    handleRequest(obj) {
      // 这里的obj是用来onProgress、onSuccess、onError的
      this.$nextTick(() => {
        this.item.customRequest(this.curData.file, obj)
      })
    },
    handleChange(data, list) {
      // 这里的data是用来响应改变model数据的
      this.curData = data
    },
    // 点击查看文件按钮的回调
    handleClick() {
      this.item.onClick(this.model[this.entry].url)
    },
    // 上传文件的过滤，防止类型错误的报错
    normFile(e) {
      if (Array.isArray(e)) return e
      return e && e.fileList
    },
  },
  computed: {
    // 默认表单验证
    validate() {
      if (this.item.type == 'checkbox') {
        // 如果是CheckBox的话初始化要是个数组
        return [this.entry, Object.assign(this.item.validate, {initialValue: []})]
      }
      if (this.item.type == 'upload') {
        return [this.entry, Object.assign(this.item.validate, {valuePropName: 'fileList'  , getValueFromEvent: this.normFile})]
      }
      return [this.entry, this.item.validate || {}]
    },
    // 默认placeholder
    placeholder() {
      const item = this.item
      if (item.placeholder) {
        return item.placeholder
      }
      if (item.type == 'input' || item.type == 'textarea') {
        return '请输入'
      }
      if (item.type == 'daterange') {
        return ['开始日期', '结束日期']
      }
      return '请选择'
    },
  }
}
</script>

<style>
  .ActiveForm-view-btn {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
