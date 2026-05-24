/* ============================================================
 * index.js - 首页交互脚本
 * 功能：农历节气计算、每日一签摇签、今日推荐中药轮换
 * ============================================================ */

(function() {
  'use strict';

  /* ============================================================
   * 农历计算（简化对照表）
   * ============================================================ */
  var tianGan = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
  var diZhi   = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
  var shengXiao = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];

  var lunarMonths = ['正','二','三','四','五','六','七','八','九','十','冬','腊'];
  var lunarDays   = [
    '初一','初二','初三','初四','初五','初六','初七','初八','初九','初十',
    '十一','十二','十三','十四','十五','十六','十七','十八','十九','二十',
    '廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'
  ];

  var solarTerms = [
    {name:"小寒", month:1,  day:5},  {name:"大寒", month:1,  day:20},
    {name:"立春", month:2,  day:3},  {name:"雨水", month:2,  day:18},
    {name:"惊蛰", month:3,  day:5},  {name:"春分", month:3,  day:20},
    {name:"清明", month:4,  day:4},  {name:"谷雨", month:4,  day:20},
    {name:"立夏", month:5,  day:5},  {name:"小满", month:5,  day:21},
    {name:"芒种", month:6,  day:5},  {name:"夏至", month:6,  day:21},
    {name:"小暑", month:7,  day:7},  {name:"大暑", month:7,  day:22},
    {name:"立秋", month:8,  day:7},  {name:"处暑", month:8,  day:23},
    {name:"白露", month:9,  day:7},  {name:"秋分", month:9,  day:23},
    {name:"寒露", month:10, day:8},  {name:"霜降", month:10, day:23},
    {name:"立冬", month:11, day:7},  {name:"小雪", month:11, day:22},
    {name:"大雪", month:12, day:7},  {name:"冬至", month:12, day:21}
  ];

  var termTips = {
    "立春":"春阳升发，宜养肝护肝，早睡早起，舒展身心",
    "雨水":"春雨润物，健脾祛湿，少酸多甘，调畅情志",
    "惊蛰":"春雷惊百虫，养肝健脾，适当运动，防春困",
    "春分":"阴阳平衡，调和气血，夜卧早起，广步于庭",
    "清明":"天清地明，养肝护肺，踏青远足，舒畅气机",
    "谷雨":"雨生百谷，健脾化湿，食薏米赤豆，护脾胃",
    "立夏":"夏日初长，养心护心，午休片刻，宁心安神",
    "小满":"物致小满，清热利湿，食苦瓜绿豆，防暑邪",
    "芒种":"有芒之种，清暑益气，饮食清淡，勿过劳作",
    "夏至":"阳极阴生，养心静神，适当午睡，忌大热大寒",
    "小暑":"暑热渐盛，清心祛暑，多饮温水，防暑降温",
    "大暑":"暑气至盛，清热解暑，食西瓜绿豆，避烈日",
    "立秋":"秋气始至，养肺润燥，早卧早起，收敛神气",
    "处暑":"暑气将止，润肺生津，食梨藕百合，防秋燥",
    "白露":"露凝而白，滋阴润肺，添衣防凉，护呼吸道",
    "秋分":"昼夜平分，养阴防燥，食银耳百合，润肺止咳",
    "寒露":"露气寒冷，温润防寒，泡脚暖身，养肺护胃",
    "霜降":"气肃而凝，养肺健脾，食柿子山药，滋阴润燥",
    "立冬":"冬气之始，补肾藏精，早卧晚起，必待日光",
    "小雪":"天地闭藏，温补肾阳，食羊肉核桃，御寒保暖",
    "大雪":"寒气盛极，温补脾肾，适当进补，勿过劳心",
    "冬至":"一阳来复，补肾填精，食饺子汤圆，温养阳气",
    "小寒":"寒气凛冽，温阳散寒，适当食补，顾护肾阳",
    "大寒":"寒气逆极，固护阳气，温补脾肾，静待春来"
  };

  function getLunarDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    var tgIndex = (year - 4) % 10;
    var dzIndex = (year - 4) % 12;
    var ganZhiYear = tianGan[tgIndex] + diZhi[dzIndex];
    var animal = shengXiao[dzIndex];

    var lunarDayStr = lunarDays[Math.min(day - 1, 29)];
    return ganZhiYear + animal + '年 ' + lunarMonths[month - 1] + '月' + lunarDayStr;
  }

  function getTodayTerm() {
    var today = new Date();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    var currentTerm = solarTerms[0];
    for (var i = 0; i < solarTerms.length; i++) {
      if (month > solarTerms[i].month ||
          (month === solarTerms[i].month && day >= solarTerms[i].day)) {
        currentTerm = solarTerms[i];
      }
    }

    return {
      name: currentTerm.name,
      tip: termTips[currentTerm.name] || '顺应自然，调和阴阳，保持身心健康'
    };
  }

  /* 更新日期显示 */
  var lunarDateEl = document.getElementById('lunar-date');
  var solarTermEl = document.getElementById('solar-term');
  var termTipEl   = document.getElementById('term-tip');

  if (lunarDateEl) lunarDateEl.textContent = getLunarDate();
  if (solarTermEl) {
    var term = getTodayTerm();
    solarTermEl.textContent = term.name;
    if (termTipEl) termTipEl.textContent = term.tip;
  }

  /* ============================================================
   * 每日一签：摇签互动（修复版）
   * ============================================================ */
  var fortunePool = [
    "金秋养肺，多食白色食物，润燥护阴",
    "冬藏精气，早睡晚起，顾护肾阳",
    "春养肝气，少怒多喜，舒达升发",
    "夏养心神，清淡饮食，午休养心",
    "脾胃为后天之本，饮食有节，起居有常",
    "正气存内，邪不可干，扶正以祛邪",
    "药食同源，食疗为先，以食养正",
    "怒伤肝，喜伤心，思伤脾，忧伤肺，恐伤肾",
    "通则不痛，痛则不通，气血和畅身自安",
    "心静自然凉，神定百病消",
    "上工治未病，未病先防，既病防变",
    "春夏养阳，秋冬养阴，顺应四时",
    "五谷为养，五果为助，五畜为益，五菜为充",
    "流水不腐，户枢不蠹，动以养形",
    "恬淡虚无，真气从之，精神内守，病安从来",
    "肾为先天之本，脾为后天之本",
    "肝主疏泄，喜条达而恶抑郁",
    "肺主气，司呼吸，外合皮毛",
    "心主血脉，藏神，为君主之官",
    "头为诸阳之会，足为精气之根",
    "不治已病治未病，不治已乱治未乱",
    "法于阴阳，和于术数，食饮有节，起居有常",
    "久视伤血，久卧伤气，久坐伤肉，久立伤骨",
    "七情六欲皆有度，过则为病",
    "寒从脚下起，病从口中入",
    "三分治七分养，调养胜于药攻",
    "日出而作，日落而息，顺应天时",
    "晨起一杯水，到老不后悔",
    "若要身体安，常带三分饥与寒",
    "春捂秋冻，不生杂病"
  ];

  var fortuneBtn    = document.getElementById('fortune-btn');
  var fortuneText   = document.getElementById('fortune-text');
  var fortuneDisplay = document.getElementById('fortune-display');

  /* 记录上一次抽到的签文，确保每次不重复 */
  var lastFortuneIndex = -1;

  if (fortuneBtn && fortuneText) {
    fortuneBtn.addEventListener('click', function() {

      /* 防止快速点击 */
      if (fortuneBtn.classList.contains('shaking')) return;

      /* 触发摇晃动画 */
      fortuneBtn.classList.add('shaking');

      /* 动画结束后替换签文 */
      setTimeout(function() {
        fortuneBtn.classList.remove('shaking');

        /* 随机抽取与上次不同的签文 */
        var index;
        do {
          index = Math.floor(Math.random() * fortunePool.length);
        } while (index === lastFortuneIndex && fortunePool.length > 1);

        lastFortuneIndex = index;

        /* 清除动画类（确保可以重新触发） */
        if (fortuneDisplay) {
          fortuneDisplay.classList.remove('text-changed');
        }

        /* 更新文本 */
        fortuneText.textContent = fortunePool[index];

        /* 用 requestAnimationFrame 确保DOM更新后再加动画类 */
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            if (fortuneDisplay) {
              fortuneDisplay.classList.add('text-changed');
            }
          });
        });
      }, 550);
    });
  }

  /* ============================================================
   * 今日推荐中药（基于日期轮换）
   * ============================================================ */
  var featuredHerbs = [
    {
      name: "人参",
      property: "性味：甘、微苦、微温 | 归经：脾、肺、心",
      effect: "大补元气，复脉固脱，补脾益肺，生津养血，安神益智",
      desc: "人参被誉为"百草之王"，是驰名中外的名贵药材。其根部肉质肥大，形如人形，故名人参。在中国应用已有数千年的历史，《神农本草经》将其列为上品。现代药理研究表明，人参含有多种人参皂苷，具有抗疲劳、增强免疫力、改善心血管功能等多重功效。",
      cssClass: "type-ginseng"
    },
    {
      name: "枸杞",
      property: "性味：甘、平 | 归经：肝、肾",
      effect: "滋补肝肾，益精明目，润肺",
      desc: "枸杞子为茄科植物枸杞的干燥成熟果实，色泽鲜红，味甜。素有"却老子"之称，是传统名贵滋补药材。《本草纲目》记载："枸杞，补肾生精，养肝明目。"现代研究证实枸杞富含枸杞多糖、β-胡萝卜素等，具有抗氧化、保护视力、增强免疫等功效。",
      cssClass: "type-berry"
    },
    {
      name: "黄芪",
      property: "性味：甘、微温 | 归经：脾、肺",
      effect: "补气固表，利尿托毒，排脓，敛疮生肌",
      desc: "黄芪为豆科植物蒙古黄芪或膜荚黄芪的干燥根，是补气要药。味甘性微温，入脾肺经。《本草备要》称其"生用固表，无汗能发，有汗能止；炙用补中，益元气，壮脾胃"。现代药理研究表明黄芪具有增强免疫功能、抗疲劳、保护心血管等作用，广泛用于中医临床各科。",
      cssClass: "type-root"
    },
    {
      name: "菊花",
      property: "性味：辛、甘、苦、微寒 | 归经：肺、肝",
      effect: "散风清热，平肝明目，清热解毒",
      desc: "菊花为菊科植物菊的干燥头状花序，是中国传统名花之一，亦为常用中药。《神农本草经》将其列为上品。菊花性微寒，善于疏散风热、清肝明目。现代药理证实菊花含有黄酮类化合物，具有抗炎、抗氧化、降血压等作用，是日常养生茶饮的上佳之选。",
      cssClass: "type-flower"
    },
    {
      name: "薄荷",
      property: "性味：辛、凉 | 归经：肺、肝",
      effect: "疏散风热，清利头目，利咽，透疹",
      desc: "薄荷为唇形科植物薄荷的干燥地上部分，气味芳香清凉。《本草纲目》记载："薄荷，辛能发散，凉能清利，专于消风散热。"常用于风热感冒、头痛目赤、咽喉肿痛等症，也是夏季提神醒脑的常用草药。",
      cssClass: "type-leaf"
    }
  ];

  var todayIndex = new Date().getDate() % featuredHerbs.length;
  var todayHerb = featuredHerbs[todayIndex];

  var featuredName     = document.getElementById('featured-name');
  var featuredProperty = document.getElementById('featured-property');
  var featuredEffect   = document.getElementById('featured-effect');
  var featuredDesc     = document.getElementById('featured-desc');
  var featuredImg      = document.getElementById('featured-herb-img');

  if (featuredName) {
    featuredName.textContent = todayHerb.name;
    if (featuredProperty) featuredProperty.textContent = todayHerb.property;
    if (featuredEffect)   featuredEffect.textContent   = todayHerb.effect;
    if (featuredDesc)     featuredDesc.textContent     = todayHerb.desc;
    if (featuredImg) {
      featuredImg.className = 'herb-illustration ' + todayHerb.cssClass;
    }
  }

  /* ============================================================
   * 跑马灯：克隆内容实现无缝滚动
   * ============================================================ */
  var marqueeContent = document.getElementById('marquee-content');
  if (marqueeContent) {
    var clone = marqueeContent.cloneNode(true);
    marqueeContent.parentNode.appendChild(clone);
  }

})();
