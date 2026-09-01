# 稿匠 UI 库

> 本仓库基于上游 [caol64/wenyan-ui](https://github.com/caol64/wenyan-ui)（Apache License 2.0）继续维护，
> 是 [AfricChang/gaojiang](https://github.com/AfricChang/gaojiang)（稿匠桌面端）使用的 UI 层。
> 与上游文颜项目无官方关联。

`@gaojiang/ui` 封装了 Markdown 编辑、渲染预览、主题选择等通用界面组件，可同时服务于：

* Web App（SvelteKit）
* 桌面应用（Tauri / macOS）
* 内嵌式工具（WebView / IFrame）

**Web App 截图**

![Web App Screenshot](assets/1.webp)

## 特性

* **组件化设计**
  所有功能以 Svelte 组件形式提供，可按需引入

* **内置主题与样式系统**
  基于 `@wenyan-md/core` 的主题 / 高亮主题能力

* **Markdown 编辑 + 实时预览**
  基于 CodeMirror 6

* **与 wenyan-core 解耦**
  UI 只负责交互与展示，渲染逻辑完全交给 core

* **Web / Desktop 通用**
  不依赖浏览器特有 API，适配 WebView / Tauri

## 安装

```bash
npm install @gaojiang/ui
```

> [!NOTE]
> 
> 本项目是 **Svelte 组件库**，仅适用于 Svelte 5 项目。

## 快速开始

### 在 Svelte 项目中引入

```svelte
<script lang="ts">
  import { Editor, Preview } from "@gaojiang/ui";
</script>

<Editor />
<Preview />
```

> 具体组件名称以实际导出为准（下文示例）

### Tailwind CSS 配置

确保你的项目中已正确配置 Tailwind：

```ts
// tailwind.config.ts
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/@gaojiang/ui/**/*.{svelte,js}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
```

## 组件设计理念

### UI 与逻辑分离

```text
@gaojiang/ui
  └─ 负责：
     - 编辑器 UI
     - 主题选择
     - 交互状态
     - 用户体验

@wenyan-md/core
  └─ 负责：
     - Markdown 解析
     - 数学公式
     - CSS 主题
     - 微信渲染规则
```

UI 层 **不会**：

* 解析 Markdown
* 操作 MathJax
* 直接处理 DOM 样式

## 组件分类（示意）

```text
components/
├─ editor/
│  └─ MarkdownEditor.svelte
├─ preview/
│  └─ PreviewPane.svelte
├─ theme/
│  ├─ ThemeSelector.svelte
│  └─ HighlightThemeSelector.svelte
├─ layout/
│  └─ SplitView.svelte
└─ common/
   ├─ Button.svelte
   └─ Select.svelte
```

## 使用场景

* 稿匠桌面端（Tauri）
* 内部 CMS / 编辑器
* Markdown → 微信工具

## 注意事项

* 本库 **不是** 独立应用
* 不包含路由 / 页面
* 不直接操作文件系统
* 不依赖 Node API

## 项目关系

```text
@wenyan-md/core   ← 核心逻辑（渲染 / 发布），上游 npm 包，未 fork
        ↑
@gaojiang/ui      ← UI 组件库（本仓库）
        ↑
gaojiang          ← 稿匠桌面端（Tauri）
```

上游文颜生态的其他成员（`@wenyan-md/web`、`wenyan-macos`、`wenyan-pc`）不在本仓库的维护范围内。

## License

Apache License Version 2.0

本仓库 fork 自 [caol64/wenyan-ui](https://github.com/caol64/wenyan-ui)，原始版权归上游作者所有；
本 fork 的修改部分版权归 AfricChang。上游许可证全文见 `LICENSE`。
