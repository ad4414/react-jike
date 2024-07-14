import EChartsReact from 'echarts-for-react';
import * as echarts from 'echarts';
import china from "./China.json"; //默认引入全国地图
import { useRef, } from 'react';
echarts.registerMap('map', china);//默认注册全国地图
 const Map=(props) => {
 
    let curRef = useRef(null);
    let height = window.screen.availHeight
     const topNumber = props.data[0].value;
     const bottomNumber = props.data[props.data.length - 1].value;
    let option = {
        title: {
            text: '全国地图',
            textStyle: {
                color: "#003",
            },
            left: 'center',
        },
        tooltip: {
          backgroundColor: 'rgba(21, 24, 45, 0.9)', // 提示框浮层的背景颜色。
          textStyle: {
            // 提示框浮层的文本样式。
            color: '#fff',
            fontSize: 14,
          },
          extraCssText: 'border-color: rgba(21, 24, 45, 0.9);',
        },
        visualMap: {
          min: 0,
          max: topNumber,
          
          center:'center',
          top: 'bottom',
          text: [topNumber + '%', bottomNumber + '%'], //取值范围的文字
          inRange: {
            color: ['#D2DDFF', '#6E92FF'], //取值范围的颜色
          },
          show: true, //图注
        },
        series: [
            {
                name: '全国地图',
                type: 'map',
                mapType: 'map',
                scaleLimit: {
                    //滚轮缩放的极限控制
                    min: 0.5, //缩放最小大小
                    max: 5, //缩放最大大小
                },

                label: { // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
                    show: true, //显示省市名称
                    position: [1, 100], // 相对的百分比
                    fontSize: 12,
                    offset: [2, 0], // 是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。
                    align: "left" // 文字水平对齐方式，默认自动。
                },
                itemStyle: {normal: {
                  areaColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                      offset: 0, color: 'rgb(51,204,97)' // 起始颜色
                    }, {
                      offset: 1, color: 'rgb(51,171,204)' // 结束颜色
                    }],
                    globalCoord: false // 是否使用绝对的坐标系
                  }
                }
                },
                roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 `'scale'` 或者 `'move'`。设置成 `true` 为都开启
                zoom: 1.25, // 当前视角的缩放比例
            }
        ]
    }

    return <div className='bazaarMap'>
        <EChartsReact option={option} ref={curRef} style={{ width: '100%', height: height, zIndex: 222 }}
            lazyUpdate={true} notMerge={true} onEvents={{
                'click': (param) => {//echarts点击事件
                  console.log(param.name);
                    if (param.name) {//判断名称是否为空
                        const echartInstance = curRef.current.getEchartsInstance();//获取echarts实例
                        let options = echartInstance.getOption()//获取option

                        let provinceJSON = null
                        try {
                            provinceJSON = require(`./Provience/${param.name}.json`);//根据点击的省名称查询Geojson地图数据（我是将地图数据全部保存在本地，可根据API获取地图json）
                            echarts.registerMap('map', provinceJSON);//注册点击的省份地图

                            options.title[0].text = param.name + '地图'
                            options.series[0].name = param.name + '地图'

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
                    }
                },
            }} />
    </div>
}
export default Map