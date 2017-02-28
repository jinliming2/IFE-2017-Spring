/**
 * Created by Liming on 2017/2/28.
 */
"use strict";
(() => {
    let chart = echarts.init(document.getElementById('chart'));
    let data = {
        title: {
            text: '柱状（0~1随机），折线（50~100随机）'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['随机柱状数据1', '随机柱状数据2', '随机柱状数据3', '随机折线数据1', '随机折线数据2']
        },
        xAxis: {
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        },
        yAxis: [
            {
                type: 'value',
                name: '柱状'
            },
            {
                type: 'value',
                name: '折线'
            }],
        series: [
            {
                name: '随机柱状数据1',
                type: 'bar',
                data: []
            },
            {
                name: '随机柱状数据2',
                type: 'bar',
                data: []
            },
            {
                name: '随机柱状数据3',
                type: 'bar',
                data: []
            },
            {
                name: '随机折线数据1',
                type: 'line',
                yAxisIndex: 1,
                data: []
            },
            {
                name: '随机折线数据2',
                type: 'line',
                yAxisIndex: 1,
                data: []
            }
        ]
    };
    //柱状数据（0~1的随机数）
    for(let i = 0; i < 3; ++i) {
        for(let j = 0; j < data.xAxis.data.length; ++j) {
            data.series[i].data[data.series[i].data.length] = Math.random().toFixed(2);
        }
    }
    //折线数据（50~100的随机数）
    for(let i = 3; i < 5; ++i) {
        for(let j = 0; j < data.xAxis.data.length; ++j) {
            data.series[i].data[data.series[i].data.length] = (Math.random() * 50 + 50).toFixed(2);
        }
    }
    chart.setOption(data);
})();
