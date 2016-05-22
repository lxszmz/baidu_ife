/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 *
 *
 * @param id
 * @returns {HTMLElement}
 * 定义ID选择器
 */
var $ = function(id){
    return document.getElementById(id);
}
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = $("aqi-city-input").value;
    var num= $("aqi-value-input").value;

    var reg1 = /^[a-zA-Z\u4E00-\u9FA5]+$/;
    var reg2 = /^\d+$/;
    if(!reg1.test(city)){
        alert("你输入有误");
        return;
    }

    if(!reg2.test(num)){
        alert("你输入有误");
        return;
    }

    aqiData[city]=num;


}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var items = " <tr> <td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var city in aqiData){
        items += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>"
    }
    document.getElementById("aqi-table").innerHTML = city ? items : "";

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {

//    $("add-btn").addEventListener("click",addBtnHandle);
//    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
//    $("aqi-table").addEventListener("click", function(event){
//        if(event.target.nodeName.toLowerCase() === 'button') {
//            delBtnHandle.call(null, event.target.dataset.city);
//    }
//
//    })
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

    var test =
        function(a) {
            console.log("function.a:"+a);
            this.a = a;
            console.log(this)
            console.log("this.a:"+this.a);
            return function(b) {
                console.log("this.a+b:"+(this.a+b));
                console.log(this.a)
                console.log(this)
                return this.a + b;
            }
        }
        (function(a, b) {
            console.log("a:"+a)
            return a;
        }(2, 2))

        ;

    console.log(test(6)); //输出什么？？？？
}

init();