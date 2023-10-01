// 什么是图形语法
// 一般来讲，我们如何开发一个定制的图表：看设计稿，使用d3或者其他可绘制的引擎去画，然后结束
// 但当定制的需求特别多的时候，我们会抽象出来一些通用的部分，比如标题，图例，scale，shape
// 抽象到极致，其实就是某种意义上的图形语法，当然，还要加上一套成熟的DSL

// 图形语法它会约定好一种语法，将一张图表进行分层，自底向上的进行搭建（一层一层的映射，绘制）
// 举个例子：从最底层的数据，通过scale转换成图形的属性，图形的属性又组合成了不同的几何图形，再加上坐标轴的映射，其他图表元素（标题图例等），交互声明等，最终变成了图表（充满美学的）

// 从编程上讲，传统的图表开发是开发了一个组件，可以有很多配置
// 而图形语法下的开发，是开发了一套工具，能做成什么样由组合这些工具的人去决定

// https://vega.github.io/vega-lite/tutorials/getting_started.html vega-lite一个比较生动的例子
// vega的柱状图
const json = {
  // 指定json的版本
  "$schema": '',
  // 描述
  "description": '',
  // 容器宽度
  "width": 400,
  // 容器高度
  "height": 200,
  // 填充，自定义边距
  "padding": {"top": 10, "left": 30, "bottom": 20, "right": 10},
  // 是否自适应容器大小
  "Autosize": '',
  // 默认的配置用来确定主题，可以被任何顶级配置覆盖（可以浅显的理解成默认值）
  "config": {},
  // 图例
  "legends": {},
  // 标题
  "title": {},

  // 数据集，注意的是数据转换也可以在里面
  "data": [
    {
      "name": "table",
      // 对数据集进行格式的转换
      "transform": [],
      "values": [
        {"category":"A", "amount":28},
        {"category":"B", "amount":55},
        {"category":"C", "amount":43},
        {"category":"D", "amount":91},
        {"category":"E", "amount":81},
        {"category":"F", "amount":53},
        {"category":"G", "amount":19},
        {"category":"H", "amount":87},
        {"category":"I", "amount":52}
      ]
    }
  ],

  // 信号是参数化可视化并可以驱动交互行为的动态变量。信号可以在整个 Vega 规范中使用，例如定义标记属性或数据转换参数
  // 交互
  "signals": [
    {
      "name": "tooltip",
      "init": {},
      "streams": [
        // 交互描述
        {"type": "rect:mouseover", "expr": "datum"},
        {"type": "rect:mouseout", "expr": "{}"}
      ]
    }
  ],

  // 投影，用于地图，将经纬度转换成坐标值
  "projections": {},

  "predicates": [
    {
      "name": "tooltip", "type": "==", 
      "operands": [{"signal": "tooltip._id"}, {"arg": "id"}]
    }
  ],

  // 比例尺，做数据映射
  "scales": [
    // x，y轴
    { "name": "xscale", "type": "ordinal", "range": "width",
      "domain": {"data": "table", "field": "category"} },
    { "name": "yscale", "range": "height", "nice": true,
      "domain": {"data": "table", "field": "amount"} }
  ],

  // 轴
  "axes": [
    { "type": "x", "scale": "xscale" },
    { "type": "y", "scale": "yscale" }
  ],

  // 标记，将数据映射成具体的图形
  "marks": [
    {
      "type": "rect",
      "from": {"data":"table"},
      "properties": {
        "enter": {
          "x": {"scale": "xscale", "field": "category"},
          "width": {"scale": "xscale", "band": true, "offset": -1},
          "y": {"scale": "yscale", "field": "amount"},
          "y2": {"scale": "yscale", "value":0}
        },
        "update": { "fill": {"value": "steelblue"} },
        "hover": { "fill": {"value": "red"} }
      }
    },
    {
      "type": "text",
      "properties": {
        "enter": {
          "align": {"value": "center"},
          "fill": {"value": "#333"}
        },
        "update": {
          "x": {"scale": "xscale", "signal": "tooltip.category"},
          "dx": {"scale": "xscale", "band": true, "mult": 0.5},
          "y": {"scale": "yscale", "signal": "tooltip.amount", "offset": -5},
          "text": {"signal": "tooltip.amount"},
          "fillOpacity": {
            "rule": [
              {
                "predicate": {"name": "tooltip", "id": {"value": null}},
                "value": 0
              },
              {"value": 1}
            ]
          }
        }
      }
    }
  ]
}