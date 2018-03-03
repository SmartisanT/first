
    var targetRotation = 0;
    var targetRotationOnMouseDown = 0;
    var timer = null;
    var windowHalfY = window.innerHeight / 2;
    var mouseY = 0;
    var mouseYOnMouseDown = 0;
    var ss = 0;

    var queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.loadFile({id:"sound", src:"source/lizhi.mp3"});
    queue.loadManifest([
        {id: "aa", src:"images/aa.png"},
        {id: "bb", src:"images/bb.png"},
        {id: "cc", src:"images/cc.png"},
        {id: "dd", src:"images/dd.png"},
        {id: "ee", src:"images/ee.png"}
    ]);
    queue.on("progress", function loading(e) {
        $("#loading .percent").text(parseInt(100 * e.progress) + "%")
    }, this)
    queue.on("complete", handleComplete, this);

    function handleComplete() {
        //createjs.Sound.play("sound");
        console.log("kjkjk");
        //var image = queue.getResult("aa");
        //document.body.appendChild(image);

            //$("#loading").fadeOut(),
                    //$("#game,#section3").removeClass("hide").hide().fadeIn(1500),
                    setTimeout(function() {
                        $("#loading .percent").fadeOut();
                        $("#loading1 .logo").addClass("logo-scale");
                                setTimeout(function() {
                                            render1()
                                            //$("#loading1").remove(),
                                            //$("#section2").find(".arrow-tip,.arrow").removeClass("hide").hide().fadeIn(1e3)
                                }, 1500)
                    }, 1500)

    }
    function playMusic(audioId, musicBtnId) {
        var audio = document.getElementById(audioId);
        $("#" + musicBtnId).removeClass("off").addClass("on"),
                isWeiXin() ? (audio.play(),
                        wx.ready(function() {
                            WeixinJSBridge.invoke("getNetworkType", {}, function(e) {
                                audio.play()
                            })
                        })) : audio.play()
    }
    function pauseMusic(audioId, musicBtnId) {
        $("#" + musicBtnId).removeClass("on").addClass("off"),
                document.getElementById(audioId).pause()
    }
    function isWeiXin() {
        return "micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)
    }
    $("#music").on("touchstart", function() {
        $(this).hasClass("on") ? pauseMusic("bgMusic", "music") : playMusic("bgMusic", "music")
    }),
    playMusic("bgMusic", "music");
    var scene = new THREE.Scene();
    var fov = 120;
    var images = ["images/aa.png","images/bb.png","images/dd.png","images/cc.png","images/ee.png"];
    var camera = new THREE.PerspectiveCamera(fov, window.innerWidth/window.innerHeight, 0.1, 10000);

    var renderer = new THREE.WebGLRenderer({alpha:true});

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0000000, 0.0);
    document.getElementById('canvas3d').appendChild(renderer.domElement);
    for(var i =0;i<images.length;i++){
        var geometry = new THREE.PlaneGeometry( 650, 650, 1, 1 );
        var texture = THREE.ImageUtils.loadTexture(images[i]);
        var material = new THREE.MeshBasicMaterial({map:texture});
        material.transparent = true;
        var mesh = new THREE.Mesh( geometry,material );
        if (i%2==0){
            mesh.position.x = -130;
        }else{
            mesh.position.x = 130;
        }
        mesh.position.y = -130;
        mesh.position.z = -1300-(i*700);
        scene.add( mesh );
    }
    camera.position.z = 1855;
    $("canvas").css("position","absolute");
    function initTween()
    {
        new TWEEN.Tween( camera.position)
                .to( { z: -4200 }, 30000 ).repeat(0).start();
    }
    initTween();

    //document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    //document.addEventListener( 'touchmove', onDocumentTouchMove, false );

    function onDocumentTouchStart( event ) {

        if ( event.touches.length === 1 ) {

            event.preventDefault();

            mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;

            targetRotationOnMouseDown = targetRotation;

        }

    }

    function onDocumentTouchMove( event ) {

        if ( event.touches.length === 1 ) {

            event.preventDefault();
            //TWEEN.stop();
            window.cancelAnimationFrame(timer1);
            render2();
            mouseY = event.touches[ 0 ].pageY - windowHalfY;
            targetRotation = targetRotationOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.05;
            //console.log()
            ss=mouseY - mouseYOnMouseDown;
            console.log(mouseY - mouseYOnMouseDown )
            console.log(targetRotation);
            console.log(targetRotation - camera.position.z);
        }

    }
    function showDe(){
        $("#loading").remove();
        $("#loading1").remove();
        $("#canvas3d").remove();
        $("#section1").removeClass("hide").hide().fadeIn(1500);
    }

    $("#section1 .head .container").on("click", "img", function() {
        var e = $(this).parent().parent().data("tag");
        $(".head-container img").attr("src", "images/name-head/" + e + ".png"),
        (t = "source/audio-" + e + ".mp3") && $("#music").hasClass("on") ? window.musicOn = !0 : window.musicOn = !1,
        window.prevPlay = 0,
        $("#section1 .inner2,#section1 .detail-bg").removeClass("hide")
    })

    $("#section1").find(".close").on("touchstart", function() {
        $("#section1 .inner2,#section1 .detail-bg").addClass("hide"),
        document.getElementById("personMusic").pause(),
        $(".btn-music").removeClass("on"),
        window.musicOn && (playMusic("bgMusic", "music"),
        window.musicOn = !1)
    })

    function e(e) {
        window.musicOn && pauseMusic("bgMusic", "music");
        var t = document.getElementById("personMusic");
        0 == window.prevPlay++ && (t.src = e),
        isWeiXin() ? (t.play(),
        wx.ready(function() {
            WeixinJSBridge.invoke("getNetworkType", {}, function(e) {
                t.play()
            })
        })) : t.play(),
        $(t).off("ended").on("ended", function() {
            t.currentTime = 0,
            t.pause(),
            $(".btn-music").removeClass("on"),
            window.musicOn && (document.getElementById("personMusic").pause(),
            playMusic("bgMusic", "music"),
            window.musicOn = !1)
        })
    }

    $(".btn-music").on("touchstart", function() {
        $(this).hasClass("on") ? (document.getElementById("personMusic").pause(),
        $(this).removeClass("on"),
        window.musicOn && (document.getElementById("personMusic").pause(),
        playMusic("bgMusic", "music"),
        window.musicOn = !1)) : ($("#music").hasClass("on") ? window.musicOn = !0 : window.musicOn = !1,
        t && (e(t),
        $(this).addClass("on")))
    })





    function render1() {
        timer1 = requestAnimationFrame(render1);
        //camera.position.z-=0.1;
        //cube.rotation.x += 0.1;
        //cube.rotation.y += 0.01;
        renderer.render(scene, camera);
        TWEEN.update();
        if (camera.position.z <= -4100) {
            console.log("fdff");
           window.cancelAnimationFrame(timer1);
           showDe();
        }
    }
    function render2() {
        timer2 = requestAnimationFrame(render2);
        //camera.position.z= ( targetRotation - camera.position.z ); 
        camera.position.z-= (camera.position.z-ss)*0.005;
        renderer.render(scene, camera);
        
    }
    //render();
