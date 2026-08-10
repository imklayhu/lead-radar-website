# Lead Radar 官网

[Lead Radar](https://github.com/imklayhu/lead-radar-website) 的公开落地页：面向健身私教的小红书销售线索采集服务。

纯 HTML / CSS / JS 静态单页，无构建工具、无框架、无外部运行时依赖，可直接托管在任何静态服务器上。

## 页面内容

- Hero 区：一句话介绍 + 内测提示
- 工作原理：六步采集漏斗（关键词搜索 → 帖子路由 → 评论抓取 → AI 打分 → 人工审核 → 有效线索）
- 为什么选择 Lead Radar：提升获客效率 / AI 秒级初筛 / 评论+意向双重信号 / 线索直达飞书审核
- 定价卡片：体验版 ¥0、基础版 ¥99（推荐）、专业版 ¥299、团队版 ¥799
- FAQ + CTA

## 本地预览

仓库根目录直接提供静态文件，无需安装依赖：

```bash
cd lead-radar-website
python3 -m http.server 8000
```

打开 <http://localhost:8000> 即可查看。

## 部署

通过 GitHub Actions 自动部署到 GitHub Pages（`actions/configure-pages` + `actions/upload-pages-artifact` + `actions/deploy-pages`）：

- 每次 push 到 `main` 分支（或手动触发 `workflow_dispatch`）都会触发 `Deploy to GitHub Pages` 工作流。
- 站点地址：`https://imklayhu.github.io/lead-radar-website/`

### 首次部署前需要在 GitHub 后台开启 Pages

> 仓库所有者的设置项，无法由 workflow 自动修改，需手动完成一次：

1. 打开仓库 **Settings → Pages**
2. 在 **Build and deployment** 的 **Source** 下拉中选择 **GitHub Actions**
3. 保存后，后续 push 会自动完成构建与部署

## 目录结构

```
.
├── index.html          # 页面结构（全部文案在此）
├── styles.css          # 样式与响应式
├── script.js           # 少量交互（导航、FAQ）
└── .github/workflows/
    └── deploy.yml      # GitHub Pages 部署工作流
```

## 修改文案

所有中文文案都集中在 `index.html` 中，直接编辑即可；样式与配色在 `styles.css` 顶部的 `:root` 变量中调整。
