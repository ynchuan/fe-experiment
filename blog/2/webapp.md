# YOG2开发webapp环境搭建及运维备忘

## node-webapp-base

YOG2基于nodejs并以express为基础，搭载fis，封装了以应用为模块单元默认自动路由的后端开发框架。node-webapp-base为项目运行容器，内部可部署多个应用，实现后台模块化开发。

node-webapp-base基于`yog init project`创建，并安装了多个第三方依赖。当需要扩展第三方依赖，可通过`npm i other --save  | yog pack`完成打包并提交代码入库，按照webapp正常上线方式上线

webapp中不直接操作原始数据，数据来源后台rd接口，作为数据的中间平台，可以按照需要封装适配渲染数据。数据交换通过ral借入层接入数据，由于ral层数据接口文件是在容器启动时候一次读入内存中，所以每次ral文件变更，都需要重启。

ral有部分功能是针对百度内网定制的，内网中部分服务依赖百度bns。本地开发启动时如果使用依赖bns服务时会报node版本不兼容，因bns需要使用改造过的node版本，所以如不使用该服务可注释该服务，如使用可以修改server中host为对应服务外网域名。因orp环境不支持外网访问，bns的使用可以理解为访问外网的一种代理，只能访问同样部署在orp上的外网服务。

所以建议如果需要访问外网服务，即同样部署在orp上的服务，可以在ral创建两个配置`hh_dev.js|prod.js`，针对media是dev或者prod发布到或打包不同的ral文件到环境，解决本地非指定node版本的启动问题。

备注：所有app中ral各种服务名配置不允许重复，如果不同文件出现同名，服务会被覆盖。

## otp

otp为线上环境复制，开发测试使用，开发中如出现ral文件被修改情况，需要登录otp机器通过orp运维脚本重启环境。

重启方法：登录机器，进入目录，执行`noderuntime/bin/node_control restart`，通过该命令重启后会存在本地再次修改文件通过fis-deploy发布不上去的问题，可以在修改前添加环境变量`export YOG_DEBUG=true`，启动环境的开发模式


## orp

webapp线上运行环境，不能访问外网，例如`v.baidu.com`，可以访问内网域名，例如`i.webapp.video.baidu.com,bj.bcebos.com`，对于需要访问外网的情况，可以使用bns，bns接入orp中对于xiaodutv.com需要通过将header中host写为`game.xiaodutv.com`,因bns接入orp服务lighttpd的域名为`game.xiaodutv.com`,否则请求通不过，主要是账号部分使用。


## 开放云

由于业务迁移，orp中的video-webapp业务要迁移到开放云中。

开放云与orp相同之处都采用node环境，采用相同的服务部署目录和运维脚本`noderuntime/bin/node_control`。

开放云不同于orp的部分是bns服务及内网域名服务停止、node版本不在依赖指定版本、上线方式orp->walle、重启方式。

- bns服务及内网域名服务停止：bns部分切换为外网域名直接访问，内网域名服务采用ip直接访问 
- node版本不在依赖指定版本：不在依赖bns，node可以采用正常稳定版本
- 上线orp->walle：需要通过gitlab-xiaduagail-walle重新关联整个开发上线流程
- 重启方式：orp中可以每次上线时自动重启，walle中上线开放云机器需要walle中配置重启命令

orp新机器部署webapp环境流程

- walle中找到webapp-runtime项目，将该环境上线到指定机器。
- 不存在的项目要在walle中重新配置
- 存在的项目，直接添加指定机器ip，上线即可

## 线上问题定位

- 通过orp video-webapp产品线找到机器
- 登录机器后通过`cdapp video-webapp`，如果是预览器`cdapp video-webapp-prev`
- 进入log，access为访问日志，可以查看机器有没有流量过来；
- yog为环境的执行日志，因线上执行日志等级为4，即只能查看到`>notice`级别日志，日志按照日期小时拆分文件出现
- NOTICE日志查看对应日期的文件即可，FATAL/WARNING日志可以查看当前日期时间的`.wf.log`的日志文件。


## 相关

[webapp迁移](http://wiki.xiaodutv.com/pages/viewpage.action?pageId=15178888&flashId=-961189750)