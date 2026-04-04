---
title: "从本地到上线：我的博客部署记录"
date: "2026-04-04"
description: "记录一次从本地开发、上传 GitHub、部署 Vercel、绑定域名到接入评论系统的完整过程。"
tags: ["建站", "部署", "Vercel", "GitHub", "Giscus"]
draft: false
---

这篇文章记录一下我把博客真正部署上线的完整过程。

最开始只是想做一个能写文章的小站，后来慢慢加上了想法流、深色模式、搜索、评论系统，再到最后绑定自己的域名。整个过程里踩了一些坑，但好处是走通一次之后，以后再做第二个站、第三个站，就有一份现成的流程可以照着复用。

这篇就按“从零到可用”的顺序整理一下。

---

## 一、先在本地把项目跑起来

先把项目下载到本地，然后进入项目目录。

```bash
cd indie-blog-v2
```

安装依赖：

```
npm install
```

项目里默认不会自带 `.env.local`，因为这个文件通常用来放自己的本地配置和密钥，不会提交到仓库。

所以需要先复制一份环境变量模板：

```
copy .env.example .env.local
```

如果是 PowerShell，可以用：

```
Copy-Item .env.example .env.local
```

然后在 `.env.local` 里先填最基础的一项：

```
ADMIN_PASSWORD=你自己的后台密码
```

接着启动项目：

```
npm run dev
```

启动成功后，浏览器里打开：

```
http://localhost:3000
```

如果首页能打开，说明项目基本是正常的。

------

## 二、第一次本地预览时遇到的问题

我一开始遇到过一个文章页面打不开的问题，报错意思大概是动态路由没有在静态参数里生成。

后来发现原因不是项目结构有问题，而是因为我复制了一篇文章，文件名变成了类似这样：

```
hello-world - 副本.md
```

这个文件名里有空格和中文“副本”，在静态导出场景下容易出问题。

后来我把文件名改成这种形式就正常了：

```
hello-world-copy.md
```

所以一个经验是：

**文章文件名尽量只用英文、数字和短横线。**

例如：

```
my-first-post.md
deploy-my-blog-notes.md
thoughts-about-design.md
```

------

## 三、图片怎么放

博客正文和 thoughts 里的图片，最简单的方式是放到：

```
public/images/
```

例如：

```
public/images/my-photo.jpg
```

页面里引用时直接写：

```
/images/my-photo.jpg
```

多张图片引用

```
"images": ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"]
```

这样本地和线上都能用。

------

## 四、准备上传到 GitHub

上传之前，有一件事一定要先做：
 **准备好 `.gitignore`。**

因为像这些文件和目录不应该上传：

- `node_modules`
- `.next`
- `.env.local`

我使用的 `.gitignore` 如下：

```
node_modules/
.next/
out/
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.DS_Store
Thumbs.db
Desktop.ini
.vscode/
.idea/
.cache/
.turbo/
coverage/
*.tsbuildinfo
*.tmp
*.temp
*.zip
```

如果不忽略 `node_modules`，第一次 push 到 GitHub 很容易失败，因为里面有一些二进制文件会超过 GitHub 的 100MB 限制。

------

## 五、第一次上传 GitHub

先在 GitHub 上建好一个空仓库，例如：

```
https://github.com/K1314047/aiblog
```

然后在本地项目目录执行：

```
git init
git branch -M main
git remote add origin https://github.com/K1314047/aiblog.git
git add .
git commit -m "init: first upload"
git push -u origin main
```

如果之前不小心把 `node_modules` 也提交进去了，GitHub 会拒绝 push。
 这时最省事的方法不是硬修历史，而是直接删除本地 `.git` 重新初始化一遍。

```
rm -rf .git
```

然后确认 `.gitignore` 正确，再重新执行一遍初始化和上传命令。

这是第一次部署时很重要的一课：

**不要把 `node_modules`、`.next`、`.env.local` 提交到 Git 仓库。**

------

## 六、接入 Vercel

GitHub 上传成功之后，下一步就是把仓库接到 Vercel。

流程很简单：

1. 登录 Vercel
2. 新建项目
3. 选择 GitHub 仓库
4. 导入 `K1314047/aiblog`
5. 等待它自动识别 Next.js 项目
6. 配置环境变量
7. 点击部署

Vercel 会自动帮我构建站点，并生成一个默认的访问地址，例如：

```
https://your-project.vercel.app
```

第一次建议先不要急着绑定域名，先确认默认域名访问正常。

------

## 七、Vercel 里的环境变量怎么配

因为 `.env.local` 不会上传到 Vercel，所以线上需要重新配一份环境变量。

我最终用到的核心变量大概是这些：

```
NEXT_PUBLIC_SITE_NAME=我的站点名字
NEXT_PUBLIC_SITE_URL=https://你的域名
ADMIN_PASSWORD=你的后台密码
GITHUB_OWNER=K1314047
GITHUB_REPO=aiblog
GITHUB_BRANCH=main
GITHUB_TOKEN=你的GitHubToken
NEXT_PUBLIC_GISCUS_REPO=K1314047/aiblog
NEXT_PUBLIC_GISCUS_REPO_ID=你的repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=你的category-id
NEXT_PUBLIC_GISCUS_MAPPING=pathname
NEXT_PUBLIC_GISCUS_LANG=zh-CN
```

这些变量里，真正敏感的是：

- `ADMIN_PASSWORD`
- `GITHUB_TOKEN`

这些一定不要提交到仓库里。

------

## 八、GitHub Token 怎么获取

为了让后台可以把文章或 thoughts 直接发布到 GitHub 仓库，需要准备一个 GitHub Token。

我这里的做法是：

