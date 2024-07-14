import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts';
import china from '../BarChart/China.json';
const Provinces=({data,ref})=>{
if(data.name){
    const echartInstance = ref.current.getEchartsInstance();//获取echarts实例
    let options = echartInstance.getOption()//获取option
    let provinceJSON = null
                             try {
                                 provinceJSON = require(`./Provience/${data.name}.json`);//根据点击的省名称查询Geojson地图数据（我是将地图数据全部保存在本地，可根据API获取地图json）
                                 echarts.registerMap('map', provinceJSON);//注册点击的省份地图
     
                                 options.title[0].text = data.name + '地图'
                                 options.series[0].name = data.name + '地图'
                                 
                                 // options.series[0].center = china.features.find(item => item.properties.name === param.name)?.properties?.center//修改点击后地图中心位置，不用会存在偏移，我使用下边null,默认全局居中
                                 options.series[0].center = null;　　//修改点击后地图中心位置，null默认全局居中
                                 echartInstance.setOption(options, true)//修改echarts option
                            } catch (error) {//获取Geojson地图异常返回到全国地图，我只存在市级地图数据，所以点击市级行政区会返回到全国地图。
                                 options.title[0].text = '全国地图'
                                 echarts.registerMap('map', china);
                                 options.series[0].name = '全国地图'
                                 
                                 options.series[0].center = null
                                 echartInstance.setOption(options, true)
                             }
                             return <ReactECharts ref={ref} option={options} lazyUpdate={true} notMerge={true}></ReactECharts>
}
 
}
export default Provinces