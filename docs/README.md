# Terrae 的工作台 · 个人网站

一个「简约 + 动漫可爱」风格的纯静态个人网站。
没有框架，没有构建工具，没有依赖——双击 `index.html` 就能看。

![站点预览](images/avatar.svg)

---

## 一、项目特点

- **纯静态**：只有 HTML / CSS / JavaScript，零依赖、零构建。
- **设计令牌**：所有颜色、圆角、间距、阴影都写成 CSS 变量，改一处全局生效。
- **浅色 / 深色主题**：通过 `data-theme="dark"` 切换，跟随系统偏好，并用 `localStorage` 记住选择。
- **响应式**：移动端优先，断点为 `<640px` / `640–1024px` / `>1024px`。
- **可访问**：语义化标签、键盘可达、可见的 focus 样式、`aria-*` 状态齐全，动效尊重 `prefers-reduced-motion`。
- **自带 SEO 基础**：每页唯一的 `title` 与 `meta description`、Open Graph、`robots.txt`、`sitemap.xml`。
- **零构建的写作流程**：文章是 `posts/` 目录下的普通 HTML 文件，用一个模板复制出来写，改完推送即发布。
- **图片全是站内 SVG**：不请求任何外部资源，离线也能正常显示。

---

## 二、目录结构

```
docs/
├── index.html              首页（Hero + 我在做什么 + 最近文章）
├── about.html              关于（个人简介、经历时间线、技能标签）
├── projects.html           项目（6 个项目卡片）
├── blog.html               博客（文章列表，标题链向 posts/）
├── contact.html            联系（联系方式 + 留言表单）
├── posts/
│   ├── _template.html      新文章模板（勿直接访问，已被 robots.txt 屏蔽）
│   └── 2025-03-18-css-color-system.html
│       ...                 每篇文章一个文件，命名规则：日期-短标题.html
├── css/
│   └── style.css           全站样式（含设计令牌与浅深两套主题）
├── js/
│   └── main.js             全站脚本（菜单 / 主题 / 年份 / 表单）
├── images/
│   ├── avatar.svg          卡通头像
│   ├── icon-star.svg       小星星
│   ├── icon-cloud.svg      小云朵
│   └── icon-cat.svg        页脚睡觉的小猫
├── .github/
│   └── workflows/
│       └── deploy.yml      GitHub Pages 自动部署
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## 三、本地预览

### 方式 1：直接双击（最简单）

在文件管理器里双击 `index.html`，浏览器就会打开首页。
因为所有资源都是相对路径、没有任何网络请求，`file://` 协议下也能完整运行。

### 方式 2：起一个本地服务器（更接近线上环境）

在 `docs/` 目录下任选一条命令：

```bash
# Python 3
python -m http.server 8000

# Node.js（无需安装任何包）
npx serve .

# PHP
php -S localhost:8000
```

然后访问 <http://localhost:8000>。

> 建议在浏览器里顺手检查一遍：切换主题、把窗口拖到手机宽度、用键盘 `Tab` 走一圈、
> 打开开发者工具确认 Console 没有报错。

---

## 四、部署到 GitHub Pages

### 步骤 1：把代码推到 GitHub

在项目根目录（包含 `docs/` 的目录）执行：

```bash
git init
git add .
git commit -m "feat: 初始化个人网站"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

### 步骤 2：打开 Pages

进入仓库 → **Settings** → 左侧 **Pages** → **Build and deployment** →
**Source** 选择 **GitHub Actions**（不要选 "Deploy from a branch"）。

### 步骤 3：等待自动部署

推送之后，`.github/workflows/deploy.yml` 会自动运行：
检出代码 → 打包 `docs/` 目录 → 发布到 Pages。
在仓库的 **Actions** 标签页可以看到进度，绿色的对勾表示成功。

### 步骤 4：访问站点

部署成功后地址是：

```
https://<你的用户名>.github.io/<仓库名>/
```

例如仓库名是 `my-blog`、用户名是 `terrae`，
地址就是 `https://terrae.github.io/my-blog/`。

> 注意：`docs/` 是本仓库里**存放站点文件的文件夹名**，它不会出现在网址里；
> 网址里的那一段是**仓库名**。两者可以完全不同，别把它们弄混。

### 部署后记得替换占位地址

下面这些地方目前写的是 `https://your-username.github.io/docs/`，
请全部替换成你的真实地址（否则分享到社交平台时缩略图不显示、站点地图也不准）：

| 文件 | 需要替换的位置 |
| --- | --- |
| `index.html` / `about.html` / `projects.html` / `blog.html` / `contact.html` | `link rel="canonical"` 与 `og:image`、`og:url` |
| `posts/` 下的每一篇文章（含 `_template.html`） | 同上 |
| `robots.txt` | `Sitemap:` 一行 |
| `sitemap.xml` | 全部 `<loc>` |

一共是 11 个 HTML 文件里的 33 处地址，用一次全局替换就能改完。

> 小技巧：用编辑器的「在文件中查找并替换」一次性替换整个目录里的
> `https://your-username.github.io/docs` 即可。

### 如果想让站点文件放在仓库根目录

