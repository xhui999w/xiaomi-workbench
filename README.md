# 小米工作台

面向小米门店日常执行的轻量工作台，集中管理款项日结、数据核对、客户运营、陈列检查与学习任务。

## 功能

- 8 项每日待办，按经营核对、客户运营、门店形象和个人成长分组
- 点击卡片完成或取消，实时统计当日进度
- 任务状态保存在浏览器本机，第二天自动使用全新清单
- 支持手机、平板和电脑
- 提供 `amd64` 与 `arm64` 容器镜像，适合主流 NAS

## NAS 使用 Docker Compose 安装

新建一个目录，将仓库中的 `docker-compose.yml` 放入目录，然后运行：

```bash
docker compose pull
docker compose up -d
```

浏览器打开：

```text
http://NAS的IP地址:3000
```

## 使用 Docker 命令安装

```bash
docker pull ghcr.io/xhui999w/xiaomi-workbench:latest

docker run -d \
  --name xiaomi-workbench \
  --restart unless-stopped \
  -p 3000:3000 \
  ghcr.io/xhui999w/xiaomi-workbench:latest
```

升级镜像：

```bash
docker pull ghcr.io/xhui999w/xiaomi-workbench:latest
docker rm -f xiaomi-workbench
docker run -d --name xiaomi-workbench --restart unless-stopped -p 3000:3000 ghcr.io/xhui999w/xiaomi-workbench:latest
```

## NAS 图形界面参数

| 项目 | 设置 |
| --- | --- |
| 镜像 | `ghcr.io/xhui999w/xiaomi-workbench:latest` |
| 容器端口 | `3000` |
| 本地端口 | `3000`，或任意未占用端口 |
| 重启策略 | `unless-stopped` |
| 存储卷 | 不需要 |

待办状态存储在访问者的浏览器中，不写入容器，因此升级或重建容器不会影响当天已勾选的状态。

## 本地开发

需要 Node.js 22 或更高版本：

```bash
npm ci
npm run dev
```

## 开源协议

[MIT](LICENSE)
