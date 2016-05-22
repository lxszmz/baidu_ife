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
function leftInHandler(){
    var value = $("text").value;
    if(value!=""){
        data.unshift(value);
    }else{
        alert("请输入数据");
    }
    render();
}

function rightInHandler(){
    var value = $("text").value;
    if(value!=""){
        data.push(value);
    }else{
        alert("请输入数据");
    }
    render();
}
function leftOutHandler(){
    data.shift();
    render();
}

function rightOutHandler(){
     data.pop();
    render();
}

function render(){
    var  innerHTML="";
    for(var i = 0; i<data.length;i++){
        innerHTML +="  <li class='num'>"+data[i]+"</li>";
    }
    $("showArea").innerHTML = innerHTML;
}

//初始化函数
function init(){
    addHandler("click",$("leftIn"),leftInHandler);
    addHandler("click",$("rightIn"),rightInHandler);
    addHandler("click",$("leftOut"),leftOutHandler);
    addHandler("click",$("rightOut"),rightOutHandler);
}

init();

