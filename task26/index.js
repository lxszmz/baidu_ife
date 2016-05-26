/**
 * Created by Administrator on 2016/5/25.
 */
/**
 * 分析：这个系统中总共可以分为三个角色：
 * 消息发送者--指挥官；
 * 消息转播者：中介系统；
 * 消息接受者：飞船
 *
 * 指挥官 和 中介系统 应该是在系统开始就初始化。
 * 飞船应该是在中介系统收到指挥官的创建命令时创建
 *
 * 指挥官应该只有发送功能
 *
 * 飞船应该用发送和接受两个功能
 *
 * 飞船有动力系统（充电和放电） 创建和销毁
 *
 *
 *
 * 实体：1 指挥官 2 中介 3 飞船 4 消息 5 控制台
 */

/**
 * 按钮句柄
 * @param commander
 */

var buttonHandler = function(commander){
    var id = null;
    var cmd = null;
    var btn = document.getElementsByClassName("btn");
    for(var i = 0 ;i<btn.length;i++){
        EventUtil.addHandler(btn[i],"click",function(){
            var cmdName = this.getAttribute("name");

            //下面几行是将第几个飞船获取到
            var childs= this.parentNode.parentNode.childNodes;
            var child= this.parentNode;
            id=(function(){
                var  returnIndex=0;
                for(var index=0;index<childs.length;index++){

                    if(child===childs[index]){
                        return returnIndex;
                    }
                    if(childs[index].nodeType===1){
                        returnIndex++;
                    }
                }
            })();

            cmd= cmdName;

            var message = new Message(id,cmd);
            commander.send(message)
        });
    }

};



//消息实体
var  Message = function (target,command){
    this.id=target;
    this.cmd=command;
}


//指挥官实体
var Sender = function(mediator){
    this.name = "lxs";
    this.mediator=mediator;
};

Sender.prototype= {
    send:function(command){
//        var success = Math.random() > 0.3 ? true : false;
        if(1){
            this.mediator.receive(command);
        }else{
            console.log(this.name+"发送命令失败");
        }

    }
};

//中介者实体

var Mediator = function(){
    this.name = "中介";
    this.spaceships=[];
};

Mediator.prototype= {
    send:function(){

    },
    receive:function(command){
        var success = Math.random() > 0.3 ? true : false;
        if(1){
            if(command.cmd==="launch"){
                 this.create(command);
            }else{
                this.spaceships[command.id].receive(command);
            }
        }else{
            console.log(this.name+"接收命令失败");
        }

    },

    create:function(command){
        var spaceship = new Spaceship(command.id);
        this.spaceships.push(spaceship);
        console.log("创建成功");
        AnimUtil.create(command.id, spaceship.power);
    }
}


//飞船实体
var Spaceship = function(id){
    this.id = id;
    this.power = 100;
    this.currState = "stop";
    this.deg=0;
};

Spaceship.prototype= {

    receive: function (command) {
        if (command.id === this.id && command.cmd !== this.currState) {
            this.StateManager().changeState(command.cmd);
        }

    }
};

//状态
Spaceship.prototype.StateManager=function(){
    var self = this;
    var states={
        fly: function(state) {
            self.currState = "fly";
            self.dynamicManager().fly();
//            self.powerManager().discharge();
        },
        stop: function(state) {
            self.currState = "stop";
            self.dynamicManager().stop();
//            self.powerManager().charge();
        },
        destroy: function(state) {
            self.currState = "destroy";
            AnimUtil.destroy(self.id);
//            self.mediator.remove(self);
        }
    };

    var changeState = function(state) {
        //implement the state command accordingly
        states[state]();
//        ConsoleUtil.show("Spaceship No." + self.id + " state is " + state);
    };

    return {
        changeState: changeState
    };


};

