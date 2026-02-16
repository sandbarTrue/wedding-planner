// 婚礼日期 - 两场婚礼
export const WEDDING_DATE = '2026-10-03'; // 主婚礼（彭州）用于主倒计时
export const WEDDING_DATE_CQ = '2026-09-29'; // 重庆奉节婚礼（男方场）
export const WEDDING_DATE_PZ = '2026-10-03'; // 彭州婚礼（女方场）

// 婚礼行程数据
export interface ItineraryItem {
  id: string;
  date: string;
  title: string;
  location: string;
  icon: string;
  description: string;
  isWedding?: boolean;
}

export const weddingItinerary: ItineraryItem[] = [
  { id: 'it-1', date: '2026-09-27', title: '出发去奉节', location: '成都 → 重庆奉节', icon: '🚗', description: '开车前往重庆市奉节县兴隆镇' },
  { id: 'it-2', date: '2026-09-28', title: '接亲', location: '重庆奉节', icon: '🎊', description: '接人回来，婚前准备' },
  { id: 'it-3', date: '2026-09-29', title: '重庆奉节婚礼', location: '重庆市奉节县兴隆镇', icon: '💒', description: '男方场婚礼仪式', isWedding: true },
  { id: 'it-4', date: '2026-09-30', title: '前往彭州', location: '重庆奉节 → 成都彭州', icon: '🚗', description: '返回彭州，准备女方场婚礼' },
  { id: 'it-5', date: '2026-10-01', title: '婚礼准备', location: '成都彭州市', icon: '📋', description: '彭州婚礼各项准备工作' },
  { id: 'it-6', date: '2026-10-02', title: '婚礼准备', location: '成都彭州市', icon: '🎀', description: '最终布置、彩排、物品检查' },
  { id: 'it-7', date: '2026-10-03', title: '彭州婚礼', location: '成都彭州市', icon: '💒', description: '女方场婚礼仪式', isWedding: true },
];

// 时间线阶段数据
export interface SubTask {
  id: string;
  name: string;
  details: string;
  completed: boolean;
}

export interface TimelineTask {
  id: string;
  name: string;
  subTasks: SubTask[];
  startDate?: string;
  endDate?: string;
}

export interface TimelinePhase {
  id: string;
  name: string;
  period: string;
  tasks: TimelineTask[];
}

