var comAdapter=function(message_){

	var cAdapter={
	"1":"0001",
	"2":"0010",
	"3":"0011",
	"4":"0100",
	creation:"1000",
	launch:"1001",
	stop:"1010",
	destroy:"1011",
	}

	message_.id=cAdapter[message_.id];
	message_.commond=cAdapter[message_.commond];

	return message_;
}
/***************工厂模式：使用对象************************/
/*
var commander={

	creation:function(){
		alert("creation");
	},

	launch:function(){
		alert("launch");
	},

	stop:function(){
		alert("stop");
	},
}
*/
/***************工厂模式：使用对象************************/

/***************工厂模式二：使用对象方法************************/
var Commander=function (){
	/**************对象方法*******************/
	var message={};

	this.creation=function(event_){
		
		message.id=event_.parentNode.className.charAt(8);
		message.commond=event_.value;

		var newspaceship=new Spaceship(message);
		document.getElementById("spaceship"+message.id).style.display="inline-block";

		Mediator.addsubscriber(newspaceship);
		Mediator.subscriber[Mediator.subscriber.length-1].init(message);
		event_.value="destroy";
		return message;
	};

	this.launch=function(event_){

		message.id=event_.parentNode.className.charAt(8);
		message.commond=event_.value;
		return message;
	};

	this.stop=function(event_){
		message.id=event_.parentNode.className.charAt(8);
		message.commond=event_.value;
		return message;
	};
	
	this.destroy=function(event_){
		message.id=event_.parentNode.className.charAt(8);
		message.commond=event_.value;
		return message;
	};

}
/**********************对象方法**************************/
/*
	Commander.prototype.creation=function(){
		//alert("creation");
	};

	Commander.prototype.launch=function(){
		alert("launch");
	};

	Commander.prototype.stop=function(){
		alert("stop");
	};
*/
/******类方法（静态方法，不可继承，与此例无关，示范用）*****/
/*
	Commander.creation1=function(){
		alert("creation1");
	};
*/	
/*
var commanderFactory=function(commander_,action_){
	return commander_[action_]();
}
*/
/***************工厂模式二：使用原型方法************************/
var Spaceship=function (message){
	var t=0,e=0;

	
	this.spaceAdapter=function(message){
		var sAdapter={

		"0001":"1",
		"0010":"2",
		"0011":"3",
		"0100":"4",
		"1000":"creation",
		"1001":"launch",
		"1010":"stop",
		"1011":"destroy",
		}

		message.id=sAdapter[message.id];
		message.commond=sAdapter[message.commond];

		return message;

	}


	this.init=function(message){

		this.receivesystem(message);
		this.powersystem(message);
	};
	
	this.receivesystem=function(message){
		this.orbit=message.id;
	};

	this.powersystem=function(message){
		//alert("creation");
		switch(message.commond){
			case "launch":
			this.state="launch";

			if(t==0){
				if(e!=0){clearInterval(e);e=0;}
			t=window.setInterval(function(){renderOrbit(message)},20);
			}

			break;

			case "stop":
			this.state="stop";
			//停止函数
			this.energysystem();
			break;

			case "destroy":
			this.state="stop";
			//停止函数
			this.destruction(message);
			break;


		}
	};

	var leftEnergy="100";
	this.leftEnergy=leftEnergy;
	this.state="stop";
	
	var spaceshipId;
	spaceshipId="spaceship"+message.id;
	var targetSpaceship;
	targetSpaceship=document.getElementById(spaceshipId);
	var energyTarget;
	energyTarget=document.getElementsByClassName("energy")[message.id-1];
	energyTarget.innerHTML=leftEnergy;

	/***************匀角速度********************/
	var speed=powersystem.speed[powerSystem];
	var consumption=powersystem.consumption[powerSystem];
	var restore=energysystem.restore[energySystem];
	var angle;
	angle=targetSpaceship.style.WebkitTransform.match(/(\d)*\.(\d*)/g,"");
	angle=angle*Math.PI/180;

	speed=speed*Math.PI/180;
	var r,yloca;
	switch(message.id){
		case "1":r=177;yloca=142;break;
		case "2":r=207;yloca=112;break;
		case "3":r=237;yloca=82;break;
		case "4":r=267;yloca=52;break;
	}
	/***************匀角速度********************/
	var renderOrbit=function(message){

		/***************匀角速度********************/
		angle=angle+speed;
		angle%=2*Math.PI;
		targetSpaceship.style.top=(yloca+r-r*Math.cos(angle)).toString()+"px";
		targetSpaceship.style.left=(456+r*Math.sin(angle)).toString()+"px";
		targetSpaceship.style.WebkitTransform="rotate("+(angle*180/Math.PI).toString()+"deg)";

		if(parseFloat(leftEnergy)<=0){

			leftEnergy="0.0";
			energyTarget.innerHTML=leftEnergy;
			for(var i=0;i<Mediator.subscriber.length;i++)
			{	
				if("spaceship"+Mediator.subscriber[i].orbit==targetSpaceship.id){
					Mediator.subscriber[i].energysystem();
					break;
				}
			}
		}
		else{
		leftEnergy=(parseFloat(leftEnergy)-consumption).toFixed(1);

		energyTarget.innerHTML=leftEnergy;
		}

	}
	

	this.energysystem=function(){
		clearInterval(t);
		t=0;
		if(e==0){
			e=setInterval(function(){addEnergy();},20)
		}
		var addEnergy=function(){
			if(parseFloat(leftEnergy)>=100){

				clearInterval(e);
				e=0;
				leftEnergy="100.0";
				energyTarget.innerHTML=leftEnergy;
			}
			else{
				leftEnergy=(parseFloat(leftEnergy)+restore).toFixed(1);
				energyTarget.innerHTML=leftEnergy;
			}
		}
	};

	this.destruction=function(message){

		clearInterval(t);
		t=0;
		clearInterval(e);
		e=0;
		document.getElementById("spaceship"+message.id).style.display="none";
		Mediator.removesubscriber(message.id);
		
		eventTarget.value="creation";
	};

}

