/* ============================================================
 * wellness.js - 养生保健页交互
 * 功能：二十四节气罗盘、四季养生、体质测试
 * ============================================================ */

(function() {
  'use strict';

  var termList = [
    '立春', '雨水', '惊蛰', '春分', '清明', '谷雨',
    '立夏', '小满', '芒种', '夏至', '小暑', '大暑',
    '立秋', '处暑', '白露', '秋分', '寒露', '霜降',
    '立冬', '小雪', '大雪', '冬至', '小寒', '大寒'
  ];

  var termColors = {
    '立春': '#95B06A', '雨水': '#9FBAC8', '惊蛰': '#C0C68A', '春分': '#95B06A', '清明': '#8A9462', '谷雨': '#92AEC8',
    '立夏': '#C8A868', '小满': '#C0885A', '芒种': '#C0885A', '夏至': '#C9888F', '小暑': '#DEC8C4', '大暑': '#C4A494',
    '立秋': '#B0A494', '处暑': '#9A6050', '白露': '#B0A494', '秋分': '#9A6050', '寒露': '#6E7EAA', '霜降': '#9EA4B0',
    '立冬': '#6E7EAA', '小雪': '#9FBAC8', '大雪': '#EBE7E2', '冬至': '#9EA4B0', '小寒': '#92AEC8', '大寒': '#6E7EAA'
  };

  var termInfoMap = {
    '立春': { diet: '多食辛甘发散之品，如韭菜、豆芽、香菜。', exercise: '散步、太极、舒展筋骨。', life: '夜卧早起，顺应阳气升发。', mood: '戒怒养肝，保持舒展。' },
    '雨水': { diet: '健脾祛湿，如薏米、山药、红枣。', exercise: '缓和活动，微汗即止。', life: '防寒防湿，注意脚部保暖。', mood: '少郁少忧，调畅情志。' },
    '惊蛰': { diet: '清淡少腻，多蔬菜。', exercise: '早起活动，散步慢跑。', life: '防春困，作息规律。', mood: '顺应生发之气。' },
    '春分': { diet: '阴阳平衡，饮食平和。', exercise: '不过汗，不过劳。', life: '起居有常。', mood: '心态平和。' },
    '清明': { diet: '柔肝养肺，少油腻。', exercise: '踏青、远足。', life: '适当开窗通风。', mood: '舒怀解郁。' },
    '谷雨': { diet: '健脾利湿，如赤小豆、冬瓜。', exercise: '适度伸展。', life: '防潮防湿。', mood: '保持开朗。' },
    '立夏': { diet: '清淡养心，如莲子、百合、绿豆。', exercise: '太极、八段锦等舒缓运动。', life: '可适当午休。', mood: '清心安神。' },
    '小满': { diet: '清热利湿，少甜腻。', exercise: '晨晚运动，避开烈日。', life: '勤补水。', mood: '少躁少怒。' },
    '芒种': { diet: '清补为主，如冬瓜、鸭肉。', exercise: '低强度活动。', life: '勤换洗，防湿热。', mood: '平心静气。' },
    '夏至': { diet: '解暑生津，如酸梅汤、西瓜。', exercise: '清晨或傍晚运动。', life: '晚睡早起但要午休。', mood: '静心宁神。' },
    '小暑': { diet: '清暑益气，如荷叶粥。', exercise: '室内运动为主。', life: '防中暑，多饮温水。', mood: '心静自然凉。' },
    '大暑': { diet: '清热解暑，少辛辣。', exercise: '避免烈日暴晒。', life: '注意降温和补水。', mood: '避躁养心。' },
    '立秋': { diet: '润肺养阴，如梨、百合、银耳。', exercise: '慢跑、登高。', life: '早卧早起。', mood: '收敛神气。' },
    '处暑': { diet: '滋阴润燥。', exercise: '适合户外活动。', life: '及时添衣。', mood: '保持乐观。' },
    '白露': { diet: '养阴润肺。', exercise: '增强肺活量。', life: '昼夜温差大，注意保暖。', mood: '多交流，防秋悲。' },
    '秋分': { diet: '平补为宜。', exercise: '适度锻炼。', life: '早睡早起。', mood: '心态平和。' },
    '寒露': { diet: '温润养肺，如芝麻、核桃。', exercise: '可略增运动量。', life: '足部保暖。', mood: '防秋愁。' },
    '霜降': { diet: '温补脾胃。', exercise: '登高舒展。', life: '注意护关节。', mood: '保持舒畅。' },
    '立冬': { diet: '温补肾阳，如羊肉、黑豆。', exercise: '静功、慢练为主。', life: '早睡晚起。', mood: '宁静内守。' },
    '小雪': { diet: '温补为宜。', exercise: '太极、八段锦。', life: '注意头颈保暖。', mood: '保持开朗。' },
    '大雪': { diet: '可适当进补。', exercise: '避免过早晨练。', life: '护阳御寒。', mood: '静养心神。' },
    '冬至': { diet: '温补阳气，如饺子、羊肉。', exercise: '室内缓动。', life: '养肾护阳。', mood: '安静蓄势。' },
    '小寒': { diet: '温阳散寒。', exercise: '日出后活动。', life: '防风防寒。', mood: '静心养神。' },
    '大寒': { diet: '温补固护。', exercise: '不宜大汗。', life: '等待回暖，藏精护体。', mood: '收心静气。' }
  };

  var seasonData = {
    spring: {
      title: '春季养生 · 养肝护肝',
      cards: [
        { title: '饮食调养', text: '多食辛甘发散之品，如韭菜、豆芽、香菜、春笋，少食过酸。' },
        { title: '运动养生', text: '以散步、八段锦、太极等舒展型运动为主，帮助阳气升发。' },
        { title: '起居调摄', text: '夜卧早起，适当踏青，注意背部保暖，防风邪入体。' },
        { title: '情志调养', text: '春主肝，宜保持心情舒畅，少郁少怒。' }
      ]
    },
    summer: {
      title: '夏季养生 · 清心养心',
      cards: [
        { title: '饮食调养', text: '宜清淡，适当食用绿豆、冬瓜、莲子、苦瓜等。' },
        { title: '运动养生', text: '晨晚轻运动即可，避免暴晒和大汗伤津。' },
        { title: '起居调摄', text: '可适当午休，空调不宜过低，避免贪凉。' },
        { title: '情志调养', text: '心静自然凉，少烦少躁，养神为先。' }
      ]
    },
    autumn: {
      title: '秋季养生 · 润肺养肺',
      cards: [
        { title: '饮食调养', text: '滋阴润燥，如梨、百合、银耳、山药、蜂蜜。' },
        { title: '运动养生', text: '慢跑、登高、深呼吸训练都有助于肺气宣发。' },
        { title: '起居调摄', text: '早卧早起，室内注意湿度，减少秋燥伤津。' },
        { title: '情志调养', text: '秋易悲，宜多交流、晒太阳、保持开阔心态。' }
      ]
    },
    winter: {
      title: '冬季养生 · 补肾藏精',
      cards: [
        { title: '饮食调养', text: '以温补为主，如羊肉、核桃、黑豆、山药、红枣。' },
        { title: '运动养生', text: '以静功和缓动为主，宜在日出后活动。' },
        { title: '起居调摄', text: '早睡晚起，重点保护头、腰、腹、足。' },
        { title: '情志调养', text: '冬宜静养，减少耗散，收敛心神。' }
      ]
    }
  };

  var questions = [
    { q: '您是否容易感到疲乏，精力不如同龄人？', options: ['从不', '偶尔', '经常', '总是'], scores: [0, 1, 2, 3] },
    { q: '您是否经常手脚发凉，比别人怕冷？', options: ['从不', '偶尔', '经常', '总是'], scores: [0, 1, 2, 3] },
    { q: '您的皮肤是否经常感觉干燥、缺水？', options: ['从不', '偶尔', '经常', '总是'], scores: [0, 1, 2, 3] },
    { q: '您是否容易长痘、皮肤偏油？', options: ['从不', '偶尔', '经常', '总是'], scores: [0, 1, 2, 3] },
    { q: '您是否经常情绪低落、容易叹气？', options: ['从不', '偶尔', '经常', '总是'], scores: [0, 1, 2, 3] },
    { q: '您是否常有口干舌燥、总想喝水？', options: ['从不', '偶尔', '经常', '总是'], scores: [0, 1, 2, 3] },
    { q: '您是否经常腹胀、大便不成形？', options: ['从不', '偶尔', '经常', '总是'], scores: [0, 1, 2, 3] },
    { q: '您是否经常失眠多梦、睡眠浅？', options: ['从不', '偶尔', '经常', '总是'], scores: [0, 1, 2, 3] },
    { q: '您是否面色偏黄或偏白、唇色淡？', options: ['从不', '偶尔', '经常', '总是'], scores: [0, 1, 2, 3] }
  ];

  var termRing = document.getElementById('term-ring');
  var compass = document.getElementById('compass');
  var termContent = document.getElementById('term-content');
  var seasonContent = document.getElementById('season-content');
  var seasonTabs = document.querySelectorAll('.season-tab');
  var quizContent = document.getElementById('quiz-content');
  var quizNext = document.getElementById('quiz-next');
  var quizPrev = document.getElementById('quiz-prev');
  var quizResult = document.getElementById('quiz-result');
  var progressBar = document.getElementById('progress-bar');
  var quizContainer = document.getElementById('quiz-container');
  var currentQuestion = -1;
  var scores = Array(questions.length).fill(null);

  function buildCompassItems() {
    if (!termRing || !compass) return;

    termRing.innerHTML = '';

    var size = compass.clientWidth || 340;
    var center = size / 2;
    var radius = size * 0.38;

    termList.forEach(function(name, index) {
      var angle = (index * 15 - 90) * (Math.PI / 180);
      var x = center + radius * Math.cos(angle);
      var y = center + radius * Math.sin(angle);
      var item = document.createElement('div');

      item.className = 'term-item';
      item.textContent = name;
      item.style.left = x + 'px';
      item.style.top = y + 'px';
      item.setAttribute('data-term', name);
      item.setAttribute('data-x', x);
      item.setAttribute('data-y', y);
      item.setAttribute('data-angle', (index * 15 - 90) + '');

      item.addEventListener('click', function() {
        onTermClick(name);
      });

      termRing.appendChild(item);
    });
  }

  function updateTermContent(termName, color) {
    var info = termInfoMap[termName];
    var termNameEl = document.getElementById('term-name');
    var termColorBar = document.getElementById('term-color-bar');
    var termInfoEl = document.getElementById('term-info');

    if (!info) return;
    if (termNameEl) termNameEl.textContent = termName;
    if (termColorBar) termColorBar.style.background = color;
    if (termInfoEl) {
      termInfoEl.innerHTML =
        '<div class="info-item"><span class="info-label">饮食：</span><span>' + info.diet + '</span></div>' +
        '<div class="info-item"><span class="info-label">运动：</span><span>' + info.exercise + '</span></div>' +
        '<div class="info-item"><span class="info-label">起居：</span><span>' + info.life + '</span></div>' +
        '<div class="info-item"><span class="info-label">情志：</span><span>' + info.mood + '</span></div>';
    }
  }

  function onTermClick(termName) {
    var color = termColors[termName] || '#CE6C7B';
    var items = document.querySelectorAll('.term-item');

    document.documentElement.style.setProperty('--accent-color', color);

    items.forEach(function(item) {
      var active = item.getAttribute('data-term') === termName;
      item.classList.toggle('active-term', active);
      if (active && compass) {
        compass.style.setProperty('--marker-x', item.getAttribute('data-x') + 'px');
        compass.style.setProperty('--marker-y', item.getAttribute('data-y') + 'px');
        compass.style.setProperty('--active-angle', item.getAttribute('data-angle') + 'deg');
      }
    });

    if (compass) {
      compass.classList.remove('is-animating');
      window.requestAnimationFrame(function() {
        compass.classList.add('is-animating');
      });
      window.setTimeout(function() {
        compass.classList.remove('is-animating');
      }, 520);
    }

    if (termContent) {
      termContent.classList.remove('is-refreshing');
      window.requestAnimationFrame(function() {
        termContent.classList.add('is-refreshing');
      });
      window.setTimeout(function() {
        termContent.classList.remove('is-refreshing');
      }, 420);
    }

    updateTermContent(termName, color);
  }

  function renderSeasonContent(season) {
    var data = seasonData[season];
    if (!seasonContent || !data) return;

    seasonContent.innerHTML = '<h3>' + data.title + '</h3><div class="season-grid">' +
      data.cards.map(function(card) {
        return '<div class="season-card"><h4>' + card.title + '</h4><p>' + card.text + '</p></div>';
      }).join('') +
      '</div>';
  }

  function startQuiz() {
    currentQuestion = 0;
    scores = Array(questions.length).fill(null);
    if (quizResult) quizResult.style.display = 'none';
    if (quizContainer) quizContainer.style.display = 'block';
    renderQuestion();
  }

  function renderQuestion() {
    if (!quizContent || currentQuestion < 0 || currentQuestion >= questions.length) return;

    var q = questions[currentQuestion];
    var html = '<h3>第 ' + (currentQuestion + 1) + ' 题 / 共 ' + questions.length + ' 题</h3>';
    html += '<p style="margin-bottom:16px;color:var(--color-deep);">' + q.q + '</p>';
    html += '<div class="quiz-options">';

    q.options.forEach(function(option, index) {
      var selected = scores[currentQuestion] === q.scores[index] ? ' selected' : '';
      html += '<button class="quiz-option' + selected + '" data-score="' + q.scores[index] + '">' + option + '</button>';
    });

    html += '</div>';
    quizContent.innerHTML = html;

    quizContent.querySelectorAll('.quiz-option').forEach(function(option) {
      option.addEventListener('click', function() {
        quizContent.querySelectorAll('.quiz-option').forEach(function(item) {
          item.classList.remove('selected');
        });
        this.classList.add('selected');
      });
    });

    if (progressBar) {
      progressBar.style.width = (((currentQuestion + 1) / questions.length) * 100) + '%';
    }

    if (quizPrev) {
      quizPrev.style.display = currentQuestion > 0 ? 'inline-block' : 'none';
    }

    if (quizNext) {
      quizNext.textContent = currentQuestion === questions.length - 1 ? '查看结果' : '下一题';
    }
  }

  function showResult() {
    var totalScore = scores.reduce(function(sum, score) {
      return sum + (score || 0);
    }, 0);
    var resultType;
    var resultAdvice;

    if (totalScore <= 4) {
      resultType = '平和质';
      resultAdvice = '整体状态较平稳，继续保持规律作息、适度运动和清淡饮食即可。';
    } else if (totalScore <= 10) {
      resultType = '气虚 / 阳虚倾向';
      resultAdvice = '宜温补、少熬夜、重睡眠，可多关注脾胃与保暖。';
    } else if (totalScore <= 17) {
      resultType = '阴虚 / 湿热倾向';
      resultAdvice = '宜清润、少辛辣油炸、避免久熬，饮食可偏滋阴润燥。';
    } else {
      resultType = '气郁 / 血瘀倾向';
      resultAdvice = '宜多活动、多舒展、多与人交流，减少长期压抑和久坐。';
    }

    localStorage.setItem('tcm_constitution', resultType);

    if (quizContainer) quizContainer.style.display = 'none';
    if (quizResult) {
      quizResult.style.display = 'block';
      quizResult.innerHTML =
        '<h3>您的体质：' + resultType + '</h3>' +
        '<span class="result-type">测试得分：' + totalScore + ' / ' + (questions.length * 3) + '</span>' +
        '<div class="result-advice"><h4>个性化养生建议</h4><p>' + resultAdvice + '</p></div>' +
        '<button class="btn btn-primary" style="margin-top:20px;" onclick="location.reload();">&#8635; 重新测试</button>';
    }
  }

  function highlightCurrentTerm() {
    var today = new Date();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var termDates = [
      { name: '小寒', m: 1, d: 5 }, { name: '大寒', m: 1, d: 20 }, { name: '立春', m: 2, d: 3 }, { name: '雨水', m: 2, d: 18 },
      { name: '惊蛰', m: 3, d: 5 }, { name: '春分', m: 3, d: 20 }, { name: '清明', m: 4, d: 4 }, { name: '谷雨', m: 4, d: 20 },
      { name: '立夏', m: 5, d: 5 }, { name: '小满', m: 5, d: 21 }, { name: '芒种', m: 6, d: 5 }, { name: '夏至', m: 6, d: 21 },
      { name: '小暑', m: 7, d: 7 }, { name: '大暑', m: 7, d: 22 }, { name: '立秋', m: 8, d: 7 }, { name: '处暑', m: 8, d: 23 },
      { name: '白露', m: 9, d: 7 }, { name: '秋分', m: 9, d: 23 }, { name: '寒露', m: 10, d: 8 }, { name: '霜降', m: 10, d: 23 },
      { name: '立冬', m: 11, d: 7 }, { name: '小雪', m: 11, d: 22 }, { name: '大雪', m: 12, d: 7 }, { name: '冬至', m: 12, d: 21 }
    ];
    var currentTerm = '夏至';

    termDates.forEach(function(item) {
      if (month > item.m || (month === item.m && day >= item.d)) {
        currentTerm = item.name;
      }
    });

    window.setTimeout(function() {
      onTermClick(currentTerm);
    }, 180);
  }

  function bindSearchJump() {
    var params = new URLSearchParams(window.location.search);
    var searchTerm = params.get('search');
    var seasonAliasMap = { '春': 'spring', '春季': 'spring', '夏': 'summer', '夏季': 'summer', '秋': 'autumn', '秋季': 'autumn', '冬': 'winter', '冬季': 'winter' };

    if (!searchTerm) return;

    if (termList.indexOf(searchTerm) !== -1) {
      window.setTimeout(function() {
        onTermClick(searchTerm);
        var termContentEl = document.getElementById('term-content');
        if (termContentEl) termContentEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 240);
      return;
    }

    if (seasonAliasMap[searchTerm]) {
      var seasonKey = seasonAliasMap[searchTerm];
      seasonTabs.forEach(function(tab) {
        tab.classList.toggle('active', tab.getAttribute('data-season') === seasonKey);
      });
      renderSeasonContent(seasonKey);
      window.setTimeout(function() {
        if (seasonContent) seasonContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 240);
    }
  }

  buildCompassItems();
  renderSeasonContent('spring');
  highlightCurrentTerm();
  bindSearchJump();

  if (seasonTabs.length) {
    seasonTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        seasonTabs.forEach(function(item) { item.classList.remove('active'); });
        tab.classList.add('active');
        renderSeasonContent(tab.getAttribute('data-season'));
      });
    });
  }

  if (quizNext) {
    quizNext.addEventListener('click', function() {
      if (currentQuestion === -1) {
        startQuiz();
        return;
      }

      var selected = document.querySelector('.quiz-option.selected');
      if (!selected) return;
      scores[currentQuestion] = Number(selected.getAttribute('data-score'));

      if (currentQuestion < questions.length - 1) {
        currentQuestion += 1;
        renderQuestion();
      } else {
        showResult();
      }
    });
  }

  if (quizPrev) {
    quizPrev.addEventListener('click', function() {
      if (currentQuestion > 0) {
        currentQuestion -= 1;
        renderQuestion();
      }
    });
  }

  window.addEventListener('resize', function() {
    var activeItem;
    buildCompassItems();
    activeItem = document.querySelector('.term-item.active-term');
    if (activeItem && compass) {
      compass.style.setProperty('--marker-x', activeItem.getAttribute('data-x') + 'px');
      compass.style.setProperty('--marker-y', activeItem.getAttribute('data-y') + 'px');
    } else {
      highlightCurrentTerm();
    }
  });
})();
