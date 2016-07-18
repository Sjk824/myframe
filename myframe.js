// JavaScript Document
//自定义DOM选择器
var $ = (function(){
	function getDOM(str,obj){
		var oObj = obj||document;
		var s = str.charAt(0);
		var ss = str.substr(1);
		switch (s){
			case "#":return oObj.getElementById(ss);break;
			case "." :return getByClass(ss,oObj);break;
			default :return oObj.getElementsByTagName(str);break;
	  }
	}
	//获取class的函数
	function getByClass(sClass,Parent){
		var oParent = Parent||document;
		var aEle = oParent.getElementsByTagName('*');
		var ele=[];
		var len =  aEle.length;
		for(var i = 0;i<len;i++){
			var aArr = aEle[i].className.split(" ");
			for(var j = 0;j<aArr.length;j++){
				if(aArr[j]==sClass){
					ele.push(aEle[i]);
				}
			}
		}
	   return ele;
   }
   return getDOM;
})();

//自定义监听函数
var addEvent = function(ele,eve,handle){
	if(ele.addEventListener){
		ele.addEventListener(eve,handle,false)
	}else{
		ele.attachEvent("on"+eve,handle)
	}
};
//自定义移除监听函数
var removeEvent = function(ele,eve,handle){
	if(ele.removeEventListener){
		ele.removeEventListener(eve,handle,false);
	}else{
		ele.detachEvent("on"+eve,handle)
	}
};

//自定义class判断
function hasClass(obj, cls) {
	return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function addClass(obj, cls) {
	if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}
function removeClass(obj, cls) {
	if (hasClass(obj, cls)) {
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		obj.className = obj.className.replace(reg, ' ');
	}
}

//判断是否为数组
function isArray(obj) {      
	return Object.prototype.toString.call(obj) === '[object Array]';       
}

//深度复制
function copyObj(obj){
	var new_obj;
	if(typeof(obj) !== "object"){
		new_obj = obj;
		return new_obj;
	}else if(isArray(obj)){
		new_obj = [];
		for(var i = 0,len = obj.length;i<len;i++){
			if(typeof(obj[i]) !== "object"){
				new_obj.push(obj[i])
			}else{
				new_obj.push(copyObj(obj[i]))
			}
		};
		return new_obj;
	}else{
		for(var key in obj){
			if(typeof(obj[key]) !== "object"){
				new_obj[key] = obj[key]
			}else{
				new_obj[key] = copyObj(obj[key])
			}
		}
		return new_obj;
	}
}

//自定义减速动画
function slowDown(ele,attr,newattr_value){
	var newattr_value = parseInt(newattr_value),
	    moving = setTimeout(move,20);
	function move(){
		var _attr = parseInt(ele.style[attr]);
		var distance = newattr_value - _attr ;
		var dist = distance > 0 ? Math.ceil(distance/10) : Math.floor(distance/10);
		ele.style[attr] = _attr + dist +"px";
		if(ele.style[attr] == newattr_value + "px"){
			return true
		}else{
			var moving = setTimeout(move,20);
		}
	}
}


