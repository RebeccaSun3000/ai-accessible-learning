# AI Accessible Learning

让AI教育对所有人都可访问 - 将视频教程转换为盲人可访问的内容

## 项目简介

这是一个将视频教程转换为盲人可访问内容的平台，通过AI技术自动识别视频中的视觉依赖内容，并生成基于键盘导航的无障碍脚本。

## 技术架构

根据 [structure.md](docs/guide/structure.md) 的设计，项目分为4个步骤：

1. **视频 → 结构化文本**：使用 Whisper 转录语音
2. **视觉依赖识别**：用 LLM 识别视觉依赖内容
3. **网页结构抓取**：使用 Playwright 抓取页面可访问性树
4. **生成盲人版脚本**：通过 vibe coding 生成键盘导航指令

## 技术栈

- **后端**：Node.js + Express + TypeScript
- **前端**：Next.js + React + Tailwind CSS
- **AI**：OpenAI (Whisper + GPT)
- **网页抓取**：Playwright

## 快速开始

### 1. 安装依赖

```bash
# 后端
cd backend
npm install

# 前端
cd frontend
npm install
```

### 2. 配置环境变量

```bash
# 后端
cd backend
cp .env.example .env
# 编辑 .env 文件，添加你的 OPENAI_API_KEY
```

### 3. 启动开发服务器

```bash
# 后端 (端口 3001)
cd backend
npm run dev

# 前端 (端口 3000)
cd frontend
npm run dev
```

### 4. 访问应用

- 前端：http://localhost:3000
- 后端 API：http://localhost:3001
- 健康检查：http://localhost:3001/health

## 项目结构

```
ai-accessible-learning/
├── backend/              # Node.js 后端
│   ├── src/
│   │   ├── controllers/  # API 控制器
│   │   ├── services/     # 业务逻辑层
│   │   ├── routes/       # 路由定义
│   │   └── index.ts      # 入口文件
│   └── package.json
├── frontend/             # Next.js 前端
│   ├── src/
│   │   ├── app/          # App Router 页面
│   │   ├── components/   # React 组件
│   │   └── lib/          # 工具函数
│   └── package.json
└── docs/                 # 项目文档
    └── guide/
        └── structure.md  # 技术架构设计
```

## 开发状态

✅ 项目框架搭建完成
⏳ Step 1-4 功能实现中

## License

ISC
