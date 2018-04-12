// API相关链接

// sign
const SIGN = '30340544d122375a570ab95643ec888b';

// 域名
const domain = 'https://unify.playonweixin.com';

// 昨日概况
const yesterdayOverview = `${domain}/api/yesterday-overview`

// 小程序日、周、月趋势图数据
const TrendLineChart = `${domain}/api/trend-line-chart`

// 获取小程序列表
const getApplets = `${domain}/api/get-applets`

// 页面分析
const PageAnalysis = `${domain}/api/page-analysis`

// 用户留存
const UserRetain = `${domain}/api/user-retain`

// 用户画像
const UserPortrait = `${domain}/api/user-portrait`

export default {
  SIGN,
  domain,
  yesterdayOverview,
  TrendLineChart,
  getApplets,
  PageAnalysis,
  UserRetain,
  UserPortrait
}
