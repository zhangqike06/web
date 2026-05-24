/* ============================================================
 * herbs.js - 中草药百科页脚本
 * 功能：24种草药数据、多维筛选（功效+性味）、画轴弹窗
 * ============================================================ */

(function() {
  'use strict';

  /* ============================================================
   * 24种草药数据
   * 每个药材对象包含：id, name, category(功效分类), property(性味),
   *   meridian(归经), effect(功效), desc(描述), recipe(关联方剂)
   * ============================================================ */
  var herbsData = [
    {
      id: 1, name: "人参",
      category: "补虚", property: "甘、微苦、微温", meridian: "脾、肺、心",
      effect: "大补元气，复脉固脱，补脾益肺，生津养血，安神益智",
      desc: "人参被誉为"百草之王"，是驰名中外的名贵药材，其根部肉质肥大，形如人形。自古以来便是滋补强壮的圣药，《神农本草经》将其列为上品。现代研究证实，人参含有30余种人参皂苷，具有抗疲劳、增强免疫力、改善心血管功能、抗衰老等多重药理作用。",
      recipe: "可用于四君子汤、生脉散、参附汤等经典方剂",
      icon: "&#127807;", bgColor: "linear-gradient(135deg, #f5e6d3, #d4a574)"
    },
    {
      id: 2, name: "枸杞",
      category: "补虚", property: "甘、平", meridian: "肝、肾",
      effect: "滋补肝肾，益精明目，润肺",
      desc: "枸杞子为茄科植物枸杞的干燥成熟果实，色泽鲜红，味甜。素有"却老子"之称，是驰名中外的传统滋补佳品。《本草纲目》记载："枸杞，补肾生精，养肝明目，坚筋骨，去疲劳。"现代研究表明，枸杞富含枸杞多糖、β-胡萝卜素、甜菜碱等有效成分。",
      recipe: "枸杞菊花茶、杞菊地黄丸",
      icon: "&#127826;", bgColor: "linear-gradient(135deg, #fce4e4, #e8a0a0)"
    },
    {
      id: 3, name: "当归",
      category: "补虚", property: "甘、辛、温", meridian: "肝、心、脾",
      effect: "补血活血，调经止痛，润肠通便",
      desc: "当归为伞形科植物当归的干燥根，是妇科调经要药。"十方九归"之说体现了其在中药方剂中的重要地位。《本草正》谓："当归，其味甘而重，故专能补血；其气轻而辛，故又能行血。补中有动，行中有补，诚血中之气药，亦血中之圣药也。"",
      recipe: "四物汤核心药材、当归补血汤、当归芍药散",
      icon: "&#127795;", bgColor: "linear-gradient(135deg, #f5deb3, #daa520)"
    },
    {
      id: 4, name: "黄芪",
      category: "补虚", property: "甘、微温", meridian: "脾、肺",
      effect: "补气固表，利尿托毒，排脓，敛疮生肌",
      desc: "黄芪为豆科植物蒙古黄芪或膜荚黄芪的干燥根，是补气之要药。味甘性微温，入脾肺经。《本草备要》称其：'生用固表，无汗能发，有汗能止；炙用补中，益元气，壮脾胃。'现代研究证实黄芪多糖具有增强免疫、抗病毒、抗疲劳等作用。",
      recipe: "玉屏风散、补中益气汤、当归补血汤",
      icon: "&#127794;", bgColor: "linear-gradient(135deg, #e8d5b7, #c4a265)"
    },
    {
      id: 5, name: "金银花",
      category: "清热", property: "甘、寒", meridian: "肺、心、胃",
      effect: "清热解毒，疏散风热",
      desc: "金银花为忍冬科植物忍冬的干燥花蕾或带初开的花，因其花初开为白色、后转为黄色而得名。是清热解毒的常用药，性寒味甘，善于清解热毒、疏散风热，为治疗疮痈肿毒之要药。现代药理研究证实其具有广谱抗菌、抗病毒、抗炎解热等作用。",
      recipe: "银翘散、五味消毒饮",
      icon: "&#127800;", bgColor: "linear-gradient(135deg, #fffde7, #fff176)"
    },
    {
      id: 6, name: "板蓝根",
      category: "清热", property: "苦、寒", meridian: "心、胃",
      effect: "清热解毒，凉血利咽，消斑",
      desc: "板蓝根为十字花科植物菘蓝的干燥根，是防治流行性感冒的常用中药。味苦性寒，善于清热凉血、解毒利咽。现代药理研究表明板蓝根含有靛蓝、靛玉红等活性成分，具有抗病毒、抗菌、增强免疫力等药理作用，广泛用于病毒性感冒的防治。",
      recipe: "板蓝根颗粒（现代中成药）、普济消毒饮",
      icon: "&#127793;", bgColor: "linear-gradient(135deg, #d4c5a9, #b8956a)"
    },
    {
      id: 7, name: "菊花",
      category: "清热", property: "辛、甘、苦、微寒", meridian: "肺、肝",
      effect: "散风清热，平肝明目，清热解毒",
      desc: "菊花为菊科植物菊的干燥头状花序，是中国传统名花，亦为常用中药。性微寒，善于疏散风热、清肝明目。《本草纲目拾遗》谓菊花'专入阳分，治诸风头眩，解酒毒疔肿'。现代研究表明白菊富含黄酮类化合物，具有抗氧化、抗炎、降血压等保健作用。",
      recipe: "桑菊饮、杞菊地黄丸",
      icon: "&#127804;", bgColor: "linear-gradient(135deg, #fff9c4, #ffcc02)"
    },
    {
      id: 8, name: "薄荷",
      category: "解表", property: "辛、凉", meridian: "肺、肝",
      effect: "疏散风热，清利头目，利咽，透疹",
      desc: "薄荷为唇形科植物薄荷的干燥地上部分，气味芳香清凉，是常用的辛凉解表药。《本草纲目》记载：'薄荷，辛能发散，凉能清利，专于消风散热。'其清凉感来源于薄荷脑成分，能兴奋中枢神经，使皮肤毛细血管扩张，促进汗腺分泌，故有发汗解热作用。",
      recipe: "银翘散、桑菊饮、薄荷茶",
      icon: "&#127807;", bgColor: "linear-gradient(135deg, #c8e6c9, #66bb6a)"
    },
    {
      id: 9, name: "生姜",
      category: "解表", property: "辛、微温", meridian: "肺、脾、胃",
      effect: "解表散寒，温中止呕，温肺止咳，解鱼蟹毒",
      desc: "生姜为姜科植物姜的新鲜根茎，是厨房中最常见的中药。辛温发散，善于发汗解表、温胃止呕。《本草纲目》谓：'姜，辛而不荤，去邪辟恶，生啖熟食，醋酱糟盐，蜜煎调和，无不宜之。可蔬可和，可果可药，其利博矣。'",
      recipe: "生姜红糖水、桂枝汤、小半夏汤",
      icon: "&#129364;", bgColor: "linear-gradient(135deg, #fff3e0, #ffb74d)"
    },
    {
      id: 10, name: "陈皮",
      category: "理气", property: "苦、辛、温", meridian: "脾、肺",
      effect: "理气健脾，燥湿化痰",
      desc: "陈皮为芸香科植物橘及其栽培变种的干燥成熟果皮，以陈久者为佳，故名陈皮。味辛苦性温，善于理气调中、燥湿化痰。《本草纲目》谓：'橘皮，苦能泻能燥，辛能散，温能和。其治百病，总是取其理气燥湿之功。'广东新会陈皮为道地药材。",
      recipe: "二陈汤、平胃散",
      icon: "&#127818;", bgColor: "linear-gradient(135deg, #ffe0b2, #ff9800)"
    },
    {
      id: 11, name: "茯苓",
      category: "利水", property: "甘、淡、平", meridian: "心、肺、脾、肾",
      effect: "利水渗湿，健脾，宁心",
      desc: "茯苓为多孔菌科真菌茯苓的干燥菌核，寄生于松树根部。味甘淡性平，利水而不伤正气，为利水渗湿之要药。《本草正》谓：'茯苓，能利窍去湿，利窍则开心益智，导浊生津；去湿则逐水燥脾，补中健胃。'现代研究证实茯苓多糖具有免疫调节和抗肿瘤作用。",
      recipe: "四君子汤、五苓散、苓桂术甘汤",
      icon: "&#127812;", bgColor: "linear-gradient(135deg, #efebe9, #bcaaa4)"
    },
    {
      id: 12, name: "川芎",
      category: "活血", property: "辛、温", meridian: "肝、胆、心包",
      effect: "活血行气，祛风止痛",
      desc: "川芎为伞形科植物川芎的干燥根茎，是活血化瘀之要药。辛温香燥，走而不守，既能行散，又入血分，上行可达巅顶，下行可达血海。《本草纲目》谓其'燥湿，止泻痢，行气开郁'，为'血中气药'。现代研究证实川芎嗪具有改善微循环、抗血栓形成的作用。",
      recipe: "四物汤核心药材、川芎茶调散",
      icon: "&#127795;", bgColor: "linear-gradient(135deg, #d7ccc8, #8d6e63)"
    },
    {
      id: 13, name: "三七",
      category: "活血", property: "甘、微苦、温", meridian: "肝、胃",
      effect: "散瘀止血，消肿定痛",
      desc: "三七为五加科植物三七的干燥根和根茎，又名田七、金不换。味甘微苦性温，为伤科之要药，既能止血，又能散瘀，有'止血不留瘀，化瘀不伤正'之特点。《本草纲目拾遗》谓：'人参补气第一，三七补血第一，味同而功亦等。'云南文山为三七道地产区。",
      recipe: "云南白药核心成分、三七粉（单方使用）",
      icon: "&#129361;", bgColor: "linear-gradient(135deg, #e8d5b7, #c9956b)"
    },
    {
      id: 14, name: "大黄",
      category: "清热", property: "苦、寒", meridian: "脾、胃、大肠、肝、心包",
      effect: "泻下攻积，清热泻火，凉血解毒，逐瘀通经",
      desc: "大黄为蓼科植物掌叶大黄、唐古特大黄或药用大黄的干燥根和根茎。苦寒沉降，攻下之力峻猛，为治疗积滞便秘之要药。《神农本草经》列其为下品。现代研究证实大黄含有蒽醌类化合物，具有泻下、抗菌、利胆、降脂等多重药理活性。",
      recipe: "大承气汤、大黄牡丹汤",
      icon: "&#127796;", bgColor: "linear-gradient(135deg, #ffcc80, #e65100)"
    },
    {
      id: 15, name: "甘草",
      category: "补虚", property: "甘、平", meridian: "心、肺、脾、胃",
      effect: "补脾益气，清热解毒，祛痰止咳，缓急止痛，调和诸药",
      desc: "甘草为豆科植物甘草、胀果甘草或光果甘草的干燥根和根茎。味甘性平，既能益气补中，又能清热解毒，更能调和诸药，有'国老'之誉。《本草汇言》谓：'甘草，和中益气，补虚解毒之药也。'现代研究表明甘草具有肾上腺皮质激素样作用。",
      recipe: "几乎调和所有方剂，四君子汤、炙甘草汤",
      icon: "&#127795;", bgColor: "linear-gradient(135deg, #fff9c4, #d4a017)"
    },
    {
      id: 16, name: "白术",
      category: "补虚", property: "苦、甘、温", meridian: "脾、胃",
      effect: "健脾益气，燥湿利水，止汗，安胎",
      desc: "白术为菊科植物白术的干燥根茎，是健脾益气之要药。味苦甘性温，善于补脾益气、燥湿利水。《本草汇言》谓：'白术，乃扶植脾胃、散湿除痹、消食除痞之要药也。脾虚不健，术能补之；胃虚不纳，术能助之。'",
      recipe: "四君子汤、参苓白术散、玉屏风散",
      icon: "&#127795;", bgColor: "linear-gradient(135deg, #efebe9, #a1887f)"
    },
    {
      id: 17, name: "柴胡",
      category: "解表", property: "苦、辛、微寒", meridian: "肝、胆、肺",
      effect: "疏散退热，疏肝解郁，升举阳气",
      desc: "柴胡为伞形科植物柴胡或狭叶柴胡的干燥根，是和解少阳之要药。味苦辛性微寒，善于疏散退热、疏肝解郁。《本草纲目》谓：'柴胡乃引清气退热必用之药。'现代研究证实柴胡皂苷具有抗炎、解热、保肝、抗病毒等药理作用。",
      recipe: "小柴胡汤、逍遥散",
      icon: "&#127795;", bgColor: "linear-gradient(135deg, #e8f5e9, #81c784)"
    },
    {
      id: 18, name: "麦冬",
      category: "补虚", property: "甘、微苦、微寒", meridian: "心、肺、胃",
      effect: "养阴生津，润肺清心",
      desc: "麦冬为百合科植物麦冬的干燥块根，是养阴润肺之良药。味甘微苦性微寒，善于养阴润肺、益胃生津、清心除烦。《神农本草经》将其列为上品，谓其'主心腹结气，伤中伤饱，胃络脉绝，羸瘦短气'。现代研究证实其具有增强免疫、抗疲劳、降血糖等作用。",
      recipe: "生脉散、麦门冬汤",
      icon: "&#127807;", bgColor: "linear-gradient(135deg, #e8f5e9, #a5d6a7)"
    },
    {
      id: 19, name: "五味子",
      category: "收涩", property: "酸、甘、温", meridian: "肺、心、肾",
      effect: "收敛固涩，益气生津，补肾宁心",
      desc: "五味子为木兰科植物五味子的干燥成熟果实，因其果肉酸甜苦辛咸五味俱全而得名。味酸甘性温，善于收敛固涩、益气生津、补肾宁心。《本草纲目》谓：'五味子，入补药熟用，入嗽药生用。'现代研究证实其具有保肝、抗氧化、增强中枢神经系统功能等作用。",
      recipe: "生脉散、五味子糖浆",
      icon: "&#127826;", bgColor: "linear-gradient(135deg, #fce4ec, #e91e63)"
    },
    {
      id: 20, name: "半夏",
      category: "化痰", property: "辛、温（有毒）", meridian: "脾、胃、肺",
      effect: "燥湿化痰，降逆止呕，消痞散结",
      desc: "半夏为天南星科植物半夏的干燥块茎，是燥湿化痰之要药。辛温而燥，善于燥湿化痰、降逆止呕。生半夏有毒，内服须经炮制，法半夏、姜半夏、清半夏为常用炮制品。《本草纲目》谓半夏为'治痰之要药'。",
      recipe: "二陈汤核心药材、半夏泻心汤、半夏厚朴汤",
      icon: "&#127795;", bgColor: "linear-gradient(135deg, #fff3e0, #ffb74d)"
    },
    {
      id: 21, name: "冬虫夏草",
      category: "补虚", property: "甘、温", meridian: "肺、肾",
      effect: "补肾益肺，止血化痰",
      desc: "冬虫夏草为麦角菌科真菌冬虫夏草菌寄生在蝙蝠蛾科昆虫幼虫上的子座和幼虫尸体的干燥复合体，主产于青藏高原。味甘性温，能平补肺肾阴阳，为名贵滋补药材。《本草从新》谓其"保肺益肾，止血化痰，已劳嗽"。",
      recipe: "冬虫夏草炖汤（食疗方）",
      icon: "&#128027;", bgColor: "linear-gradient(135deg, #d7ccc8, #8d6e63)"
    },
    {
      id: 22, name: "阿胶",
      category: "补虚", property: "甘、平", meridian: "肺、肝、肾",
      effect: "补血止血，滋阴润燥",
      desc: "阿胶为马科动物驴的干燥皮或鲜皮经煎煮浓缩制成的固体胶，以山东省东阿县产者最为著名。味甘性平，质地滋润，为补血要药。《本草纲目》谓其'和血滋阴，除风润燥，化痰清肺'。现代研究证实阿胶含有多种氨基酸和微量元素，具有促进造血、增强免疫等作用。",
      recipe: "阿胶糕（滋补食疗方）、黄土汤",
      icon: "&#129475;", bgColor: "linear-gradient(135deg, #3e2723, #5d4037)"
    },
    {
      id: 23, name: "鹿茸",
      category: "补虚", property: "甘、咸、温", meridian: "肾、肝",
      effect: "壮肾阳，益精血，强筋骨，调冲任，托疮毒",
      desc: "鹿茸为鹿科动物梅花鹿或马鹿的雄鹿未骨化密生茸毛的幼角，是补肾壮阳的珍贵药材。味甘咸性温，善于补肾阳、益精血、强筋骨。《本草纲目》谓其"生精补髓，养血益阳，强健筋骨，治一切虚损"。",
      recipe: "鹿茸酒（传统滋补酒）",
      icon: "&#129420;", bgColor: "linear-gradient(135deg, #efebe9, #bcaaa4)"
    },
    {
      id: 24, name: "沙棘",
      category: "活血", property: "酸、涩、温", meridian: "脾、胃、肺、心",
      effect: "健脾消食，止咳祛痰，活血散瘀",
      desc: "沙棘为胡颓子科植物沙棘的干燥成熟果实，是近年来备受关注的药食两用植物。味酸涩性温，善于健脾消食、止咳祛痰、活血散瘀。现代研究证实沙棘富含维生素C、E及多种黄酮类物质，具有抗氧化、降血脂、增强免疫力等多种保健功能。",
      recipe: "沙棘果汁（健康饮品）、沙棘油（外用护肤品）",
      icon: "&#127826;", bgColor: "linear-gradient(135deg, #ff9800, #ff5722)"
    }
  ];

  /* 当前筛选状态 */
  var currentCategoryFilter = 'all';
  var currentPropertyFilter = 'all';

  /* ============================================================
   * 渲染草药卡片网格
   * ============================================================ */
  var herbsGrid = document.getElementById('herbs-grid');
  var noResults  = document.getElementById('no-results');

  /**
   * renderHerbs - 根据当前筛选条件渲染卡片
   */
  function renderHerbs() {
    /* 筛选 */
    var filtered = herbsData.filter(function(herb) {
      var catMatch = currentCategoryFilter === 'all' || herb.category === currentCategoryFilter;
      var propMatch = currentPropertyFilter === 'all' || herb.property.indexOf(currentPropertyFilter) !== -1;
      return catMatch && propMatch;
    });

    if (filtered.length === 0) {
      herbsGrid.innerHTML = '';
      if (noResults) noResults.style.display = 'block';
      return;
    }

    if (noResults) noResults.style.display = 'none';

    /* 构建HTML */
    var html = '';
    filtered.forEach(function(herb) {
      html += '<div class="herb-card" data-category="' + herb.category + '" onclick="openHerbModal(' + herb.id + ')">';
      html += '  <div class="herb-img" style="background:' + herb.bgColor + ';">' + herb.icon + '</div>';
      html += '  <h3>' + herb.name + '</h3>';
      html += '  <div class="herb-property">' + herb.property + ' | ' + herb.meridian + '</div>';
      html += '  <div class="herb-tags">';
      /* 将性味拆分为独立标签 */
      var props = herb.property.replace(/、/g, ',').split(',');
      props.forEach(function(p) {
        var trimmed = p.trim();
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
  }

  /* ============================================================
   * 筛选按钮事件绑定
   * ============================================================ */
  function bindFilterEvents(filterContainerId, filterType) {
    var container = document.getElementById(filterContainerId);
    if (!container) return;

    var buttons = container.querySelectorAll('.filter-btn');
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        /* 更新按钮active状态 */
        buttons.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');

        /* 更新筛选状态 */
        var filterVal = this.getAttribute('data-filter');
        if (filterType === 'category') {
          currentCategoryFilter = filterVal;
        } else if (filterType === 'property') {
          currentPropertyFilter = filterVal;
        }

        /* 重新渲染 */
        renderHerbs();
      });
    });
  }

  /* 绑定筛选事件 */
  bindFilterEvents('category-filters', 'category');
  bindFilterEvents('property-filters', 'property');

  /* ============================================================
   * 画轴弹窗 Modal
   * ============================================================ */
  var modalOverlay = document.getElementById('herb-modal');
  var modalBody    = document.getElementById('modal-body');
  var modalClose   = document.getElementById('modal-close');

  /**
   * openHerbModal - 打开草药详情弹窗
   * @param {number} herbId - 草药ID
   */
  window.openHerbModal = function(herbId) {
    var herb = null;
    for (var i = 0; i < herbsData.length; i++) {
      if (herbsData[i].id === herbId) {
        herb = herbsData[i];
        break;
      }
    }
    if (!herb) return;

    /* 构建弹窗内容 */
    var html = '';
    html += '<div class="modal-herb-img" style="background:' + herb.bgColor + ';">' + herb.icon + '</div>';
    html += '<div class="modal-herb-info">';
    html += '  <h2>' + herb.name + '</h2>';
    html += '  <span class="tag" style="background:var(--color-rose);color:#fff;">' + herb.category + '</span>';
    html += '  <div class="info-row" style="margin-top:12px;">';
    html += '    <span class="info-label">性味：</span>';
    html += '    <span class="info-value">' + herb.property + '</span>';
    html += '  </div>';
    html += '  <div class="info-row">';
    html += '    <span class="info-label">归经：</span>';
    html += '    <span class="info-value">' + herb.meridian + '</span>';
    html += '  </div>';
    html += '  <div class="info-row">';
    html += '    <span class="info-label">功效：</span>';
    html += '    <span class="info-value" style="color:var(--color-rose);font-weight:bold;">' + herb.effect + '</span>';
    html += '  </div>';
    html += '  <div class="herb-description">' + herb.desc + '</div>';
    html += '  <div class="herb-recipe">&#128218; ' + herb.recipe + '</div>';
    html += '</div>';

    modalBody.innerHTML = html;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  /**
   * closeHerbModal - 关闭弹窗
   */
  function closeHerbModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
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

  /* ESC键关闭弹窗 */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeHerbModal();
    }
  });

  /* ============================================================
   * 搜索跳转支持（从全站搜跳转到此页时高亮对应药材）
   * ============================================================ */
  function checkSearchParam() {
    var params = new URLSearchParams(window.location.search);
    var searchTerm = params.get('search');
    if (searchTerm) {
      /* 查找匹配的药材并自动打开弹窗 */
      for (var i = 0; i < herbsData.length; i++) {
        if (herbsData[i].name.indexOf(searchTerm) !== -1 ||
            searchTerm.indexOf(herbsData[i].name) !== -1) {
          /* 滚动到该药材卡片并打开弹窗 */
          setTimeout(function() {
            window.openHerbModal(herbsData[i].id);
          }, 500);
          break;
        }
      }
    }
  }

  /* 初始化渲染 */
  renderHerbs();
  checkSearchParam();

})();
