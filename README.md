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

```shell
git clone git@github.com:Cui-y/gulp-work.git my-project
cd my-project
```

安装依赖

> 要求node版本:  ^6.14.0  ||  ^8.10.0  ||  >=9.10.0

```shell
yarn install
```

本地开启服务进行预览开发

```shell
yarn start
```

生产上线

```shell
yarn build
```

语法检查

```shell
yarn lint --fix
```

## todos

- UI优化
- 底部按钮
  - app内部，判断相关商品是否>1 => actionsheet，否则点击按钮直接跳转app/或页面
    - http请求(淘宝) - 商品id，用户id
    - 跳转
      - 淘宝
      - 非淘宝(jd/pdd/...) - 后台发布文章插入链接
  - app外部
    - 增加按钮 - 返利模式购买 -> 跳转下载页面
    - 点击购买
      - 非淘宝 直接跳转
        - 有app直接转入对应页面(urlScheme)
        - 无app直接进入商品详情
      - 淘宝 提示弹框
