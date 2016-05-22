/**
 * Created by Administrator on 2016/5/17.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */
/**
 * 根据ID获取元素
 * @param id
 * @returns {HTMLElement}
 */
var $ = function(id){
    return document.getElementById(id);
}
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {

    var length = Object.keys(chartData).length+1;
    var wrap= $("aqi-chart-wrap");
    var i = 0,innerHTML="";


    for(data in chartData){

       innerHTML=innerHTML+" <div style='width: "+(50/length)+"%;height: "+chartData[data]+"px;position:absolute;left: "+((i++*100+50)/length)+"%; bottom: 0px; background-color: red'> </div>";
    }
    wrap.innerHTML=innerHTML;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    var oTime = document.getElementsByName("gra-time");
    for(var  i =0; i<oTime.length;i++){
        if(oTime[i].checked){
            var time = oTime[i].value;
            break;
        }
    }

    if(time!==pageState.nowGraTime){
        pageState.nowGraTime=time;
        if(pageState.nowSelectCity===-1){
            return;
        }
        initAqiChartData();
        renderChart();
    }
    // 设置对应数据

    // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var oCity = $("city-select");
    var  city = oCity.value;
  if(city!==pageState.nowSelectCity){
      pageState.nowSelectCity=city;
      initAqiChartData();
      renderChart();
  }



    // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
/**
 * javascript 高级程序设计 249
 * NOdeList是一种类数组对象，用于保存一组有序的节点，可以使用位置来访问这些节点。
 * 请注意，虽然可以通过方括号语法来访问NodeList的值，而且这个对象也有length这个属性，但是
 * 它并不是Array的实例。所以不能使用for-in 结构
 */
function initGraTimeForm() {
    var oTime = document.getElementsByName("gra-time");
    for(var i = 0; i<oTime.length;i++){
        (function(m){
            addHandler(oTime[m],"click",graTimeChange);
        })(i);
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var oTime= $("city-select");

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    addHandler(oTime,"change",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    var time= pageState.nowGraTime;
    var city = pageState.nowSelectCity;
    if(city===-1){
        return;
    }else{
        var cityName = $("city-select").children[city].innerHTML;
        var cityData = aqiSourceData[cityName];
        var tempData ={};
        if(time==="day"){//日期为天
             tempData=cityData;
        }else if(time==="week"){//星期
            var j = 1,
                i=0;
           for(date in cityData){
               tempData['week'+j]=undefined===tempData['week'+j]?0:tempData['week'+j]+cityData[date];
               i++;
               if(i>6){
                   i=0;
                   j++;
               }
           }
           for(temp in tempData){
               tempData[temp]/= 7;
           }
        }else{//月份
            for(date in cityData){
                var time = new Date(Date.parse(date));
                var month = time.getMonth();
                tempData[(month+1)+"月"]=undefined=== tempData[(month+1)+"月"]?0: tempData[(month+1)+"月"]+cityData[date];
            }
            for(temp in tempData){
                var month = parseInt(temp);
                var d= new Date(2016, month, 0);
                var day = d.getDate();
                tempData[temp]/= day;
            }
        }
        chartData=tempData;
    }

    // 处理好的数据存到 chartData 中
}

/**
 * 通用事件监听函数
 * @param element
 * @param type
 * @param handler
 */
function addHandler(element,type,handler){
    if(element.addEventListener){
        element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,handler);
    }else{
        element["on"+type]=handler;
    }
}
/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();