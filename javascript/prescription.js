/* ============================================================
 * prescription.js - 经典名方页脚本
 * 功能：百草化方飞入动画、蒸汽效果、成品揭晓、竹简导航
 * ============================================================ */

(function() {
  'use strict';

  /* ============================================================
   * 预设配方库（含经典方剂和养生饮品）
   * ============================================================ */
  var recipes = [
    {
      id: "sijunzi",
      name: "四君子汤",
      type: "经典方剂",
      herbs: [
        { name: "人参", icon: "&#127807;", role: "君药", property: "甘、微温", effect: "大补元气，健脾益肺，为方中主药" },
        { name: "白术", icon: "&#127795;", role: "臣药", property: "苦、甘、温", effect: "健脾益气，燥湿利水，助人参补气" },
        { name: "茯苓", icon: "&#127812;", role: "佐药", property: "甘、淡、平", effect: "利水渗湿，健脾宁心，兼顾水湿" },
        { name: "甘草", icon: "&#127795;", role: "使药", property: "甘、平", effect: "补脾益气，调和诸药" }
      ],
      effect: "益气健脾。主治脾胃气虚证：面色萎白，语声低微，气短乏力，食少便溏，舌淡苔白，脉虚弱。",
      modern: "现代养生应用：可用于术后体虚、肠胃功能弱、长期疲劳人群的调理。是补气健脾的基础方，后世许多补气方剂均由此方化裁而来。"
    },
    {
      id: "suanmeitang",
      name: "酸梅汤",
      type: "养生饮品",
      herbs: [
        { name: "乌梅", icon: "&#127826;", role: "主料", property: "酸、涩、平", effect: "敛肺止咳，涩肠止泻，生津止渴" },
        { name: "山楂", icon: "&#127826;", role: "配料", property: "酸、甘、微温", effect: "消食化积，行气散瘀" },
        { name: "陈皮", icon: "&#127818;", role: "配料", property: "苦、辛、温", effect: "理气健脾，燥湿化痰，增香气" },
        { name: "甘草", icon: "&#127795;", role: "调味", property: "甘、平", effect: "补脾益气，调和口味" }
      ],
      effect: "生津止渴，消暑解热，健脾开胃，消食化积。夏日降暑佳品，酸甜可口。",
      modern: "含有大量有机酸，有助于消除乳酸，缓解疲劳，促进消化液分泌。适合夏季日常饮用，可冰镇后饮用风味更佳。"
    },
    {
      id: "gouqi-cha",
      name: "枸杞菊花茶",
      type: "养生茶饮",
      herbs: [
        { name: "枸杞", icon: "&#127826;", role: "主料", property: "甘、平", effect: "滋补肝肾，益精明目" },
        { name: "菊花", icon: "&#127804;", role: "主料", property: "辛、甘、微寒", effect: "散风清热，平肝明目" },
        { name: "红枣", icon: "&#127826;", role: "配料", property: "甘、温", effect: "补中益气，养血安神，调和口感" }
      ],
      effect: "清肝明目，滋肾润肺。适合长期使用电子设备、用眼过度的人群，为日常护眼茶饮之首选。",
      modern: "枸杞含丰富β-胡萝卜素和枸杞多糖，菊花含黄酮类物质，搭配饮用可缓解视疲劳、保护视力，是白领和学生族的养生良方。"
    },
    {
      id: "liuwei",
      name: "六味地黄丸",
      type: "经典方剂",
      herbs: [
        { name: "熟地黄", icon: "&#127795;", role: "君药", property: "甘、微温", effect: "滋阴补肾，填精益髓" },
        { name: "山茱萸", icon: "&#127826;", role: "臣药", property: "酸、涩、微温", effect: "补益肝肾，涩精固脱" },
        { name: "山药",   icon: "&#127795;", role: "臣药", property: "甘、平", effect: "补脾益肾，固精" },
        { name: "泽泻",   icon: "&#127795;", role: "佐药", property: "甘、寒", effect: "利湿泄浊，防熟地之滋腻" },
        { name: "牡丹皮", icon: "&#127800;", role: "佐药", property: "苦、辛、微寒", effect: "清热凉血，活血化瘀" },
        { name: "茯苓",   icon: "&#127812;", role: "使药", property: "甘、淡、平", effect: "利水渗湿，健脾宁心" }
      ],
      effect: "滋阴补肾。主治肾阴亏损：头晕耳鸣，腰膝酸软，骨蒸潮热，盗汗遗精，消渴。",
      modern: "适合肾阴虚体质人群，配合现代生活节奏下的睡眠管理与抗疲劳调理。是中医'三补三泻'配伍法的经典代表。"
    }
  ];

  /* 当前配方索引 */
  var currentRecipeIndex = 0;
  var usedHerbNames = [];

  /* ============================================================
   * DOM引用
   * ============================================================ */
  var herbsPool      = document.getElementById('herbs-pool');
  var cauldron       = document.getElementById('cauldron');
  var steam          = document.getElementById('steam');
  var resultArea     = document.getElementById('result-area');
  var cauldronHint   = document.getElementById('cauldron-hint');
  var formulaTableBody = document.getElementById('formula-table-body');

  /* ============================================================
   * 加载配方：渲染药材卡片 & 配伍表
   * ============================================================ */
  function loadRecipe(index) {
    currentRecipeIndex = index;
    var recipe = recipes[index];
    usedHerbNames = [];

    /* 重置状态 */
    resultArea.style.display = 'none';
    if (steam) steam.classList.remove('active');
    if (cauldronHint) cauldronHint.textContent = '点击草药投入药壶';

    /* 渲染药材卡片 */
    var html = '';
    recipe.herbs.forEach(function(herb) {
      html += '<div class="herb-ingredient" data-name="' + herb.name + '" onclick="flyToCauldron(this)">';
      html += '  <span class="herb-icon">' + herb.icon + '</span>';
      html += '  <div class="herb-name">' + herb.name + '</div>';
      html += '  <span class="herb-role">' + herb.role + '</span>';
      html += '</div>';
    });
    herbsPool.innerHTML = html;

    /* 渲染配伍表 */
    renderFormulaTable(recipe);

    /* 更新竹简导航active状态 */
    var bambooItems = document.querySelectorAll('.bamboo-item');
    bambooItems.forEach(function(item, i) {
      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  /**
   * renderFormulaTable - 渲染当前方剂的配伍分析表
   */
  function renderFormulaTable(recipe) {
    if (!formulaTableBody) return;
    var html = '';
    recipe.herbs.forEach(function(herb) {
      html += '<tr>';
      html += '<td><strong>' + herb.name + '</strong></td>';
      html += '<td><span class="tag" style="background:var(--color-rose);color:#fff;">' + herb.role + '</span></td>';
      html += '<td>' + herb.property + '</td>';
      html += '<td>' + herb.effect + '</td>';
      html += '</tr>';
    });
    formulaTableBody.innerHTML = html;
  }

  /* ============================================================
   * 抛物线飞入动画
   * ============================================================ */

  /**
   * flyToCauldron - 点击药材卡片，触发飞入药壶动画
   * @param {Element} herbCard - 被点击的药材卡片DOM元素
   */
  window.flyToCauldron = function(herbCard) {
    var herbName = herbCard.getAttribute('data-name');
    if (usedHerbNames.indexOf(herbName) !== -1) return; /* 已投入 */

    /* 获取药材卡片和药壶的绝对坐标 */
    var herbRect = herbCard.getBoundingClientRect();
    var cauldronRect = cauldron.getBoundingClientRect();

    /* 计算位移量 */
    var deltaX = cauldronRect.left - herbRect.left + (cauldronRect.width - herbRect.width) / 2;
    var deltaY = cauldronRect.top  - herbRect.top  + (cauldronRect.height - herbRect.height) / 2;

    /* 创建飞行克隆元素 */
    var clone = document.createElement('div');
    clone.className = 'fly-clone';
    clone.innerHTML = herbCard.querySelector('.herb-icon').innerHTML;
    clone.style.cssText =
      'position:fixed; left:' + herbRect.left + 'px; top:' + herbRect.top + 'px;' +
      'width:' + herbRect.width + 'px; text-align:center; font-size:2em;' +
      'z-index:9999; pointer-events:none;' +
      'transition: all 0.9s cubic-bezier(0.25,0.46,0.45,0.94);';
    document.body.appendChild(clone);

    /* 下一帧触发动画 */
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        clone.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px) scale(0.3) rotate(360deg)';
        clone.style.opacity = '0.3';
      });
    });

    /* 动画结束后移除克隆 */
    clone.addEventListener('transitionend', function() {
      clone.remove();
      /* 标记药材为已使用 */
      herbCard.classList.add('used');
      usedHerbNames.push(herbName);
      /* 检查是否全部投入 */
      checkAllHerbsAdded();
    });
  };

  /**
   * checkAllHerbsAdded - 检查所有药材是否已投入，是则激活蒸汽和揭晓
   */
  function checkAllHerbsAdded() {
    var recipe = recipes[currentRecipeIndex];
    if (usedHerbNames.length >= recipe.herbs.length) {
      if (cauldronHint) cauldronHint.textContent = '所有药材已入壶，正在煎煮...';
      activateSteam();
      setTimeout(revealResult, 2000);
    }
  }

  /**
   * activateSteam - 显示蒸汽动画
   */
  function activateSteam() {
    if (steam) steam.classList.add('active');
  }

  /**
   * revealResult - 揭晓成品结果
   */
  function revealResult() {
    var recipe = recipes[currentRecipeIndex];

    document.getElementById('result-name').textContent = recipe.name;
    document.getElementById('result-type').textContent = recipe.type;
    document.getElementById('result-effect').textContent = recipe.effect;
    document.getElementById('result-modern').textContent = recipe.modern;

    resultArea.style.display = 'block';

    /* 滚动到结果区 */
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /**
   * resetAlchemy - 重置配药过程
   */
  window.resetAlchemy = function() {
    usedHerbNames = [];
    resultArea.style.display = 'none';
    if (steam) steam.classList.remove('active');
    if (cauldronHint) cauldronHint.textContent = '点击草药投入药壶';

    /* 重置所有药材卡片 */
    var cards = herbsPool.querySelectorAll('.herb-ingredient');
    cards.forEach(function(card) {
      card.classList.remove('used');
    });
  };

  /* ============================================================
   * 竹简导航事件
   * ============================================================ */
  var bambooNav = document.getElementById('bamboo-nav');
  if (bambooNav) {
    bambooNav.addEventListener('click', function(e) {
      var item = e.target.closest('.bamboo-item');
      if (!item) return;

      var index = parseInt(item.getAttribute('data-recipe'));
      if (index === currentRecipeIndex) return;

      loadRecipe(index);
      resetAlchemy();
    });
  }

  /* ============================================================
   * 初始化加载第一个配方
   * ============================================================ */
  loadRecipe(0);

})();