//能源系统
Spaceship.prototype.powerManager = function() {
    var self = this;
    /**
     * [charge: 飞船充电]
     * @return {[boolean]} [充电返回true]
     */
    var charge = function() {
        var chargeRate = DEFAULT_CHARGE_RATE;
        var timer = setInterval(function() {
            //若飞船在飞行或者被销毁则不再充电
            if (self.currState == "fly" || self.currState == "destroy") {
                clearInterval(timer);
                return false;
            }
            if (self.power >= 100) { //power is full, so stop charging.
                clearInterval(timer);
                self.power = 100;
                return false;
            }
            self.power += chargeRate;
            AnimUtil.updatePower(self.id, self.power);
        }, 20);
//        ConsoleUtil.show("Spaceship No." + self.id + " is charging.");
    };

    /**
     * [discharge: discharge power when flying]
     * @return {[type]} [description]
     */
    var discharge = function() {
        var dischargeRate = DEFAULT_DISCHARGE_RATE;
        var timer = setInterval(function() {
            //if the spaceship is stop or has been destroyed stop, then stop discharging.
            if (self.currState == "stop" || self.currState == "destroy") {
                clearInterval(timer);
                return false;
            }
            if (self.power <= 0) {
                clearInterval(timer);
                self.power = 0;
                self.stateManager().changeState("stop");
                return false;
            }
            self.power -= dischargeRate;
            AnimUtil.updatePower(self.id, self.power);
        }, 20);
//        ConsoleUtil.show("Spaceship No." + self.id + " is discharging.");
    };

    return {
        charge: charge,
        discharge: discharge
    };
};

Spaceship.prototype.dynamicManager=function(){
    var self = this;

    var fly=function(){
        self.timer = setInterval(function() {
            self.deg += 2;
            if (self.deg >= 360) self.deg = 0; //飞完一圈时，重置角度
            AnimUtil.fly(self.id, self.deg);
        }, 20);
    };
    var stop=function(){
        self.timer = setInterval(function() {
            self.deg += SPACESHIP_SPEED;
            if (self.deg >= 360) self.deg = 0; //飞完一圈时，重置角度
            AnimUtil.fly(self.id, self.deg);
        }, 20);
    };
    return {
        fly: fly,
        stop: stop
    };
};


function init(){
    var mediator = new Mediator();
    var sender = new  Sender(mediator);
    buttonHandler(sender);
}

//动画工具
var AnimUtil = (function() {
    var mediator = null;
    return {
        create: function(id, power) {
            var target = document.getElementById("spaceship0" + id);
            console.log(target);
            var target2 = document.getElementById("info" + id);
            var target3 = document.getElementById("powerbar" + id);
            target.setAttribute("style", "display:block" );
            target2.setAttribute("style","display: block");
            target3.setAttribute("style","width: "+power + "px");
//            ConsoleUtil.show("create animation");
        },
        fly: function(id, deg) {
            var mvDeg = "rotate(" + deg + "deg)";
            var target = "spaceship0" + id;
            // $(target).addClass("active");
            document.getElementById(target).css({
                "transform": mvDeg,
                "-webkit-transform": mvDeg
            });
        },
        stop: function(id) {
            var target = "spaceship0" + id;
            document.getElementById(target).removeClass("active");
        },
        updatePower: function(id, power) {
            var target = "powerbar" + id;
            var powerColor = null;
            if (power > 60) {
                powerColor = POWERBAR_COLOR_GOOD;
            } else if (power <= 60 && power >= 20) {
                powerColor = POWERBAR_COLOR_MEDIUM;
            } else {
                powerColor = POWERBAR_COLOR_BAD;
            }
            document.getElementById(target).css({
                "width": power + "px",
                "background-color": powerColor
            });
        },
        destroy: function(id) {
            var target = "spaceship0" + id;
            var target2 = "info" + id;
            // $(target).removeClass("active");
            document.getElementById(target).css("display", "none");
            document.getElementById(target2).css("display", "none");
        }
    };
})();

init();