把 `docs/` 里的内容移动到仓库根目录，然后把 `deploy.yml` 中的

```yaml
          path: "./docs"
```

改成

```yaml
          path: "."
```

---

## 五、常见自定义

### 1. 换名字和文案

在全站搜索 `Terrae`，改成你自己的名字即可（导航品牌、页脚、各页标题、`meta author`）。

### 2. 换配色

打开 `css/style.css`，只改文件顶部的两段变量：

```css
:root {
  --color-primary: #7eb8c9;   /* 主色：按钮、链接、图标 */
  --color-accent-pink: #f2b5c4;
  --color-accent-yellow: #f5c77e;
}

[data-theme="dark"] {
  --color-primary: #8fc9d9;   /* 深色下建议用更亮一档的主色 */
}
```

改完刷新页面即可，浅色和深色主题会一起生效。

### 3. 写一篇新文章（完整的写作流程）

文章就是 `posts/` 目录下的一个 HTML 文件。完整流程只有五步：

**第一步：复制模板。**
把 `posts/_template.html` 复制一份，按 `日期-短标题.html` 命名，
例如 `posts/2025-04-02-my-first-post.html`。文件名会直接变成网址，
所以只用小写字母、数字和连字符，不要用中文和空格。

**第二步：改 `<head>` 里的六处占位。**
模板里都用 `▼` 注释标好了：页面 `title`、`meta description`、`canonical`、
`og:title`、`og:description`、`og:url`。后三个里的文件名要和实际文件名一致。
记得删掉模板自带的 `<meta name="robots" content="noindex, nofollow">`。

**第三步：写正文。**
改 `<h1>`、`<time datetime="YYYY-MM-DD">` 和中文日期、标签和阅读时长。
正文放在 `<div class="prose">` 里，可用的元素有：

| 元素 | 用途 |
| --- | --- |
| `<h2>` / `<h3>` | 小节标题（不要用 `<h1>`，那是文章标题） |
| `<p>` | 段落 |
| `<ul>` / `<ol>` | 无序 / 有序列表 |
| `<pre><code>` | 代码块（代码里的 `<` `>` 要写成 `&lt;` `&gt;`） |
| `<blockquote>` | 引用块 |
| `<hr>` | 分隔线 |

**第四步：更新三个索引。** 这一步最容易漏，漏了就会"文章写好了但没人看得到"：

1. `blog.html` —— 在列表**最上面**加一条 `<li><article class="post-item">…</article></li>`，
   标题写成指向 `posts/你的文件名.html` 的链接。
2. `index.html` —— 在"最近写的"里插入新文章，并删掉最旧的一条（那里固定只放三条）。
3. `sitemap.xml` —— 追加一条 `<url>`。

**第五步：本地检查后发布。**
双击文章文件预览一次，然后过一遍检查清单：导航五个链接都能跳、
切主题正常、窗口拖到手机宽度排版正常、`Tab` 键能走完、Console 无报错。
最后 `git add` → `git commit` → `git push`，等 GitHub Actions 出现绿勾（约 1 分钟）。

**改文章**：直接编辑那个 HTML 文件再推送；如果改了摘要，记得同步改 `blog.html` 和 `index.html` 里的对应文字。

**删文章**：删文件 → 从 `blog.html` 移除 → 从 `index.html` 的"最近写的"移除 → 从 `sitemap.xml` 移除。四处漏一处就会出现死链。

**加一个项目**：复制 `projects.html` 里的一个 `<li class="card">…</li>`，改标题、描述和标签即可，不用改别的地方。

> 什么时候该考虑换成 CMS：页面超过十几个、或者你想在手机上写、或者有别人要投稿。
> 到那时再引入 Decap CMS 之类的工具，并接受站点从"HTML 即成品"变成"Markdown + 生成"。

### 4. 表单接后端

`contact.html` 里的表单是纯前端演示（提交只做校验）。想真正收到消息，可以：

- 用 [Formspree](https://formspree.io/) / [Getform](https://getform.io/) 之类的服务，
  把 `<form data-contact-form novalidate>` 改成
  `<form action="https://formspree.io/f/你的ID" method="POST">`，
  并删掉 `js/main.js` 里 `submit` 事件中的 `event.preventDefault()`；
- 或者干脆保留 `mailto:` 链接，简单可靠。

### 5. 换头像

替换 `images/avatar.svg` 即可（保持 `viewBox="0 0 240 240"`，样式会自动适配）。
也可以放一张同名 PNG，并把各页面里的 `.svg` 后缀改掉。

---

## 六、浏览器支持

面向现代浏览器（Chrome / Edge / Firefox / Safari 最近两个大版本）。

用到的较新特性都做了降级处理：

- `backdrop-filter`：不支持时导航栏退化为纯色背景（见 `@supports` 回退）。
- `color-mix()`：不支持时使用 `@supports not (...)` 中的纯色背景。
- `:focus-visible`、`prefers-reduced-motion`：不支持时不影响可用性，只是少了润色。

---

## 七、许可

代码可自由使用、修改、二次分发。
站点里的文案与头像是我自己的，如果你要用，记得换成你自己的名字和形象 :)
