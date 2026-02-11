二、技术架构怎么设计？

我给你一个现实可落地的结构：

Step 1：视频 → 结构化文本

技术：

Whisper转录语音

时间轴分段

语句语义分析

输出：

时间戳 00:02:13
原话：大家看右上角这个按钮
标签：视觉依赖

Step 2：视觉依赖识别模型

用LLM识别：

关键词模式：

看这里

点这个

这个图标

红色按钮

上面那个

系统标记为：

VISUAL_DEPENDENCY = TRUE

Step 3：网页结构抓取（关键）

用：

DOM解析

Playwright自动爬取

Accessibility Tree读取

把页面结构变成：

Button:
  name: Create Image
  role: button
  location: top navigation, position 3

Step 4：vibe coding生成盲人版脚本

AI根据：

原视频讲稿

页面结构

可访问树

生成：

步骤1：按Tab键3次，直到读屏读到“Create Image 按钮”
步骤2：按Enter
步骤3：焦点将移动到Prompt输入框


这一步就是：

vibe coding = 语义驱动脚本生成