# bms-voy

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



#tinyMCE

## Editor setup
```
npm install
<!-- tinyMCE的相关依赖我已经写到package.json中，包括图片上传的插件
 一键上传相关部分之后单独写文档-->
```

### Editor import
编辑器已经写成组件，请在需要使用的地方使用
使用图片上传插件：tinymce-imageupload 的时候，请在node-modules 中修改tinymce-imageupload中的tinymce-imageupload/js/plugin.js 第19行name="file" 为 name="file[]"
tinymce-imageupload/main.js 第126行 param.append('file', file, file.name) 为 param.append('file[]', file, file.name)