export const timelinePhases: TimelinePhase[] = [
  {
    id: 'phase-1',
    name: '阶段一',
    period: '婚礼前6-12个月',
    tasks: [
      {
        id: 'p1-t1',
        name: '双方父母见面',
        startDate: '2026-02-22',
        endDate: '2026-02-22',
        subTasks: [
          { id: 'p1-t1-s1', name: '确定婚期', details: '翻老黄历/尽量挑周末', completed: false },
          { id: 'p1-t1-s2', name: '商定彩礼嫁妆', details: '', completed: false },
          { id: 'p1-t1-s3', name: '商讨结婚习俗', details: '', completed: false },
        ],
      },
      {
        id: 'p1-t2',
        name: '求婚',
        startDate: '2026-10-01',
        endDate: '2026-03-01',
        subTasks: [
          { id: 'p1-t2-s1', name: '求婚时间', details: '', completed: true },
          { id: 'p1-t2-s2', name: '求婚地点', details: '', completed: true },
          { id: 'p1-t2-s3', name: '求婚布置', details: '', completed: true },
          { id: 'p1-t2-s4', name: '求婚礼物', details: '', completed: true },
          { id: 'p1-t2-s5', name: '求婚告白', details: '', completed: true },
          { id: 'p1-t2-s6', name: '摄像记录', details: '', completed: true },
        ],
      },
      {
        id: 'p1-t3',
        name: '购买婚戒三金',
        startDate: '2026-11-01',
        endDate: '2026-04-01',
        subTasks: [
          { id: 'p1-t3-s1', name: '购买钻戒', details: '钻戒一般在求婚之前就已经买了', completed: true },
          { id: 'p1-t3-s2', name: '购买三金', details: '买金不要太着急选好自己喜欢的款式；尽量不要买一口价黄金要买按克重计价的；款式尽量不要太夸张可以买日常也能带的', completed: false },
        ],
      },
      {
        id: 'p1-t4',
        name: '订婚',
        startDate: '2026-01-01',
        endDate: '2026-05-01',
        subTasks: [
          { id: 'p1-t4-s1', name: '确定时间', details: '', completed: true },
          { id: 'p1-t4-s2', name: '确定酒店', details: '', completed: true },
          { id: 'p1-t4-s3', name: '订婚物品准备', details: '订婚需要自己操办需要物品可详见清单', completed: false },
        ],
      },
      {
        id: 'p1-t5',
        name: '领证',
        startDate: '2026-02-01',
        endDate: '2026-06-01',
        subTasks: [
          { id: 'p1-t5-s1', name: '选定日子', details: '找个有纪念意义的日子或者恋爱纪念日', completed: false },
          { id: 'p1-t5-s2', name: '确定地点', details: '双方任意一方户籍地的民政局', completed: false },
          { id: 'p1-t5-s3', name: '网上预约', details: '提前在网上预约', completed: false },
          { id: 'p1-t5-s4', name: '准备资料', details: '双方本人的身份证和户口本三张2寸近期半身免冠合影照片', completed: false },
          { id: 'p1-t5-s5', name: '准备道具', details: '提前买领证小白裙头纱手捧花蛋糕等', completed: false },
        ],
      },
      {
        id: 'p1-t6',
        name: '提前预定酒店',
        startDate: '2026-01-01',
        endDate: '2026-04-01',
        subTasks: [
          { id: 'p1-t6-s1', name: '预定婚宴酒店（两场）', details: '酒店至少提前半年以上预定好特别是结婚旺季；需要分别预定奉节和彭州的酒店', completed: false },
          { id: 'p1-t6-s2', name: '预估宾客人数（两场）', details: '分别估算两场婚礼的宾客人数', completed: false },
          { id: 'p1-t6-s3', name: '现场考察', details: '确认好场地费用婚宴菜单以及酒水费用等', completed: false },
        ],
      },
      {
        id: 'p1-t7',
        name: '确定婚礼策划',
        startDate: '2026-01-01',
        endDate: '2026-04-01',
        subTasks: [
          { id: 'p1-t7-s1', name: '选定策划公司', details: '婚礼策划=婚礼的灵魂至少提前6个月以上', completed: false },
          { id: 'p1-t7-s2', name: '确定婚礼风格', details: '中式欧式童话还是户外等', completed: false },
          { id: 'p1-t7-s3', name: '确认婚礼细节', details: '甜品台照片墙背景板灯光等', completed: false },
        ],
      },
      {
        id: 'p1-t8',
        name: '确定四大金刚',
        startDate: '2026-02-01',
        endDate: '2026-05-01',
        subTasks: [
          { id: 'p1-t8-s1', name: '确定司仪', details: '主持人一定要看现场主持的完片视频', completed: false },
          { id: 'p1-t8-s2', name: '确定跟妆', details: '', completed: false },
          { id: 'p1-t8-s3', name: '确定摄影', details: '摄影可以选择双机位或者单机位', completed: false },
          { id: 'p1-t8-s4', name: '确定摄像', details: '', completed: false },
        ],
      },
      {
        id: 'p1-t9',
        name: '拍婚纱照',
        startDate: '2026-03-25',
        endDate: '2026-03-31',
        subTasks: [
          { id: 'p1-t9-s1', name: '选定婚纱照机构', details: '婚纱照提前4-6个月拍', completed: false },
          { id: 'p1-t9-s2', name: '女生物品准备', details: '必备美瞳防晒隐贴无痕内裤美甲脱毛驱蚊水便携风扇面包和水', completed: false },
          { id: 'p1-t9-s3', name: '男生物品准备', details: '必备隐形眼镜刮胡子剪发皮带皮鞋袜子', completed: false },
        ],
      },
    ],
  },
  {
    id: 'phase-2',
    name: '阶段二',
    period: '婚礼前3-6个月',
    tasks: [
      {
        id: 'p2-t1',
        name: '试纱并选定新娘礼服',
        startDate: '2026-04-01',
        endDate: '2026-07-01',
        subTasks: [
          { id: 'p2-t1-s1', name: '大纱', details: '', completed: false },
          { id: 'p2-t1-s2', name: '龙凤褂/秀禾/出门纱', details: '', completed: false },
          { id: 'p2-t1-s3', name: '迎宾纱', details: '', completed: false },
          { id: 'p2-t1-s4', name: '敬酒服', details: '', completed: false },
          { id: 'p2-t1-s5', name: '晨袍', details: '', completed: false },
        ],
      },
      {
        id: 'p2-t2',
        name: '新郎西装礼服',
        startDate: '2026-04-01',
        endDate: '2026-07-01',
        subTasks: [
          { id: 'p2-t2-s1', name: '定制西装', details: '西服根据现场的布置颜色调定制合适的西服颜色', completed: false },
        ],
      },
      {
        id: 'p2-t3',
        name: '确定伴郎伴娘并拉群',
        startDate: '2026-04-01',
        endDate: '2026-07-01',
        subTasks: [
          { id: 'p2-t3-s1', name: '确定伴郎', details: '新郎找自己的兄弟朋友', completed: false },
          { id: 'p2-t3-s2', name: '确定伴娘', details: '新娘找自己的闺蜜朋友', completed: false },
          { id: 'p2-t3-s3', name: '沟通接亲流程', details: '接亲游戏准备道具', completed: false },
          { id: 'p2-t3-s4', name: '准备红包和伴手礼', details: '提前准备好红包和伴手礼', completed: false },
        ],
      },
      {
        id: 'p2-t4',
        name: '购买各类服饰配饰',
        startDate: '2026-05-01',
        endDate: '2026-08-01',
        subTasks: [
          { id: 'p2-t4-s1', name: '新娘配饰', details: '胸花回门红色裙子婚鞋等', completed: false },
          { id: 'p2-t4-s2', name: '新郎配饰', details: '男士中式礼服衬衫等', completed: false },
          { id: 'p2-t4-s3', name: '父母装', details: '妈妈装 爸爸装', completed: false },
          { id: 'p2-t4-s4', name: '伴郎伴娘服', details: '伴娘服 伴郎服', completed: false },
          { id: 'p2-t4-s5', name: '花童礼服', details: '', completed: false },
        ],
      },
    ],
  },
  {
    id: 'phase-3',
    name: '阶段三',
    period: '婚礼前2个月',
    tasks: [
      {
        id: 'p3-t1',
        name: '订婚车',
        startDate: '2026-07-20',
        endDate: '2026-08-10',
        subTasks: [
          { id: 'p3-t1-s1', name: '预定婚车（两场）', details: '分别预定奉节和彭州的婚车', completed: false },
        ],
      },
      {
        id: 'p3-t2',
        name: '定婚车用花、手捧花',
        startDate: '2026-07-20',
        endDate: '2026-08-10',
        subTasks: [
          { id: 'p3-t2-s1', name: '婚车用花', details: '', completed: false },
          { id: 'p3-t2-s2', name: '手捧花', details: '', completed: false },
        ],
      },
      {
        id: 'p3-t3',
        name: '定甜品台甜品',
        startDate: '2026-07-20',
        endDate: '2026-08-15',
        subTasks: [
          { id: 'p3-t3-s1', name: '甜品台预定', details: '', completed: false },
        ],
      },
      {
        id: 'p3-t4',
        name: '购买结婚用品',
        startDate: '2026-07-20',
        endDate: '2026-08-30',
        subTasks: [
          { id: 'p3-t4-s1', name: '婚房装饰', details: '', completed: false },
          { id: 'p3-t4-s2', name: '仪式必备', details: '', completed: false },
          { id: 'p3-t4-s3', name: '接亲环节', details: '', completed: false },
          { id: 'p3-t4-s4', name: '陪嫁清单', details: '', completed: false },
          { id: 'p3-t4-s5', name: '宾客酒席物品清单', details: '', completed: false },
        ],
      },
      {
        id: 'p3-t5',
        name: '酒店试菜并确定菜单',
        startDate: '2026-07-20',
        endDate: '2026-08-30',
        subTasks: [
          { id: 'p3-t5-s1', name: '奉节酒店试菜', details: '', completed: false },
          { id: 'p3-t5-s2', name: '彭州酒店试菜', details: '', completed: false },
          { id: 'p3-t5-s3', name: '确定最终菜单（两场）', details: '', completed: false },
        ],
      },
    ],
  },
  {
    id: 'phase-4',
    name: '阶段四（共用）',
    period: '婚礼前1个月',
    tasks: [
      {
        id: 'p4-t1', name: '确定最终婚礼流程（两场）', startDate: '2026-08-25', endDate: '2026-09-10',
        subTasks: [
          { id: 'p4-t1-s1', name: '确定奉节婚礼流程', details: '', completed: false },
          { id: 'p4-t1-s2', name: '确定彭州婚礼流程', details: '', completed: false },
        ],
      },
      {
        id: 'p4-t2', name: '试妆并确定最终造型', startDate: '2026-08-25', endDate: '2026-09-10',
        subTasks: [{ id: 'p4-t2-s1', name: '试妆确定造型', details: '', completed: false }],
      },
      {
        id: 'p4-t3', name: '准备红包袋', startDate: '2026-09-01', endDate: '2026-09-15',
        subTasks: [{ id: 'p4-t3-s1', name: '准备红包袋（两场）', details: '', completed: false }],
      },
      {
        id: 'p4-t4', name: '请柬', startDate: '2026-09-01', endDate: '2026-09-15',
        subTasks: [
          { id: 'p4-t4-s1', name: '发送奉节婚礼请柬', details: '', completed: false },
          { id: 'p4-t4-s2', name: '发送彭州婚礼请柬', details: '', completed: false },
        ],
      },
      {
        id: 'p4-t5', name: '确定最终宾客名单', startDate: '2026-09-01', endDate: '2026-09-20',
        subTasks: [
          { id: 'p4-t5-s1', name: '确定奉节宾客名单', details: '', completed: false },
          { id: 'p4-t5-s2', name: '确定彭州宾客名单', details: '', completed: false },
        ],
      },
      {
        id: 'p4-t6', name: '安排外地宾客的住宿交通', startDate: '2026-09-05', endDate: '2026-09-20',
        subTasks: [{ id: 'p4-t6-s1', name: '安排住宿交通', details: '', completed: false }],
      },
      {
        id: 'p4-t7', name: '婚礼歌单', startDate: '2026-09-01', endDate: '2026-09-20',
        subTasks: [{ id: 'p4-t7-s1', name: '准备婚礼歌单', details: '', completed: false }],
      },
      {
        id: 'p4-t8', name: '制作婚礼视频或婚纱照', startDate: '2026-09-01', endDate: '2026-09-20',
        subTasks: [{ id: 'p4-t8-s1', name: '制作视频/婚纱照', details: '制作婚礼要播放的视频或者婚纱照', completed: false }],
      },
      {
        id: 'p4-t9', name: '确定接亲流程', startDate: '2026-09-05', endDate: '2026-09-20',
        subTasks: [{ id: 'p4-t9-s1', name: '确定接亲流程', details: '', completed: false }],
      },
    ],
  },
  {
    id: 'phase-5a',
    name: '阶段五A（奉节场）',
    period: '奉节婚礼前1-2周',
    tasks: [
      { id: 'p5a-t1', name: '新娘试穿婚纱礼服', startDate: '2026-09-15', endDate: '2026-09-22', subTasks: [{ id: 'p5a-t1-s1', name: '试穿婚纱礼服', details: '', completed: false }] },
      { id: 'p5a-t2', name: '安排婚礼人员', startDate: '2026-09-15', endDate: '2026-09-22', subTasks: [{ id: 'p5a-t2-s1', name: '安排婚礼人员', details: '', completed: false }] },
      { id: 'p5a-t3', name: '形象管理', startDate: '2026-09-15', endDate: '2026-09-26', subTasks: [{ id: 'p5a-t3-s1', name: '形象管理', details: '', completed: false }] },
      { id: 'p5a-t4', name: '准备婚礼誓言', startDate: '2026-09-15', endDate: '2026-09-26', subTasks: [{ id: 'p5a-t4-s1', name: '撰写婚礼誓言', details: '', completed: false }] },
      { id: 'p5a-t5', name: '分装喜糖（奉节）', startDate: '2026-09-18', endDate: '2026-09-25', subTasks: [{ id: 'p5a-t5-s1', name: '分装喜糖', details: '', completed: false }] },
      { id: 'p5a-t6', name: '再次提醒宾客（奉节）', startDate: '2026-09-22', endDate: '2026-09-26', subTasks: [{ id: 'p5a-t6-s1', name: '提醒宾客', details: '', completed: false }] },
      { id: 'p5a-t7', name: '准备新娘急救包', startDate: '2026-09-18', endDate: '2026-09-25', subTasks: [{ id: 'p5a-t7-s1', name: '准备急救包', details: '', completed: false }] },
      { id: 'p5a-t8', name: '分装红包（奉节）', startDate: '2026-09-22', endDate: '2026-09-26', subTasks: [{ id: 'p5a-t8-s1', name: '分装红包', details: '', completed: false }] },
      { id: 'p5a-t9', name: '新郎理发', startDate: '2026-09-22', endDate: '2026-09-22', subTasks: [{ id: 'p5a-t9-s1', name: '新郎理发', details: '婚礼前7天', completed: false }] },
      { id: 'p5a-t10', name: '新娘染发', startDate: '2026-09-18', endDate: '2026-09-22', subTasks: [{ id: 'p5a-t10-s1', name: '新娘染发', details: '', completed: false }] },
      { id: 'p5a-t11', name: '建立工作人员对接群（奉节）', startDate: '2026-09-18', endDate: '2026-09-22', subTasks: [{ id: 'p5a-t11-s1', name: '建立对接群', details: '', completed: false }] },
      { id: 'p5a-t12', name: '流程发给婚礼管家', startDate: '2026-09-22', endDate: '2026-09-26', subTasks: [{ id: 'p5a-t12-s1', name: '发送流程', details: '', completed: false }] },
      { id: 'p5a-t13', name: '确认婚礼各项工作安排', startDate: '2026-09-22', endDate: '2026-09-27', subTasks: [{ id: 'p5a-t13-s1', name: '确认工作安排', details: '', completed: false }] },
      { id: 'p5a-t14', name: '确定最后婚宴桌数（奉节）', startDate: '2026-09-24', endDate: '2026-09-27', subTasks: [{ id: 'p5a-t14-s1', name: '确定桌数', details: '', completed: false }] },
    ],
  },
  {
    id: 'phase-6a',
    name: '阶段六A（奉节场）',
    period: '奉节婚礼前3天',
    tasks: [
      { id: 'p6a-t1', name: '购买酒水饮料零食', startDate: '2026-09-26', endDate: '2026-09-27', subTasks: [{ id: 'p6a-t1-s1', name: '购买酒水饮料零食', details: '', completed: false }] },
      { id: 'p6a-t2', name: '找专人接外地宾客', startDate: '2026-09-26', endDate: '2026-09-27', subTasks: [{ id: 'p6a-t2-s1', name: '安排接人', details: '', completed: false }] },
      { id: 'p6a-t3', name: '再次检查婚礼用品', startDate: '2026-09-26', endDate: '2026-09-27', subTasks: [{ id: 'p6a-t3-s1', name: '检查用品', details: '', completed: false }] },
      { id: 'p6a-t4', name: '确定上菜时间以及细节', startDate: '2026-09-26', endDate: '2026-09-27', subTasks: [{ id: 'p6a-t4-s1', name: '确定上菜细节', details: '', completed: false }] },
      { id: 'p6a-t5', name: '新娘美甲', startDate: '2026-09-26', endDate: '2026-09-27', subTasks: [{ id: 'p6a-t5-s1', name: '美甲', details: '', completed: false }] },
    ],
  },
  {
    id: 'phase-7a',
    name: '阶段七A（奉节场）',
    period: '奉节婚礼前1天（9月28日）',
    tasks: [
      { id: 'p7a-t1', name: '装饰婚房', startDate: '2026-09-28', endDate: '2026-09-28', subTasks: [{ id: 'p7a-t1-s1', name: '装饰婚房', details: '', completed: false }] },
      { id: 'p7a-t2', name: '提醒四大人员到位时间', startDate: '2026-09-28', endDate: '2026-09-28', subTasks: [{ id: 'p7a-t2-s1', name: '提醒四大人员', details: '', completed: false }] },
      { id: 'p7a-t3', name: '确定婚礼视频和音乐', startDate: '2026-09-28', endDate: '2026-09-28', subTasks: [{ id: 'p7a-t3-s1', name: '确定视频音乐', details: '', completed: false }] },
      { id: 'p7a-t4', name: '取婚纱礼服', startDate: '2026-09-28', endDate: '2026-09-28', subTasks: [{ id: 'p7a-t4-s1', name: '取婚纱礼服', details: '', completed: false }] },
      { id: 'p7a-t5', name: '准备婚礼仪式用品', startDate: '2026-09-28', endDate: '2026-09-28', subTasks: [{ id: 'p7a-t5-s1', name: '准备仪式用品', details: '', completed: false }] },
      { id: 'p7a-t6', name: '打印婚礼当天需要的表格', startDate: '2026-09-28', endDate: '2026-09-28', subTasks: [{ id: 'p7a-t6-s1', name: '打印表格', details: '', completed: false }] },
      { id: 'p7a-t7', name: '熨烫晨袍', startDate: '2026-09-28', endDate: '2026-09-28', subTasks: [{ id: 'p7a-t7-s1', name: '熨烫晨袍', details: '', completed: false }] },
      { id: 'p7a-t8', name: '婚礼彩排', startDate: '2026-09-28', endDate: '2026-09-28', subTasks: [{ id: 'p7a-t8-s1', name: '婚礼彩排', details: '', completed: false }] },
      { id: 'p7a-t9', name: '整理好婚礼当天所需的物品', startDate: '2026-09-28', endDate: '2026-09-28', subTasks: [{ id: 'p7a-t9-s1', name: '整理物品', details: '', completed: false }] },
      { id: 'p7a-t10', name: '个人护理', startDate: '2026-09-28', endDate: '2026-09-28', subTasks: [{ id: 'p7a-t10-s1', name: '脱毛、洗头、敷面膜', details: '', completed: false }] },
      { id: 'p7a-t11', name: '充电准备', startDate: '2026-09-28', endDate: '2026-09-28', subTasks: [{ id: 'p7a-t11-s1', name: '手机、充电宝充电', details: '', completed: false }] },
      { id: 'p7a-t12', name: '早点休息', startDate: '2026-09-28', endDate: '2026-09-28', subTasks: [{ id: 'p7a-t12-s1', name: '早点休息', details: '', completed: false }] },
    ],
  },
  {
    id: 'phase-5b',
    name: '阶段五B（彭州场）',
    period: '彭州婚礼前1-2周',
    tasks: [
      { id: 'p5b-t1', name: '分装喜糖（彭州）', startDate: '2026-09-22', endDate: '2026-09-30', subTasks: [{ id: 'p5b-t1-s1', name: '分装喜糖', details: '', completed: false }] },
      { id: 'p5b-t2', name: '再次提醒宾客（彭州）', startDate: '2026-09-26', endDate: '2026-10-01', subTasks: [{ id: 'p5b-t2-s1', name: '提醒宾客', details: '', completed: false }] },
      { id: 'p5b-t3', name: '分装红包（彭州）', startDate: '2026-09-26', endDate: '2026-10-01', subTasks: [{ id: 'p5b-t3-s1', name: '分装红包', details: '', completed: false }] },
      { id: 'p5b-t4', name: '建立工作人员对接群（彭州）', startDate: '2026-09-22', endDate: '2026-09-28', subTasks: [{ id: 'p5b-t4-s1', name: '建立对接群', details: '', completed: false }] },
      { id: 'p5b-t5', name: '确认婚礼各项工作安排', startDate: '2026-09-28', endDate: '2026-10-02', subTasks: [{ id: 'p5b-t5-s1', name: '确认工作安排', details: '', completed: false }] },
      { id: 'p5b-t6', name: '确定最后婚宴桌数（彭州）', startDate: '2026-09-28', endDate: '2026-10-01', subTasks: [{ id: 'p5b-t6-s1', name: '确定桌数', details: '', completed: false }] },
    ],
  },
  {
    id: 'phase-6b',
    name: '阶段六B（彭州场）',
    period: '彭州婚礼前3天',
    tasks: [
      { id: 'p6b-t1', name: '购买酒水饮料零食', startDate: '2026-09-30', endDate: '2026-10-01', subTasks: [{ id: 'p6b-t1-s1', name: '购买酒水饮料零食', details: '', completed: false }] },
      { id: 'p6b-t2', name: '找专人接外地宾客', startDate: '2026-09-30', endDate: '2026-10-01', subTasks: [{ id: 'p6b-t2-s1', name: '安排接人', details: '', completed: false }] },
      { id: 'p6b-t3', name: '再次检查婚礼用品', startDate: '2026-10-01', endDate: '2026-10-02', subTasks: [{ id: 'p6b-t3-s1', name: '检查用品', details: '', completed: false }] },
      { id: 'p6b-t4', name: '确定上菜时间以及细节', startDate: '2026-10-01', endDate: '2026-10-02', subTasks: [{ id: 'p6b-t4-s1', name: '确定上菜细节', details: '', completed: false }] },
      { id: 'p6b-t5', name: '新娘美甲', startDate: '2026-10-01', endDate: '2026-10-02', subTasks: [{ id: 'p6b-t5-s1', name: '美甲', details: '', completed: false }] },
    ],
  },
  {
    id: 'phase-7b',
    name: '阶段七B（彭州场）',
    period: '彭州婚礼前1天（10月2日）',
    tasks: [
      { id: 'p7b-t1', name: '装饰婚房', startDate: '2026-10-02', endDate: '2026-10-02', subTasks: [{ id: 'p7b-t1-s1', name: '装饰婚房', details: '', completed: false }] },
      { id: 'p7b-t2', name: '提醒四大人员到位时间', startDate: '2026-10-02', endDate: '2026-10-02', subTasks: [{ id: 'p7b-t2-s1', name: '提醒四大人员', details: '', completed: false }] },
      { id: 'p7b-t3', name: '确定婚礼视频和音乐', startDate: '2026-10-02', endDate: '2026-10-02', subTasks: [{ id: 'p7b-t3-s1', name: '确定视频音乐', details: '', completed: false }] },
      { id: 'p7b-t4', name: '取婚纱礼服', startDate: '2026-10-02', endDate: '2026-10-02', subTasks: [{ id: 'p7b-t4-s1', name: '取婚纱礼服', details: '', completed: false }] },
      { id: 'p7b-t5', name: '准备婚礼仪式用品', startDate: '2026-10-02', endDate: '2026-10-02', subTasks: [{ id: 'p7b-t5-s1', name: '准备仪式用品', details: '', completed: false }] },
      { id: 'p7b-t6', name: '打印婚礼当天需要的表格', startDate: '2026-10-02', endDate: '2026-10-02', subTasks: [{ id: 'p7b-t6-s1', name: '打印表格', details: '', completed: false }] },
      { id: 'p7b-t7', name: '熨烫晨袍', startDate: '2026-10-02', endDate: '2026-10-02', subTasks: [{ id: 'p7b-t7-s1', name: '熨烫晨袍', details: '', completed: false }] },
      { id: 'p7b-t8', name: '婚礼彩排', startDate: '2026-10-02', endDate: '2026-10-02', subTasks: [{ id: 'p7b-t8-s1', name: '婚礼彩排', details: '', completed: false }] },
      { id: 'p7b-t9', name: '整理好婚礼当天所需的物品', startDate: '2026-10-02', endDate: '2026-10-02', subTasks: [{ id: 'p7b-t9-s1', name: '整理物品', details: '', completed: false }] },
      { id: 'p7b-t10', name: '个人护理', startDate: '2026-10-02', endDate: '2026-10-02', subTasks: [{ id: 'p7b-t10-s1', name: '脱毛、洗头、敷面膜', details: '', completed: false }] },
      { id: 'p7b-t11', name: '充电准备', startDate: '2026-10-02', endDate: '2026-10-02', subTasks: [{ id: 'p7b-t11-s1', name: '手机、充电宝充电', details: '', completed: false }] },
      { id: 'p7b-t12', name: '早点休息', startDate: '2026-10-02', endDate: '2026-10-02', subTasks: [{ id: 'p7b-t12-s1', name: '早点休息', details: '', completed: false }] },
    ],
  },
];

