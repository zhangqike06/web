# 《本草寻源》网站技术实现报告

> 项目：本草寻源 —— 中医药文化科普静态展示网站  
> 技术栈：HTML5 + CSS3 + JavaScript（纯前端）  
> 总代码量：约11,480行（HTML/CSS/JS）

---

## 一、项目整体架构

### 1.1 页面结构（9个HTML页面）

| 页面 | 文件名 | 核心功能 |
|------|--------|------|
| 首页 | index.html | Hero大图、每日一签、五行流转、分类卡片、今日推荐中药、名言跑马灯、五行学说、四诊卡片 |
| 历史溯源 | history.html | 中医发展时间轴、名医3D翻牌卡片 |
| 经络穴位 | meridian.html | 正面/背面人体穴位图、42穴位点击交互、穴位对照表、教学视频 |
| 民族医药 | ethnic.html | 藏医/壮医/苗医等民族医药介绍卡片 |
| 本草百科 | herbs.html | 百眼柜分类抽屉、60味药材卡片网格、多维筛选、画轴弹窗详情 |
| 经典名方 | prescription.html | 方剂卡片、草药飞入动画、蒸汽煎煮动效、君臣佐使拆解 |
| 养生保健 | wellness.html | 二十四节气罗盘、四季养生Tab、体质测试、饮食宜忌表、药茶配方 |
| 登录 | login.html | Canvas验证码、localStorage用户态、养生心得笔记 |
| 关于我们 | about.html | 项目简介、团队成员、技术栈 |

### 1.2 文件夹结构

```
demo/
├── css/             # 10个样式文件，每个页面独立CSS + 公共common.css
├── javascript/      # 8个脚本文件，每个页面独立JS + 公共nav.js
├── images/          # 图片资源（banner/herbs/meridian/doctors/wellness等子目录）
├── video/           # 科普视频文件
├── music/           # 背景音乐
├── *.html           # 页面文件
└── .gitignore       # Git忽略规则
```

### 1.3 设计系统

- **色彩体系**：采用莫兰迪低饱和色系，通过CSS变量（`--color-rose`、`--color-bud`、`--color-deep`等）全局统一管理
- **字体系统**：标题用思源宋体/站酷文艺体（`--font-title`），正文用系统无衬线（`--font-body`）
- **质感风格**：宣纸纹理背景 + 木纹材质 + 磨砂玻璃效果
- **圆角规范**：统一使用12-14px圆角（卡片/面板），按钮用999px全圆角

---

## 二、公共模块实现

### 2.1 导航栏系统（nav.js + common.css）

**实现文件**：`javascript/nav.js`（528行）、`css/common.css`

**技术要点**：

1. **固定定位 + 滚动变色**：导航栏使用 `position: fixed` 固定在页面顶部，滚动超过80px时JS动态添加 `.scrolled` 类，触发半透明→实色背景过渡

2. **移动端汉堡菜单**：屏幕宽度≤768px时，JS动态创建汉堡按钮并插入DOM。点击展开/收起，点击导航链接自动收起

3. **二级下拉菜单**：使用CSS `:hover` 展开桌面端子菜单，移动端通过JS `click` 事件切换 `.active` 类实现展开/收起

4. **全站搜索**：内置搜索索引库（覆盖60+草药、20+穴位、15+名方、10+历史人物、10+节气），输入时实时筛选并渲染下拉结果浮层，回车或点击按钮跳转到匹配页面

5. **用户状态同步**：读取 `localStorage.getItem('tcm_user')`，已登录则在导航栏显示用户头像和名称

6. **当前页高亮**：通过 `window.location.pathname` 匹配当前URL，自动给对应导航链接添加 `.active` 类

### 2.2 背景音乐播放器

**实现技术**：HTML5 `<audio>` 标签 + JavaScript控制

- 音频文件：`music/bencaogangmu.webm`（周杰伦《本草纲目》）
- 左下角玉佩图标点击切换播放/暂停
- 使用 `bgm.play().then().catch()` 处理浏览器自动播放限制
- Hero区存在时音乐图标延迟显示，滚动超过阈值后才出现

### 2.3 滚动渐显动画

**实现技术**：IntersectionObserver API

- 页面加载时给约30类目标元素添加 `reveal-on-scroll` 类
- IntersectionObserver 监听元素进入视口（threshold: 0.16）
- 进入视口时添加 `.is-visible` 类，触发CSS transition动画（上移/缩放/左右滑入）
- 低性能设备自动降级（检查 `navigator.hardwareConcurrency` 和 `navigator.connection.saveData`）

