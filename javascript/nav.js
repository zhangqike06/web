/* ============================================================
 * nav.js - 《本草寻源》全站公共脚本
 * 功能：导航下拉菜单、滚动变色、全站搜索、背景音乐播放器
 * 技术栈：原生JavaScript ES6+
 * ============================================================ */

/* ============================================================
 * 导航栏滚动变色效果
 * ============================================================ */
(function() {
  'use strict';

  var navHeader = document.getElementById('nav-header');

  if (navHeader) {
    /* 玻璃效果由 common.css 控制，JS只负责滚动时添加/移除 scrolled 类 */

    /* 监听页面滚动，改变导航栏样式 */
    window.addEventListener('scroll', function() {
      if (window.scrollY > 80) {
        navHeader.classList.add('scrolled');
      } else {
        navHeader.classList.remove('scrolled');
      }
    });
  }

  /* 跨页面导航当前项高亮 */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav-menu a[href]');

  navLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (!href || href === '#') return;

    if (href === currentPath) {
      link.classList.add('active');

      var parentSubmenu = link.closest('.submenu');
      if (parentSubmenu) {
        var parentItem = parentSubmenu.parentElement;
        var parentLink = parentItem ? parentItem.querySelector(':scope > a') : null;
        if (parentLink) {
          parentLink.classList.add('active');
        }
      }
    }
  });

  /* ============================================================
   * JS二级下拉菜单（移动端触摸适配）
   * ============================================================ */
  var hasSubItems = document.querySelectorAll('.has-sub');

  hasSubItems.forEach(function(item) {
    var link = item.querySelector('a');

    /* 点击展开/收起子菜单（移动端） */
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        item.classList.toggle('active');
      }
    });
  });

  /* ============================================================
   * 全站搜索功能
   * ============================================================ */

  /* 搜索索引库：覆盖草药、穴位、名方、节气、人物等关键词 */
  var searchIndex = [
    /* 草药 */
    {keyword:"人参",   url:"herbs.html",   desc:"补气圣药，大补元气，百草之王"},
    {keyword:"枸杞",   url:"herbs.html",   desc:"滋补肝肾，益精明目"},
    {keyword:"当归",   url:"herbs.html",   desc:"补血活血，调经止痛"},
    {keyword:"黄芪",   url:"herbs.html",   desc:"补气固表，利尿托毒"},
    {keyword:"金银花", url:"herbs.html",   desc:"清热解毒，疏散风热"},
    {keyword:"板蓝根", url:"herbs.html",   desc:"清热解毒，凉血利咽"},
    {keyword:"菊花",   url:"herbs.html",   desc:"散风清热，平肝明目"},
    {keyword:"薄荷",   url:"herbs.html",   desc:"疏散风热，清利头目"},
    {keyword:"生姜",   url:"herbs.html",   desc:"解表散寒，温中止呕"},
    {keyword:"陈皮",   url:"herbs.html",   desc:"理气健脾，燥湿化痰"},
    {keyword:"茯苓",   url:"herbs.html",   desc:"利水渗湿，健脾宁心"},
    {keyword:"川芎",   url:"herbs.html",   desc:"活血行气，祛风止痛"},
    {keyword:"三七",   url:"herbs.html",   desc:"散瘀止血，消肿定痛"},
    {keyword:"大黄",   url:"herbs.html",   desc:"泻下攻积，清热泻火"},
    {keyword:"甘草",   url:"herbs.html",   desc:"补脾益气，清热解毒，调和诸药"},
    {keyword:"白术",   url:"herbs.html",   desc:"健脾益气，燥湿利水"},
    {keyword:"柴胡",   url:"herbs.html",   desc:"疏散退热，疏肝解郁"},
    {keyword:"麦冬",   url:"herbs.html",   desc:"养阴生津，润肺清心"},
    {keyword:"五味子", url:"herbs.html",   desc:"收敛固涩，益气生津"},
    {keyword:"半夏",   url:"herbs.html",   desc:"燥湿化痰，降逆止呕"},
    {keyword:"冬虫夏草",url:"herbs.html",  desc:"补肾益肺，止血化痰"},
    {keyword:"阿胶",   url:"herbs.html",   desc:"补血止血，滋阴润燥"},
    {keyword:"鹿茸",   url:"herbs.html",   desc:"壮肾阳，益精血，强筋骨"},
    {keyword:"沙棘",   url:"herbs.html",   desc:"健脾消食，止咳祛痰，活血散瘀"},

    /* 穴位 */
    {keyword:"合谷穴", url:"meridian.html", desc:"镇静止痛要穴，清热解表"},
    {keyword:"百会穴", url:"meridian.html", desc:"升阳举陷，醒脑开窍"},
    {keyword:"足三里", url:"meridian.html", desc:"健脾和胃，扶正培元"},
    {keyword:"太冲",   url:"meridian.html", desc:"平肝息风，清热利湿"},
    {keyword:"三阴交", url:"meridian.html", desc:"健脾益血，调经带下"},
    {keyword:"涌泉",   url:"meridian.html", desc:"补肾固元，开窍醒神"},
    {keyword:"关元",   url:"meridian.html", desc:"培补元气，导赤通淋"},
    {keyword:"经络",   url:"meridian.html", desc:"十二正经与奇经八脉系统"},
    {keyword:"穴位",   url:"meridian.html", desc:"人体穴位图解与主治功效"},

    /* 名方 */
    {keyword:"四君子汤",  url:"prescription.html", desc:"益气健脾经典方：参术苓草"},
    {keyword:"四物汤",    url:"prescription.html", desc:"补血调经基础方"},
    {keyword:"六味地黄丸",url:"prescription.html", desc:"滋阴补肾名方"},
    {keyword:"逍遥散",    url:"prescription.html", desc:"疏肝解郁，养血健脾"},
    {keyword:"酸梅汤",    url:"prescription.html", desc:"生津止渴，消暑解热饮品"},
    {keyword:"枸杞菊花茶",url:"prescription.html", desc:"清肝明目养生茶饮"},

    /* 历史人物 */
    {keyword:"张仲景", url:"history.html", desc:"医圣，著《伤寒杂病论》"},
    {keyword:"孙思邈", url:"history.html", desc:"药王，著《千金要方》"},
    {keyword:"李时珍", url:"history.html", desc:"著《本草纲目》，收药1892种"},
    {keyword:"扁鹊",   url:"history.html", desc:"春秋神医，创望闻问切"},
    {keyword:"神农",   url:"history.html", desc:"神农尝百草，中药始祖"},
    {keyword:"华佗",   url:"history.html", desc:"外科鼻祖，创麻沸散"},

    /* 节气养生 */
    {keyword:"立春", url:"wellness.html", desc:"春季养生：升阳舒展，养肝护肝"},
    {keyword:"夏至", url:"wellness.html", desc:"夏季养生：清心祛暑，养心安神"},
    {keyword:"秋分", url:"wellness.html", desc:"秋季养生：润肺养阴，收敛神气"},
    {keyword:"冬至", url:"wellness.html", desc:"冬季养生：温补肾阳，藏精纳气"},
    {keyword:"体质", url:"wellness.html", desc:"中医九种体质辨识与调理"},
    {keyword:"养生", url:"wellness.html", desc:"二十四节气养生大全"},
  ];

  /* 创建搜索结果下拉元素 */
  var searchDropdown = document.createElement('div');
  searchDropdown.className = 'search-dropdown';
  searchDropdown.id = 'search-dropdown';
  var navSearch = document.querySelector('.nav-search');
  if (navSearch) {
    navSearch.appendChild(searchDropdown);
  }

  /* 获取搜索相关DOM元素 */
  var searchInput  = document.getElementById('search-input');
  var searchBtn    = document.getElementById('search-btn');

  if (searchBtn) {
    searchBtn.addEventListener('click', doSearch);
  }

  if (searchInput) {
    /* 输入时实时筛选 */
    searchInput.addEventListener('input', function() {
      var kw = this.value.trim();
      if (kw.length === 0) {
        hideDropdown();
        return;
      }
      var results = searchIndex.filter(function(item) {
        return item.keyword.indexOf(kw) !== -1 || kw.indexOf(item.keyword) !== -1;
      });
      renderDropdown(results);
    });

    /* 回车搜索 */
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        doSearch();
      }
    });

    /* 点击外部关闭下拉 */
    document.addEventListener('click', function(e) {
      if (!searchDropdown.contains(e.target) && e.target !== searchInput && e.target !== searchBtn) {
        hideDropdown();
      }
    });
  }

  /**
   * doSearch - 执行搜索，跳转到第一个匹配结果页面
   */
  function doSearch() {
    var keyword = searchInput ? searchInput.value.trim() : '';
    if (!keyword) return;

    var results = searchIndex.filter(function(item) {
      return item.keyword.indexOf(keyword) !== -1 || keyword.indexOf(item.keyword) !== -1;
    });

    if (results.length > 0) {
      /* 跳转到第一个匹配结果 */
      window.location.href = results[0].url + '?search=' + encodeURIComponent(keyword);
    } else {
      renderDropdown([]);
      searchDropdown.classList.add('show');
    }
  }

  /**
   * renderDropdown - 渲染搜索结果下拉浮层
   * @param {Array} results - 匹配的搜索结果数组
   */
  function renderDropdown(results) {
    if (results.length === 0) {
      searchDropdown.innerHTML = '<div class="no-result">未找到相关内容，请尝试其他关键词</div>';
    } else {
      var html = '';
      results.slice(0, 8).forEach(function(item) {
        html += '<a href="' + item.url + '?search=' + encodeURIComponent(item.keyword) + '" class="result-item">';
        html += '<div>' + item.keyword + '</div>';
        html += '<div class="result-desc">' + item.desc + '</div>';
        html += '</a>';
      });
      searchDropdown.innerHTML = html;
    }
    searchDropdown.classList.add('show');
  }

  /**
   * hideDropdown - 隐藏搜索结果下拉
   */
  function hideDropdown() {
    searchDropdown.classList.remove('show');
  }

  /* ============================================================
   * 背景音乐播放器
   * ============================================================ */
  var bgm = document.getElementById('bgm');
  var jadeIcon = document.getElementById('jade-icon');

  if (bgm && jadeIcon) {
    var isPlaying = false;

    /* 初始化状态（暂停时无旋转） */
    jadeIcon.classList.add('paused');

    /* 点击玉佩切换播放/暂停 */
    jadeIcon.addEventListener('click', function() {
      if (isPlaying) {
        bgm.pause();
        jadeIcon.classList.remove('playing');
        jadeIcon.classList.add('paused');
        isPlaying = false;
      } else {
        /* 用户首次交互后才播放（浏览器自动播放策略） */
        bgm.play().then(function() {
          jadeIcon.classList.add('playing');
          jadeIcon.classList.remove('paused');
          isPlaying = true;
        }).catch(function() {
          /* 自动播放被阻止，静默处理 */
        });
      }
    });
  }

})();