// 关键任务进度分类
export interface KeyCategory {
  id: string;
  name: string;
  icon: string;
  taskIds: string[]; // 对应 timelinePhases 中的 task id
  defaultProgress: number;
}

export const keyCategories: KeyCategory[] = [
  { id: 'proposal', name: '求婚', icon: '💍', taskIds: ['p1-t2'], defaultProgress: 100 },
  { id: 'engagement', name: '订婚', icon: '💒', taskIds: ['p1-t4'], defaultProgress: 33 },
  { id: 'certificate', name: '领证', icon: '📜', taskIds: ['p1-t5'], defaultProgress: 0 },
  { id: 'photos', name: '婚照', icon: '📸', taskIds: ['p1-t9'], defaultProgress: 0 },
  { id: 'wedding', name: '婚礼婚宴', icon: '🎊', taskIds: ['p1-t6', 'p1-t7', 'p1-t8'], defaultProgress: 0 },
];

// 预算控制表数据
export interface BudgetItem {
  id: string;
  category: string;
  item: string;
  budget: number;
  actual: number;
  note: string;
}

export const defaultBudgetItems: BudgetItem[] = [
  { id: 'b1', category: '婚纱礼服', item: '主婚纱', budget: 5000, actual: 0, note: '' },
  { id: 'b2', category: '婚纱礼服', item: '秀禾/龙凤褂', budget: 3000, actual: 0, note: '' },
  { id: 'b3', category: '婚纱礼服', item: '敬酒服', budget: 1500, actual: 0, note: '' },
  { id: 'b4', category: '婚纱礼服', item: '新郎西装', budget: 3000, actual: 0, note: '' },
  { id: 'b5', category: '婚纱礼服', item: '伴娘服', budget: 2000, actual: 0, note: '' },
  { id: 'b6', category: '婚宴酒店', item: '奉节婚宴费用', budget: 30000, actual: 0, note: '' },
  { id: 'b6b', category: '婚宴酒店', item: '彭州婚宴费用', budget: 50000, actual: 0, note: '' },
  { id: 'b7', category: '婚宴酒店', item: '酒水饮料（两场）', budget: 8000, actual: 0, note: '' },
  { id: 'b8', category: '婚礼策划', item: '策划费用', budget: 15000, actual: 0, note: '' },
  { id: 'b9', category: '婚礼策划', item: '场地布置', budget: 8000, actual: 0, note: '' },
  { id: 'b10', category: '四大金刚', item: '司仪', budget: 3000, actual: 0, note: '' },
  { id: 'b11', category: '四大金刚', item: '跟妆', budget: 3000, actual: 0, note: '' },
  { id: 'b12', category: '四大金刚', item: '摄影', budget: 5000, actual: 0, note: '' },
  { id: 'b13', category: '四大金刚', item: '摄像', budget: 4000, actual: 0, note: '' },
  { id: 'b14', category: '婚纱照', item: '拍摄套餐', budget: 8000, actual: 0, note: '' },
  { id: 'b15', category: '珠宝首饰', item: '钻戒', budget: 15000, actual: 0, note: '' },
  { id: 'b16', category: '珠宝首饰', item: '三金', budget: 20000, actual: 0, note: '' },
  { id: 'b17', category: '婚车', item: '婚车租赁（两场）', budget: 5000, actual: 0, note: '' },
  { id: 'b18', category: '其他', item: '喜糖喜帖', budget: 3000, actual: 0, note: '' },
  { id: 'b19', category: '其他', item: '红包', budget: 5000, actual: 0, note: '' },
  { id: 'b20', category: '其他', item: '甜品台', budget: 3000, actual: 0, note: '' },
];

