/**
 * Created by Administrator on 2016/5/24.
 */

/**
 * 通用选择器
 * @param select
 * @returns {HTMLElement}
 */
var $ = function(select){
    return document.querySelector(select);
}

/**
 * 事件绑定函数
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
        element["on"+type]= handler;
    }
}

//定义根节点 所有div列表 匹配列表 事件处理
var treeRoot = document.getElementsByClassName("root")[0];
var divList = [];
var matchList = [];
timer=null;

//初始化函数 事件绑定
function init(){
    var btn = document.getElementsByTagName("input");
    var preBtn = btn[0];
    var cerBtn = btn[1];
    var aftBtn = btn[2];
    var serBtn = btn[3];

    addHandler(preBtn,"click",preHandler);
    addHandler(cerBtn,"click",cerHandler);
    addHandler(aftBtn,"click",aftHandler);
    addHandler(serBtn,"click",serHandler);
}



//深度优先
function preHandler(){

    function preOrder(node){
        if(node!=null){
            divList.push(node);
            for(var i =0 ;i<node.children.length;i++){
                preOrder(node.children[i]);
            }
        }

    }

    reset();
    preOrder(treeRoot);
    render();

}

//广度优先
function cerHandler(){

    function cerOrder(node){
        if(node!=null){
            for(var i =0 ;i<node.children.length;i++){
                divList.push(node.children[i]);
            }

            for(var i =0 ;i<node.children.length;i++){
                cerOrder(node.children[i]);
            }
        }

    }

    reset();
    divList.push(treeRoot);
    cerOrder(treeRoot);
    render();

}

//深度优先查找
function aftHandler(){

    function preOrder(node){
        if(node!=null){
            divList.push(node);
            if(node.innerHTML.split('<')[0].trim().indexOf($("#ser").value.trim())!==-1){
                matchList.push(node);
            }
            for(var i =0 ;i<node.children.length;i++){
                preOrder(node.children[i]);

            }
        }

    }

    reset();
    preOrder(treeRoot);
    render1();
}


//广度优先查找
function serHandler(){

    function cerOrder(node){
        if(node!=null){
            for(var i =0 ;i<node.children.length;i++){
                divList.push(node.children[i]);
                if(node.children[i].innerHTML.split('<')[0].trim().indexOf($("#ser").value.trim())!==-1){
                    matchList.push(node.children[i]);
                }
            }

            for(var i =0 ;i<node.children.length;i++){
                cerOrder(node.children[i]);
            }
        }

    }

    reset();
    divList.push(treeRoot);
    cerOrder(treeRoot);
    render1();

}

//遍历时的改变颜色
function render(){
    var i = 0;
    divList[i].style.backgroundColor = 'blue';
    timer = setInterval(function (argument) {
        i++;
        if (i < divList.length) {
            divList[i-1].style.backgroundColor = '#fff';
            divList[i].style.backgroundColor = 'blue';
        } else {
            clearInterval(timer);
            divList[divList.length-1].style.backgroundColor = '#fff';
        }
    },500)
}

//查找时的改变颜色
function render1(){
    var i = 0;
    divList[i].style.backgroundColor = 'blue';
    timer = setInterval(function (argument) {
        i++;
        if (i < divList.length) {

            if(divList[i-1].style.backgroundColor==='blue'){
                divList[i-1].style.backgroundColor = '#fff';
            }
            if(matchList.some(function(item,index){
                return item===divList[i];
            })){
                divList[i].style.backgroundColor = 'red';
            }else{
                divList[i].style.backgroundColor = 'blue';
            }
        } else {
            clearInterval(timer);
            if(divList[divList.length-1].style.backgroundColor==="red"){

            }else{
                divList[divList.length-1].style.backgroundColor = '#fff';
            }

        }
    },500)
}

//初始化样式
function reset() {
    divList = [];
    matchList=[];
    clearInterval(timer);
    var divs = document.getElementsByTagName('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.backgroundColor = '#fff';
    }
}

init();