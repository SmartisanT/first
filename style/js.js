   window.onload=function () {
   		var fanhui = document.getElementById("smbox")
   		var clientHeight = document.documentElement.clientHeight;
   		window.onscroll=function(){
   			var juli = document.documentElement.scrollTop || document.body.scrollTop;
   			if (juli>=clientHeight) {
   				fanhui.style.display = "block"
   			} else{
   				fanhui.style.display = "none"
   			};
   		}
   		fanhui.onclick=function(){
   			 var timer = setInterval(function(){
   			 	var juli = document.documentElement.scrollTop || document.body.scrollTop;
   			 	var i=(juli/8)
   				document.documentElement.scrollTop = document.body.scrollTop-= i
   				if (juli==0) {
   				clearInterval(timer)
   				};
   			},30)          
   		}

	   	}