// 婚礼当天流程
export interface DayScheduleItem {
  id: string;
  stage: string;
  startTime: string;
  endTime: string;
  location: string;
  details: string;
}

export const defaultDaySchedule: DayScheduleItem[] = [
  { id: 'd1', stage: '新娘化妆', startTime: '05:00', endTime: '07:00', location: '新娘家', details: '化妆师上门化妆、做造型' },
  { id: 'd2', stage: '新郎准备', startTime: '06:00', endTime: '07:30', location: '新郎家', details: '新郎换装、佩戴胸花' },
  { id: 'd3', stage: '婚车出发', startTime: '07:30', endTime: '08:00', location: '新郎家→新娘家', details: '婚车队伍出发接亲' },
  { id: 'd4', stage: '接亲游戏', startTime: '08:00', endTime: '08:40', location: '新娘家', details: '堵门游戏、找鞋等' },
  { id: 'd5', stage: '敬茶改口', startTime: '08:40', endTime: '09:10', location: '新娘家', details: '向新娘父母敬茶' },
  { id: 'd6', stage: '出门前往酒店', startTime: '09:10', endTime: '09:40', location: '新娘家→酒店', details: '新娘出门、婚车前往酒店' },
  { id: 'd7', stage: '新郎家敬茶', startTime: '09:40', endTime: '10:10', location: '新郎家', details: '向新郎父母敬茶' },
  { id: 'd8', stage: '到达酒店', startTime: '10:30', endTime: '11:00', location: '酒店', details: '到达酒店、迎宾准备' },
  { id: 'd9', stage: '婚礼仪式', startTime: '11:30', endTime: '12:00', location: '酒店宴会厅', details: '入场、证婚、交换戒指、誓言' },
  { id: 'd10', stage: '婚宴开席', startTime: '12:00', endTime: '13:30', location: '酒店宴会厅', details: '敬酒、用餐' },
  { id: 'd11', stage: '送客', startTime: '13:30', endTime: '14:00', location: '酒店门口', details: '送宾客、合影' },
  { id: 'd12', stage: '收尾工作', startTime: '14:00', endTime: '15:00', location: '酒店', details: '清点物品、退房' },
];

