<!-- 这是文件上传组件，请在所需要的地方应用并调整对应参数 -->



<template>
	<div class="fileUpload">
    <el-upload
      class="upload-file"
      drag
      :on-change="fileChange">
      
      <i class="el-icon-upload"></i>
      <div class="el-upload_text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload_tip">{{uptip}}</div>
    </el-upload>
    <button @click="upload">提交附件</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'fileUpload',
  props: {
    doUpload: '',
    acceptLimit: '',
    uptip: String
  },
  data(){
    return {
      // doUpload: this.uploadURL,
      fileList: [],
      fileURL: [],
      files: [],
    }
  },
  methods: {
    upload(){
        let formData = new FormData();
        formData.append('files',this.files);
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        axios.post(uploadUrl,formData,config).then(res=>{
            if(res.code===0){
                this.submitForm();//提交表单
            }
        })
    },
    fileChange(file){
        this.files.push(file.raw);//上传文件变化时将文件对象push进files数组
    },
    beforeUpload(file) {
//       debugger
//       console.log(file,'文件‘)
      this.files = file;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.warning('上传文件大小不能超过 2Mb！')
        return
      }
      this.fileName = file.name;
      return isLt2M
      console.log('确认上传'+this.files.name)
//      return false
    },
    toReturnURL(response, file, fileList) {
      this.fileURl = response.data.fileURL //这里只能请各位后端老爷们把各处文件上传的返回体写得一样咯。。。
      this.$emit('listenToFUL', this.fileURL)
    },
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 7 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<style>
</style>
