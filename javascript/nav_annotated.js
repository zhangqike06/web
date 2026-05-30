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

  // 获取导航栏DOM元素
  var navHeader = document.getElementById('nav-header');

  if (navHeader) {
    // 玻璃效果由 common.css 控制，JS只负责滚动时添加/移除 scrolled 类
    // scrolled 类用于在用户向下滚动时改变导航栏的背景透明度和阴影

    /**
     * 监听页面滚动事件
     * 当滚动距离超过80px时，添加scrolled类；否则移除
     */
    window.addEventListener('scroll', function() {
      if (window.scrollY > 80) {
        navHeader.classList.add('scrolled');
      } else {
        navHeader.classList.remove('scrolled');
      }
    });
  }

  /**
   * 同步导航栏用户登录状态显示
   * 如果用户已登录，在导航栏显示用户名和头像缩写
   */
  (function syncNavUserState() {
    var loginLink = document.querySelector('.nav-menu a.nav-login');
    var userRaw = localStorage.getItem('tcm_user');
    var userData;
    var displayName;
    var avatarText;

    if (!loginLink || !userRaw) return;

    // 安全解析localStorage中的用户数据
    try {
      userData = JSON.parse(userRaw);
    } catch (err) {
      return;
    }

    if (!userData || !userData.name) return;

    // 提取用户显示名称，并获取第一个字符作为头像
    displayName = userData.displayName || userData.name;
    avatarText = displayName.charAt(0).toUpperCase();

    // 将登录链接转换为用户头像和名称
    loginLink.classList.add('nav-user');
    loginLink.innerHTML =
      '<span class="nav-avatar">' + avatarText + '</span>' +
      '<span class="nav-user-name">' + displayName + '</span>';
    loginLink.title = '已登录：' + displayName;
  })();

  /**
   * 跨页面导航当前项高亮
   * 根据当前页面URL，自动高亮对应的导航菜单项
   */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav-menu a[href]');

  navLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (!href || href === '#') return;

    // 如果链接的href与当前页面路径匹配，添加active类
    if (href === currentPath) {
      link.classList.add('active');

      // 如果该链接在子菜单中，也要高亮其父项
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

  /**
   * 查找所有具有子菜单的导航项
   * 在移动端，通过点击来展开/收起子菜单（避免hover不可用）
   */
  var hasSubItems = document.querySelectorAll('.has-sub');

  hasSubItems.forEach(function(item) {
    var link = item.querySelector('a');

    /**
     * 点击展开/收起子菜单（移动端）
     * 在桌面端，CSS hover效果生效；在移动端，JS控制展开
     */
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

  /**
   * 搜索索引库
   * 包含：草药、穴位、名方、历史人物、节气养生等关键词
   * 每个条目包含：keyword（搜索关键词）、url（目标页面）、desc（描述信息）
   */
  var searchIndex = [
    // ============ 草药数据 ============
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
    {keyword:"冬虫夏草",url:"herbs.html",  desc:"补肺益肾，止血化痰"},
    {keyword:"阿胶",   url:"herbs.html",   desc:"补血止血，滋阴润燥"},
    {keyword:"鹿茸",   url:"herbs.html",   desc:"壮肾阳，益精血，强筋骨"},
    {keyword:"沙棘",   url:"herbs.html",   desc:"健脾消食，止咳祛痰，活血散瘀"},
    {keyword:"白芍",   url:"herbs.html",   desc:"养血调经，柔肝止痛，敛阴止汗"},
    {keyword:"葛根",   url:"herbs.html",   desc:"解肌退热，升阳止泻，生津止渴"},
    {keyword:"黄芩",   url:"herbs.html",   desc:"清热燥湿，泻火解毒，止血安胎"},
    {keyword:"连翘",   url:"herbs.html",   desc:"清热解毒，消肿散结，疮家圣药"},
    {keyword:"山楂",   url:"herbs.html",   desc:"消食化积，行气散瘀，降脂化浊"},
    {keyword:"熟地黄", url:"herbs.html",   desc:"补血滋阴，益精填髓"},
    {keyword:"山药",   url:"herbs.html",   desc:"补脾养胃，生津益肺，补肾固精"},
    {keyword:"丹参",   url:"herbs.html",   desc:"活血祛瘀，凉血消痈，清心除烦"},
    {keyword:"防风",   url:"herbs.html",   desc:"祛风解表，胜湿止痛，风中润剂"},
    {keyword:"黄连",   url:"herbs.html",   desc:"清热燥湿，泻火解毒，大苦大寒"},
    {keyword:"天麻",   url:"herbs.html",   desc:"息风止痉，平抑肝阳，治风圣药"},
    {keyword:"杜仲",   url:"herbs.html",   desc:"补肝肾，强筋骨，安胎"},
    {keyword:"红花",   url:"herbs.html",   desc:"活血通经，散瘀止痛"},
    {keyword:"桂枝",   url:"herbs.html",   desc:"发汗解肌，温通经脉，助阳化气"},
    {keyword:"酸枣仁", url:"herbs.html",   desc:"养心安神，敛汗生津，治失眠要药"},
    {keyword:"薏苡仁", url:"herbs.html",   desc:"利水渗湿，健脾止泻，清热排脓"},

    // ============ 穴位数据 ============
    {keyword:"合谷穴", url:"meridian.html", desc:"镇静止痛要穴，清热解表"},
    {keyword:"百会穴", url:"meridian.html", desc:"升阳举陷，醒脑开窍"},
    {keyword:"足三里", url:"meridian.html", desc:"健脾和胃，扶正培元"},
    {keyword:"太冲",   url:"meridian.html", desc:"平肝息风，清热利湿"},
    {keyword:"三阴交", url:"meridian.html", desc:"健脾益血，调经带下"},
    {keyword:"涌泉",   url:"meridian.html", desc:"补肾固元，开窍醒神"},
    {keyword:"关元",   url:"meridian.html", desc:"培补元气，导赤通淋"},
    {keyword:"印堂",   url:"meridian.html", desc:"清头明目，通鼻开窍"},
    {keyword:"膻中",   url:"meridian.html", desc:"宽胸理气，八会穴之气会"},
    {keyword:"中脘",   url:"meridian.html", desc:"健脾和胃，腑会中脘"},
    {keyword:"气海",   url:"meridian.html", desc:"培补元气，生气之海"},
    {keyword:"内关",   url:"meridian.html", desc:"宁心安神，和胃降逆"},
    {keyword:"风池",   url:"meridian.html", desc:"平肝息风，祛风要穴"},
    {keyword:"大椎",   url:"meridian.html", desc:"清热解表，诸阳之会"},
    {keyword:"肺俞",   url:"meridian.html", desc:"肺之背俞穴，宣肺理气"},
    {keyword:"心俞",   url:"meridian.html", desc:"心之背俞穴，宁心安神"},
    {keyword:"肾俞",   url:"meridian.html", desc:"肾之背俞穴，补肾益气"},
    {keyword:"天枢",   url:"meridian.html", desc:"大肠募穴，双向调节肠胃"},
    {keyword:"至阳",   url:"meridian.html", desc:"宽胸利气，心绞痛常用穴"},
    {keyword:"命门",   url:"meridian.html", desc:"生命之门，温补肾阳要穴"},
    {keyword:"经络",   url:"meridian.html", desc:"十二正经与奇经八脉系统"},
    {keyword:"穴位",   url:"meridian.html", desc:"人体穴位图解与主治功效"},

    // ============ 经典名方 ============
    {keyword:"四君子汤",  url:"prescription.html", desc:"益气健脾经典方：参术苓草"},
    {keyword:"四物汤",    url:"prescription.html", desc:"补血调经基础方"},
    {keyword:"六味地黄丸",url:"prescription.html", desc:"滋阴补肾名方"},
    {keyword:"逍遥散",    url:"prescription.html", desc:"疏肝解郁，养血健脾"},
    {keyword:"酸梅汤",    url:"prescription.html", desc:"生津止渴，消暑解热饮品"},
    {keyword:"枸杞菊花茶",url:"prescription.html", desc:"清肝明目养生茶饮"},
    {keyword:"小柴胡汤",  url:"prescription.html", desc:"和解少阳，《伤寒论》名方"},
    {keyword:"玉屏风散",  url:"prescription.html", desc:"益气固表止汗，增强免疫力"},
    {keyword:"生脉散",    url:"prescription.html", desc:"益气生津，敛阴止汗"},
    {keyword:"二陈汤",    url:"prescription.html", desc:"燥湿化痰，理气和中，治痰基础方"},
    {keyword:"麻黄汤",    url:"prescription.html", desc:"发汗解表，宣肺平喘，《伤寒论》方"},
    {keyword:"归脾汤",    url:"prescription.html", desc:"益气补血，健脾养心，心脾同治"},
    {keyword:"八珍汤",    url:"prescription.html", desc:"益气补血，气血双补代表方"},

    // ============ 历史人物 ============
    {keyword:"张仲景", url:"history.html", desc:"医圣，著《伤寒杂病论》"},
    {keyword:"孙思邈", url:"history.html", desc:"药王，著《千金要方》"},
    {keyword:"李时珍", url:"history.html", desc:"著《本草纲目》，收药1892种"},
    {keyword:"扁鹊",   url:"history.html", desc:"春秋神医，创望闻问切"},
    {keyword:"神农",   url:"history.html", desc:"神农尝百草，中药始祖"},
    {keyword:"华佗",   url:"history.html", desc:"外科鼻祖，创麻沸散"},
    {keyword:"皇甫谧", url:"history.html", desc:"针灸鼻祖，著《针灸甲乙经》"},
    {keyword:"葛洪",   url:"history.html", desc:"著《肘后备急方》，青蒿素溯源"},
    {keyword:"陶弘景", url:"history.html", desc:"著《本草经集注》，山中宰相"},

    // ============ 节气养生 ============
    {keyword:"立春", url:"wellness.html", desc:"春季养生：升阳舒展，养肝护肝"},
    {keyword:"夏至", url:"wellness.html", desc:"夏季养生：清心祛暑，养心安神"},
    {keyword:"秋分", url:"wellness.html", desc:"秋季养生：润肺养阴，收敛神气"},
    {keyword:"冬至", url:"wellness.html", desc:"冬季养生：温补肾阳，藏精纳气"},
    {keyword:"体质", url:"wellness.html", desc:"中医九种体质辨识与调理"},
    {keyword:"养生", url:"wellness.html", desc:"二十四节气养生大全"},
    {keyword:"春季", url:"wellness.html", desc:"春季养生：养肝护肝，升阳舒展"},
    {keyword:"夏季", url:"wellness.html", desc:"夏季养生：清心养心，防暑祛湿"},
    {keyword:"秋季", url:"wellness.html", desc:"秋季养生：润肺养肺，滋阴防燥"},
    {keyword:"冬季", url:"wellness.html", desc:"冬季养生：补肾藏精，温阳固护"},
    {keyword:"四季", url:"wellness.html", desc:"四季养生：顺时调养，天人相应"}
  ];

  // 创建搜索结果下拉列表元素
  var searchDropdown = document.createElement('div');
  searchDropdown.className = 'search-dropdown';
  searchDropdown.id = 'search-dropdown';
  var navSearch = document.querySelector('.nav-search');
  if (navSearch) {
    navSearch.appendChild(searchDropdown);
  }

  // 获取搜索相关DOM元素
  var searchInput  = document.getElementById('search-input');
  var searchBtn    = document.getElementById('search-btn');

  if (searchBtn) {
    searchBtn.addEventListener('click', doSearch);
  }

  if (searchInput) {
    /**
     * 输入时实时筛选和显示搜索建议
     * 用户边输入边显示匹配的搜索结果
     */
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

    /**
     * 按Enter键执行搜索
     * 搜索关键词后会跳转到对应页面并高亮搜索结果
     */
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        doSearch();
      }
    });

    /**
     * 点击页面其他部分关闭搜索下拉列表
     * 改进用户体验
     */
    document.addEventListener('click', function(e) {
      if (!searchDropdown.contains(e.target) && e.target !== searchInput && e.target !== searchBtn) {
        hideDropdown();
      }
    });
  }

  /**
   * doSearch - 执行搜索，跳转到第一个匹配结果页面
   * 如果有匹配项，跳转到该页面并传递搜索关键词参数
   */
  function doSearch() {
    var keyword = searchInput ? searchInput.value.trim() : '';
    if (!keyword) return;

    var results = searchIndex.filter(function(item) {
      return item.keyword.indexOf(keyword) !== -1 || keyword.indexOf(item.keyword) !== -1;
    });

    if (results.length > 0) {
      // 跳转到第一个匹配结果页面，并通过URL参数传递搜索关键词
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
      // 限制显示前8条结果，避免列表过长
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
   * 右下角悬浮玉佩按钮，点击可控制背景古乐播放/暂停
   * ============================================================ */

  var bgm = document.getElementById('bgm');
  var jadeIcon = document.getElementById('jade-icon');

  if (bgm && jadeIcon) {
    var isPlaying = false;

    /**
     * 初始化播放器状态
     * 默认为暂停状态，用户需要手动点击才能播放
     * 这遵循现代浏览器的自动播放政策（用户交互后才能自动播放音视频）
     */
    jadeIcon.classList.add('paused');

    /**
     * 点击玉佩图标切换播放/暂停状态
     * 玉佩旋转动画与playing/paused类相关联
     */
    jadeIcon.addEventListener('click', function() {
      if (isPlaying) {
        // 暂停音乐
        bgm.pause();
        jadeIcon.classList.remove('playing');
        jadeIcon.classList.add('paused');
        isPlaying = false;
      } else {
        // 尝试播放音乐
        // 使用Promise处理浏览器的自动播放限制
        bgm.play().then(function() {
          // 播放成功，更新状态和样式
          jadeIcon.classList.add('playing');
          jadeIcon.classList.remove('paused');
          isPlaying = true;
        }).catch(function() {
          // 自动播放被浏览器阻止，静默处理
          // 用户再点击一次时通常能成功播放
        });
      }
    });
  }

})();
