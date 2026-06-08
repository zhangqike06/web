/* ============================================================
 * index.js - 首页交互脚本
 * 功能：日期信息、每日一签、今日推荐中药、三行名言跑马灯、五行互动盘
 * ============================================================ */

(function() {
  'use strict';

  var solarTerms = [
    { name: '小寒', month: 1, day: 5 },
    { name: '大寒', month: 1, day: 20 },
    { name: '立春', month: 2, day: 3 },
    { name: '雨水', month: 2, day: 18 },
    { name: '惊蛰', month: 3, day: 5 },
    { name: '春分', month: 3, day: 20 },
    { name: '清明', month: 4, day: 4 },
    { name: '谷雨', month: 4, day: 20 },
    { name: '立夏', month: 5, day: 5 },
    { name: '小满', month: 5, day: 21 },
    { name: '芒种', month: 6, day: 5 },
    { name: '夏至', month: 6, day: 21 },
    { name: '小暑', month: 7, day: 7 },
    { name: '大暑', month: 7, day: 22 },
    { name: '立秋', month: 8, day: 7 },
    { name: '处暑', month: 8, day: 23 },
    { name: '白露', month: 9, day: 7 },
    { name: '秋分', month: 9, day: 23 },
    { name: '寒露', month: 10, day: 8 },
    { name: '霜降', month: 10, day: 23 },
    { name: '立冬', month: 11, day: 7 },
    { name: '小雪', month: 11, day: 22 },
    { name: '大雪', month: 12, day: 7 },
    { name: '冬至', month: 12, day: 21 }
  ];

  var termTips = {
    '小寒': '寒气渐盛，注意保暖，宜温补脾胃。',
    '大寒': '岁寒最深，宜早睡晚起，护阳藏精。',
    '立春': '春阳初生，宜舒展身心，养肝护肝。',
    '雨水': '湿气渐增，饮食宜清淡，健脾祛湿。',
    '惊蛰': '万物萌动，适合早起活动，疏肝理气。',
    '春分': '阴阳平衡，起居有常，调和情志。',
    '清明': '气清景明，宜踏青舒怀，少食油腻。',
    '谷雨': '雨生百谷，重在健脾，少辛辣多清润。',
    '立夏': '夏气始盛，宜养心安神，保持平和。',
    '小满': '阳气渐丰，宜清热利湿，避免贪凉。',
    '芒种': '暑气渐起，作息规律，饮食宜清淡。',
    '夏至': '昼长阳盛，注意午休，静心养神。',
    '小暑': '天气渐热，多饮温水，清心防暑。',
    '大暑': '暑热最盛，宜避烈日，补水解暑。',
    '立秋': '秋气始收，润肺养阴，少辛增酸。',
    '处暑': '暑退凉生，宜润燥防秋乏。',
    '白露': '昼夜温差增大，及时添衣，养肺护津。',
    '秋分': '燥气渐显，宜润肺生津，饮食平和。',
    '寒露': '凉意更重，注意足部保暖，少食生冷。',
    '霜降': '天气转寒，宜温补脾胃，防秋燥。',
    '立冬': '万物收藏，适合早睡晚起，养肾藏精。',
    '小雪': '寒意初成，宜温阳御寒，饮食偏温。',
    '大雪': '寒气更盛，可适当进补，避免过劳。',
    '冬至': '阳气始复，宜养肾护阳，饮食温润。'
  };

  var fortunePool = [
    { text:'春养肝，夏养心，秋养肺，冬养肾，四时顺养最为要。', yi:'舒展筋骨 · 户外踏青', ji:'暴怒伤肝 · 熬夜耗神', tip:'顺应四时之气，保持作息规律，与自然同频共振。' },
    { text:'脾胃为后天之本，饮食有节，百病自轻。', yi:'三餐定时 · 温热饮食', ji:'暴饮暴食 · 生冷油腻', tip:'饭后百步走，揉腹36圈，脾胃自安和。' },
    { text:'正气存内，邪不可干，心平气和便是良药。', yi:'静坐冥想 · 读书听琴', ji:'急躁动怒 · 忧思过度', tip:'每日深呼吸5分钟，让气机顺畅周身。' },
    { text:'早睡早起精神足，起居有常胜过进补。', yi:'亥时入眠 · 卯时起床', ji:'熬夜伤阴 · 赖床伤阳', tip:'睡前热水泡脚15分钟，助阳气归元。' },
    { text:'药食同源，今日宜清淡少腻，多食温润之品。', yi:'小米粥 · 山药羹 · 银耳汤', ji:'油炸辛辣 · 生冷冰镇', tip:'食饮有节，每餐七分饱，让脾胃从容运化。' },
    { text:'心静则气和，气和则血顺，血顺则身安。', yi:'午后小憩 · 八段锦', ji:'情绪压抑 · 过度操劳', tip:'心烦时按揉内关穴与神门穴，可以宁心安神。' },
    { text:'久坐伤肉，久视伤血，今日记得起身舒展。', yi:'工间起身 · 远眺绿植', ji:'久坐不动 · 低头过久', tip:'每坐1小时站起活动5分钟，做几个扩胸伸展。' },
    { text:'上工治未病，小病早调，胜过大病后补。', yi:'自查舌苔 · 关注作息', ji:'忽视小恙 · 讳疾忌医', tip:'晨起看舌象，舌淡苔白多属虚寒，宜温养。' },
    { text:'怒伤肝，忧伤肺，凡事缓一缓，身心更安稳。', yi:'与人畅谈 · 赏花品茗', ji:'憋闷不语 · 压抑情绪', tip:'肝气不舒时按按太冲穴，一按一松，疏肝解郁。' },
    { text:'流水不腐，户枢不蠹，适度活动就是最好的养生。', yi:'散步太极 · 五禽戏', ji:'过劳透支 · 久卧久坐', tip:'每日步行六千步，微微出汗即可，贵在坚持。' },
    { text:'药补不如食补，食补不如睡补，顺应自然最养人。', yi:'子午觉 · 饮食应季', ji:'过度进补 · 颠倒作息', tip:'子时（23点前）入睡，午时小憩片刻，顺应阴阳。' },
    { text:'晨起一杯温水润脏腑，睡前热水泡脚暖全身。', yi:'晨饮温水 · 晚泡双脚', ji:'晨起冷饮 · 睡前久屏', tip:'水中可加少许生姜或艾叶，温经散寒效更佳。' },
    { text:'肝喜条达，常笑多乐胜过逍遥散。', yi:'听相声笑话 · 唱歌', ji:'满面愁容 · 郁郁寡欢', tip:'笑一笑，十年少，开怀大笑最能疏肝理气。' },
    { text:'三分治，七分养，疾病既愈之后更需久久为功。', yi:'循序渐进 · 持之以恒', ji:'急于求成 · 半途而废', tip:'调理身体如文火慢炖，急不得，慢火出真功。' },
    { text:'胃喜暖恶寒，饮食温热有节，脾胃安和百病不生。', yi:'姜枣茶 · 热汤面', ji:'冰镇饮品 · 空腹寒凉', tip:'常灸足三里与中脘，胜吃老母鸡，脾胃健则气血旺。' },
    { text:'天地之气，顺之则生，逆之则病，四季养生贵在顺势而行。', yi:'观节气 · 应四时 · 调饮食', ji:'逆时而动 · 违背自然', tip:'节气交替时尤需注意，前后三日饮食起居宜平稳过渡。' }
  ];

  var quotePool = [
    '上工治未病，不治已病。  《黄帝内经》',
    '人命至重，有贵千金。  孙思邈',
    '不为良相，便为良医。  范仲淹',
    '正气存内，邪不可干。  《黄帝内经》',
    '药食同源，寓医于食。  《千金要方》',
    '春夏养阳，秋冬养阴。  《黄帝内经》',
    '善言天者，必有验于人。  《黄帝内经》',
    '见肝之病，知肝传脾，当先实脾。  张仲景',
    '医者，意也。  《灵枢》',
    '凡大医治病，必当安神定志。  孙思邈',
    '治病必求于本。  《素问》',
    '知其要者，一言而终；不知其要，流散无穷。  《素问》',
    '有胃气则生，无胃气则死。  《景岳全书》',
    '凡欲诊病者，必问饮食居处。  《难经》',
    '大抵治病，先察其标本。  李时珍',
    '医之为道大矣，医之为任重矣。  张介宾',
    '用药如用兵，机变在临证。  徐灵胎',
    '阴平阳秘，精神乃治。  《黄帝内经》'
  ];

  var elementData = {
    mu: { name: '木', organ: '肝', emotion: '怒', tip: '春宜舒展身心，多做能让气机条达的缓和运动。', main: '#86b369', dark: '#557d42', soft: 'rgba(134, 179, 105, 0.26)' },
    huo: { name: '火', organ: '心', emotion: '喜', tip: '夏宜清心少躁，作息平稳，午间可稍作休息。', main: '#d68472', dark: '#a95845', soft: 'rgba(214, 132, 114, 0.24)' },
    tu: { name: '土', organ: '脾', emotion: '思', tip: '长夏重在健脾，饮食温和有节，少甜腻少生冷。', main: '#c9ab5f', dark: '#9d7d35', soft: 'rgba(201, 171, 95, 0.24)' },
    jin: { name: '金', organ: '肺', emotion: '忧', tip: '秋宜润肺养津，保持空气流通，注意情绪收敛。', main: '#b8b3a8', dark: '#827b71', soft: 'rgba(184, 179, 168, 0.28)' },
    shui: { name: '水', organ: '肾', emotion: '恐', tip: '冬宜藏精护阳，早睡晚起，少耗散，多温养。', main: '#6f8faf', dark: '#4d6986', soft: 'rgba(111, 143, 175, 0.25)' }
  };

  var featuredHerbs = [
    { name: '人参', property: '性味：甘、微苦、微温 | 归经：脾、肺、心', effect: '大补元气，补脾益肺，生津养血，安神益智。', desc: '人参素有“百草之王”之称，是传统名贵中药材。常用于气虚乏力、津伤口渴、脾肺不足等调养场景，兼具补益与扶正之意。', cssClass: 'type-ginseng', img: 'images/herbs/renshen.jpg' },
    { name: '枸杞', property: '性味：甘、平 | 归经：肝、肾', effect: '滋补肝肾，益精明目，润肺。', desc: '枸杞是常见的养生食材和中药材，适合日常温和调养。传统认为其有养肝明目、补肾益精之功，常用于茶饮、粥羹与药膳。', cssClass: 'type-berry', img: 'images/herbs/gouqi.jpg' },
    { name: '黄芪', property: '性味：甘、微温 | 归经：脾、肺', effect: '补气固表，利尿托毒，生肌。', desc: '黄芪是补气常用药，常见于体虚、自汗、乏力等调理思路中。其气味甘温，偏于补益正气，也是药膳里很常见的食养药材。', cssClass: 'type-root', img: 'images/herbs/huangqi.jpg' },
    { name: '菊花', property: '性味：辛、甘、苦、微寒 | 归经：肺、肝', effect: '疏风清热，平肝明目，清热解毒。', desc: '菊花既可入药也可作茶饮，适合秋季清润之需。传统上常用于风热头目不清、目涩眼疲等场景，气味清雅，适合日常养护。', cssClass: 'type-flower', img: 'images/herbs/juhua.jpg' },
    { name: '薄荷', property: '性味：辛、凉 | 归经：肺、肝', effect: '疏散风热，清利头目，利咽。', desc: '薄荷气味清凉醒神，适合夏季或疲乏时少量调饮。传统上多用于风热感受、咽喉不适及头目不清等场景。', cssClass: 'type-leaf' },
    { name: '金银花', property: '性味：甘、寒 | 归经：肺、心、胃', effect: '清热解毒，疏散风热。', desc: '金银花偏于清解热毒，气味芳香，常见于咽喉不适和风热感受相关调理，也是夏季凉茶的常用原料。', cssClass: 'type-flower', img: 'images/herbs/jinyinhua.jpg' }
  ];

  function formatLunarLikeDate(date) {
    var animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    var stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    var branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    var months = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
    var days = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var stemIndex = (year - 4) % 10;
    var branchIndex = (year - 4) % 12;

    return stems[stemIndex] + branches[branchIndex] + '年' + animals[branchIndex] + ' | ' + months[month] + '月' + days[Math.min(day - 1, 29)];
  }

  function getTodayTerm(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var currentTerm = solarTerms[0];
    var i;

    for (i = 0; i < solarTerms.length; i += 1) {
      if (month > solarTerms[i].month || (month === solarTerms[i].month && day >= solarTerms[i].day)) {
        currentTerm = solarTerms[i];
      }
    }

    return currentTerm;
  }

  function initDateInfo() {
    var today = new Date();
    var lunarDateEl = document.getElementById('lunar-date');
    var solarTermEl = document.getElementById('solar-term');
    var termTipEl = document.getElementById('term-tip');
    var currentTerm = getTodayTerm(today);

    if (lunarDateEl) lunarDateEl.textContent = formatLunarLikeDate(today);
    if (solarTermEl) solarTermEl.textContent = '节气：' + currentTerm.name;
    if (termTipEl) termTipEl.textContent = termTips[currentTerm.name] || '顺应节律，调和阴阳，保持身心平衡。';
  }

  function initFortune() {
    var fortuneBtn = document.getElementById('fortune-btn');
    var fortuneText = document.getElementById('fortune-text');
    var fortuneDisplay = document.getElementById('fortune-display');
    var lastFortuneIndex = -1;

    if (!fortuneBtn || !fortuneText) return;

    fortuneBtn.addEventListener('click', function() {
      var index;

      if (fortuneBtn.classList.contains('shaking')) return;
      fortuneBtn.classList.add('shaking');

      function onAnimEnd() {
        var fortune;
        fortuneBtn.classList.remove('shaking');

        do {
          index = Math.floor(Math.random() * fortunePool.length);
        } while (fortunePool.length > 1 && index === lastFortuneIndex);

        lastFortuneIndex = index;
        fortune = fortunePool[index];

        if (fortuneDisplay) fortuneDisplay.classList.remove('text-changed');
        fortuneText.innerHTML =
          '<span class="fortune-number">第' + (index + 1) + '签</span>' +
          '<span class="fortune-main">' + fortune.text + '</span>' +
          '<span class="fortune-row"><span class="fortune-yi">宜：' + fortune.yi + '</span></span>' +
          '<span class="fortune-row"><span class="fortune-ji">忌：' + fortune.ji + '</span></span>';

        var tipEl = document.getElementById('fortune-tip');
        if (tipEl) tipEl.textContent = '养生贴士：' + fortune.tip;

        window.requestAnimationFrame(function() {
          window.requestAnimationFrame(function() {
            if (fortuneDisplay) fortuneDisplay.classList.add('text-changed');
          });
        });
      }

      window.setTimeout(onAnimEnd, 560);
    });
  }

  function initFeaturedHerb() {
    var todayIndex = (new Date().getDate() - 1) % featuredHerbs.length;
    var todayHerb = featuredHerbs[todayIndex];
    var featuredName = document.getElementById('featured-name');
    var featuredProperty = document.getElementById('featured-property');
    var featuredEffect = document.getElementById('featured-effect');
    var featuredDesc = document.getElementById('featured-desc');
    var featuredImg = document.getElementById('featured-herb-img');
    var featuredLink = document.getElementById('featured-link');

    if (!featuredName) return;

    featuredName.textContent = todayHerb.name;
    if (featuredProperty) featuredProperty.textContent = todayHerb.property;
    if (featuredEffect) featuredEffect.textContent = todayHerb.effect;
    if (featuredDesc) featuredDesc.textContent = todayHerb.desc;

    if (featuredLink) {
      featuredLink.href = 'herbs.html?search=' + encodeURIComponent(todayHerb.name);
      featuredLink.setAttribute('aria-label', '了解更多：' + todayHerb.name);
    }

    if (featuredImg) {
      if (todayHerb.img) {
        featuredImg.innerHTML = '<img src="' + todayHerb.img + '" alt="' + todayHerb.name + '">';
        featuredImg.className = 'herb-illustration';
      } else {
        featuredImg.innerHTML = '';
        featuredImg.className = 'herb-illustration ' + todayHerb.cssClass;
      }
    }
  }

  function buildQuoteLine(list) {
    return list.map(function(item) {
      return '<span>' + item + '</span><span class="marquee-sep">&#9670;</span>';
    }).join('');
  }

  function initMarquees() {
    var row1 = document.getElementById('marquee-row-1');
    var row2 = document.getElementById('marquee-row-2');
    var row3 = document.getElementById('marquee-row-3');
    var rows = [
      quotePool.slice(0, 6),
      quotePool.slice(6, 12),
      quotePool.slice(12)
    ];

    if (!row1 || !row2 || !row3) return;

    [row1, row2, row3].forEach(function(rowEl, index) {
      rowEl.innerHTML = buildQuoteLine(rows[index]) + buildQuoteLine(rows[index]);
    });
  }

  function initFiveElementsOrb() {
    var actions = document.getElementById('element-actions');
    var orb = document.getElementById('element-orb');
    var nameEl = document.getElementById('element-name');
    var organEl = document.getElementById('element-organ');
    var emotionEl = document.getElementById('element-emotion');
    var tipEl = document.getElementById('element-tip');

    if (!actions || !orb) return;

    function setElement(key) {
      var data = elementData[key];
      if (!data) return;

      orb.setAttribute('data-element', key);
      orb.style.setProperty('--orb-main', data.main);
      orb.style.setProperty('--orb-soft', data.soft);
      orb.querySelector('.orb-core').style.background = 'linear-gradient(145deg, ' + data.main + ', ' + data.dark + ')';
      if (nameEl) nameEl.textContent = data.name;
      if (organEl) organEl.textContent = data.organ;
      if (emotionEl) emotionEl.textContent = data.emotion;
      if (tipEl) tipEl.textContent = data.tip;

      actions.querySelectorAll('.element-chip').forEach(function(button) {
        button.classList.toggle('active', button.getAttribute('data-element') === key);
      });
    }

    actions.addEventListener('click', function(event) {
      var chip = event.target.closest('.element-chip');
      if (!chip) return;
      setElement(chip.getAttribute('data-element'));
    });

    setElement('mu');
  }

  initDateInfo();
  initFortune();
  initFeaturedHerb();
  initMarquees();
  initFiveElementsOrb();
})();
