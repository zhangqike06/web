/* ============================================================
 * herbs.js - 本草百科页脚本
 * 功能：药材数据渲染、多维筛选、详情弹窗、搜索跳转定位
 * ============================================================ */

(function() {
  'use strict';

  var herbsData = [
    { id: 1, name: '人参', category: '补虚', property: '甘、微苦、微温', meridian: '脾、肺、心', effect: '大补元气，补脾益肺，生津养血，安神益智。', desc: '人参是传统名贵中药材，常用于气虚乏力、津伤口渴、脾肺不足等调养场景。', recipe: '常见于四君子汤、生脉散。', icon: '&#127807;', bgColor: 'linear-gradient(135deg, #f5e6d3, #d4a574)' },
    { id: 2, name: '枸杞', category: '补虚', property: '甘、平', meridian: '肝、肾', effect: '滋补肝肾，益精明目，润肺。', desc: '枸杞性质平和，适合日常食养，常用于明目与温和补益。', recipe: '常见于枸杞菊花茶、药膳汤羹。', icon: '&#127826;', bgColor: 'linear-gradient(135deg, #fce4e4, #e8a0a0)' },
    { id: 3, name: '当归', category: '补虚', property: '甘、辛、温', meridian: '肝、心、脾', effect: '补血活血，调经止痛，润肠通便。', desc: '当归是补血与调经常用药材，妇科调养中应用广泛。', recipe: '常见于四物汤、当归补血汤。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #f5deb3, #daa520)' },
    { id: 4, name: '黄芪', category: '补虚', property: '甘、微温', meridian: '脾、肺', effect: '补气固表，利尿托毒，生肌。', desc: '黄芪是补气常用药，适用于体虚、自汗、乏力等调理思路。', recipe: '常见于玉屏风散、补中益气汤。', icon: '&#127794;', bgColor: 'linear-gradient(135deg, #e8d5b7, #c4a265)' },
    { id: 5, name: '金银花', category: '清热', property: '甘、寒', meridian: '肺、心、胃', effect: '清热解毒，疏散风热。', desc: '金银花偏于清解热毒，常见于咽喉不适和风热感受相关调理。', recipe: '常见于银翘散、五味消毒饮。', icon: '&#127800;', bgColor: 'linear-gradient(135deg, #fffde7, #fff176)' },
    { id: 6, name: '板蓝根', category: '清热', property: '苦、寒', meridian: '心、胃', effect: '清热解毒，凉血利咽。', desc: '板蓝根常用于清热解毒、咽喉不利相关场景，是家用常见药材之一。', recipe: '常见于普济消毒饮、板蓝根颗粒。', icon: '&#127793;', bgColor: 'linear-gradient(135deg, #d4c5a9, #b8956a)' },
    { id: 7, name: '菊花', category: '清热', property: '辛、甘、微寒', meridian: '肺、肝', effect: '疏风清热，平肝明目。', desc: '菊花清雅平和，适合风热头目不清及日常明目茶饮。', recipe: '常见于桑菊饮、枸杞菊花茶。', icon: '&#127804;', bgColor: 'linear-gradient(135deg, #fff9c4, #ffcc02)' },
    { id: 8, name: '薄荷', category: '解表', property: '辛、凉', meridian: '肺、肝', effect: '疏散风热，清利头目，利咽。', desc: '薄荷气味清凉，适合风热初起、咽喉不适和提神茶饮。', recipe: '常见于银翘散、薄荷茶。', icon: '&#127807;', bgColor: 'linear-gradient(135deg, #c8e6c9, #66bb6a)' },
    { id: 9, name: '生姜', category: '解表', property: '辛、微温', meridian: '肺、脾、胃', effect: '解表散寒，温中止呕，温肺止咳。', desc: '生姜既是厨房常见食材，也是解表温中常用药材。', recipe: '常见于姜枣茶、小半夏汤。', icon: '&#129364;', bgColor: 'linear-gradient(135deg, #fff3e0, #ffb74d)' },
    { id: 10, name: '陈皮', category: '理气', property: '苦、辛、温', meridian: '脾、肺', effect: '理气健脾，燥湿化痰。', desc: '陈皮擅长理气和中，是脾胃气滞、痰湿停聚常见用药。', recipe: '常见于二陈汤、平胃散。', icon: '&#127818;', bgColor: 'linear-gradient(135deg, #ffe0b2, #ff9800)' },
    { id: 11, name: '茯苓', category: '利水', property: '甘、淡、平', meridian: '心、肺、脾、肾', effect: '利水渗湿，健脾宁心。', desc: '茯苓利水而不伤正，常用于湿困脾胃和心神不宁调理。', recipe: '常见于四君子汤、五苓散。', icon: '&#127812;', bgColor: 'linear-gradient(135deg, #efebe9, #bcaaa4)' },
    { id: 12, name: '川芎', category: '活血', property: '辛、温', meridian: '肝、胆、心包', effect: '活血行气，祛风止痛。', desc: '川芎善走而不守，常用于头痛、血瘀、经行不畅等调理思路。', recipe: '常见于四物汤、川芎茶调散。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #d7ccc8, #8d6e63)' },
    { id: 13, name: '三七', category: '活血', property: '甘、微苦、温', meridian: '肝、胃', effect: '散瘀止血，消肿定痛。', desc: '三七兼具止血与化瘀特点，在跌打损伤与瘀滞调理中很常见。', recipe: '常见于跌打损伤调理及三七粉食养。', icon: '&#129361;', bgColor: 'linear-gradient(135deg, #e8d5b7, #c9956b)' },
    { id: 14, name: '大黄', category: '清热', property: '苦、寒', meridian: '脾、胃、大肠、肝、心包', effect: '泻下攻积，清热泻火，凉血解毒。', desc: '大黄药性较强，偏于通腑泄热，多用于实热积滞相关辨证。', recipe: '常见于大承气汤、大黄牡丹汤。', icon: '&#127796;', bgColor: 'linear-gradient(135deg, #ffcc80, #e65100)' },
    { id: 15, name: '甘草', category: '补虚', property: '甘、平', meridian: '心、肺、脾、胃', effect: '补脾益气，清热解毒，调和诸药。', desc: '甘草用途极广，既能补益，又常用于缓急和调和药性。', recipe: '常见于四君子汤、炙甘草汤。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #fff9c4, #d4a017)' },
    { id: 16, name: '白术', category: '补虚', property: '苦、甘、温', meridian: '脾、胃', effect: '健脾益气，燥湿利水，止汗安胎。', desc: '白术偏于健脾燥湿，是脾虚夹湿体质中很常见的药材。', recipe: '常见于四君子汤、参苓白术散。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #efebe9, #a1887f)' },
    { id: 17, name: '柴胡', category: '解表', property: '苦、辛、微寒', meridian: '肝、胆、肺', effect: '疏散退热，疏肝解郁，升举阳气。', desc: '柴胡常用于少阳证、肝郁不舒以及升清举陷的辨证思路。', recipe: '常见于小柴胡汤、逍遥散。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #e8f5e9, #81c784)' },
    { id: 18, name: '麦冬', category: '补虚', property: '甘、微苦、微寒', meridian: '心、肺、胃', effect: '养阴生津，润肺清心。', desc: '麦冬适合阴虚津少、咽干口燥、肺胃失润等调养场景。', recipe: '常见于生脉散、麦门冬汤。', icon: '&#127807;', bgColor: 'linear-gradient(135deg, #e8f5e9, #a5d6a7)' },
    { id: 19, name: '五味子', category: '收涩', property: '酸、甘、温', meridian: '肺、心、肾', effect: '敛肺止咳，益气生津，补肾宁心。', desc: '五味子长于收敛固涩，在久咳、汗多、津伤等调理里较常见。', recipe: '常见于生脉散、五味子茶饮。', icon: '&#127826;', bgColor: 'linear-gradient(135deg, #fce4ec, #e91e63)' },
    { id: 20, name: '半夏', category: '化痰', property: '辛、温', meridian: '脾、胃、肺', effect: '燥湿化痰，降逆止呕，消痞散结。', desc: '半夏是化痰止呕常用药，临床多用其炮制品。', recipe: '常见于二陈汤、半夏厚朴汤。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #fff3e0, #ffb74d)' },
    { id: 21, name: '冬虫夏草', category: '补虚', property: '甘、温', meridian: '肺、肾', effect: '补肾益肺，止血化痰。', desc: '冬虫夏草兼顾肺肾两虚调补，偏于名贵滋养。', recipe: '常见于炖汤药膳。', icon: '&#128027;', bgColor: 'linear-gradient(135deg, #d7ccc8, #8d6e63)' },
    { id: 22, name: '阿胶', category: '补虚', property: '甘、平', meridian: '肺、肝、肾', effect: '补血止血，滋阴润燥。', desc: '阿胶偏于补血滋阴，常用于血虚与阴虚燥咳等调理。', recipe: '常见于阿胶糕、黄土汤。', icon: '&#129475;', bgColor: 'linear-gradient(135deg, #3e2723, #5d4037)' },
    { id: 23, name: '鹿茸', category: '补虚', property: '甘、咸、温', meridian: '肾、肝', effect: '壮肾阳，益精血，强筋骨。', desc: '鹿茸偏于温补肾阳，适用于阳虚、精血不足等调养思路。', recipe: '常见于温补类药膳和泡酒。', icon: '&#129420;', bgColor: 'linear-gradient(135deg, #efebe9, #bcaaa4)' },
    { id: 24, name: '沙棘', category: '活血', property: '酸、涩、温', meridian: '脾、胃、肺、心', effect: '健脾消食，止咳祛痰，活血散瘀。', desc: '沙棘兼具食养属性，常见于健脾、润肺及活血方向的调养。', recipe: '常见于沙棘汁、沙棘油相关制品。', icon: '&#127826;', bgColor: 'linear-gradient(135deg, #ff9800, #ff5722)' }
  ];

  var currentCategoryFilter = 'all';
  var currentPropertyFilter = 'all';
  var herbsGrid = document.getElementById('herbs-grid');
  var herbCabinet = document.getElementById('herb-cabinet');
  var noResults = document.getElementById('no-results');
  var modalOverlay = document.getElementById('herb-modal');
  var modalBody = document.getElementById('modal-body');
  var modalClose = document.getElementById('modal-close');

  function getFilteredHerbs() {
    return herbsData.filter(function(herb) {
      var categoryMatch = currentCategoryFilter === 'all' || herb.category === currentCategoryFilter;
      var propertyMatch = currentPropertyFilter === 'all' || herb.property.indexOf(currentPropertyFilter) !== -1;
      return categoryMatch && propertyMatch;
    });
  }

  function renderHerbs() {
    var filtered = getFilteredHerbs();
    var html = '';

    if (!herbsGrid) return;

    if (filtered.length === 0) {
      herbsGrid.innerHTML = '';
      if (noResults) noResults.style.display = 'block';
      return;
    }

    if (noResults) noResults.style.display = 'none';

    filtered.forEach(function(herb) {
      var props = herb.property.replace(/、/g, ',').split(',');
      html += '<div class="herb-card" data-id="' + herb.id + '" data-name="' + herb.name + '" data-category="' + herb.category + '">';
      html += '  <div class="herb-img" style="background:' + herb.bgColor + ';">' + herb.icon + '</div>';
      html += '  <h3>' + herb.name + '</h3>';
      html += '  <div class="herb-property">' + herb.property + ' | ' + herb.meridian + '</div>';
      html += '  <div class="herb-tags">';
      props.forEach(function(prop) {
        var trimmed = prop.trim();
        if (trimmed) {
          html += '<span class="tag">' + trimmed + '</span>';
        }
      });
      html += '  </div>';
      html += '  <div class="herb-effect">' + herb.effect + '</div>';
      html += '  <span class="herb-detail-link">查看详情 &#10132;</span>';
      html += '</div>';
    });

    herbsGrid.innerHTML = html;

    herbsGrid.querySelectorAll('.herb-card').forEach(function(card) {
      card.addEventListener('click', function() {
        openHerbModal(Number(card.getAttribute('data-id')));
      });
    });
  }

  function renderHerbCabinet() {
    var cabinetList;
    var html = '';

    if (!herbCabinet) return;

    cabinetList = herbsData.slice(0, 12);

    cabinetList.forEach(function(herb) {
      html += '<article class="cabinet-drawer" data-id="' + herb.id + '">';
      html += '  <button class="drawer-face" type="button" aria-expanded="false">';
      html += '    <span class="cabinet-name">' + herb.name + '</span>';
      html += '    <span class="cabinet-handle" aria-hidden="true"></span>';
      html += '  </button>';
      html += '  <div class="drawer-inner" role="button" tabindex="0" data-open-detail="' + herb.id + '">';
      html += '    <div class="drawer-herb-visual" style="background:' + herb.bgColor + ';">' + herb.icon + '</div>';
      html += '    <p>' + herb.effect + '</p>';
      html += '  </div>';
      html += '</article>';
    });

    herbCabinet.innerHTML = html;

    herbCabinet.querySelectorAll('.cabinet-drawer').forEach(function(drawer) {
      var face = drawer.querySelector('.drawer-face');
      var inner = drawer.querySelector('.drawer-inner');

      if (face) {
        face.addEventListener('click', function() {
          var isOpen = drawer.classList.contains('is-open');

          herbCabinet.querySelectorAll('.cabinet-drawer').forEach(function(item) {
            item.classList.remove('is-open');
            var btn = item.querySelector('.drawer-face');
            if (btn) btn.setAttribute('aria-expanded', 'false');
          });

          if (!isOpen) {
            drawer.classList.add('is-open');
            face.setAttribute('aria-expanded', 'true');
          }
        });
      }

      if (inner) {
        inner.addEventListener('click', function() {
          var herbId = Number(inner.getAttribute('data-open-detail'));
          openHerbModal(herbId);
        });

        inner.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            var herbId = Number(inner.getAttribute('data-open-detail'));
            openHerbModal(herbId);
          }
        });
      }
    });
  }

  function bindFilterEvents(filterContainerId, filterType) {
    var container = document.getElementById(filterContainerId);
    if (!container) return;

    var buttons = container.querySelectorAll('.filter-btn');
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        buttons.forEach(function(item) {
          item.classList.remove('active');
        });
        btn.classList.add('active');

        if (filterType === 'category') {
          currentCategoryFilter = btn.getAttribute('data-filter');
        } else {
          currentPropertyFilter = btn.getAttribute('data-filter');
        }

        renderHerbs();
      });
    });
  }

  function openHerbModal(herbId) {
    var herb = herbsData.find(function(item) {
      return item.id === herbId;
    });

    if (!herb || !modalOverlay || !modalBody) return;

    modalBody.innerHTML =
      '<div class="modal-herb-img" style="background:' + herb.bgColor + ';">' + herb.icon + '</div>' +
      '<div class="modal-herb-info">' +
      '  <h2>' + herb.name + '</h2>' +
      '  <span class="tag" style="background:var(--color-rose);color:#fff;">' + herb.category + '</span>' +
      '  <div class="info-row" style="margin-top:12px;"><span class="info-label">性味：</span><span class="info-value">' + herb.property + '</span></div>' +
      '  <div class="info-row"><span class="info-label">归经：</span><span class="info-value">' + herb.meridian + '</span></div>' +
      '  <div class="info-row"><span class="info-label">功效：</span><span class="info-value" style="color:var(--color-rose);font-weight:bold;">' + herb.effect + '</span></div>' +
      '  <div class="herb-description">' + herb.desc + '</div>' +
      '  <div class="herb-recipe">&#128218; ' + herb.recipe + '</div>' +
      '</div>';

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeHerbModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function highlightSearchMatch(searchTerm) {
    var matchedHerb = herbsData.find(function(herb) {
      return herb.name.indexOf(searchTerm) !== -1 || searchTerm.indexOf(herb.name) !== -1;
    });

    if (!matchedHerb) return;

    setTimeout(function() {
      var cards = herbsGrid ? herbsGrid.querySelectorAll('.herb-card') : [];
      var i;

      for (i = 0; i < cards.length; i += 1) {
        if (cards[i].getAttribute('data-name') === matchedHerb.name) {
          cards[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }
      }

      openHerbModal(matchedHerb.id);
    }, 300);
  }

  function checkSearchParam() {
    var params = new URLSearchParams(window.location.search);
    var searchTerm = params.get('search');

    if (!searchTerm) return;
    highlightSearchMatch(searchTerm);
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeHerbModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        closeHerbModal();
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeHerbModal();
    }
  });

  window.openHerbModal = openHerbModal;

  bindFilterEvents('category-filters', 'category');
  bindFilterEvents('property-filters', 'property');
  renderHerbCabinet();
  renderHerbs();
  checkSearchParam();
})();