// 帮帮团分工
export interface TeamMember {
  id: string;
  name: string;
  count: number;
  role: string;
  contact: string;
}

export const defaultTeamMembers: TeamMember[] = [
  { id: 'tm1', name: '', count: 1, role: '总管/婚礼管家', contact: '' },
  { id: 'tm2', name: '', count: 1, role: '签到收礼金', contact: '' },
  { id: 'tm3', name: '', count: 1, role: '烟酒饮料管理', contact: '' },
  { id: 'tm4', name: '', count: 2, role: '车队调度', contact: '' },
  { id: 'tm5', name: '', count: 1, role: '音响灯光', contact: '' },
  { id: 'tm6', name: '', count: 2, role: '迎宾引导', contact: '' },
  { id: 'tm7', name: '', count: 1, role: '新娘跟妆助理', contact: '' },
  { id: 'tm8', name: '', count: 1, role: '物品看管', contact: '' },
];

// 物料清点表
export interface ChecklistCategory {
  id: string;
  name: string;
  items: { id: string; name: string; checked: boolean }[];
}

export const defaultChecklist: ChecklistCategory[] = [
  {
    id: 'cl-1',
    name: '婚房装饰',
    items: [
      { id: 'cl-1-1', name: '喜字', checked: false },
      { id: 'cl-1-2', name: '气球', checked: false },
      { id: 'cl-1-3', name: '拉花', checked: false },
      { id: 'cl-1-4', name: '床品四件套', checked: false },
      { id: 'cl-1-5', name: '压床娃娃', checked: false },
      { id: 'cl-1-6', name: '早生贵子干果', checked: false },
    ],
  },
  {
    id: 'cl-2',
    name: '仪式必备',
    items: [
      { id: 'cl-2-1', name: '戒指', checked: false },
      { id: 'cl-2-2', name: '手捧花', checked: false },
      { id: 'cl-2-3', name: '胸花', checked: false },
      { id: 'cl-2-4', name: '婚礼誓言', checked: false },
      { id: 'cl-2-5', name: '交杯酒', checked: false },
      { id: 'cl-2-6', name: '蜡烛', checked: false },
    ],
  },
  {
    id: 'cl-3',
    name: '接亲道具',
    items: [
      { id: 'cl-3-1', name: '红包', checked: false },
      { id: 'cl-3-2', name: '游戏道具', checked: false },
      { id: 'cl-3-3', name: '找鞋线索', checked: false },
      { id: 'cl-3-4', name: '彩带礼炮', checked: false },
    ],
  },
  {
    id: 'cl-4',
    name: '宾客物品',
    items: [
      { id: 'cl-4-1', name: '喜糖', checked: false },
      { id: 'cl-4-2', name: '伴手礼', checked: false },
      { id: 'cl-4-3', name: '签到本/签到墙', checked: false },
      { id: 'cl-4-4', name: '喜帖', checked: false },
      { id: 'cl-4-5', name: '席位卡', checked: false },
    ],
  },
  {
    id: 'cl-5',
    name: '新娘随身',
    items: [
      { id: 'cl-5-1', name: '隐形内衣', checked: false },
      { id: 'cl-5-2', name: '备用丝袜', checked: false },
      { id: 'cl-5-3', name: '吸管', checked: false },
      { id: 'cl-5-4', name: '面纸湿巾', checked: false },
      { id: 'cl-5-5', name: '补妆用品', checked: false },
      { id: 'cl-5-6', name: '创可贴', checked: false },
      { id: 'cl-5-7', name: '针线包', checked: false },
    ],
  },
];