1. 登录 GitHub
2. 进入 `Settings`
3. 找到 `Developer settings`
4. 进入 `Personal access tokens`
5. 创建一个新的 token

只要确保这个 token 对目标仓库有写入权限就行。

然后把它填到 `.env.local` 和 Vercel 环境变量里：

```
GITHUB_TOKEN=你的token
```

这样后台才能把内容提交回仓库。

------

## 九、Giscus 评论系统接入过程

为了让文章页有评论，我用的是 Giscus。

它的原理是把评论建立在 GitHub Discussions 上，所以需要先满足三个前提：

1. 仓库必须是公开仓库
2. 仓库要开启 Discussions
3. 仓库要安装 giscus app

### 第一步：开启 Discussions

进入仓库：

```
https://github.com/K1314047/aiblog
```

然后：

- 点击 `Settings`
- 往下找到 `Features`
- 勾选 `Discussions`

开启之后，仓库顶部会多出一个 `Discussions` 标签。

### 第二步：安装 giscus app

打开：

```
https://github.com/apps/giscus
```

点击安装，然后选择：

- `Only select repositories`
- 勾选 `aiblog`

### 第三步：去 giscus 配置页面拿参数

打开：

```
https://giscus.app/zh-CN
```

在页面里填：

- 仓库：`K1314047/aiblog`
- 映射方式：`pathname`
- 分类：`Announcements`
- 语言：`zh-CN`

选好之后，页面下方会自动生成一段配置代码，其中最重要的是：

- `data-repo-id`
- `data-category-id`

然后把它们填进环境变量：

```
NEXT_PUBLIC_GISCUS_REPO_ID=这里填repo-id
NEXT_PUBLIC_GISCUS_CATEGORY_ID=这里填category-id
```

需要注意的是，这两个虽然写在 `.env.local` 里，但由于变量名前缀是 `NEXT_PUBLIC_`，它们本质上会暴露到前端，不算真正的秘密信息。

------

## 十、我遇到过的一个 Giscus 报错

我在部署时遇到过这样一个 TypeScript 错误：

```
Type 'string' is not assignable to type '`${string}/${string}`'
```

意思是 `@giscus/react` 组件要求 `repo` 必须是 `owner/repo` 这种格式，而环境变量读取出来只是普通字符串类型，TypeScript 不认可。

后来把 `components/giscus-comments.tsx` 里这一段改成了类型断言就好了：

```
repo={repo as `${string}/${string}`}
```

如果以后再次遇到类似报错，可以先从这个方向检查。

------

## 十一、修改站点名字和页面标题

项目默认的一些名字要手动改掉。

### 页面顶部标题

文件：

```
components/site-header.tsx
```

这里可以改站点名和副标题。

### 浏览器标签标题

文件：

```
app/layout.tsx
```

这里的：

```
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "默认站点名";
```

也可以直接在 `.env.local` 里设置：

```
NEXT_PUBLIC_SITE_NAME=你的站点名
NEXT_PUBLIC_SITE_URL=https://你的域名
```

### 页脚名字

文件：

```
components/site-footer.tsx
```

这里也要改成自己的名字。

------

## 十二、绑定自己的域名

等 Vercel 默认域名访问正常后，就可以在 Vercel 项目设置里添加自己的域名。

我自己的做法是：

1. 在 Vercel 项目里添加域名
2. 根据提示去域名服务商那里配置 DNS
3. 等待解析生效
4. 再确认 HTTPS 是否正常

如果是博客，通常我更推荐先使用子域名，例如：

```
blog.yourdomain.com
```

这样更清晰，也不容易影响主站。

------

## 十三、部署完成后的工作流

当博客已经接入 GitHub、Vercel、域名之后，后续更新就简单很多了。

### 如果是改代码或样式

本地修改后直接：

```
git add .
git commit -m "feat: update homepage style"
git push
```

推到 GitHub 后，Vercel 会自动重新部署。

### 如果是用后台发文章

直接进入：

```
/admin
```

登录后台，写文章或 thoughts，发布后内容会直接写入 GitHub 仓库，再触发自动部署。

这也是我现在最喜欢的一种状态：

**写内容和部署上线是连起来的。**

------

## 十四、这次搭建下来最重要的经验

到最后回头看，真正重要的不是“命令记住了多少”，而是知道整个链路是怎么连起来的。

这套博客的工作方式其实很清楚：

- **GitHub**：存代码和内容
- **Vercel**：负责构建和部署
- **域名**：负责最终访问入口
- **Giscus**：负责评论
- **后台**：负责把内容写回 GitHub

也就是说，博客不是一个孤立页面，而是一整套协作关系。

我以后再做新的个人站，大概率还是会继续沿用这套方案，因为它足够轻，成本不高，也方便维护。

------

## 十五、以后如果我再新建一个博客，我会按这个最短流程走

1. 本地跑起项目
2. 配 `.env.local`
3. 准备 `.gitignore`
4. 上传 GitHub
5. 接入 Vercel
6. 配环境变量
7. 先测默认域名
8. 开启 Discussions
9. 安装 giscus app
10. 拿到 Giscus 配置
11. 绑定自定义域名
12. 正式上线

走通一次之后，后面其实就不难了。

------

## 十六、最后留给自己的提醒

以后如果再次部署，优先检查这几件事：

- `.env.local` 有没有创建
- `.gitignore` 有没有忽略 `node_modules` 和 `.next`
- GitHub Token 有没有配
- Vercel 环境变量有没有补全
- 仓库有没有开启 Discussions
- giscus app 有没有安装到当前仓库
- 域名 DNS 有没有正确生效

只要这几项对了，整个站通常就能稳定跑起来。

这次把它完整记录下来，也是为了以后少走弯路。