### 2.4 全局CSS变量系统（common.css）

```css
--color-rose: #C9888F;    /* 主色调：玫瑰粉 */
--color-bud: #DEC8C4;     /* 辅助色：浅杏 */
--color-deep: #4A3A32;    /* 深色文字 */
--color-dust: #A09088;    /* 次要文字 */
--color-dusk: #C4A494;    /* 过渡色 */
--font-title: 标题字体;     /* 标题 */
--font-body: 正文字体;      /* 正文 */
--radius-sm: 12px;
--radius-md: 18px;
--radius-lg: 28px;
```

---

## 三、各页面技术实现详解

### 3.1 首页（index.html + index.js + index.css）

**JS文件**：`javascript/index.js`（340行）  
**CSS文件**：`css/index.css`（1345行）

#### 3.1.1 Hero首屏区

- **多层背景叠加**：使用CSS多背景（渐变 + 径向渐变 + 图片），通过 `::before` 和 `::after` 伪元素添加光影层
- **磨砂玻璃信息栏**：`.hero-meta` 使用 `backdrop-filter: blur(10px)` 实现毛玻璃效果
- **农历日期模拟**：根据公历日期用算法推算天干地支、生肖、农历月日——`(year - 4) % 10` 计算天干，`(year - 4) % 12` 计算地支
- **节气识别**：内置24节气日期数据，遍历匹配当前日期所属节气，显示对应养生提示

#### 3.1.2 每日一签

- **签文数据结构**：16条签文，每条包含 `{text, yi（宜）, ji（忌）, tip（养生贴士）}`
- **摇签交互**：点击按钮→添加 `.shaking` 类触发CSS摇晃动画→setTimeout 1.2秒后随机抽取签文→JS更新DOM内容
- **反重复机制**：记录上次签文索引，避免连续两次抽到同一条
- **布局**：签框（上）+ 摇签按钮+养生贴士（下，flex并排）

#### 3.1.3 五行流转互动球

- **数据结构**：`elementData` 对象，木火土金水各自对应脏腑、情志、调养提示和颜色
- **CSS动画**：球体有双层光晕（`orb-glow-a`/`orb-glow-b`），通过CSS animation持续旋转
- **点击切换**：点击下方五个标签→更新球体内容+颜色+情志+调养提示，切换active样式

#### 3.1.4 今日推荐中药

- **根据日期循环**：`(new Date().getDate() - 1) % 6` 从6味药材中选一味
- **展示内容**：药材图片、性味归经、功效描述、详细说明
- **跳转链接**：点击"了解更多"跳转到本草百科页并带 `?search=人参` 参数自动定位

#### 3.1.5 名言跑马灯

- **三行无缝滚动**：奇数行向左、偶数行（`.reverse`）向右
- **无缝循环**：每行内容复制两份，当第一份滚出视口时无缝衔接
- **纯CSS实现**：使用 `@keyframes marquee` 动画 + `transform: translateX(-50%)`

---

### 3.2 本草百科（herbs.html + herbs.js + herbs.css）

**JS文件**：`javascript/herbs.js`（509行）  
**CSS文件**：`css/herbs.css`（615行）

#### 3.2.1 60味药材数据系统

- **数据结构**：每味药材包含 `{id, name, category, property, meridian, effect, desc, recipe, icon, bgColor, img}`
- **图片容错**：有 `img` 字段则显示真实图片，否则用 `bgColor` 渐变色 + 药名首字作为fallback

#### 3.2.2 百眼柜抽屉（核心交互）

- **分组逻辑**：60味药材按功效分为12类（补虚/清热/解表/理气/活血/利水/消食/化痰/平肝/安神/收涩/祛风湿）
- **抽屉结构**：每类一个抽屉，包含 `drawer-shell`（外壳）+ `drawer-contents`（药材标签）+ `drawer-face`（面板）+ `drawer-knob`（铜把手）
- **开门动画**：点击面板→CSS `transform: rotateX(-32deg)` 沿底部转轴向前倾倒，通过 `transition: transform 0.42s cubic-bezier(...)` 实现平滑过渡
- **标签交互**：打开后显示药材小标签，点击标签→下方弹出详情面板（名称+性味+归经+分类+完整描述）
- **互斥控制**：同一时间只能打开一个抽屉，打开新的自动关闭旧的

