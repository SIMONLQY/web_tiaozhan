#fileUpload

###调用方式
在对应的地方引用组件即可

###父组件应提供参数
在父组件template中加入如下部分
```
<file-upload
  :doUpload= "<!-- 此处写入对应的后端接口的变量名，变量在data的return中赋值为后端接口（字符串） -->"
  :acceptLimit= "<!-- 此处写入对应的文件类型的变量名。变量在data的return中赋值为限制条件（限制为上传图片，则为：image/jpeg,image/gif,image/png,image/bmp）（不限制文件类型则不写此项） -->"
  :uptip= "<!-- 此处写入对应上传的限制提示的变量名。变量在data的return中赋值为限制提示（字符串）。需包括文件大小，最大上传文件数量，限制的文件类型（不限制则写不限） -->"></file-upload>
```