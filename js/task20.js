/**
 * Created by xiaosong on 2016/5/23.
 */

/**
 * ID选择器
 * @param id
 * @returns {HTMLElement}
 */
var $ = function(id){
    return document.getElementById(id);
}

/**
 * 通用事件绑定函数
 * @param element
 * @param type
 * @param handler
 */
function addHandler(element,type,handler){
    if(element.addEventListener){
        element.addEventListener(type,handler,false);
    }else if (element.attachEvent){
        element.attachEvent("on"+type,handler);
    }else{
        element["on"+type]=handler;
    }
}

function insertHandler(){
    var text= $("textArea").value;
    var aText= text.split(new RegExp(/[^0-9a-zA-Z\u4e00-\u9fa5]+/));
    console.log(aText)
    for(var i =0;i<aText.length;i++){
        $("show").innerHTML+="<div class='insert'>"+aText[i]+"</div>"
    }
}

function selectHandler(){
    var input = $("textId").value.trim();
    var aa= new RegExp('<div class="insert">'+input,"g");
   console.log($("show").innerHTML);
    $("show").innerHTML=$("show").innerHTML.replace(new RegExp('<div class="insert">'+input,"g"),'<div class="insert select">'+input);
}

function init (){
    addHandler($("insertBtn"),"click",insertHandler);
    addHandler($("selectBtn"),"click",selectHandler);
}
init();