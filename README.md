# 本草寻源 - 中医药文化网站

中国石油大学（北京）2025—2026春季学期 Web程序设计大作业。一个展示中医药文化、草药知识、经络穴位、养生保健等内容的综合性网站。

## 🌿 主要功能

- **首页Hero区**：CSS水墨动画背景，展示网站主题
- **每日一签**：交互式摇签功能，获取中医养生箴言
- **今日推荐中药**：每日动态展示不同的中草药介绍
- **医道名言**：经典医学名言跑马灯滚动展示
- **栏目导航**：分类展示中医文化、草药百科、经络穴位等内容
- **本地搜索**：全站草药、穴位、名方搜索功能
- **背景音乐**：悬浮古琴音乐播放器

## 📁 项目结构

```
web/
├── index.html                 # 首页
├── history.html              # 历史溯源
├── herbs.html                # 本草百科
├── meridian.html             # 经络穴位
├── prescription.html         # 经典名方
├── wellness.html             # 养生保健
├── ethnic.html               # 民族医药
├── login.html                # 登录页面
├── css/
│   ├── common.css           # 全站公共样式
│   ├── index.css            # 首页样式
│   ├── herbs.css            # 草药页样式
│   ├── login.css            # 登录页样式
│   └── ...其他页面样式
├── javascript/
│   ├── nav.js               # 导航交互脚本
│   ├── index.js             # 首页交互脚本
│   ├── login.js             # 登录页脚本
│   └── ...其他页面脚本
├── images/
│   ├── logo.svg             # Logo文件
│   └── herbs/               # 草药图片目录
└── music/
    └── guqin-bg.mp3         # 背景音乐（古琴）
```

## 🎨 技术栈

- **前端框架**：Vanilla JavaScript (ES6+)
- **样式处理**：CSS3（Grid、Flexbox、Animation、Gradient）
- **API集成**：LocalStorage、Canvas API
- **动画效果**：CSS Keyframes、CSS Variables
- **响应式设计**：Mobile First 媒体查询

## 📝 更新日志

### v1.3.0 - 2026-05-30

#### 新功能
- ✨ **签筒UI增强**：用细致的CSS造型替换简单的摇签按钮
  - 添加详细的.divining-cup HTML结构（cup-top、cup-body、cup-pattern、cup-bottom、cup-rim）
  - 实现逼真的木质外观，使用棕色渐变色模拟陶瓷/木质材质
  - 添加杯身纹理图案，增强视觉层次感

#### 优化改进
- 🎬 **医道名言滚动修复**：改为单层无缝滚动
  - 修复initMarquee()函数，移除双层重复逻辑
  - 调整滚动动画时间从35s改为60s，确保流畅感
  - 修正marqueeScroll关键帧，从translateX(-50%)改为translateX(-100%)

- 🎪 **栏目卡片背景升级**：用虚化草药主题背景替代纯色背景
  - 为6个分类卡片（历史文化、草药百科、经络穴位、经典名方、养生保健、民族医药）分别设置主题颜色渐变
  - 实现20px模糊 + 0.3亮度 + 0.4饱和度的虚化效果
  - 保持符合网站整体色调（棕色、绿色系）的人性化设计
  - 确保内容层级正确（h3、p、icon都在背景之上）

- 📱 **响应式优化**：保证移动设备上签筒和背景图片显示效果

#### 技术细节
- 签筒动画：添加cupSway和cupWobble两层动画，营造摇晃效果
- 背景处理：使用CSS filter + 渐变色实现虚化层，保持原始卡片设计完整
- 层级管理：通过z-index确保背景、内容、悬停效果的正确显示顺序

### v1.2.0 - 2026-05-28

#### 新功能
- ✨ **divining cup（签筒）UI设计**
  - 将摇签按钮改造成逼真的签筒形状
  - 添加木质颜色渐变和阴影效果
  - 实现摇晃和摇摆动画

### v1.1.0 - 2026-05-15

#### 新功能
- 🎵 **背景音乐播放器**：悬浮在右下角的古琴音乐播放器
- 📅 **日期信息系统**：显示农历日期、节气、和节气养生提示
- 🎲 **每日一签功能**：随机显示中医养生箴言
- 📦 **每日推荐中药**：每天自动切换不同的中草药介绍

### v1.0.0 - 初始版本

#### 核心功能
- 网站基础架构和导航系统
- 首页布局和各栏目卡片
- 全站搜索功能
- 草药百科、经络穴位等详细页面
- 用户登录功能

## 🎯 设计特点

### 色彩设计
- 主色：玫瑰色 (#C98B9C)
- 辅色：棕色系 (#8B6F47, #6B5437)
- 绿色系：草药相关 (#6B863D)
- 背景：米色系 (#F2EFEB)

### 字体系统
- 标题字体：仿宋、楷体等中文书法体
- 正文字体：系统字体栈，优先使用中文字体

### 动画设计
- 水墨流动背景：营造中医古韵
- 卡片悬停效果：提升交互反馈
- 滚动视差：增强页面层次感

## 🔧 本地开发

### 环境要求
- 现代浏览器（Chrome 80+, Firefox 75+, Safari 13+）
- 无需后端依赖，纯前端运行

### 启动方式
```bash
# 使用Python简单服务器（推荐）
python -m http.server 8000

# 或使用Node.js http-server
npx http-server

# 直接在浏览器打开index.html
file:///path/to/web/index.html
```

### 开发工具
- VS Code + Live Server 扩展
- Chrome DevTools 调试
- 响应式设计测试工具

## 📊 性能指标

- 首屏加载时间：< 2s
- Lighthouse 性能评分：85+
- 所有页面响应式适配：320px - 2560px

## 🌐 浏览器兼容性

| 浏览器 | 最低版本 | 支持度 |
|--------|---------|--------|
| Chrome | 80+ | ✅ 完全支持 |
| Firefox | 75+ | ✅ 完全支持 |
| Safari | 13+ | ✅ 完全支持 |
| Edge | 80+ | ✅ 完全支持 |
| IE | 11 | ⚠️ 部分功能 |

## 📚 参考资源

- [中医基础理论](https://baike.baidu.com/item/中医)
- [黄帝内经](https://baike.baidu.com/item/黄帝内经)
- [CSS Grid 布局](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [JavaScript Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## 📄 许可证

本项目为学生课程作业，仅供学习交流使用。

## 👥 贡献者

- **项目负责人**：zhangqike06
- **贡献成员**：Dantalion628（UI增强、动画优化）

## 💬 反馈与支持

如有问题或建议，欢迎通过以下方式联系：
- 提交 GitHub Issues
- 发送邮件至项目负责人
- 在项目讨论区留言