#### 3.2.3 多维筛选系统

- **双维度筛选**：功效分类（14个按钮）+ 性味（5个按钮），两个维度AND关系
- **筛选流程**：点击按钮→更新 `currentCategoryFilter`/`currentPropertyFilter`→调用 `getFilteredHerbs()`→`renderHerbs()` 重新渲染
- **DOM更新策略**：先收集全部HTML字符串，一次性 `innerHTML` 写入，减少DOM重排

#### 3.2.4 画轴风格弹窗（Modal）

- **实现方式**：固定定位的 `.modal-overlay` 遮罩 + 白色弹窗内容区
- **打开**：给 overlay 添加 `.open` 类（display:block），禁止body滚动
- **关闭**：点击关闭按钮× / 点击遮罩层 / 按ESC键
- **收藏功能**：基于 localStorage 的收藏列表，弹窗内可添加/取消收藏

---

### 3.3 经络穴位（meridian.html + meridian.css）

**CSS文件**：`css/meridian.css`（457行）  
**JS**：内联在HTML中（约180行）

#### 3.3.1 人体穴位定位图

- **正/背面切换**：两个 `.body-silhouette` 容器，通过 `display: block/none` 切换
- **42个穴位点**：使用 `position: absolute` + 百分比定位（`top`/`left`），相对于人体图容器
- **CSS样式**：10px红色圆点 + 白色边框 + 外圈阴影光晕

#### 3.3.2 穴位点击交互

- **数据结构**：`acupointData` 对象，42个穴位各有 `{meridian, loc, indication, tip}`
- **选中动画**：点击穴位→添加 `.selected` 类→`@keyframes pulseRing` 脉冲波纹动画
- **浮窗显示**：动态生成HTML卡片（穴位名+经络+定位+主治+保健），通过 `getBoundingClientRect()` 计算位置
- **智能定位**：默认右上方，右侧空间不够翻到左侧，上方不够翻到下方
- **hover/click分离**：hover时浮窗 `pointer-events: none` 避免闪烁，click选中后 `pointer-events: auto` 可交互

---

### 3.4 养生保健（wellness.html + wellness.js + wellness.css）

**JS文件**：`javascript/wellness.js`（477行）  
**CSS文件**：`css/wellness.css`（477行）

#### 3.4.1 二十四节气罗盘

- **格子生成**：24个节气均分360度（每格15度），用 `cos/sin` 三角函数计算每个格子的 `left`/`top` 位置
- **罗盘旋转**：点击节气格子→CSS `transform: rotate()` 使罗盘旋转到对应角度
- **内容联动**：点击后更新养生详情（饮食/运动/起居/情志四方面）+ 中心图标

#### 3.4.2 四季养生Tab

- **Tab切换**：四个季节按钮（春/夏/秋/冬），点击切换 `.active` 类
- **内容渲染**：`seasonData` 对象存储每季的4张调养卡片（饮食/运动/起居/情志）

#### 3.4.3 中医体质测试

- **9道单选题**：每题4个选项（从不/偶尔/经常/总是），对应0-3分
- **9种体质归类**：9道题每题对应一种体质倾向，累计分数最高的即为判定体质
- **结果展示**：显示体质名称、特征描述、养生建议

---

### 3.5 经典名方（prescription.html + prescription.js + prescription.css）

**JS文件**：`javascript/prescription.js`（759行）  
**CSS文件**：`css/prescription.css`（494行）

#### 3.5.1 方剂数据体系

- **16个方剂**：四君子汤、四物汤、六味地黄丸、逍遥散、酸梅汤、枸杞菊花茶、小柴胡汤、玉屏风散、生脉散、二陈汤、麻黄汤、归脾汤、八珍汤、白虎汤、四逆散、桃红四物汤、独活寄生汤、平胃散、百合固金汤、酸枣仁汤
- **药材图片映射**：`herbImageMap` 对象，药材名→图片路径，约70味药材

#### 3.5.2 草药飞入动画

- **DOM操作**：创建 `fly-card` 元素，克隆药材图标，用 `getBoundingClientRect()` 获取起始和目标位置
- **CSS transition**：设置 `transform: translate()` 从起始位移动到目标位，通过 `transition: all 0.8s` 实现飞入效果

#### 3.5.3 蒸汽煎煮动效

