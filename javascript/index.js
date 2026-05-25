/* ============================================================
 * index.js - 首页交互脚本
 * 功能：日期信息、每日一签、今日推荐中药、名言跑马灯
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
    '春养肝，夏养心，秋养肺，冬养肾，四时顺养最为要。',
    '脾胃为后天之本，饮食有节，百病自轻。',
    '正气存内，邪不可干，心平气和即是良药。',
    '早睡早起精神足，起居有常胜过进补。',
    '药食同源，今日宜清淡少腻，多食温润之品。',
    '心静则气和，气和则血顺，血顺则身安。',
    '久坐伤肉，久视伤血，今日记得起身舒展。',
    '上工治未病，小病早调，胜过大病后补。',
    '怒伤肝，忧伤肺，凡事缓一缓，身心更安稳。',
    '流水不腐，户枢不蠹，适度活动就是最好的养生。'
  ];

  var featuredHerbs = [
    {
      name: '人参',
      property: '性味：甘、微苦、微温 | 归经：脾、肺、心',
      effect: '大补元气，补脾益肺，生津养血，安神益智。',
      desc: '人参素有”百草之王”之称，是传统名贵中药材。常用于气虚乏力、津伤口渴、脾肺不足等调养场景，兼具补益与扶正之意。',
      cssClass: 'type-ginseng',
      img: 'images/herbs/renshen.jpg'
    },
    {
      name: '枸杞',
      property: '性味：甘、平 | 归经：肝、肾',
      effect: '滋补肝肾，益精明目，润肺。',
      desc: '枸杞是常见的养生食材和中药材，适合日常温和调养。传统认为其有养肝明目、补肾益精之功，常用于茶饮、粥羹与药膳。',
      cssClass: 'type-berry',
      img: 'images/herbs/gouqi.jpg'
    },
    {
      name: '黄芪',
      property: '性味：甘、微温 | 归经：脾、肺',
      effect: '补气固表，利尿托毒，生肌。',
      desc: '黄芪是补气常用药，常见于体虚、自汗、乏力等调理思路中。其气味甘温，偏于补益正气，也是药膳里很常见的食养药材。',
      cssClass: 'type-root',
      img: 'images/herbs/huangqi.jpg'
    },
    {
      name: '菊花',
      property: '性味：辛、甘、苦、微寒 | 归经：肺、肝',
      effect: '疏风清热，平肝明目，清热解毒。',
      desc: '菊花既可入药也可作茶饮，适合秋季清润之需。传统上常用于风热头目不清、目涩眼疲等场景，气味清雅，适合日常养护。',
      cssClass: 'type-flower',
      img: 'images/herbs/juhua.jpg'
    },
    {
      name: '薄荷',
      property: '性味：辛、凉 | 归经：肺、肝',
      effect: '疏散风热，清利头目，利咽。',
      desc: '薄荷气味清凉醒神，适合夏季或疲乏时少量调饮。传统上多用于风热感受、咽喉不适及头目不清等场景。',
      cssClass: 'type-leaf'
    }
  ];

  function formatLunarLikeDate(date) {
    var animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    var stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    var branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    var months = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
    var days = [
      '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
      '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
      '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
    ];

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

    if (lunarDateEl) {
      lunarDateEl.textContent = formatLunarLikeDate(today);
    }

    if (solarTermEl) {
      solarTermEl.textContent = '节气：' + currentTerm.name;
    }

    if (termTipEl) {
      termTipEl.textContent = termTips[currentTerm.name] || '顺应节律，调和阴阳，保持身心平衡。';
    }
  }

  function initFortune() {
    var fortuneBtn = document.getElementById('fortune-btn');
    var fortuneText = document.getElementById('fortune-text');
    var fortuneDisplay = document.getElementById('fortune-display');
    var lastFortuneIndex = -1;

    if (!fortuneBtn || !fortuneText) {
      return;
    }

    fortuneBtn.addEventListener('click', function() {
      var index;

      if (fortuneBtn.classList.contains('shaking')) {
        return;
      }

      fortuneBtn.classList.add('shaking');

      window.setTimeout(function() {
        fortuneBtn.classList.remove('shaking');

        do {
          index = Math.floor(Math.random() * fortunePool.length);
        } while (fortunePool.length > 1 && index === lastFortuneIndex);

        lastFortuneIndex = index;

        if (fortuneDisplay) {
          fortuneDisplay.classList.remove('text-changed');
        }

        fortuneText.textContent = fortunePool[index];

        window.requestAnimationFrame(function() {
          window.requestAnimationFrame(function() {
            if (fortuneDisplay) {
              fortuneDisplay.classList.add('text-changed');
            }
          });
        });
      }, 550);
    });
  }

  function initFeaturedHerb() {
    var todayIndex = new Date().getDate() % featuredHerbs.length;
    var todayHerb = featuredHerbs[todayIndex];
    var featuredName = document.getElementById('featured-name');
    var featuredProperty = document.getElementById('featured-property');
    var featuredEffect = document.getElementById('featured-effect');
    var featuredDesc = document.getElementById('featured-desc');
    var featuredImg = document.getElementById('featured-herb-img');

    if (!featuredName) {
      return;
    }

    featuredName.textContent = todayHerb.name;

    if (featuredProperty) {
      featuredProperty.textContent = todayHerb.property;
    }

    if (featuredEffect) {
      featuredEffect.textContent = todayHerb.effect;
    }

    if (featuredDesc) {
      featuredDesc.textContent = todayHerb.desc;
    }

    if (featuredImg) {
      if (todayHerb.img) {
        featuredImg.innerHTML = '<img src="' + todayHerb.img + '" alt="' + todayHerb.name + '" style="width:100%;height:100%;object-fit:cover;">';
        featuredImg.className = 'herb-illustration';
      } else {
        featuredImg.innerHTML = '';
        featuredImg.className = 'herb-illustration ' + todayHerb.cssClass;
      }
    }
  }

  function initMarquee() {
    var marqueeContent = document.getElementById('marquee-content');

    if (!marqueeContent || marqueeContent.dataset.cloned === 'true') {
      return;
    }

    marqueeContent.dataset.cloned = 'true';
    marqueeContent.parentNode.appendChild(marqueeContent.cloneNode(true));
  }

  initDateInfo();
  initFortune();
  initFeaturedHerb();
  initMarquee();
})();
