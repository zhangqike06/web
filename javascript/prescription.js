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
    },
    {
      id: "siwutang",
      name: "四物汤",
      type: "经典方剂",
      herbs: [
        { name: "当归", icon: "&#127795;", role: "君药", property: "甘、辛、温", effect: "补血活血，调经止痛，为补血之圣药" },
        { name: "熟地黄", icon: "&#127795;", role: "臣药", property: "甘、微温", effect: "补血滋阴，益精填髓，助当归补血" },
        { name: "白芍", icon: "&#127800;", role: "佐药", property: "苦、酸、微寒", effect: "养血柔肝，敛阴止痛，缓急舒筋" },
        { name: "川芎", icon: "&#127795;", role: "使药", property: "辛、温", effect: "活血行气，祛风止痛，使补而不滞" }
      ],
      effect: "补血调经。主治营血虚滞证：头晕目眩，心悸失眠，面色无华，月经不调，脐腹疼痛。",
      modern: "妇科调经基础方，后世众多补血方剂均由此化裁。适合女性血虚体质调理，也可用于面色萎黄、手足麻木、产后调理等场景。"
    },
    {
      id: "xiaoyaosan",
      name: "逍遥散",
      type: "经典方剂",
      herbs: [
        { name: "柴胡", icon: "&#127795;", role: "君药", property: "苦、辛、微寒", effect: "疏肝解郁，条达肝气，为方中主药" },
        { name: "当归", icon: "&#127795;", role: "臣药", property: "甘、辛、温", effect: "养血和血，补肝体而助肝用" },
        { name: "白芍", icon: "&#127800;", role: "臣药", property: "苦、酸、微寒", effect: "养血柔肝，缓急止痛" },
        { name: "白术", icon: "&#127795;", role: "佐药", property: "苦、甘、温", effect: "健脾益气，实土以御木乘" },
        { name: "茯苓", icon: "&#127812;", role: "佐药", property: "甘、淡、平", effect: "健脾宁心，利湿助运" },
        { name: "甘草", icon: "&#127795;", role: "使药", property: "甘、平", effect: "益气补中，调和诸药，缓肝之急" }
      ],
      effect: "疏肝解郁，养血健脾。主治肝郁血虚脾弱证：两胁作痛，头痛目眩，口燥咽干，神疲食少，月经不调。",
      modern: "适用于现代人因压力、情绪导致的肝郁脾虚证，如经前期综合征、更年期调理、慢性疲劳等。宋代《太平惠民和剂局方》名方，流传千年。"
    },
    {
      id: "xiaochaihu",
      name: "小柴胡汤",
      type: "经典方剂",
      herbs: [
        { name: "柴胡", icon: "&#127795;", role: "君药", property: "苦、辛、微寒", effect: "透泄少阳之邪，疏畅气机之郁滞" },
        { name: "黄芩", icon: "&#127800;", role: "臣药", property: "苦、寒", effect: "清泄少阳之热，与柴胡相配一散一清" },
        { name: "半夏", icon: "&#127795;", role: "佐药", property: "辛、温", effect: "和胃降逆，散结消痞，助柴胡疏通气机" },
        { name: "人参", icon: "&#127807;", role: "佐药", property: "甘、微温", effect: "益气健脾，扶正以助祛邪" },
        { name: "甘草", icon: "&#127795;", role: "使药", property: "甘、平", effect: "调和诸药，益气和胃" }
      ],
      effect: "和解少阳。主治伤寒少阳证：往来寒热，胸胁苦满，默默不欲饮食，心烦喜呕，口苦咽干，目眩。",
      modern: "张仲景《伤寒论》经典方，现代常用于感冒、流感、胃炎、肝炎等见少阳证候者。是中医'和解法'的代表方剂，临床应用极为广泛。"
    },
    {
      id: "yupingfeng",
      name: "玉屏风散",
      type: "经典方剂",
      herbs: [
        { name: "黄芪", icon: "&#127794;", role: "君药", property: "甘、微温", effect: "益气固表，大补脾肺之气，为方中主药" },
        { name: "白术", icon: "&#127795;", role: "臣药", property: "苦、甘、温", effect: "健脾益气，助黄芪加强固表之力" },
        { name: "防风", icon: "&#127795;", role: "佐药", property: "辛、甘、微温", effect: "祛风解表，使固表而不留邪" }
      ],
      effect: "益气固表止汗。主治表虚自汗证：汗出恶风，面色晄白，易感风邪，反复感冒。",
      modern: "增强免疫力的代表方，适用于体质虚弱、易感冒、过敏性鼻炎等免疫功能低下人群。方名寓意如玉石屏风般守护人体，元《世医得效方》名方。"
    },
    {
      id: "shengmaisan",
      name: "生脉散",
      type: "经典方剂",
      herbs: [
        { name: "人参", icon: "&#127807;", role: "君药", property: "甘、微苦、微温", effect: "大补元气，益肺生津，为补气要药" },
        { name: "麦冬", icon: "&#127807;", role: "臣药", property: "甘、微苦、微寒", effect: "养阴清热，润肺生津，与人参气阴双补" },
        { name: "五味子", icon: "&#127826;", role: "佐药", property: "酸、甘、温", effect: "敛肺止汗，益气生津，收敛固涩" }
      ],
      effect: "益气生津，敛阴止汗。主治气阴两虚证：汗多神疲，体倦乏力，气短懒言，咽干口渴，久咳肺虚。",
      modern: "金代《医学启源》名方，现代用于心力衰竭辅助治疗、夏季中暑、热病后期气阴两伤等。药味虽简，配伍精妙，一补一清一敛，是气阴双补的典范。"
    },
    {
      id: "erchentang",
      name: "二陈汤",
      type: "经典方剂",
      herbs: [
        { name: "半夏", icon: "&#127795;", role: "君药", property: "辛、温", effect: "燥湿化痰，降逆和胃，为治痰之主药" },
        { name: "陈皮", icon: "&#127818;", role: "臣药", property: "苦、辛、温", effect: "理气健脾，燥湿化痰，助半夏化痰之力" },
        { name: "茯苓", icon: "&#127812;", role: "佐药", property: "甘、淡、平", effect: "利水渗湿，健脾宁心，使湿去而痰消" },
        { name: "甘草", icon: "&#127795;", role: "使药", property: "甘、平", effect: "健脾和中，调和诸药" }
      ],
      effect: "燥湿化痰，理气和中。主治湿痰证：咳嗽痰多，色白易咯，胸膈痞闷，恶心呕吐，头眩心悸。",
      modern: "宋代《太平惠民和剂局方》名方，为治痰基础方，后世众多化痰方剂多由此衍化。适用于慢性支气管炎、慢性胃炎等见湿痰证者。"
    },
    {
      id: "mahuangtang",
      name: "麻黄汤",
      type: "经典方剂",
      herbs: [
        { name: "麻黄", icon: "&#127795;", role: "君药", property: "辛、微苦、温", effect: "发汗解表，宣肺平喘，为发汗峻剂" },
        { name: "桂枝", icon: "&#127795;", role: "臣药", property: "辛、甘、温", effect: "发汗解肌，温通经脉，助麻黄发汗" },
        { name: "杏仁", icon: "&#127826;", role: "佐药", property: "苦、微温", effect: "降肺气以平喘，与麻黄一宣一降" },
        { name: "甘草", icon: "&#127795;", role: "使药", property: "甘、平", effect: "调和诸药，缓和麻黄桂枝之峻烈" }
      ],
      effect: "发汗解表，宣肺平喘。主治外感风寒表实证：恶寒发热，头痛身疼，无汗而喘，舌苔薄白，脉浮紧。",
      modern: "张仲景《伤寒论》中治疗太阳伤寒的主方，是辛温解表法的代表方。现代多用于普通感冒、流行性感冒属风寒表实证者。注意：体虚多汗者忌用。"
    },
    {
      id: "guipitang",
      name: "归脾汤",
      type: "经典方剂",
      herbs: [
        { name: "人参", icon: "&#127807;", role: "君药", property: "甘、微温", effect: "大补元气，健脾益肺" },
        { name: "黄芪", icon: "&#127794;", role: "臣药", property: "甘、微温", effect: "补气固表，助人参益气健脾" },
        { name: "白术", icon: "&#127795;", role: "臣药", property: "苦、甘、温", effect: "健脾益气，燥湿助运" },
        { name: "当归", icon: "&#127795;", role: "佐药", property: "甘、辛、温", effect: "补血活血，与黄芪配伍益气生血" },
        { name: "酸枣仁", icon: "&#127826;", role: "佐药", property: "甘、酸、平", effect: "养心安神，敛汗" },
        { name: "甘草", icon: "&#127795;", role: "使药", property: "甘、平", effect: "益气和中，调和诸药" }
      ],
      effect: "益气补血，健脾养心。主治心脾气血两虚证：心悸怔忡，失眠健忘，食少体倦，面色萎黄，崩漏便血。",
      modern: "宋代《济生方》名方，后世补充了当归、远志。现代广泛用于神经衰弱、失眠症、贫血、功能性子宫出血等属心脾两虚者。是心脾同治、气血双补的代表方。"
    },
    {
      id: "bazhentang",
      name: "八珍汤",
      type: "经典方剂",
      herbs: [
        { name: "人参", icon: "&#127807;", role: "君药", property: "甘、微温", effect: "大补元气，健脾益肺" },
        { name: "熟地黄", icon: "&#127795;", role: "君药", property: "甘、微温", effect: "补血滋阴，益精填髓" },
        { name: "白术", icon: "&#127795;", role: "臣药", property: "苦、甘、温", effect: "健脾益气，燥湿助运" },
        { name: "当归", icon: "&#127795;", role: "臣药", property: "甘、辛、温", effect: "补血活血，调经止痛" },
        { name: "茯苓", icon: "&#127812;", role: "佐药", property: "甘、淡、平", effect: "健脾宁心，利水渗湿" },
        { name: "白芍", icon: "&#127800;", role: "佐药", property: "苦、酸、微寒", effect: "养血柔肝，敛阴止痛" },
        { name: "川芎", icon: "&#127795;", role: "佐药", property: "辛、温", effect: "活血行气，使补而不滞" },
        { name: "甘草", icon: "&#127795;", role: "使药", property: "甘、平", effect: "益气和中，调和诸药" }
      ],
      effect: "益气补血。主治气血两虚证：面色苍白或萎黄，头晕目眩，四肢倦怠，气短懒言，心悸怔忡，饮食减少。",
      modern: "由四君子汤与四物汤合方而成，是气血双补的经典代表方。现代广泛用于病后虚弱、贫血、慢性病恢复期、妇女月经不调等气血不足之证。"
    },
    {
      id: "baihutang",
      name: "白虎汤",
      type: "经典方剂",
      herbs: [
        { name: "石膏", icon: "", role: "君药", property: "辛、甘、大寒", effect: "清热泻火，除烦止渴，为清热之要药" },
        { name: "知母", icon: "", role: "臣药", property: "苦、甘、寒", effect: "清热泻火，滋阴润燥，助石膏清热" },
        { name: "甘草", icon: "", role: "佐使", property: "甘、平", effect: "和中益胃，调和诸药，缓石膏之寒" },
        { name: "粳米", icon: "", role: "佐使", property: "甘、平", effect: "益胃护津，防止大寒伤中" }
      ],
      effect: "清热生津。主治阳明气分热盛证：壮热面赤，烦渴引饮，汗出恶热，脉洪大有力。",
      modern: "张仲景《伤寒论》中清解阳明经热的主方。现代用于治疗流行性乙型脑炎、流行性脑脊髓膜炎、大叶性肺炎、夏季热等属气分热盛者。"
    },
    {
      id: "sinisan",
      name: "四逆散",
      type: "经典方剂",
      herbs: [
        { name: "柴胡", icon: "", role: "君药", property: "苦、辛、微寒", effect: "疏肝解郁，透邪外出，升发阳气" },
        { name: "枳壳", icon: "", role: "臣药", property: "苦、辛、酸、微寒", effect: "理气宽中，行滞消胀，与柴胡一升一降" },
        { name: "白芍", icon: "", role: "佐药", property: "苦、酸、微寒", effect: "养血柔肝，缓急止痛，敛阴和营" },
        { name: "甘草", icon: "", role: "使药", property: "甘、平", effect: "调和诸药，合白芍酸甘化阴以缓急" }
      ],
      effect: "透邪解郁，疏肝理脾。主治阳郁厥逆证：手足不温，或腹痛，或泄利下重，脉弦。",
      modern: "张仲景《伤寒论》中和解少阴之方。现代用于慢性肝炎、胆囊炎、胆石症、肋间神经痛、胃溃疡等属肝气郁结者。是疏肝理气的基础方。"
    },
    {
      id: "xuefuzhuyu",
      name: "血府逐瘀汤",
      type: "经典方剂",
      herbs: [
        { name: "桃仁", icon: "", role: "君药", property: "苦、甘、平", effect: "破血行瘀，润燥滑肠" },
        { name: "红花", icon: "", role: "君药", property: "辛、温", effect: "活血通经，祛瘀止痛" },
        { name: "当归", icon: "", role: "臣药", property: "甘、辛、温", effect: "养血活血，使祛瘀而不伤血" },
        { name: "牛膝", icon: "", role: "臣药", property: "苦、酸、平", effect: "逐瘀通经，引血下行" },
        { name: "川芎", icon: "", role: "佐药", property: "辛、温", effect: "活血行气，助桃红祛瘀" },
        { name: "柴胡", icon: "", role: "佐药", property: "苦、辛、微寒", effect: "疏肝解郁，升达清阳" },
        { name: "枳壳", icon: "", role: "佐药", property: "苦、辛、酸、微寒", effect: "行气宽胸，使气行则血行" },
        { name: "甘草", icon: "", role: "使药", property: "甘、平", effect: "调和诸药" }
      ],
      effect: "活血化瘀，行气止痛。主治胸中血瘀证：胸痛头痛，痛如针刺，心悸失眠，急躁易怒，唇暗舌紫。",
      modern: "清代王清任《医林改错》五大逐瘀汤之首。现代用于冠心病心绞痛、风湿性心脏病、脑血栓形成、血管神经性头痛等属血瘀气滞者。"
    },
    {
      id: "duhuojisheng",
      name: "独活寄生汤",
      type: "经典方剂",
      herbs: [
        { name: "独活", icon: "", role: "君药", property: "辛、苦、微温", effect: "祛风除湿，通痹止痛，善治下部痹痛" },
        { name: "桑寄生", icon: "", role: "臣药", property: "苦、甘、平", effect: "祛风湿，补肝肾，强筋骨" },
        { name: "杜仲", icon: "", role: "臣药", property: "甘、微辛、温", effect: "补肝肾，强筋骨，助桑寄生扶正" },
        { name: "牛膝", icon: "", role: "臣药", property: "苦、酸、平", effect: "补肝肾，强腰膝，引药下行" },
        { name: "当归", icon: "", role: "佐药", property: "甘、辛、温", effect: "养血活血，寓治风先治血之意" },
        { name: "川芎", icon: "", role: "佐药", property: "辛、温", effect: "活血行气，祛风止痛" },
        { name: "白芍", icon: "", role: "佐药", property: "苦、酸、微寒", effect: "养血柔肝，缓急止痛" },
        { name: "人参", icon: "", role: "佐药", property: "甘、微温", effect: "益气健脾，扶正祛邪" },
        { name: "茯苓", icon: "", role: "佐药", property: "甘、淡、平", effect: "健脾利湿" },
        { name: "甘草", icon: "", role: "使药", property: "甘、平", effect: "调和诸药" }
      ],
      effect: "祛风湿，止痹痛，益肝肾，补气血。主治痹证日久，肝肾两虚，气血不足证：腰膝冷痛，屈伸不利，心悸气短。",
      modern: "唐代孙思邈《备急千金要方》名方，是扶正祛邪治疗痹证的代表方。现代用于慢性关节炎、类风湿性关节炎、坐骨神经痛、腰椎间盘突出等。"
    },
    {
      id: "pingweisan",
      name: "平胃散",
      type: "经典方剂",
      herbs: [
        { name: "苍术", icon: "", role: "君药", property: "辛、苦、温", effect: "燥湿健脾，芳香化浊，为除湿要药" },
        { name: "厚朴", icon: "", role: "臣药", property: "苦、辛、温", effect: "行气化湿，消胀除满" },
        { name: "陈皮", icon: "", role: "佐药", property: "苦、辛、温", effect: "理气和胃，芳香醒脾，助苍术厚朴化湿" },
        { name: "甘草", icon: "", role: "使药", property: "甘、平", effect: "调和诸药，益气和胃" }
      ],
      effect: "燥湿运脾，行气和胃。主治湿滞脾胃证：脘腹胀满，不思饮食，口淡无味，恶心呕吐，嗳气吞酸，肢体沉重。",
      modern: "宋代《太平惠民和剂局方》名方，是治疗湿滞脾胃的基础方。现代用于慢性胃炎、消化道功能紊乱、胃及十二指肠溃疡等属湿滞脾胃者。"
    },
    {
      id: "baihegujin",
      name: "百合固金汤",
      type: "经典方剂",
      herbs: [
        { name: "百合", icon: "", role: "君药", property: "甘、微寒", effect: "养阴润肺，清心安神" },
        { name: "麦冬", icon: "", role: "臣药", property: "甘、微苦、微寒", effect: "养阴清热，润肺生津" },
        { name: "生地黄", icon: "", role: "臣药", property: "甘、苦、寒", effect: "清热凉血，养阴生津" },
        { name: "熟地黄", icon: "", role: "臣药", property: "甘、微温", effect: "补血滋阴，益精填髓" },
        { name: "当归", icon: "", role: "佐药", property: "甘、辛、温", effect: "养血和血，润肺止咳" },
        { name: "白芍", icon: "", role: "佐药", property: "苦、酸、微寒", effect: "养血敛阴，柔肝止痛" },
        { name: "甘草", icon: "", role: "使药", property: "甘、平", effect: "调和诸药" }
      ],
      effect: "养阴润肺，化痰止咳。主治肺肾阴虚，虚火上炎证：咳嗽气喘，痰中带血，咽喉燥痛，手足心热。",
      modern: "明代周慎斋方，是治疗肺肾阴虚咳嗽的常用方。现代用于肺结核、慢性支气管炎、支气管扩张、慢性咽喉炎等属肺肾阴虚者。"
    },
    {
      id: "suanzaoren",
      name: "酸枣仁汤",
      type: "经典方剂",
      herbs: [
        { name: "酸枣仁", icon: "", role: "君药", property: "甘、酸、平", effect: "养心安神，敛汗生津，为治失眠要药" },
        { name: "知母", icon: "", role: "臣药", property: "苦、甘、寒", effect: "滋阴清热，除烦安神" },
        { name: "茯苓", icon: "", role: "佐药", property: "甘、淡、平", effect: "宁心安神，健脾渗湿" },
        { name: "川芎", icon: "", role: "佐药", property: "辛、温", effect: "活血行气，调肝血而疏肝气" },
        { name: "甘草", icon: "", role: "使药", property: "甘、平", effect: "和中缓急，调和诸药" }
      ],
      effect: "养血安神，清热除烦。主治肝血不足，虚热内扰证：虚烦失眠，心悸不安，头目眩晕，咽干口燥。",
      modern: "张仲景《金匮要略》治疗失眠的经典名方。现代用于神经衰弱、心脏神经官能症、更年期综合征等引起的虚烦不眠。是中医安神剂的代表方。"
    }
  ];

  /* 当前配方索引 */
  var currentRecipeIndex = 0;
  var usedHerbNames = [];

  /* 药材名 → 图片路径映射 */
  var herbImageMap = {
    '人参':     'images/herbs/renshen.jpg',
    '白术':     'images/herbs/baizhu.jpg',
    '茯苓':     'images/herbs/fuling.jpg',
    '甘草':     'images/herbs/gancao.jpg',
    '当归':     'images/herbs/danggui.jpg',
    '熟地黄':   'images/herbs/shudi.jpg',
    '白芍':     'images/herbs/baishao.jpg',
    '川芎':     'images/herbs/chuanxiong.jpg',
    '柴胡':     'images/herbs/chaihu.jpg',
    '黄芩':     'images/herbs/huangqin.jpg',
    '黄芪':     'images/herbs/huangqi.jpg',
    '陈皮':     'images/herbs/chenpi.jpg',
    '山楂':     'images/herbs/shanzha.jpg',
    '枸杞':     'images/herbs/gouqi.jpg',
    '菊花':     'images/herbs/juhua.jpg',
    '金银花':   'images/herbs/jinyinhua.jpg',
    '葛根':     'images/herbs/gegen.jpg',
    '连翘':     'images/herbs/lianqiao.jpg',
    '半夏':     'images/herbs/banxia.jpg',
    '麦冬':     'images/herbs/maidong.jpg',
    '五味子':   'images/herbs/wuweizi.jpg',
    '防风':     'images/herbs/fangfeng.jpg',
    '酸枣仁':   'images/herbs/suanzaoren.jpg',
    '红花':     'images/herbs/honghua.jpg',
    '山药':     'images/herbs/shangyao.jpg',
    '丹参':     'images/herbs/danshen.jpg',
    '黄连':     'images/herbs/huanglian.jpg',
    '大黄':     'images/herbs/dahuang.jpg',
    '杜仲':     'images/herbs/duzhong.jpg',
    '天麻':     'images/herbs/tianma.jpg',
    '板蓝根':   'images/herbs/banlangen.jpg',
    '三七':     'images/herbs/sanqi.jpg',
    '桂枝':     'images/herbs/guizhi.jpg',
    '麻黄':     'images/herbs/mahuang.jpg',
    '杏仁':     'images/herbs/xingren.jpg',
    '薏苡仁':   'images/herbs/yiyiren.jpg',
    '乌梅':     'images/herbs/wumei.jpg',
    '红枣':     'images/herbs/hongzao.jpg',
    '山茱萸':   'images/herbs/shanzhuyu.jpg',
    '泽泻':     'images/herbs/zexie.jpg',
    '牡丹皮':   'images/herbs/mudanpi.jpg',
    '沙棘':     'images/herbs/shaJI.jpg',
    '冬虫夏草': 'images/herbs/dongchongxiacao.jpg',
    '阿胶':     'images/herbs/ejiao.jpg',
    '鹿茸':     'images/herbs/lurong.jpg',
    '生姜':     'images/herbs/shengjiang.jpg',
    '薄荷':     'images/herbs/bohe.jpg',
    '知母':     'images/herbs/zhimu.jpg',
    '栀子':     'images/herbs/zhizi.jpg',
    '桑叶':     'images/herbs/sangye.jpg',
    '荆芥':     'images/herbs/jingjie.jpg',
    '木香':     'images/herbs/muxiang.jpg',
    '枳壳':     'images/herbs/zhike.jpg',
    '桃仁':     'images/herbs/taoren.jpg',
    '牛膝':     'images/herbs/niuxi.jpg',
    '何首乌':   'images/herbs/heshouwu.jpg',
    '百合':     'images/herbs/baihe.jpg',
    '玉竹':     'images/herbs/yuzhu.jpg',
    '莲子':     'images/herbs/lianzi.jpg',
    '芡实':     'images/herbs/qianshi.jpg',
    '桑寄生':   'images/herbs/sangjisheng.jpg',
    '独活':     'images/herbs/duhuo.jpg',
    '苍术':     'images/herbs/cangzhu.jpg',
    '厚朴':     'images/herbs/houpo.jpg',
    '石斛':     'images/herbs/shihu.jpg',
    '益母草':   'images/herbs/yimucao.jpg',
    '肉苁蓉':   'images/herbs/roucongrong.jpg',
    '石膏':     'images/herbs/shigao.jpg',
    '粳米':     'images/herbs/jingmi.jpg',
    '生地黄':   'images/herbs/shengdihuang.jpg'
  };

  var availableHerbImages = {
    'images/herbs/renshen.jpg': true,
    'images/herbs/baizhu.jpg': true,
    'images/herbs/fuling.jpg': true,
    'images/herbs/gancao.jpg': true,
    'images/herbs/danggui.jpg': true,
    'images/herbs/shudi.jpg': true,
    'images/herbs/baishao.jpg': true,
    'images/herbs/chuanxiong.jpg': true,
    'images/herbs/chaihu.jpg': true,
    'images/herbs/huangqin.jpg': true,
    'images/herbs/huangqi.jpg': true,
    'images/herbs/chenpi.jpg': true,
    'images/herbs/shanzha.jpg': true,
    'images/herbs/gouqi.jpg': true,
    'images/herbs/juhua.jpg': true,
    'images/herbs/jinyinhua.jpg': true,
    'images/herbs/gegen.jpg': true,
    'images/herbs/lianqiao.jpg': true,
    'images/herbs/suanzaoren.jpg': true,
    'images/herbs/sanqi.jpg': true,
    'images/herbs/banxia.jpg': true,
    'images/herbs/maidong.jpg': true,
    'images/herbs/wuweizi.jpg': true,
    'images/herbs/fangfeng.jpg': true,
    'images/herbs/honghua.jpg': true,
    'images/herbs/shangyao.jpg': true,
    'images/herbs/danshen.jpg': true,
    'images/herbs/huanglian.jpg': true,
    'images/herbs/dahuang.jpg': true,
    'images/herbs/duzhong.jpg': true,
    'images/herbs/tianma.jpg': true,
    'images/herbs/banlangen.jpg': true,
    'images/herbs/guizhi.jpg': true,
    'images/herbs/mahuang.jpg': true,
    'images/herbs/xingren.jpg': true,
    'images/herbs/yiyiren.jpg': true,
    'images/herbs/wumei.jpg': true,
    'images/herbs/hongzao.jpg': true,
    'images/herbs/shanzhuyu.jpg': true,
    'images/herbs/zexie.jpg': true,
    'images/herbs/mudanpi.jpg': true,
    'images/herbs/shaJI.jpg': true,
    'images/herbs/dongchongxiacao.jpg': true,
    'images/herbs/ejiao.jpg': true,
    'images/herbs/lurong.jpg': true,
    'images/herbs/shengjiang.jpg': true,
    'images/herbs/bohe.jpg': true,
    'images/herbs/zhimu.jpg': true,
    'images/herbs/zhizi.jpg': true,
    'images/herbs/sangye.jpg': true,
    'images/herbs/jingjie.jpg': true,
    'images/herbs/muxiang.jpg': true,
    'images/herbs/zhike.jpg': true,
    'images/herbs/taoren.jpg': true,
    'images/herbs/niuxi.jpg': true,
    'images/herbs/heshouwu.jpg': true,
    'images/herbs/baihe.jpg': true,
    'images/herbs/yuzhu.jpg': true,
    'images/herbs/lianzi.jpg': true,
    'images/herbs/qianshi.jpg': true,
    'images/herbs/sangjisheng.jpg': true,
    'images/herbs/duhuo.jpg': true,
    'images/herbs/cangzhu.jpg': true,
    'images/herbs/houpo.jpg': true,
    'images/herbs/shihu.jpg': true,
    'images/herbs/yimucao.jpg': true,
    'images/herbs/roucongrong.jpg': true,
    'images/herbs/shigao.jpg': true,
    'images/herbs/jingmi.jpg': true,
    'images/herbs/shengdihuang.jpg': true
  };

  function getHerbImg(name) {
    var imgPath = herbImageMap[name] || '';
    return availableHerbImages[imgPath] ? imgPath : '';
  }

  function getHerbColor(name) {
    var colors = {
      '人参': '#d4a574', '白术': '#a1887f', '茯苓': '#bcaaa4', '甘草': '#d4a017',
      '当归': '#daa520', '熟地黄': '#5d4037', '白芍': '#f48fb1', '川芎': '#8d6e63',
      '柴胡': '#81c784', '黄芩': '#fdd835', '黄芪': '#c4a265', '陈皮': '#ff9800',
      '山楂': '#ff7043', '枸杞': '#e8a0a0', '菊花': '#ffcc02', '金银花': '#fff176',
      '葛根': '#81c784', '连翘': '#ffee58', '半夏': '#ffb74d', '麦冬': '#a5d6a7',
      '五味子': '#e91e63', '防风': '#a5d6a7', '酸枣仁': '#a1887f', '红花': '#e91e63',
      '山药': '#bcaaa4', '丹参': '#e57373', '黄连': '#ffcc02', '大黄': '#e65100',
      '杜仲': '#8d6e63', '天麻': '#b39ddb', '板蓝根': '#b8956a', '三七': '#c9956b',
      '桂枝': '#c4a265', '麻黄': '#ffb74d', '杏仁': '#ffcc80', '薏苡仁': '#fff9c4',
      '乌梅': '#5d4037', '红枣': '#e57373', '山茱萸': '#f48fb1', '泽泻': '#a5d6a7',
      '牡丹皮': '#f48fb1', '沙棘': '#ff5722', '冬虫夏草': '#8d6e63', '阿胶': '#5d4037',
      '鹿茸': '#bcaaa4', '生姜': '#ffb74d', '薄荷': '#66bb6a',
      '知母': '#fff9c4', '栀子': '#ffcc02', '桑叶': '#a5d6a7', '荆芥': '#81c784',
      '木香': '#a1887f', '枳壳': '#ff9800', '桃仁': '#f48fb1', '牛膝': '#c4a265',
      '何首乌': '#5d4037', '百合': '#fff9c4', '玉竹': '#a5d6a7', '莲子': '#d4c5b9',
      '芡实': '#d4c5b9', '桑寄生': '#8d6e63', '独活': '#a1887f', '苍术': '#bcaaa4',
      '厚朴': '#5d4037', '石斛': '#81c784', '益母草': '#a5d6a7', '肉苁蓉': '#8d6e63',
      '石膏': '#fffde7', '粳米': '#fff9c4', '生地黄': '#5d4037'
    };
    return colors[name] || '';
  }

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
      var imgPath = getHerbImg(herb.name);
      html += '<div class="herb-ingredient" data-name="' + herb.name + '" onclick="flyToCauldron(this)">';
      if (imgPath) {
        html += '  <span class="herb-icon"><img src="' + imgPath + '" alt="' + herb.name + '" loading="lazy"></span>';
      } else {
        html += '  <span class="herb-icon herb-icon-text" style="background:' + (getHerbColor(herb.name) || '#8B7355') + ';">' + herb.name.charAt(0) + '</span>';
      }
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
    var lift = Math.min(72, Math.max(42, Math.abs(deltaY) * 0.28));
    var arc = Math.min(112, Math.max(68, Math.abs(deltaX) * 0.16 + Math.abs(deltaY) * 0.18));
    var rotate = deltaX >= 0 ? 460 : -460;

    clone.style.cssText =
      'position:fixed; left:' + herbRect.left + 'px; top:' + herbRect.top + 'px;' +
      'width:' + herbRect.width + 'px; text-align:center; font-size:2em;' +
      'z-index:9999; pointer-events:none;' +
      '--fly-x:' + deltaX + 'px; --fly-y:' + deltaY + 'px;' +
      '--fly-lift:' + lift + 'px; --fly-arc:' + arc + 'px; --fly-rotate:' + rotate + 'deg;';
    document.body.appendChild(clone);

    cauldron.classList.add('is-catching');
    setTimeout(function() {
      cauldron.classList.remove('is-catching');
    }, 420);

    /* 动画结束后移除克隆 */
    clone.addEventListener('animationend', function() {
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
      if (cauldron) cauldron.classList.add('is-brewing');
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
    if (cauldron) {
      cauldron.classList.remove('is-brewing');
      cauldron.classList.remove('is-catching');
    }
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

  (function() {
    var params = new URLSearchParams(window.location.search);
    var searchTerm = params.get('search');
    var matchedIndex = -1;

    if (!searchTerm) return;

    for (var i = 0; i < recipes.length; i++) {
      if (recipes[i].name.indexOf(searchTerm) !== -1 ||
          searchTerm.indexOf(recipes[i].name) !== -1) {
        matchedIndex = i;
        break;
      }
    }

    if (matchedIndex === -1) return;

    loadRecipe(matchedIndex);
    resetAlchemy();

    setTimeout(function() {
      var activeTab = document.querySelector('.bamboo-item.active');
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
      if (herbsPool) {
        herbsPool.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 250);
  })();

  /* 渲染全部方剂卡片列表（分类展示） */
  function renderAllRecipes() {
    var grid = document.getElementById('all-recipes-grid');
    if (!grid) return;

    var html = '';
    recipes.forEach(function(recipe, idx) {
      var herbNames = recipe.herbs.map(function(h) { return h.name; }).join('、');
      html += '<div class="recipe-card-mini" data-recipe-idx="' + idx + '">';
      html += '  <span class="recipe-type-tag">' + recipe.type + '</span>';
      html += '  <h4>' + recipe.name + '</h4>';
      html += '  <p class="recipe-herbs-mini">' + herbNames + '</p>';
      html += '  <span class="recipe-card-link">查看配伍 &#10132;</span>';
      html += '</div>';
    });
    grid.innerHTML = html;

    grid.addEventListener('click', function(e) {
      var card = e.target.closest('.recipe-card-mini');
      if (!card) return;
      var idx = card.getAttribute('data-recipe-idx');
      var tab = document.querySelector('.bamboo-item[data-recipe="' + idx + '"]');
      if (tab) tab.click();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  renderAllRecipes();

})();