- **纯CSS实现**：使用多个 `@keyframes` 动画生成上升蒸汽效果
- **关键帧**：`steamRise`（上升+扩散+透明度变化）+ `steamWobble`（水平微摆）

---

### 3.6 登录页（login.html + login.js + login.css）

**JS文件**：`javascript/login.js`（223行）

#### 3.6.1 Canvas验证码

- **Canvas绘图**：随机生成4位数字，添加随机颜色、干扰线、噪点
- **验证逻辑**：用户输入的验证码与 `canvas` 上显示的数字比对

#### 3.6.2 localStorage用户态

- **登录**：验证用户名密码（admin/admin），成功后写入 `localStorage.setItem('tcm_user', JSON.stringify({...}))`
- **状态持久化**：刷新页面后读取localStorage恢复登录态
- **养生笔记**：textarea内容自动保存到localStorage，下次打开自动恢复

---

### 3.7 其他页面

#### 3.7.1 历史溯源（history.html）

- **实现技术**：CSS时间轴布局 + IntersectionObserver滚动触发 + 名医3D翻牌卡片（`transform: rotateY(180deg)`）

#### 3.7.2 民族医药（ethnic.html）

- **实现方式**：卡片式布局展示藏医/壮医/苗医等各民族医药体系

#### 3.7.3 关于我们（about.html）

- **内容**：项目简介卡片 + 团队成员信息（JS动态渲染）+ 技术栈四宫格 + 致谢

---

## 四、核心技术应用清单

| 技术要求 | 实现位置 | 说明 |
|------|------|------|
| HTML5语义化标签 | 全站 | header/nav/main/section/article/aside/footer |
| CSS3 Flex/Grid布局 | 全站CSS | 所有页面均使用Flex或Grid进行布局 |
| CSS3过渡与动画 | 全站CSS | hover过渡、3D翻牌、飞入动画、脉冲动画、罗盘旋转等 |
| CSS变量系统 | common.css | `--color-rose`/`--font-title`等全局变量 |
| 响应式设计 | 所有CSS | @media断点：992px/768px/480px |
| JavaScript DOM操作 | 所有JS | 元素创建、内容更新、样式切换 |
| JavaScript事件处理 | 所有JS | click/scroll/resize/input/keydown/IntersectionObserver |
| localStorage | herbs.js/login.js | 收藏列表、用户登录态、养生笔记 |
| Canvas图形绘制 | login.js | 验证码（数字+干扰线+噪点） |
| HTML5 Audio | 全站 | 背景音乐播放器 |
| HTML5 Video | meridian/herbs/wellness | 科普教学视频 |
| HTML Form | login.html | 登录表单（input/password/button） |
| HTML Table | meridian/wellness等 | 穴位对照表、饮食宜忌表、技术清单表 |
| IntersectionObserver | nav.js | 滚动渐显动画 |
| CSS backdrop-filter | index.css | Hero区磨砂玻璃效果 |
| CSS 3D Transform | herbs.css/history.css | 百眼柜rotateX开门、名医rotateY翻牌 |

---

## 五、关键数据流

### 5.1 用户登录态

```
login.html → localStorage.setItem('tcm_user', ...)
                 ↓
nav.js → localStorage.getItem('tcm_user') → 导航栏显示用户名
                 ↓
herbs.js → 判断登录态 → 允许/拒绝收藏操作
```

### 5.2 全站搜索流

```
用户输入关键词 → searchIndex数组实时筛选
    → 匹配草药 → 跳转 herbs.html?search=人参
    → 匹配穴位 → 跳转 meridian.html?search=足三里
    → 匹配名方 → 跳转 prescription.html?search=四物汤
    → 匹配人名 → 跳转 history.html?search=张仲景
    → 匹配节气 → 跳转 wellness.html?search=立春
```

### 5.3 药材筛选流

```
用户点击筛选按钮 → currentCategoryFilter/propertyFilter 更新
    → getFilteredHerbs() 过滤 herbsData
    → renderHerbs() 重新生成卡片HTML → innerHTML 写入DOM
```

---

## 六、浏览器兼容性

- 主要测试浏览器：Chrome、Edge、Firefox
- 使用 `IntersectionObserver`（IE不支持，已做降级处理）
- 使用 `backdrop-filter`（部分旧版浏览器不支持，不影响核心功能）
- 媒体查询断点覆盖桌面/平板/手机三种尺寸
