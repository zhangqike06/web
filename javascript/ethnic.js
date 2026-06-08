/* ============================================================
 * ethnic.js - 民族医药页交互逻辑
 * ============================================================ */
(function() {
  'use strict';

  var navList = document.getElementById('ethnic-nav');
  if (!navList) return;

  var buttons = navList.querySelectorAll('.ethnic-nav-btn');
  var panels = document.querySelectorAll('.ethnic-panel');

  /* ---- 侧栏切换 ---- */
  function switchPanel(ethnicId) {
    // 更新按钮状态
    buttons.forEach(function(btn) {
      var isActive = btn.getAttribute('data-ethnic') === ethnicId;
      if (isActive) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 更新面板显示
    var targetPanel = document.getElementById('panel-' + ethnicId);
    panels.forEach(function(panel) {
      if (panel === targetPanel) {
        panel.classList.add('active');
        // 滚动到面板顶部
        setTimeout(function() {
          panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        panel.classList.remove('active');
      }
    });

    // 更新 URL hash
    if (history.pushState) {
      history.pushState(null, null, '#ethnic=' + ethnicId);
    }
  }

  // 绑定点击事件
  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var ethnicId = btn.getAttribute('data-ethnic');
      if (ethnicId) {
        switchPanel(ethnicId);
      }
    });
  });

  /* ---- 从 URL hash 恢复状态 ---- */
  function restoreFromHash() {
    var hash = window.location.hash;
    var match = hash.match(/ethnic=(\w+)/);
    if (match && match[1]) {
      var targetBtn = navList.querySelector('[data-ethnic="' + match[1] + '"]');
      if (targetBtn) {
        switchPanel(match[1]);
      }
    }
  }

  restoreFromHash();

  /* ---- 响应浏览器前进/后退 ---- */
  window.addEventListener('hashchange', restoreFromHash);

  /* ---- 搜索联动：从搜索框跳转到对应民族 ---- */
  var searchInput = document.getElementById('search-input');
  var searchBtn = document.getElementById('search-btn');
  if (searchInput && searchBtn) {
    function trySearch() {
      var kw = searchInput.value.trim();
      if (!kw) return;

      var map = {
        '藏医': 'zang', '藏医学': 'zang', '藏药': 'zang',
        '壮医': 'zhuang', '壮医学': 'zhuang', '壮药': 'zhuang',
        '苗医': 'miao', '苗医学': 'miao', '苗药': 'miao',
        '彝医': 'yi', '彝医学': 'yi', '彝药': 'yi',
        '傣医': 'dai', '傣医学': 'dai', '傣药': 'dai',
        '哈萨克': 'hasake', '哈萨克族': 'hasake', '哈医': 'hasake',
        '土家': 'tujia', '土家医': 'tujia', '土家族': 'tujia',
        '畲医': 'she', '畲族': 'she', '畲药': 'she',
        '民族医药': 'zang'
      };

      var target = map[kw];
      if (target) {
        switchPanel(target);
        // 更新侧栏可见性
        var targetBtn = navList.querySelector('[data-ethnic="' + target + '"]');
        if (targetBtn && window.innerWidth <= 860) {
          targetBtn.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
      }
    }

    searchBtn.addEventListener('click', trySearch);
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        trySearch();
      }
    });
  }

})();
