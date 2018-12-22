# 多米生活app 爆料文章
多米生活app 爆料文章

## 项目目录结构

```shell
.
├── README.md
├── config
│   ├── gulp.config.js
│   ├── gulp.dev.js
│   ├── gulp.init.js
│   └── gulp.prod.js
├── gulpfile.js
└── package.json
```

## 开发流程

克隆项目到本地
```
git clone git@github.com:Cui-y/gulp-work.git my-project
cd my-project
```

安装依赖

> 要求node版本:  ^6.14.0  ||  ^8.10.0  ||  >=9.10.0

```
yarn install
```

本地开启服务进行预览开发
```
yarn start
```

生产上线
```
yarn build
```

语法检查
```
yarn lint --fix
```

## 协议
MIT
