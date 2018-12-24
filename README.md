# Koa2 for CMS

#### 简介
使用koa2框架开发，redis作为session存储，使用import导入文件，兼容未来开发趋势，线上使用pm2常驻服务启动。

### 项目主要技术架构
***
*  koa2
*  koa-router
*  ioredis
*  mysql2
*  sequelize
*  ramda
*  pm2

### 安装

***
项目地址: (`git clone`)

```
git clone git@github.com:xpioneer/cms-be.git
```
使用 `yarn` 安装 node_modules

```
yarn #in your command terminal
```
***
### 运行

启动开发服务: (http://localhost:9901)

```
yarn start
```

生产环境运行

```
pm2 start start.json
```





