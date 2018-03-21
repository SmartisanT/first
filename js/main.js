$(function(){
	setTimeout(function(){
		$('#lefthand').animate({left:"-20px"},1000,"linear",function(){
			$('#righthand').animate({opacity:"1"},1500,"linear",function(){preload()});
		});
	},1500)
          //页面平移
          function transform(translate){
             this.style.webkitTransform = "translate3d(0,"+translate+"px,0)";
             
          };

        /**
         * 绑定触摸事件
         */
        function bindTouchEvent1(){
           var currentPosition = 0; //记录当前页面位置
           var viewport =  document.querySelector('#question');
           var pageHeight =$("#box1").height(); //页面高度
           var startX,startY;
           var moveLength = 0;  // 手指当前滑动的距离
           var direction = "up"; //滑动的方向
           var isMove = false; //是否发生左右滑动
           var startT = 0; //记录手指按下去的时间
           var isTouchEnd = true; //标记当前滑动是否结束(手指已离开屏幕) 

           /*手指放在屏幕上*/
           viewport.addEventListener("touchstart",function(e){
               e.preventDefault();
               //单手指触摸或者多手指同时触摸，禁止第二个手指延迟操作事件
               if(e.touches.length == 1 || isTouchEnd){
                   var touch = e.touches[0];
                   startX = touch.pageX;
                   startY = touch.pageY;
                   viewport.style.webkitTransition = ""; //取消动画效果
                   startT = new Date().getTime(); //记录手指按下的开始时间
                   isMove = false; //是否产生滑动
                   isTouchEnd = false; //当前滑动开始
               }
           }.bind(this),false);

           /*手指在屏幕上滑动，页面跟随手指移动*/
           viewport.addEventListener("touchmove",function(e){
               e.preventDefault();
               
               //如果当前滑动已结束，不管其他手指是否在屏幕上都禁止该事件
               if(isTouchEnd) return ;
               var touch = e.touches[0];
               var deltaX = touch.pageX - startX;
               var deltaY = touch.pageY - startY;
               //如果Y方向上的位移大于X方向，则认为是上下滑动
               if (Math.abs(deltaY) > Math.abs(deltaX)){
                       direction = deltaY<0?"up":"down"; //判断手指滑动的方向
                       moveLength = deltaY;
                       var translate = moveLength;
                       if (Math.abs(moveLength)>pageHeight) {
                           translate = direction == 'up'?
                           currentPosition-pageHeight:currentPosition+pageHeight;
                           transform.call(document.getElementById('contentbox'),translate);
                       }else{
                          translate = currentPosition+moveLength;
                           transform.call(document.getElementById('contentbox'),translate);
                       };
                       isMove = true;
               }
               
           }.bind(this),false);

           /*手指离开屏幕时*/
           viewport.addEventListener("touchend",function(e){
               e.preventDefault();
               var translate = 0;
               //计算手指在屏幕上停留的时间
               var deltaT = new Date().getTime() - startT;
               //发生了滑动，并且当前滑动事件未结束
               if (isMove && !isTouchEnd){ 
                   isTouchEnd = true; //标记当前完整的滑动事件已经结束 
                   
                    //使用动画过渡让页面滑动到最终的位置    ?
                    viewport.style.webkitTransition = "0.3s ease -webkit-transform";
                    if(deltaT < 300){ //如果停留时间小于300ms,则认为是快速滑动，无论滑动距离是多少，都停留到下一页
                        translate = direction == 'up'?
                        currentPosition-pageHeight:currentPosition+pageHeight;
                            transform.call(document.getElementById('contentbox'),translate);
                            currentPosition = translate;
                            translate = translate > 0 ? 0 : translate; //左边界
                            //translate = translate < maxWidth ? maxWidth : translate; //右边界
                        }else {
                        //如果滑动距离小于屏幕的50%，则退回到原位
                        if (Math.abs(moveLength)/pageHeight < 0.5){
                            translate = currentPosition;
                            //transform.call(document.getElementById('contentbox'),translate);
                            transform.call(document.getElementById('contentbox'),translate);
                            currentPosition = translate;
                            //$("#mask").css("opacity",0.8);
                        }else{
                            //如果滑动距离大于屏幕的50%，则滑动到下一页
                            translate = direction == 'up'?
                            currentPosition-pageHeight:currentPosition+pageHeight;
                            transform.call(document.getElementById('contentbox'),translate);
                            currentPosition = translate
                            //translate = translate > 0 ? 0 : translate;
                            //translate = translate < maxWidth ? maxWidth : translate;
                        }
                    }
                }    
                
           }.bind(this),false);
       }


       /**
         * 绑定触摸事件
         */
        function bindTouchEvent(){
           var viewport =  document.querySelector('#content_bg');
           var pageHeight = window.innerHeight; //页面高度
           var startX,startY;
           var moveLength = 0;  // 手指当前滑动的距离
           var direction = "up"; //滑动的方向
           var isMove = false; //是否发生左右滑动
           var startT = 0; //记录手指按下去的时间
           var isTouchEnd = true; //标记当前滑动是否结束(手指已离开屏幕) 

           /*手指放在屏幕上*/
           viewport.addEventListener("touchstart",function(e){
               e.preventDefault();
               //单手指触摸或者多手指同时触摸，禁止第二个手指延迟操作事件
               if(e.touches.length == 1 || isTouchEnd){
                   var touch = e.touches[0];
                   startX = touch.pageX;
                   startY = touch.pageY;
                   viewport.style.webkitTransition = ""; //取消动画效果
                   startT = new Date().getTime(); //记录手指按下的开始时间
                   isMove = false; //是否产生滑动
                   isTouchEnd = false; //当前滑动开始
               }
           }.bind(this),false);

           /*手指在屏幕上滑动，页面跟随手指移动*/
           viewport.addEventListener("touchmove",function(e){
               e.preventDefault();
               
               //如果当前滑动已结束，不管其他手指是否在屏幕上都禁止该事件
               if(isTouchEnd) return ;
               var touch = e.touches[0];
               var deltaX = touch.pageX - startX;
               var deltaY = touch.pageY - startY;
               //如果Y方向上的位移大于X方向，则认为是上下滑动
               if (Math.abs(deltaY) > Math.abs(deltaX)){
                   direction = deltaY<0?"up":"down"; //判断手指滑动的方向
                   console.log(deltaY)
                   if (direction == "up") {
                       moveLength = deltaY;
                       //console.log(moveLength);
                       var translate = moveLength;
                       transform.call(viewport,translate);
                       $("#mask").css("opacity",0.8+(moveLength*0.8/pageHeight))
                       //$("#mask").css("opacity",(moveLength/pageHeight))
                       isMove = true;
                   };
               }
               
           }.bind(this),false);

           /*手指离开屏幕时*/
           viewport.addEventListener("touchend",function(e){
               e.preventDefault();
               var translate = 0;
               //计算手指在屏幕上停留的时间
               var deltaT = new Date().getTime() - startT;
               //发生了滑动，并且当前滑动事件未结束
               if (isMove && !isTouchEnd){ 
                   isTouchEnd = true; //标记当前完整的滑动事件已经结束 
                   
                    //使用动画过渡让页面滑动到最终的位置    ?
                    viewport.style.webkitTransition = "0.3s ease -webkit-transform";
                    if(deltaT < 300){ //如果停留时间小于300ms,则认为是快速滑动，无论滑动距离是多少，都停留到下一页
                        if (direction == 'up') {
                            translate = -pageHeight;
                            transform.call(viewport,translate);
                            $("#content_bg").remove();
                            $("#mask").remove();
                            layerWindow();
                        };
                    }else {
                        //如果滑动距离小于屏幕的50%，则退回到原位
                        if (Math.abs(moveLength)/pageHeight < 0.5){
                            translate = 0;
                            transform.call(viewport,translate);
                            $("#mask").css("opacity",0.8);
                        }else{
                            //如果滑动距离大于屏幕的50%，则滑动到下一页
                            if (direction == 'up') {
                                  translate = - pageHeight;
                                  transform.call(viewport,translate);
                                  $("#content_bg").remove();
                                  $("#mask").remove();
                                  layerWindow();
                              };
                        }
                    }
                }
           }.bind(this),false);
       }

       $(".answer").on("touchstart",function(){
        if ($(this).hasClass("null")) {
            layer.open({
            title: '回答问题',
            content: `
                  <div>
                    <div id="questioncontent">
                      <div id="questionhead">
                        <div class="img"></div>
                        <div class="nickname">穆二娃</div>
                      </div>
                      <p>这是一个问题？</p>
                    </div>
                    <div id="answercontent">
                      <textarea id="textarea"></textarea>
                      <div id="answerhead">
                        <div class="img"></div>
                        <div class="nickname">穆二娃</div>
                      </div>
                    </div>
                  </div>
            `,
            btn: ['提交']
          }); 
        }else{
          layer.open({
            title: '浏览答案',
            content: `
                  <div>
                    <div id="questioncontent">
                      <div id="questionhead">
                        <div class="img"></div>
                        <div class="nickname">穆二娃</div>
                      </div>
                      <p>这是一个问题？</p>
                    </div>
                    <div id="answercontent">
                      <p>回答问题差点迟到电磁刹车四大措施督促四大措施督促四大措施的成都市城市调查啊</p>
                      <div id="answerhead">
                        <div class="img"></div>
                        <div class="nickname">穆二娃</div>
                      </div>
                    </div>
                  </div>
            `
          }); 
        };
       })
    

    function layerWindow(){
      layer.open({
  title: '活动规则'
  ,content: '欢迎各位参与“士力架 赐予我力量吧！”互动H5，本次活动是主办方向考生提供的信息存储空间，为考生提供讨论、交流的平台。请您仔细阅读以下条款，如果您对本协议的任何条款表示异议，您可以选择不参与互动，您可以选择不参与互动，您参与互动，则意味着您将自愿遵守以下规则，并完全服从于主办方的统一管理。参与方式：进入H5，点击士力架左侧空白区域',
  closeBtn:2,
  anim:2,
  yes: function(index, layero){
    //do something
    layer.close(index); //如果设定了yes回调，需进行手工关闭
    $("#uparrow").addClass("uparrow");
    $("#downarrow").addClass("downarrow");
    bindTouchEvent1();
  }
});    
    }


    function preload(){
      var queue = new createjs.LoadQueue();
          queue.installPlugin(createjs.Sound);
          //queue.loadFile({id:"sound", src:"source/lizhi.mp3"});
          queue.loadManifest([
              {id: "aa", src:"http://img3.imgtn.bdimg.com/it/u=204181997,3242791042&fm=27&gp=0.jpg"},
              {id: "bb", src:"http://img3.imgtn.bdimg.com/it/u=2678268270,2482234645&fm=27&gp=0.jpg"},
              {id: "cc", src:"http://img0.imgtn.bdimg.com/it/u=2426407509,4199842435&fm=27&gp=0.jpg"},
              {id: "dd", src:"http://img3.imgtn.bdimg.com/it/u=17572568,2472534097&fm=27&gp=0.jpg"},
              {id: "ee", src:"http://img5.imgtn.bdimg.com/it/u=3895380214,1877236727&fm=27&gp=0.jpg"},
              {id: "ff", src:"http://img2.imgtn.bdimg.com/it/u=350857566,4163508174&fm=27&gp=0.jpg"},
              {id: "gg", src:"http://img1.imgtn.bdimg.com/it/u=3293842903,1040789920&fm=27&gp=0.jpg"},
              {id: "hh", src:"http://img5.imgtn.bdimg.com/it/u=3967408077,2934682380&fm=27&gp=0.jpg"},
              {id: "ii", src:"http://img0.imgtn.bdimg.com/it/u=3641997082,269144396&fm=27&gp=0.jpg"},
              {id: "jj", src:"http://img2.imgtn.bdimg.com/it/u=1178917985,623791563&fm=27&gp=0.jpg"}
          ]);
          queue.on("progress", function loading(e) {
               $("#righthand").css("transform","rotate("+(45-(45*e.progress))+"deg)");
              console.log(e.progress);
          }, this)
          queue.on("complete", handleComplete, this);
          function handleComplete(){
              $('#title').remove();
              $('#paper').animate({opacity:"1",top:"-80px"},1000,"linear");
              $("#logo").animate({opacity:"1",top:"380px"},1000,"linear",function(){
                  setTimeout(function(){
                      $('#content_bg').animate({bottom:"0px"},1000,"easeOutQuart");
                      $('#leading').animate({opacity:'1'},500,"linear");
                      $("#leading p").typed({
                  strings: ["各位考生，你准备拔得头筹还是甘做炮灰？别再那么焦虑了！学霸带棒接力了解一下复习要点，一条士力架“饱”你能量满满参与士力架接力互助。学霸教你不踩坑！"],
                  typeSpeed: 50,
                  startDelay: 100,
                  callback: function() {
                      $("#arrow").animate({opacity:"1"},500,"linear").addClass("arrow");
                      bindTouchEvent();
                  },
              });
                  },1000)
              })
          };
      }
})

