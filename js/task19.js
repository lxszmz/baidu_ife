/**
 * 定义ID选择器
 */
var $ = function(id){
    return document.getElementById(id);
}

/**
 * 定义通用事件绑定器
 */

function addHandler(type,element,handler){
    if(element.addEventListener){
        element.addEventListener(type, handler,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,handler);
    }else{
        element['on'+type]= handler;
    }
}

/**
 * 定义数组
 * @type {Array}
 */
var data=[];

function dataChecked(){
    var value = $("text").value;
    if(value==""){
        alert("请输入数据");
        return false;
    }
    if(value<=10||value>=100){
        alert("输入数据不在范围之内");
        return false;
    }
    if(data.length>=60){
        alert("输入数据不在范围之内");
        return false;
    }
    return true;
}
function leftInHandler(){

   if(dataChecked()){
       var value = $("text").value;
       data.unshift(value);
       render();
   }
}

function rightInHandler(){

    if(dataChecked()){
        var value = $("text").value;
        data.push(value);
        render();
    }

}
function leftOutHandler(){
    data.shift();
    render();
}

function rightOutHandler(){
     data.pop();
    render();
}

function sortHandler(){
    data.sort(function(a,b){
        return a-b;
    });
    render();
}

function render(){
    var  innerHTML="";
    for(var i = 0; i<data.length;i++){
        innerHTML +="  <li class='num' style='height: "+data[i]+"px'></li>";
    }
    $("showArea").innerHTML = innerHTML;
}



//初始化函数
function init(){
    addHandler("click",$("leftIn"),leftInHandler);
    addHandler("click",$("rightIn"),rightInHandler);
    addHandler("click",$("leftOut"),leftOutHandler);
    addHandler("click",$("rightOut"),rightOutHandler);
    addHandler("click",$("sort"),sortHandler);
}

init();

