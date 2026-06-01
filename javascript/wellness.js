/* ============================================================
 * wellness.js - 养生保健页脚本
 * 功能：二十四节气罗盘（旋转+色彩联动）、四季Tab内容、体质测试
 * ============================================================ */

(function() {
  'use strict';

  /* ============================================================
   * 二十四节气数据
   * ============================================================ */
  var termList = [
    "立春","雨水","惊蛰","春分","清明","谷雨",
    "立夏","小满","芒种","夏至","小暑","大暑",
    "立秋","处暑","白露","秋分","寒露","霜降",
    "立冬","小雪","大雪","冬至","小寒","大寒"
  ];

  /* 节气-颜色映射表（用于全站CSS变量联动） */
  var termColors = {
    "立春": "#95B06A", "雨水": "#9FBAC8", "惊蛰": "#C0C68A",
    "春分": "#95B06A", "清明": "#8A9462", "谷雨": "#92AEC8",
    "立夏": "#C8A868", "小满": "#C0885A", "芒种": "#C0885A",
    "夏至": "#C9888F", "小暑": "#DEC8C4", "大暑": "#C4A494",
    "立秋": "#B0A494", "处暑": "#9A6050", "白露": "#B0A494",
    "秋分": "#9A6050", "寒露": "#6E7EAA", "霜降": "#9EA4B0",
    "立冬": "#6E7EAA", "小雪": "#9FBAC8", "大雪": "#EBE7E2",
    "冬至": "#9EA4B0", "小寒": "#92AEC8", "大寒": "#6E7EAA"
  };

  /* 节气养生内容 */
  var termInfoMap = {
    "立春": {diet:"多食辛甘发散之品：韭菜、豆芽、香菜", exercise:"早起舒展筋骨，散步、太极拳", life:"夜卧早起，广步于庭，披发缓行", mood:"戒怒养肝，保持心情舒畅"},
    "雨水": {diet:"健脾祛湿：薏米、山药、红枣", exercise:"适度运动，微汗即止", life:"春捂秋冻，注意保暖防寒", mood:"调畅情志，避免忧郁"},
    "惊蛰": {diet:"清淡为主：菠菜、芦笋、梨", exercise:"户外活动增多，放风筝", life:"早睡早起，防春困", mood:"顺应春气，保持愉悦"},
    "春分": {diet:"阴阳平衡：荠菜、香椿、蜂蜜", exercise:"散步慢跑，不剧烈运动", life:"保持作息规律", mood:"心平气和，忌大喜大悲"},
    "清明": {diet:"柔肝养肺：荠菜、菠菜、银耳", exercise:"踏青远足，呼吸新鲜空气", life:"早起舒展，适当午休", mood:"缅怀先人，感恩生命"},
    "谷雨": {diet:"健脾祛湿：薏米、赤小豆、冬瓜", exercise:"适度运动，避免大汗", life:"防潮防湿，保持居室干燥", mood:"保持心情开朗"},
    "立夏": {diet:"清淡养心：莲子、百合、绿豆", exercise:"运动宜缓，太极拳、八段锦", life:"适当午休养心", mood:"戒躁戒怒，清心安神"},
    "小满": {diet:"清热利湿：苦瓜、黄瓜、绿豆", exercise:"早晚运动，避开烈日", life:"防暑降温，补水为先", mood:"心静自然凉"},
    "芒种": {diet:"清补为主：鸭肉、冬瓜、薏米", exercise:"游泳、瑜伽等低强度运动", life:"勤洗澡换衣，防皮肤病", mood:"避暑静心"},
    "夏至": {diet:"清热解暑：西瓜、绿豆汤、酸梅汤", exercise:"清晨或傍晚运动", life:"午睡不可少，晚睡早起", mood:"静心养神，避免情绪波动"},
    "小暑": {diet:"清暑益气：荷叶粥、绿豆粥", exercise:"室内运动为主", life:"多饮温水，防中暑", mood:"心静气和"},
    "大暑": {diet:"解暑生津：绿豆、苦瓜、西瓜皮", exercise:"避免户外暴晒运动", life:"防暑降温，空调温度不宜过低", mood:"静心避暑"},
    "立秋": {diet:"润肺养阴：梨、百合、银耳", exercise:"秋季登高，适度增加运动", life:"早卧早起，与鸡俱兴", mood:"收敛神气，使志安宁"},
    "处暑": {diet:"滋阴润燥：莲藕、蜂蜜、银耳", exercise:"秋高气爽，适合户外运动", life:"添衣保暖，防秋凉", mood:"保持乐观"},
    "白露": {diet:"养阴润肺：梨、百合、山药", exercise:"适度锻炼，增强肺活量", life:"露水起后不赤膊", mood:"秋季易悲，多与人交流"},
    "秋分": {diet:"滋阴防燥：银耳、百合、芝麻", exercise:"坚持锻炼，增强体质", life:"早卧早起", mood:"保持心态平和"},
    "寒露": {diet:"温润养肺：核桃、芝麻、蜂蜜", exercise:"适当增加运动量", life:"足部保暖，睡前泡脚", mood:"防秋悲情绪"},
    "霜降": {diet:"平补为主：柿子、山药、板栗", exercise:"登高望远，舒展身心", life:"添衣防寒，护好关节", mood:"保持心情舒畅"},
    "立冬": {diet:"温补肾阳：羊肉、核桃、韭菜", exercise:"减少剧烈运动，以静功为主", life:"早卧晚起，必待日光", mood:"藏神于内，宁静致远"},
    "小雪": {diet:"温补为宜：牛肉、板栗、山药", exercise:"室内运动为主，太极拳", life:"保暖防寒，特别护好头脚", mood:"保持心情开朗"},
    "大雪": {diet:"温补脾肾：羊肉汤、红枣桂圆", exercise:"避免晨练过早", life:"早睡晚起，保暖为要", mood:"静养心神"},
    "冬至": {diet:"温补阳气：饺子、羊肉、核桃仁", exercise:"室内缓动，太极八段锦", life:"一阳来复，闭藏养精", mood:"静待春来，心怀希望"},
    "小寒": {diet:"温阳散寒：羊肉、桂圆、生姜", exercise:"日出后运动，八段锦", life:"防风防寒，护好腰腹", mood:"静心养神"},
    "大寒": {diet:"温补固护：牛肉、核桃、枸杞", exercise:"适度运动，以不出汗为宜", life:"大寒过后是立春，静待回暖", mood:"收心静气，准备迎春"}
  };

  /* ============================================================
   * 构建节气罗盘
   * ============================================================ */
  var termRing = document.getElementById('term-ring');
  var compass  = document.getElementById('compass');

  if (termRing) {
    var compassRadius = 170; /* 罗盘半径的一半（匹配CSS 340px/2） */
    var itemRadius = 130;     /* 节气项距中心距离 */

    termList.forEach(function(name, index) {
      var angle = (index * 15 - 90) * (Math.PI / 180); /* 从顶部开始，每格15度 */
      var x = compassRadius + itemRadius * Math.cos(angle);
      var y = compassRadius + itemRadius * Math.sin(angle);

      var item = document.createElement('div');
      item.className = 'term-item';
      item.textContent = name;
      item.style.position = 'absolute';
      item.style.left = x + 'px';
      item.style.top  = y + 'px';
      item.setAttribute('data-term', name);

      item.addEventListener('click', function() {
        onTermClick(this.getAttribute('data-term'));
      });

      termRing.appendChild(item);
    });
  }

  /* ============================================================
   * 节气点击：旋转罗盘 + 色彩联动 + 内容更新
   * ============================================================ */
  function onTermClick(termName) {
    /* 更新全站CSS变量 */
    var color = termColors[termName] || '#CE6C7B';
    document.documentElement.style.setProperty('--accent-color', color);

    /* 旋转罗盘到对应角度 */
    var index = termList.indexOf(termName);
    if (compass) {
      compass.style.setProperty('--active-angle', (index * 15 - 90) + 'deg');
    }

    /* 更新active状态 */
    var allItems = document.querySelectorAll('.term-item');
    allItems.forEach(function(item) {
      if (item.getAttribute('data-term') === termName) {
        item.classList.add('active-term');
      } else {
        item.classList.remove('active-term');
      }
    });

    /* 更新右侧节气内容 */
    updateTermContent(termName, color);
  }

  /**
   * updateTermContent - 更新节气详情展示区
   */
  function updateTermContent(termName, color) {
    var info = termInfoMap[termName];
    if (!info) return;

    var termNameEl   = document.getElementById('term-name');
    var termColorBar = document.getElementById('term-color-bar');
    var termInfoEl   = document.getElementById('term-info');

    if (termNameEl)   termNameEl.textContent = termName;
    if (termColorBar) termColorBar.style.background = color;

    if (termInfoEl) {
      termInfoEl.innerHTML =
        '<div class="info-item"><span class="info-label">饮食：</span><span>' + info.diet + '</span></div>' +
        '<div class="info-item"><span class="info-label">运动：</span><span>' + info.exercise + '</span></div>' +
        '<div class="info-item"><span class="info-label">起居：</span><span>' + info.life + '</span></div>' +
        '<div class="info-item"><span class="info-label">情志：</span><span>' + info.mood + '</span></div>';
    }
  }

  /* ============================================================
   * 四季养生Tab内容
   * ============================================================ */
  var seasonData = {
    spring: {
      title: "春季养生 · 养肝护肝",
      cards: [
        { title: "饮食调养", text: "多食辛甘发散之品，如韭菜、豆芽、香菜、春笋。少食酸涩收敛之物。适当饮用菊花茶、玫瑰花茶疏肝理气。" },
        { title: "运动养生", text: "早起舒展筋骨，散步、太极拳、八段锦。春季运动宜缓不宜急，以微汗为度，助阳气升发。" },
        { title: "起居调摄", text: "夜卧早起，广步于庭。适当春捂，下厚上薄，注意背部保暖。开窗通风，保持室内空气清新。" },
        { title: "情志调养", text: "戒怒养肝，保持心情舒畅。多踏青赏花，与自然亲近。肝喜条达而恶抑郁，保持乐观心态。" }
      ]
    },
    summer: {
      title: "夏季养生 · 清心养心",
      cards: [
        { title: "饮食调养", text: "清淡为主，多食苦味清心：苦瓜、莲子心、绿豆。适当食用西瓜、黄瓜、冬瓜清热解暑。饮酸梅汤生津止渴。" },
        { title: "运动养生", text: "运动宜在清晨或傍晚，避免烈日暴晒。游泳、瑜伽、太极拳等低强度运动为宜。出汗过多伤津耗气。" },
        { title: "起居调摄", text: "适当午休（11-13点），养心护心。晚睡早起，顺应昼长夜短。空调温度不宜过低，避免贪凉伤阳。" },
        { title: "情志调养", text: "心静自然凉。戒躁戒怒，保持平和心态。培养静心爱好：书法、茶道、听古琴。" }
      ]
    },
    autumn: {
      title: "秋季养生 · 润肺养肺",
      cards: [
        { title: "饮食调养", text: "滋阴润肺：梨、百合、银耳、莲藕、蜂蜜。少食辛辣刺激之物。适当食用芝麻、核桃等坚果润燥。" },
        { title: "运动养生", text: "秋季登高望远，增强肺活量。适当增加运动量，但不宜大汗。太极拳、慢跑、登山都是好选择。" },
        { title: "起居调摄", text: "早卧早起，与鸡俱兴。随气温变化添衣，护好颈部和腹部。居室保持一定湿度，防秋燥。" },
        { title: "情志调养", text: "收敛神气，使志安宁。秋季易悲秋伤感，多与亲友交流，保持心情开朗。听舒缓音乐，练习深呼吸。" }
      ]
    },
    winter: {
      title: "冬季养生 · 补肾藏精",
      cards: [
        { title: "饮食调养", text: "温补肾阳：羊肉、核桃、韭菜、黑豆。适当进补，但不宜过度。多饮温热饮品，姜枣茶、桂圆茶暖身驱寒。" },
        { title: "运动养生", text: "减少剧烈运动，以静功为主。太极拳、八段锦、站桩为佳。日出后运动，避免晨练过早受寒。" },
        { title: "起居调摄", text: "早卧晚起，必待日光。注意保暖，特别护好头、颈、腰、足。睡前热水泡脚，促进血液循环。" },
        { title: "情志调养", text: "藏神于内，宁静致远。冬季宜静养，减少社交活动。读书、冥想、练习书法以静心养神。" }
      ]
    }
  };

  var seasonContent = document.getElementById('season-content');
  var seasonTabs = document.querySelectorAll('.season-tab');

  /* 初始化显示春季内容 */
  renderSeasonContent('spring');

  seasonTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      seasonTabs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');
      renderSeasonContent(this.getAttribute('data-season'));
    });
  });

  function renderSeasonContent(season) {
    var data = seasonData[season];
    if (!seasonContent || !data) return;

    var html = '<h3>' + data.title + '</h3><div class="season-grid">';
    data.cards.forEach(function(card) {
      html += '<div class="season-card">';
      html += '<h4>' + card.title + '</h4>';
      html += '<p>' + card.text + '</p>';
      html += '</div>';
    });
    html += '</div>';
    seasonContent.innerHTML = html;
  }

  /* ============================================================
   * 中医体质测试（9道选择题 → 4类体质倾向）
   * ============================================================ */
  var questions = [
    { q: "您是否容易感到疲乏，精力不如同龄人？", options: ["从不","偶尔","经常","总是"], scores: [0,1,2,3] },
    { q: "您是否经常手脚发凉，比别人怕冷？",     options: ["从不","偶尔","经常","总是"], scores: [0,1,2,3] },
    { q: "您的皮肤是否经常感到干燥、缺水？",     options: ["从不","偶尔","经常","总是"], scores: [0,1,2,3] },
    { q: "您是否容易长痘、皮肤偏油腻？",         options: ["从不","偶尔","经常","总是"], scores: [0,1,2,3] },
    { q: "您是否经常情绪低落、容易叹气？",       options: ["从不","偶尔","经常","总是"], scores: [0,1,2,3] },
    { q: "您是否经常口干舌燥、总想喝水？",       options: ["从不","偶尔","经常","总是"], scores: [0,1,2,3] },
    { q: "您是否容易腹胀、大便不成形？",         options: ["从不","偶尔","经常","总是"], scores: [0,1,2,3] },
    { q: "您是否经常失眠多梦、睡眠浅？",         options: ["从不","偶尔","经常","总是"], scores: [0,1,2,3] },
    { q: "您是否面色偏黄或偏白、唇色淡？",       options: ["从不","偶尔","经常","总是"], scores: [0,1,2,3] }
  ];

  var currentQuestion = -1;
  var totalScore = 0;
  var scores = Array(questions.length).fill(null); /* 每题得分 */

  var quizContent  = document.getElementById('quiz-content');
  var quizNext     = document.getElementById('quiz-next');
  var quizPrev     = document.getElementById('quiz-prev');
  var quizResult   = document.getElementById('quiz-result');
  var progressBar  = document.getElementById('progress-bar');
  var quizContainer = document.getElementById('quiz-container');

  if (quizNext) {
    quizNext.addEventListener('click', function() {
      if (currentQuestion === -1) {
        /* 开始测试 */
        startQuiz();
      } else if (currentQuestion < questions.length - 1) {
        /* 下一题 */
        var selected = document.querySelector('.quiz-option.selected');
        if (!selected) return;
        scores[currentQuestion] = parseInt(selected.getAttribute('data-score'));
        currentQuestion++;
        renderQuestion();
      } else {
        /* 最后一道题，查看结果 */
        var selected = document.querySelector('.quiz-option.selected');
        if (!selected) return;
        scores[currentQuestion] = parseInt(selected.getAttribute('data-score'));
        showResult();
      }
    });
  }

  if (quizPrev) {
    quizPrev.addEventListener('click', function() {
      if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
      }
    });
  }

  function startQuiz() {
    currentQuestion = 0;
    scores = Array(questions.length).fill(null);
    totalScore = 0;
    quizResult.style.display = 'none';
    renderQuestion();
  }

  function renderQuestion() {
    if (currentQuestion >= questions.length) {
      showResult();
      return;
    }

    var q = questions[currentQuestion];
    var html = '<h3>第' + (currentQuestion + 1) + '题 / 共' + questions.length + '题</h3>';
    html += '<p style="margin-bottom:16px;color:var(--color-deep);">' + q.q + '</p>';
    html += '<div class="quiz-options">';
    q.options.forEach(function(opt, i) {
      var selectedAttr = (scores[currentQuestion] !== null && scores[currentQuestion] === q.scores[i]) ? ' selected' : '';
      html += '<button class="quiz-option' + selectedAttr + '" data-score="' + q.scores[i] + '">' + opt + '</button>';
    });
    html += '</div>';

    quizContent.innerHTML = html;

    /* 绑定选项点击 */
    var options = quizContent.querySelectorAll('.quiz-option');
    options.forEach(function(opt) {
      opt.addEventListener('click', function() {
        options.forEach(function(o) { o.classList.remove('selected'); });
        this.classList.add('selected');
      });
    });

    /* 更新进度 */
    if (progressBar) {
      progressBar.style.width = (((currentQuestion + 1) / questions.length) * 100) + '%';
    }

    /* 更新按钮状态 */
    quizPrev.style.display = currentQuestion > 0 ? 'inline-block' : 'none';
    quizNext.textContent = currentQuestion === questions.length - 1 ? '查看结果' : '下一题';
  }

  function showResult() {
    totalScore = scores.reduce(function(a, b) { return a + b; }, 0);

    var resultType, resultAdvice;
    if (totalScore <= 4) {
      resultType = "平和质";
      resultAdvice = "恭喜！您的体质较为平和健康。建议：保持现有的良好生活习惯，饮食均衡，适度运动，保持乐观心态。不同季节根据节气变化微调生活方式即可。可关注本网站养生保健栏目，了解更多时令养生知识。";
    } else if (totalScore <= 10) {
      resultType = "气虚质 / 阳虚质倾向";
      resultAdvice = "您有轻度气虚或阳虚倾向。建议：饮食上适当增加温补食物，如红枣、山药、黄芪炖鸡、当归生姜羊肉汤。保证充足睡眠，避免过度劳累和熬夜。适当进行太极拳、八段锦等温和运动以增强体质。注意保暖，尤其护好腹部、腰部和足部。常按揉足三里培补元气。";
    } else if (totalScore <= 17) {
      resultType = "阴虚质 / 湿热质倾向";
      resultAdvice = "您有阴虚或湿热倾向。建议：饮食清淡，多食滋阴润燥之品，如银耳、百合、梨、山药、鸭肉。忌食辛辣油炸、烧烤食物，少饮酒。保持充足睡眠，避免熬夜耗伤阴液。适当饮用菊花茶、金银花茶、酸梅汤清热生津。注意皮肤清洁保湿，保持大便通畅。可练习瑜伽、游泳等舒缓运动。";
    } else {
      resultType = "气郁质 / 血瘀质倾向";
      resultAdvice = "您有气郁或血瘀倾向。建议：保持心情舒畅，多进行户外活动和大自然接触。饮食上适当食用疏肝理气、活血化瘀食物，如山楂、玫瑰花茶、陈皮茶、黑木耳。培养兴趣爱好转移注意力，练习瑜伽、太极等舒展运动放松身心。多与亲友交流，避免独自闷坐。睡前热水泡脚按摩涌泉穴促进血液循环。如持续不适，建议咨询中医师辨证调理。";
    }

    localStorage.setItem('tcm_constitution', resultType);

    quizContainer.style.display = 'none';
    quizResult.style.display = 'block';
    quizResult.innerHTML =
      '<h3>您的体质：' + resultType + '</h3>' +
      '<span class="result-type">测试得分：' + totalScore + ' / ' + (questions.length * 3) + '</span>' +
      '<div class="result-advice">' +
      '<h4>个性化养生建议</h4>' +
      '<p>' + resultAdvice + '</p>' +
      '</div>' +
      '<button class="btn btn-primary" style="margin-top:20px;" onclick="location.reload();">&#8635; 重新测试</button>';
  }

  /* ============================================================
   * 自动高亮当前节气
   * ============================================================ */
  function highlightCurrentTerm() {
    var today = new Date();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    /* 简单的节气映射，找到当前最近的节气 */
    var termDates = [
      {name:"小寒",m:1,d:5},{name:"大寒",m:1,d:20},{name:"立春",m:2,d:3},{name:"雨水",m:2,d:18},
      {name:"惊蛰",m:3,d:5},{name:"春分",m:3,d:20},{name:"清明",m:4,d:4},{name:"谷雨",m:4,d:20},
      {name:"立夏",m:5,d:5},{name:"小满",m:5,d:21},{name:"芒种",m:6,d:5},{name:"夏至",m:6,d:21},
      {name:"小暑",m:7,d:7},{name:"大暑",m:7,d:22},{name:"立秋",m:8,d:7},{name:"处暑",m:8,d:23},
      {name:"白露",m:9,d:7},{name:"秋分",m:9,d:23},{name:"寒露",m:10,d:8},{name:"霜降",m:10,d:23},
      {name:"立冬",m:11,d:7},{name:"小雪",m:11,d:22},{name:"大雪",m:12,d:7},{name:"冬至",m:12,d:21}
    ];

    var currentTerm = "夏至"; /* 默认 */
    for (var i = 0; i < termDates.length; i++) {
      if (month > termDates[i].m || (month === termDates[i].m && day >= termDates[i].d)) {
        currentTerm = termDates[i].name;
      }
    }

    /* 触发当前节气的展示 */
    setTimeout(function() {
      onTermClick(currentTerm);
    }, 300);
  }

  (function checkSearchParam() {
    var params = new URLSearchParams(window.location.search);
    var searchTerm = params.get('search');
    var seasonAliasMap = {
      '春': 'spring',
      '春季': 'spring',
      '夏': 'summer',
      '夏季': 'summer',
      '秋': 'autumn',
      '秋季': 'autumn',
      '冬': 'winter',
      '冬季': 'winter'
    };

    if (!searchTerm) return;

    if (termList.indexOf(searchTerm) !== -1) {
      setTimeout(function() {
        onTermClick(searchTerm);
        var termContentEl = document.getElementById('term-content');
        if (termContentEl) {
          termContentEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 250);
      return;
    }

    if (seasonAliasMap[searchTerm]) {
      var seasonKey = seasonAliasMap[searchTerm];
      seasonTabs.forEach(function(tab) {
        tab.classList.toggle('active', tab.getAttribute('data-season') === seasonKey);
      });
      renderSeasonContent(seasonKey);
      setTimeout(function() {
        if (seasonContent) {
          seasonContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 250);
    }
  })();

  highlightCurrentTerm();

})();