var transmitter={

	makepublisher:function(o){
		for(var i in this)
		{
			o[i]=this[i];
		}
		o.subscriber=[];
	},

	addsubscriber:function(spaceclass){
		this.subscriber[this.subscriber.length]=spaceclass;
	},

	removesubscriber:function(id){
		for(var i=0;i<this.subscriber.length;i++)
		{
			if(this.subscriber[i].orbit===id){
				this.subscriber.splice(i,1);
			}
		}
	},

	broadcast:function(message){
		var tempMessage={};
		var tempId=message.id;
		var tempCommond=message.commond;
		for(var i=0;i<this.subscriber.length;i++)
		{	
			tempMessage.id=tempId;
			tempMessage.commond=tempCommond;
			tempMessage=this.subscriber[i].spaceAdapter(tempMessage);
			if(this.subscriber[i].orbit==tempMessage.id){
				this.subscriber[i].powersystem(tempMessage);
				break;
			}
		}
	},

}

var Mediator={
	transmit:function(message){
		this.broadcast(message);
	},
}

transmitter.makepublisher(Mediator);

var powersystem={
	 speed:{
		forward:0.2,
		gallop:0.5,
		surpass:1.0,
	},
	consumption:{
		forward:0.1,
		gallop:0.2,
		surpass:0.3,
	},
}

var energysystem={
	restore:{
		energizer:0.1,
		optical:0.2,
		perpetual:0.3,
	}
}

var powerSystem,energySystem,eventTarget;

function init(){

	var seed=0;
	var message;
	var commanderId=document.getElementById("commander");
	commanderId.scrollTop = commanderId.scrollHeight;
	var consoleId=document.getElementById("console");
	var consoleText=consoleId.innerHTML;
	var newDate;
	var boss=new Commander();
	commanderId.addEventListener("click",function(){

		eventTarget=event.srcElement ? event.srcElement :event.target;

		if(eventTarget.type=="submit"){
			if(!powerSystem||!energySystem){
				if(!powerSystem){alert("请选择动力档再创建飞船");};
				if(!energySystem){alert("请选择能源档再创建飞船");};
			}
			else{
				if(seed==0){seed=setInterval(initCreation,300);}
				function initCreation(){
					if(Math.random()*3<1){
						consoleText=consoleText+new Date().toString().replace(/GMT\+0800\s\(中国标准时间\)/g,"")+
						eventTarget.parentNode.getElementsByClassName("orbit")[0].innerHTML+"指令"+"</br>"+
						eventTarget.value+" 丢包!"+"</br>"+"...正重新尝试传送..."+"</br>";
						consoleId.innerHTML=consoleText;
						consoleId.scrollTop = consoleId.scrollHeight;
					}
					else{
						clearInterval(seed);
						seed=0;
						consoleText=consoleText+new Date().toString().replace(/GMT\+0800\s\(中国标准时间\)/g,"")+
						eventTarget.parentNode.getElementsByClassName("orbit")[0].innerHTML+"指令"+"</br>"+
						eventTarget.value+" 传送成功!"+"</br>";
						consoleId.innerHTML=consoleText;
						consoleId.scrollTop = consoleId.scrollHeight;

						message=boss[eventTarget.value](eventTarget);

						message=comAdapter(message);

						if(typeof(message)==="object"){

						Mediator.transmit(message);
						}
					}
				}

			}

		}
		else{
			if(eventTarget.name=="powersystem"){
				powerSystem=eventTarget.value;
			}
			if(eventTarget.name=="energysystem"){
				energySystem=eventTarget.value;
			}
		}
	});
}
init();