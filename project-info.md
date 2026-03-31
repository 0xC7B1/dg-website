# dg-website initial project information

this is the basic information for the dg-website project. Includes project description, goals, basic design, and other relevant details.
project digital ghost is a trpg game based on user generated content. The game allows players to create their own characters, stories, and adventures using social media platforms. The website will serve as a hub for players to show their creations, connect with other players, and present the game lore, rules, and mechanics.

## Project Description

dg-website aimed at creating a simple and elegant website to showcase the basic information about the project and creator. The website will include sections such as "about", "chapters", "characters", "lore", "rules", and "creations".

### About (/)

this is the landing page of the website, providing a brief introduction to the project and its creator. It will include a hero section with a full-width image, a brief description of the project, and a call-to-action button to explore the website further.
under the hero section, there will be a section to provide more detailed information about the project. showing documents:

- 00：旅途切片（导入）
- 01：档案解密（故事背景）
- 02：坐标锁定（故事舞台）
- 03：人员登记（角色简介）
- 04：协议启动（玩家体验）
- 05：时间轴（企划排期）
- 入院须知（注意事项）
每个段落使用点阵装饰线分割，文字段落可折叠/展开。

### Chapters (/chapters)

- chapter selector: 4 chapters's thumbnail images croped to vertical ratio with titles, horizontally arranged, hover to expand and show full image. click to enter chapter details page.
- chapter details page: not designed

### Characters (/characters)

- two sub sections: NPCs and Players. each section has a character selector and character details page.
- character selector: a scrollable vertical list of character avatar images with names. click to open character details panel on the right side of the page.
- character info:
    每个NPC以卡片形式展示，类似二游官网角色列表：
  - 卡片包含：立绘（半身像，点阵风）、姓名、身份标签（如“灰山城计划发起人”）、简短介绍（一句话）。
  - 点击卡片，右侧弹出详细面板（不跳转页面）：
  - 左侧立绘大图
  - 右侧分栏：
  - 基本信息（年龄、职业等）
  - 身份（在故事中的角色）
  - 角色介绍（详细文本，可滚动）
  - 人格档案（分CMYK四色，初始锁定，随着章节推进逐步解锁；解锁条件由后端控制，前端需根据用户登录状态/章节进度显示“已解锁”或“？？？”。点击已解锁的信道，弹窗展示该人格档案的完整内容。）

### Lore (/lore)

结构：左侧导航栏按章节（扇区）划分，右侧显示内容。

- 每个扇区对应《设定词典-第X章》文档。
- 内容采用可折叠目录：点击章节后，显示该章的所有设定条目（如“大断裂”“双峰岛会战”“现实溢出”“大未来电脑”等），再点击条目才展开具体讲解（三级界面）。
- 设计成类似技术文档或维基风格，左侧树形菜单，右侧内容区。
- 支持全文搜索（可选）。
数据组织：设定词典中的条目按层级 JSON 存储，前端根据用户已解锁的章节显示内容（未解锁章节显示“???”）。

### Rules (/rules)

布局：左右两栏（左侧目录，右侧内容），类似 Google Antigravity 或 Stripe 文档。
左侧目录包含两部分：

- 玩家手册（省流版）：快速上手、核心机制、常用术语表
- 详细规则书：完整 TRPG 规则 v3.2，按章节拆分（角色创建、资源、动作、判定等）
右侧内容区采用代码块样式展示规则条文，使用等宽字体，重点用高亮。

- 支持锚点跳转（URL 直接定位到某条规则）。

### Creations (/creations)

布局：顶部两个标签页：“文”和“画”。

- 文：卡片式列表，展示文章标题、作者、简短摘要、配图（若有）。点击卡片进入文章详情页（支持 Markdown 渲染）。
- 画：瀑布流展示图片，每张图有标题、作者、创作所属章节。点击图片放大查看。
所有产出按上传时间倒序排列，支持筛选（按章节、按玩家）。
