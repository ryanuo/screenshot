# Vercel Screenshot

一个基于 Puppeteer 或 Playwright 的无服务器 API，用于捕获网站截图。

## 简介

本项目源自 [RemiixInc/screenshot](https://github.com/RemiixInc/screenshot)，经过修改和更新，采用了新的截图包，目前可基于 Puppeteer 或 Playwright 实现网站截图功能，支持部署到 Vercel 或 Netlify 等平台。

## 技术栈

- **核心依赖**：
  - `puppeteer-core`：无头浏览器工具，用于网页截图
  - `playwright-core`：另一个无头浏览器工具，可替代 Puppeteer 使用
  - `@sparticuz/chromium`：适用于 serverless 环境的 Chromium 浏览器

## 部署指南

### Vercel 部署

1. 克隆或 Fork 本仓库到你的代码库
2. 在 Vercel 中导入该仓库
3. 系统会自动使用 `vercel.json` 中的配置（最大运行时长 60 秒）
4. 部署完成后即可使用

### Netlify 部署

1. 克隆或 Fork 本仓库到你的代码库
2. 在 Netlify 中导入该仓库
3. 系统会自动读取 `netlify.toml` 配置：
   - 函数超时时间：26 秒
   - 内存限制：1.5GB（因 Puppeteer 较耗内存）
   - 自动重定向 `/api/*` 到对应函数

## 使用方法

### API 端点

部署后，API 端点为：
```
https://<你的部署域名>/api
```

### 参数说明

| 参数名 | 类型 | 说明 | 默认值 |
|--------|------|------|--------|
| `url` | string | 必需，要截图的网站 URL（需包含 http/https） | - |
| `width` | number | 截图宽度 | 1280 |
| `height` | number | 截图高度 | 720 |
| `returnType` | string | 返回类型，`buffer` 直接返回图片，`json` 返回 OSS 存储地址 | `buffer` |

### 示例

```
https://<你的部署域名>/api?url=https://google.com&width=1280&height=720
```

## 切换截图工具

默认使用 Puppeteer，若要切换为 Playwright：

1. 在 `api/index.ts` 中注释掉 Puppeteer 导入
2. 取消注释 Playwright 导入：
   ```typescript
   // import { getScreenshot } from '../lib/puppeteer'
   import { getScreenshot } from '../lib/playwright'
   ```

## 许可证

本项目基于 MIT 许可证开源，详见 [LICENSE](LICENSE) 文件。

版权所有 © 2025 Ryanuo，© 2024 Adam Bukowski，© 2021 RemiixInc
