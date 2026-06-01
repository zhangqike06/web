/* ============================================================
 * herbs.js - 本草百科页脚本
 * 功能：药材数据渲染、多维筛选、详情弹窗、搜索跳转定位
 * ============================================================ */

(function() {
  'use strict';

  var herbsData = [
    { id: 1, name: '人参', category: '补虚', property: '甘、微苦、微温', meridian: '脾、肺、心', effect: '大补元气，补脾益肺，生津养血，安神益智。', desc: '人参是传统名贵中药材，常用于气虚乏力、津伤口渴、脾肺不足等调养场景。', recipe: '常见于四君子汤、生脉散。', icon: '&#127807;', bgColor: 'linear-gradient(135deg, #f5e6d3, #d4a574)', img: 'images/herbs/renshen.jpg' },
    { id: 2, name: '枸杞', category: '补虚', property: '甘、平', meridian: '肝、肾', effect: '滋补肝肾，益精明目，润肺。', desc: '枸杞性质平和，适合日常食养，常用于明目与温和补益。', recipe: '常见于枸杞菊花茶、药膳汤羹。', icon: '&#127826;', bgColor: 'linear-gradient(135deg, #fce4e4, #e8a0a0)', img: 'images/herbs/gouqi.jpg' },
    { id: 3, name: '当归', category: '补虚', property: '甘、辛、温', meridian: '肝、心、脾', effect: '补血活血，调经止痛，润肠通便。', desc: '当归是补血与调经常用药材，妇科调养中应用广泛。', recipe: '常见于四物汤、当归补血汤。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #f5deb3, #daa520)', img: 'images/herbs/danggui.jpg' },
    { id: 4, name: '黄芪', category: '补虚', property: '甘、微温', meridian: '脾、肺', effect: '补气固表，利尿托毒，生肌。', desc: '黄芪是补气常用药，适用于体虚、自汗、乏力等调理思路。', recipe: '常见于玉屏风散、补中益气汤。', icon: '&#127794;', bgColor: 'linear-gradient(135deg, #e8d5b7, #c4a265)', img: 'images/herbs/huangqi.jpg' },
    { id: 5, name: '金银花', category: '清热', property: '甘、寒', meridian: '肺、心、胃', effect: '清热解毒，疏散风热。', desc: '金银花偏于清解热毒，常见于咽喉不适和风热感受相关调理。', recipe: '常见于银翘散、五味消毒饮。', icon: '&#127800;', bgColor: 'linear-gradient(135deg, #fffde7, #fff176)', img: 'images/herbs/jinyinhua.jpg' },
    { id: 6, name: '板蓝根', category: '清热', property: '苦、寒', meridian: '心、胃', effect: '清热解毒，凉血利咽。', desc: '板蓝根常用于清热解毒、咽喉不利相关场景，是家用常见药材之一。', recipe: '常见于普济消毒饮、板蓝根颗粒。', icon: '&#127793;', bgColor: 'linear-gradient(135deg, #d4c5a9, #b8956a)' },
    { id: 7, name: '菊花', category: '清热', property: '辛、甘、微寒', meridian: '肺、肝', effect: '疏风清热，平肝明目。', desc: '菊花清雅平和，适合风热头目不清及日常明目茶饮。', recipe: '常见于桑菊饮、枸杞菊花茶。', icon: '&#127804;', bgColor: 'linear-gradient(135deg, #fff9c4, #ffcc02)', img: 'images/herbs/juhua.jpg' },
    { id: 8, name: '薄荷', category: '解表', property: '辛、凉', meridian: '肺、肝', effect: '疏散风热，清利头目，利咽。', desc: '薄荷气味清凉，适合风热初起、咽喉不适和提神茶饮。', recipe: '常见于银翘散、薄荷茶。', icon: '&#127807;', bgColor: 'linear-gradient(135deg, #c8e6c9, #66bb6a)' },
    { id: 9, name: '生姜', category: '解表', property: '辛、微温', meridian: '肺、脾、胃', effect: '解表散寒，温中止呕，温肺止咳。', desc: '生姜既是厨房常见食材，也是解表温中常用药材。', recipe: '常见于姜枣茶、小半夏汤。', icon: '&#129364;', bgColor: 'linear-gradient(135deg, #fff3e0, #ffb74d)' },
    { id: 10, name: '陈皮', category: '理气', property: '苦、辛、温', meridian: '脾、肺', effect: '理气健脾，燥湿化痰。', desc: '陈皮擅长理气和中，是脾胃气滞、痰湿停聚常见用药。', recipe: '常见于二陈汤、平胃散。', icon: '&#127818;', bgColor: 'linear-gradient(135deg, #ffe0b2, #ff9800)', img: 'images/herbs/chenpi.jpg' },
    { id: 11, name: '茯苓', category: '利水', property: '甘、淡、平', meridian: '心、肺、脾、肾', effect: '利水渗湿，健脾宁心。', desc: '茯苓利水而不伤正，常用于湿困脾胃和心神不宁调理。', recipe: '常见于四君子汤、五苓散。', icon: '&#127812;', bgColor: 'linear-gradient(135deg, #efebe9, #bcaaa4)', img: 'images/herbs/fuling.jpg' },
    { id: 12, name: '川芎', category: '活血', property: '辛、温', meridian: '肝、胆、心包', effect: '活血行气，祛风止痛。', desc: '川芎善走而不守，常用于头痛、血瘀、经行不畅等调理思路。', recipe: '常见于四物汤、川芎茶调散。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #d7ccc8, #8d6e63)', img: 'images/herbs/chuanxiong.jpg' },
    { id: 13, name: '三七', category: '活血', property: '甘、微苦、温', meridian: '肝、胃', effect: '散瘀止血，消肿定痛。', desc: '三七兼具止血与化瘀特点，在跌打损伤与瘀滞调理中很常见。', recipe: '常见于跌打损伤调理及三七粉食养。', icon: '&#129361;', bgColor: 'linear-gradient(135deg, #e8d5b7, #c9956b)' },
    { id: 14, name: '大黄', category: '清热', property: '苦、寒', meridian: '脾、胃、大肠、肝、心包', effect: '泻下攻积，清热泻火，凉血解毒。', desc: '大黄药性较强，偏于通腑泄热，多用于实热积滞相关辨证。', recipe: '常见于大承气汤、大黄牡丹汤。', icon: '&#127796;', bgColor: 'linear-gradient(135deg, #ffcc80, #e65100)' },
    { id: 15, name: '甘草', category: '补虚', property: '甘、平', meridian: '心、肺、脾、胃', effect: '补脾益气，清热解毒，调和诸药。', desc: '甘草用途极广，既能补益，又常用于缓急和调和药性。', recipe: '常见于四君子汤、炙甘草汤。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #fff9c4, #d4a017)', img: 'images/herbs/gancao.jpg' },
    { id: 16, name: '白术', category: '补虚', property: '苦、甘、温', meridian: '脾、胃', effect: '健脾益气，燥湿利水，止汗安胎。', desc: '白术偏于健脾燥湿，是脾虚夹湿体质中很常见的药材。', recipe: '常见于四君子汤、参苓白术散。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #efebe9, #a1887f)', img: 'images/herbs/baizhu.jpg' },
    { id: 17, name: '柴胡', category: '解表', property: '苦、辛、微寒', meridian: '肝、胆、肺', effect: '疏散退热，疏肝解郁，升举阳气。', desc: '柴胡常用于少阳证、肝郁不舒以及升清举陷的辨证思路。', recipe: '常见于小柴胡汤、逍遥散。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #e8f5e9, #81c784)', img: 'images/herbs/chaihu.jpg' },
    { id: 18, name: '麦冬', category: '补虚', property: '甘、微苦、微寒', meridian: '心、肺、胃', effect: '养阴生津，润肺清心。', desc: '麦冬适合阴虚津少、咽干口燥、肺胃失润等调养场景。', recipe: '常见于生脉散、麦门冬汤。', icon: '&#127807;', bgColor: 'linear-gradient(135deg, #e8f5e9, #a5d6a7)' },
    { id: 19, name: '五味子', category: '收涩', property: '酸、甘、温', meridian: '肺、心、肾', effect: '敛肺止咳，益气生津，补肾宁心。', desc: '五味子长于收敛固涩，在久咳、汗多、津伤等调理里较常见。', recipe: '常见于生脉散、五味子茶饮。', icon: '&#127826;', bgColor: 'linear-gradient(135deg, #fce4ec, #e91e63)' },
    { id: 20, name: '半夏', category: '化痰', property: '辛、温', meridian: '脾、胃、肺', effect: '燥湿化痰，降逆止呕，消痞散结。', desc: '半夏是化痰止呕常用药，临床多用其炮制品。', recipe: '常见于二陈汤、半夏厚朴汤。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #fff3e0, #ffb74d)' },
    { id: 21, name: '冬虫夏草', category: '补虚', property: '甘、温', meridian: '肺、肾', effect: '补肾益肺，止血化痰。', desc: '冬虫夏草兼顾肺肾两虚调补，偏于名贵滋养。', recipe: '常见于炖汤药膳。', icon: '&#128027;', bgColor: 'linear-gradient(135deg, #d7ccc8, #8d6e63)' },
    { id: 22, name: '阿胶', category: '补虚', property: '甘、平', meridian: '肺、肝、肾', effect: '补血止血，滋阴润燥。', desc: '阿胶偏于补血滋阴，常用于血虚与阴虚燥咳等调理。', recipe: '常见于阿胶糕、黄土汤。', icon: '&#129475;', bgColor: 'linear-gradient(135deg, #3e2723, #5d4037)' },
    { id: 23, name: '鹿茸', category: '补虚', property: '甘、咸、温', meridian: '肾、肝', effect: '壮肾阳，益精血，强筋骨。', desc: '鹿茸偏于温补肾阳，适用于阳虚、精血不足等调养思路。', recipe: '常见于温补类药膳和泡酒。', icon: '&#129420;', bgColor: 'linear-gradient(135deg, #efebe9, #bcaaa4)' },
    { id: 24, name: '沙棘', category: '活血', property: '酸、涩、温', meridian: '脾、胃、肺、心', effect: '健脾消食，止咳祛痰，活血散瘀。', desc: '沙棘兼具食养属性，常见于健脾、润肺及活血方向的调养。', recipe: '常见于沙棘汁、沙棘油相关制品。', icon: '&#127826;', bgColor: 'linear-gradient(135deg, #ff9800, #ff5722)' },
    { id: 25, name: '白芍', category: '补虚', property: '苦、酸、甘、微寒', meridian: '肝、脾', effect: '养血调经，柔肝止痛，敛阴止汗。', desc: '白芍是养血柔肝常用药，对血虚肝郁所致的月经不调、胸胁腹痛、四肢挛急等有良效。', recipe: '常见于四物汤、芍药甘草汤、逍遥散。', icon: '&#127800;', bgColor: 'linear-gradient(135deg, #fce4ec, #f48fb1)', img: 'images/herbs/baishao.jpg' },
    { id: 26, name: '葛根', category: '解表', property: '甘、辛、凉', meridian: '脾、胃', effect: '解肌退热，升阳止泻，生津止渴，透疹。', desc: '葛根善解肌表之热，又能升发脾胃清阳之气，常用于项背强痛、烦热消渴等证。', recipe: '常见于葛根汤、葛根芩连汤。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #e8f5e9, #81c784)', img: 'images/herbs/gegen.jpg' },
    { id: 27, name: '黄芩', category: '清热', property: '苦、寒', meridian: '肺、胃、胆、大肠', effect: '清热燥湿，泻火解毒，止血安胎。', desc: '黄芩长于清上焦肺热，兼能清热安胎，是湿温暑湿、肺热咳嗽的常用药。', recipe: '常见于小柴胡汤、黄芩汤、葛根芩连汤。', icon: '&#127800;', bgColor: 'linear-gradient(135deg, #fff9c4, #fdd835)', img: 'images/herbs/huangqin.jpg' },
    { id: 28, name: '连翘', category: '清热', property: '苦、微寒', meridian: '肺、心、胆', effect: '清热解毒，消肿散结，疏散风热。', desc: '连翘被誉为"疮家圣药"，善治痈肿疮毒、瘰疬痰核，外感风热亦常用。', recipe: '常见于银翘散、连翘败毒散。', icon: '&#127800;', bgColor: 'linear-gradient(135deg, #fffde7, #ffee58)', img: 'images/herbs/lianqiao.jpg' },
    { id: 29, name: '山楂', category: '消食', property: '酸、甘、微温', meridian: '脾、胃、肝', effect: '消食化积，行气散瘀，降脂化浊。', desc: '山楂为消油腻肉食积滞之要药，又兼活血化瘀之功，药食两用，酸甜可口。', recipe: '常见于大山楂丸、山楂茶饮、药膳。', icon: '&#127826;', bgColor: 'linear-gradient(135deg, #fbe9e7, #ff7043)', img: 'images/herbs/shanzha.jpg' },
    { id: 30, name: '熟地黄', category: '补虚', property: '甘、微温', meridian: '肝、肾', effect: '补血滋阴，益精填髓。', desc: '熟地黄为补血要药，也是滋阴补肾的主药，常用于血虚萎黄、肝肾阴虚之证。', recipe: '常见于四物汤、六味地黄丸、左归丸。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #3e2723, #5d4037)', img: 'images/herbs/shudi.jpg' },
    { id: 31, name: '山药', category: '补虚', property: '甘、平', meridian: '脾、肺、肾', effect: '补脾养胃，生津益肺，补肾固精。', desc: '山药药食同源，性质平和，补而不燥，是脾胃虚弱、肺虚久咳、肾虚遗精的常用调养之品。', recipe: '常见于参苓白术散、六味地黄丸、山药粥。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #efebe9, #bcaaa4)' },
    { id: 32, name: '丹参', category: '活血', property: '苦、微寒', meridian: '心、肝', effect: '活血祛瘀，凉血消痈，清心除烦。', desc: '丹参善入血分，既能活血又能凉血，祛瘀而不伤血，有"一味丹参，功同四物"之说。', recipe: '常见于丹参饮、复方丹参片。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #fce4ec, #e57373)' },
    { id: 33, name: '防风', category: '解表', property: '辛、甘、微温', meridian: '膀胱、肝、脾', effect: '祛风解表，胜湿止痛，止痉。', desc: '防风为风中润剂，祛风而不燥烈，无论风寒风热皆可配伍使用，兼能胜湿止泻。', recipe: '常见于玉屏风散、防风通圣散、痛泻要方。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #e8f5e9, #a5d6a7)' },
    { id: 34, name: '黄连', category: '清热', property: '苦、寒', meridian: '心、肝、胃、大肠', effect: '清热燥湿，泻火解毒。', desc: '黄连大苦大寒，善清中焦湿热，泻心胃实火，是湿热痢疾、胃火炽盛之要药。', recipe: '常见于黄连解毒汤、左金丸、黄连阿胶汤。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #fff3e0, #ffcc02)' },
    { id: 35, name: '天麻', category: '平肝', property: '甘、平', meridian: '肝', effect: '息风止痉，平抑肝阳，祛风通络。', desc: '天麻为治风圣药，主治肝风内动所致的头痛眩晕、肢体麻木、惊痫抽搐等。', recipe: '常见于天麻钩藤饮、半夏白术天麻汤、天麻炖鸡。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #ede7f6, #b39ddb)' },
    { id: 36, name: '杜仲', category: '补虚', property: '甘、微辛、温', meridian: '肝、肾', effect: '补肝肾，强筋骨，安胎。', desc: '杜仲善补肝肾而强腰膝，是腰痛、筋骨无力之要药，兼能固冲任安胎元。', recipe: '常见于独活寄生汤、右归丸、杜仲壮腰汤。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #d7ccc8, #8d6e63)' },
    { id: 37, name: '红花', category: '活血', property: '辛、温', meridian: '心、肝', effect: '活血通经，散瘀止痛。', desc: '红花辛散温通，善通利血脉，为血瘀诸证的常用药，尤其适用于妇科血瘀经闭。', recipe: '常见于桃红四物汤、血府逐瘀汤。', icon: '&#127800;', bgColor: 'linear-gradient(135deg, #fce4ec, #e91e63)' },
    { id: 38, name: '桂枝', category: '解表', property: '辛、甘、温', meridian: '心、肺、膀胱', effect: '发汗解肌，温通经脉，助阳化气。', desc: '桂枝辛甘温煦，外可发散风寒，内可温通经脉，为伤寒第一要药。', recipe: '常见于桂枝汤、麻黄汤、苓桂术甘汤。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #e8d5b7, #c4a265)' },
    { id: 39, name: '酸枣仁', category: '安神', property: '甘、酸、平', meridian: '心、肝', effect: '养心安神，敛汗生津。', desc: '酸枣仁为治疗虚烦不眠之要药，善养心阴、益肝血而安神，兼能敛汗。', recipe: '常见于酸枣仁汤、天王补心丹。', icon: '&#127826;', bgColor: 'linear-gradient(135deg, #d7ccc8, #a1887f)' },
    { id: 40, name: '薏苡仁', category: '利水', property: '甘、淡、微寒', meridian: '脾、胃、肺', effect: '利水渗湿，健脾止泻，清热排脓。', desc: '薏苡仁药食两用，利水而不伤正，补脾而不滋腻，是中医食疗养生的常用之品。', recipe: '常见于三仁汤、薏苡仁粥、薏苡附子败酱散。', icon: '&#127793;', bgColor: 'linear-gradient(135deg, #fffde7, #fff9c4)' },
    { id: 41, name: '知母', category: '清热', property: '苦、甘、寒', meridian: '肺、胃、肾', effect: '清热泻火，滋阴润燥。', desc: '知母上清肺热，中泻胃火，下滋肾阴，是清热滋阴并重的要药。', recipe: '常见于白虎汤、知柏地黄丸。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #fffde7, #fff9c4)' },
    { id: 42, name: '栀子', category: '清热', property: '苦、寒', meridian: '心、肺、三焦', effect: '泻火除烦，清热利湿，凉血解毒。', desc: '栀子善清三焦之火，尤长于清心除烦，是热病心烦、湿热黄疸的常用药。', recipe: '常见于栀子豉汤、茵陈蒿汤。', icon: '&#127800;', bgColor: 'linear-gradient(135deg, #fff9c4, #ffcc02)' },
    { id: 43, name: '桑叶', category: '解表', property: '甘、苦、寒', meridian: '肺、肝', effect: '疏散风热，清肺润燥，平肝明目。', desc: '桑叶轻清发散，善疏风热而清肺，兼能凉血明目，是风热感冒常用药。', recipe: '常见于桑菊饮、桑杏汤。', icon: '&#127810;', bgColor: 'linear-gradient(135deg, #e8f5e9, #a5d6a7)' },
    { id: 44, name: '荆芥', category: '解表', property: '辛、微温', meridian: '肺、肝', effect: '祛风解表，透疹消疮，止血。', desc: '荆芥性平和，无论风寒风热皆可应用，炒炭后又能止血，用途广泛。', recipe: '常见于荆防败毒散、银翘散。', icon: '&#127807;', bgColor: 'linear-gradient(135deg, #c8e6c9, #81c784)' },
    { id: 45, name: '木香', category: '理气', property: '辛、苦、温', meridian: '脾、胃、大肠、胆', effect: '行气止痛，健脾消食。', desc: '木香善行胃肠气滞，是脘腹胀痛、泻痢后重的要药，生用行气，煨用止泻。', recipe: '常见于香砂六君子汤、木香槟榔丸。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #efebe9, #a1887f)' },
    { id: 46, name: '枳壳', category: '理气', property: '苦、辛、酸、微寒', meridian: '脾、胃', effect: '理气宽中，行滞消胀。', desc: '枳壳行气力缓而不峻烈，善宽胸利膈，是胸胁胀满、食积不化的常用药。', recipe: '常见于枳术丸、四逆散。', icon: '&#127818;', bgColor: 'linear-gradient(135deg, #ffe0b2, #ff9800)' },
    { id: 47, name: '桃仁', category: '活血', property: '苦、甘、平', meridian: '心、肝、大肠', effect: '活血祛瘀，润肠通便，止咳平喘。', desc: '桃仁破血行瘀力较强，又能润燥滑肠，是瘀血阻滞兼肠燥便秘的优选。', recipe: '常见于桃红四物汤、桃核承气汤。', icon: '&#127826;', bgColor: 'linear-gradient(135deg, #fce4ec, #f48fb1)' },
    { id: 48, name: '牛膝', category: '活血', property: '苦、甘、酸、平', meridian: '肝、肾', effect: '逐瘀通经，补肝肾，强筋骨，引血下行。', desc: '牛膝善下行，能引血引火下行，是腰膝酸痛、经产瘀阻及上部血热证的常用药。', recipe: '常见于独活寄生汤、血府逐瘀汤。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #e8d5b7, #c4a265)' },
    { id: 49, name: '何首乌', category: '补虚', property: '苦、甘、涩、微温', meridian: '肝、心、肾', effect: '制用补肝肾，益精血，乌须发；生用解毒通便。', desc: '何首乌制熟后为滋补良药，善补肝肾精血，是须发早白、血虚萎黄的代表药。', recipe: '常见于七宝美髯丹、首乌延寿丹。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #3e2723, #5d4037)' },
    { id: 50, name: '百合', category: '补虚', property: '甘、微寒', meridian: '心、肺', effect: '养阴润肺，清心安神。', desc: '百合药食两用，润肺止咳之余又能宁心安神，是阴虚燥咳与虚烦不眠的调养佳品。', recipe: '常见于百合固金汤、百合地黄汤。', icon: '&#127800;', bgColor: 'linear-gradient(135deg, #fffde7, #fff9c4)' },
    { id: 51, name: '玉竹', category: '补虚', property: '甘、微寒', meridian: '肺、胃', effect: '养阴润燥，生津止渴。', desc: '玉竹甘润不腻，养阴而不恋邪，是阴虚外感及燥伤肺胃的平和滋养药。', recipe: '常见于加减葳蕤汤、沙参麦冬汤。', icon: '&#127807;', bgColor: 'linear-gradient(135deg, #e8f5e9, #a5d6a7)' },
    { id: 52, name: '莲子', category: '收涩', property: '甘、涩、平', meridian: '脾、肾、心', effect: '补脾止泻，益肾固精，养心安神。', desc: '莲子药食同源，补涩兼施，对脾虚久泻、肾虚遗精及心神不宁均有裨益。', recipe: '常见于参苓白术散、莲子清心饮。', icon: '&#127826;', bgColor: 'linear-gradient(135deg, #efeae6, #d4c5b9)' },
    { id: 53, name: '芡实', category: '收涩', property: '甘、涩、平', meridian: '脾、肾', effect: '益肾固精，补脾止泻，除湿止带。', desc: '芡实与莲子相似而偏于固涩，是脾肾两虚所致遗精滑泄、带下白浊的常用食疗药材。', recipe: '常见于金锁固精丸、水陆二仙丹。', icon: '&#127812;', bgColor: 'linear-gradient(135deg, #efeae6, #d4c5b9)' },
    { id: 54, name: '桑寄生', category: '祛风湿', property: '苦、甘、平', meridian: '肝、肾', effect: '祛风湿，补肝肾，强筋骨，安胎。', desc: '桑寄生既能祛风除湿，又能补肝肾强腰膝，是风湿痹痛兼肝肾不足的优选药材。', recipe: '常见于独活寄生汤、寿胎丸。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #d7ccc8, #8d6e63)' },
    { id: 55, name: '独活', category: '祛风湿', property: '辛、苦、微温', meridian: '肾、膀胱', effect: '祛风除湿，通痹止痛。', desc: '独活善治下部痹痛，尤以腰膝腿足关节疼痛属寒湿者为宜，是风湿痹痛的常用药。', recipe: '常见于独活寄生汤、羌活胜湿汤。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #d7ccc8, #a1887f)' },
    { id: 56, name: '苍术', category: '化湿', property: '辛、苦、温', meridian: '脾、胃、肝', effect: '燥湿健脾，祛风散寒，明目。', desc: '苍术温燥之力较强，善除中焦湿浊，是湿困脾胃与风寒湿痹的要药。', recipe: '常见于平胃散、二妙散。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #efebe9, #bcaaa4)' },
    { id: 57, name: '厚朴', category: '化湿', property: '苦、辛、温', meridian: '脾、胃、肺、大肠', effect: '燥湿消痰，下气除满。', desc: '厚朴为消胀除满要药，善行胃肠气滞而除胀满，兼能降肺气而平喘咳。', recipe: '常见于半夏厚朴汤、大承气汤。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #8d6e63, #5d4037)' },
    { id: 58, name: '石斛', category: '补虚', property: '甘、微寒', meridian: '胃、肾', effect: '益胃生津，滋阴清热。', desc: '石斛为养胃阴之要药，善滋胃肾之阴而退虚热，是热病伤津及阴虚火旺的滋补佳品。', recipe: '常见于石斛夜光丸、石斛清胃汤。', icon: '&#127807;', bgColor: 'linear-gradient(135deg, #c8e6c9, #81c784)' },
    { id: 59, name: '益母草', category: '活血', property: '苦、辛、微寒', meridian: '肝、心包、膀胱', effect: '活血调经，利尿消肿，清热解毒。', desc: '益母草为妇科经产要药，善活血调经，对月经不调、产后瘀阻及水肿有良效。', recipe: '常见于益母草膏、益母草颗粒。', icon: '&#127807;', bgColor: 'linear-gradient(135deg, #e8f5e9, #a5d6a7)' },
    { id: 60, name: '肉苁蓉', category: '补虚', property: '甘、咸、温', meridian: '肾、大肠', effect: '补肾阳，益精血，润肠通便。', desc: '肉苁蓉温而不燥，补而不峻，是肾阳虚兼精血不足及肠燥便秘的平和补益药。', recipe: '常见于肉苁蓉丸、苁蓉润肠丸。', icon: '&#127795;', bgColor: 'linear-gradient(135deg, #d7ccc8, #8d6e63)' }
  ];

  var currentCategoryFilter = 'all';
  var currentPropertyFilter = 'all';
  var herbsGrid = document.getElementById('herbs-grid');
  var herbCabinet = document.getElementById('herb-cabinet');
  var noResults = document.getElementById('no-results');
  var modalOverlay = document.getElementById('herb-modal');
  var modalBody = document.getElementById('modal-body');
  var modalClose = document.getElementById('modal-close');

  function getStoredList(key) {
    try {
      var raw = localStorage.getItem(key);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  function getCurrentUser() {
    try {
      var raw = localStorage.getItem('tcm_user');
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  }

  function getFavorites() {
    return getStoredList('tcm_favorites');
  }

  function saveFavorites(favorites) {
    localStorage.setItem('tcm_favorites', JSON.stringify(favorites));
  }

  function isFavorited(name) {
    return getFavorites().indexOf(name) !== -1;
  }

  function updateFavoriteUI(name) {
    var favoriteBtn = document.getElementById('favorite-btn');
    var favoriteStatus = document.getElementById('favorite-status');
    var favorited = isFavorited(name);

    if (favoriteBtn) {
      favoriteBtn.textContent = favorited ? '取消收藏' : '收藏药材';
      favoriteBtn.classList.toggle('btn-primary', favorited);
      favoriteBtn.classList.toggle('btn-outline', !favorited);
    }

    if (favoriteStatus) {
      favoriteStatus.textContent = favorited ? '已加入我的草药收藏' : '登录后可将常用药材加入个人收藏';
    }
  }

  function toggleFavorite(name) {
    var user = getCurrentUser();
    var favorites;
    var nextFavorites;

    if (!user || !user.name) {
      alert('请先前往登录页登录，再收藏药材。');
      return;
    }

    favorites = getFavorites();

    if (favorites.indexOf(name) !== -1) {
      nextFavorites = favorites.filter(function(item) {
        return item !== name;
      });
      saveFavorites(nextFavorites);
    } else {
      favorites.push(name);
      saveFavorites(favorites);
    }

    updateFavoriteUI(name);
  }

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
      if (herb.img) {
        html += '  <div class="herb-img"><img src="' + herb.img + '" alt="' + herb.name + '" loading="lazy"></div>';
      } else {
        html += '  <div class="herb-img" style="background:' + herb.bgColor + ';"><span class="herb-img-text">' + herb.name.charAt(0) + '</span></div>';
      }
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
      if (herb.img) {
        html += '    <div class="drawer-herb-visual"><img src="' + herb.img + '" alt="' + herb.name + '" loading="lazy"></div>';
      } else {
        html += '    <div class="drawer-herb-visual" style="background:' + herb.bgColor + ';"><span class="herb-img-text">' + herb.name.charAt(0) + '</span></div>';
      }
      html += '    <p>' + herb.effect + '</p>';
      html += '  </div>';
      html += '</article>';
    });

    herbCabinet.innerHTML = html;

    herbCabinet.querySelectorAll('.cabinet-drawer').forEach(function(drawer) {
      var face = drawer.querySelector('.drawer-face');
      var inner = drawer.querySelector('.drawer-inner');
      function toggleDrawerState() {
        var isOpen = drawer.classList.contains('is-open');

        herbCabinet.querySelectorAll('.cabinet-drawer').forEach(function(item) {
          item.classList.remove('is-open');
          var btn = item.querySelector('.drawer-face');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          drawer.classList.add('is-open');
          if (face) face.setAttribute('aria-expanded', 'true');
        }
      }

      if (face) {
        face.addEventListener('click', function() {
          toggleDrawerState();
        });
      }

      drawer.addEventListener('click', function(e) {
        if (e.target.closest('.drawer-inner')) return;
        if (e.target.closest('.drawer-face')) return;
        toggleDrawerState();
      });

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

    var herbImgHtml = herb.img
      ? '<div class="modal-herb-img"><img src="' + herb.img + '" alt="' + herb.name + '"></div>'
      : '<div class="modal-herb-img" style="background:' + herb.bgColor + ';"><span class="herb-img-text">' + herb.name.charAt(0) + '</span></div>';

    modalBody.innerHTML =
      herbImgHtml +
      '<div class="modal-herb-info">' +
      '  <h2>' + herb.name + '</h2>' +
      '  <span class="tag" style="background:var(--color-rose);color:#fff;">' + herb.category + '</span>' +
      '  <div class="info-row" style="margin-top:12px;"><span class="info-label">性味：</span><span class="info-value">' + herb.property + '</span></div>' +
      '  <div class="info-row"><span class="info-label">归经：</span><span class="info-value">' + herb.meridian + '</span></div>' +
      '  <div class="info-row"><span class="info-label">功效：</span><span class="info-value" style="color:var(--color-rose);font-weight:bold;">' + herb.effect + '</span></div>' +
      '  <div class="herb-description">' + herb.desc + '</div>' +
      '  <div class="herb-recipe">' + herb.recipe + '</div>' +
      '  <div class="modal-actions">' +
      '    <button type="button" class="btn ' + (isFavorited(herb.name) ? 'btn-primary' : 'btn-outline') + '" id="favorite-btn">' + (isFavorited(herb.name) ? '取消收藏' : '收藏药材') + '</button>' +
      '    <span class="favorite-status" id="favorite-status"></span>' +
      '  </div>' +
      '</div>';

    updateFavoriteUI(herb.name);

    var favoriteBtn = document.getElementById('favorite-btn');
    if (favoriteBtn) {
      favoriteBtn.addEventListener('click', function() {
        toggleFavorite(herb.name);
      });
    }

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
