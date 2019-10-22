var timer = null,
		index = 0,
		pics = byId("banner").getElementsByTagName("div"),
		dots = byId("dots").getElementsByTagName("span"),
		size = pics.length,
		prev = byId("prev"),
    next = byId("next"),
    menuItems = byId("menu-content").getElementsByTagName("div"),
    subMenu = byId("sub-menu"),
    subItems = subMenu.getElementsByClassName("inner-box");


function byId(id){
	return typeof(id)==="string" ? document.getElementById(id) : id;
}

function addHandler(element,type,handle){
	if(element.addEventListener){
		element.addEventListener(type,handle,true);
	}else if(element.attachEvent){
		element.attachEvent('on'+type,handle);
	}else{
		element['on'+type] = handle;
	}
}

function startAutoPlay(){
	timer = setInterval(function(){
		index++;
		if(index>=size){
			index = 0;
		}
		changeImg();
	},3000)  
}

function stopAutoPlay(){
	if(timer){
		clearInterval(timer);
	}
}

function changeImg(){
	for(var i=0;i<size;i++){
		dots[i].className = "";
		pics[i].style.display = "none";
	}
	dots[index].className = "active";
	pics[index].style.display = "block";
}



startAutoPlay();
var main = byId("main");
var banner = byId("banner");
var menuContent = byId("menu-content");
addHandler(main,"mouseover",stopAutoPlay);
addHandler(main,"mouseout",startAutoPlay);

for(var i=0;i<size;i++){
	dots[i].id = i;
	addHandler(dots[i],"click",function(){
		index = this.id;
		changeImg();
	})
}

addHandler(next,"click",function(){
	index++;
	if(index>=size){
		index = 0;
	}
	changeImg();
});

addHandler(prev,"click",function(){
	index--;
	if(index<=0){
		index = size-1;
	}
	changeImg();
});

for(var m=0,mlen=menuItems.length;m<mlen;m++){
	menuItems[m].setAttribute("data-index",m);
	addHandler(menuItems[m],"mouseover",function(){
			subMenu.className = "sub-menu";
			var idx = this.getAttribute("data-index");
			for(var j=0,jlen=subItems.length;j<jlen;j++){
				 subItems[j].style.display = 'none';
				 menuItems[j].style.background = "none";
			}
			subItems[idx].style.display = "block";
			menuItems[idx].style.background = "rgba(0,0,0,0.1)";
	});
}

addHandler(subMenu,"mouseover",function(){
	this.className = "sub-menu";
});

addHandler(subMenu,"mouseout",function(){
	this.className = "sub-menu hide";
});

addHandler(banner,"mouseout",function(){
	subMenu.className = "sub-menu hide";
});

addHandler(menuContent,"mouseout",function(){
	subMenu.className = "sub-menu hide";
});


