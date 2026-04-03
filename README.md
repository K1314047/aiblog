# Indie Blog v2

这版包含：
- 极简博客首页
- Thoughts 页面
- 深色模式
- 本地搜索
- Giscus 评论
- `/admin` 后台发布
- GitHub API 发布文章和 thoughts
- 推荐部署到 Vercel

## 本地启动
```bash
npm install
cp .env.example .env.local
npm run dev
```

访问：
- `/`
- `/thoughts`
- `/search`
- `/admin`

## 后台登录
在 `.env.local` 中设置 `ADMIN_PASSWORD`。

## 开启 GitHub 发布
设置：
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_BRANCH`
- `GITHUB_TOKEN`

## 开启 Giscus 评论
在仓库开启 Discussions 后，把 `.env.local` 中的 Giscus 变量补齐。

## 推荐部署
推荐部署到 Vercel，再绑定你的自定义域名。

## 当前说明
这版前端和 thoughts 已经可以本地预览。后台发布到 GitHub 需要你补齐环境变量后才能真正生效。


## 本次首页样式调整

- 首页改为更接近截图的极简文章列表样式
- 顶部保留站点标题、简介、导航和搜索框
- 导航只保留：博客、想法、关于、搜索
- 已移除 GitHub 按钮


## 本次进一步样式调整

- 首页标题缩小并改成更接近参考图的排版
- 顶部整体宽度和留白收紧
- 首页文章列表字体、行距、信息密度更接近参考图
- thoughts 页面统一为同一套简洁审美
