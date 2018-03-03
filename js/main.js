function playMusic(e, t) {
    var i = document.getElementById(e);
    $("#" + t).show().removeClass("off").addClass("on"),
    isWeiXin() ? (i.play(),
    wx.ready(function() {
        WeixinJSBridge.invoke("getNetworkType", {}, function(e) {
            i.play()
        })
    })) : i.play()
}
function pauseMusic(e, t) {
    $("#" + t).removeClass("on").addClass("off"),
    document.getElementById(e).pause()
}
function isWeiXin() {
    return "micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)
}
$("#music").on("touchstart", function() {
    $(this).hasClass("on") ? pauseMusic("bgMusic", "music") : playMusic("bgMusic", "music")
}),
playMusic("bgMusic", "music");
var Gene = {};
Gene.VER = "1.0.0",
Gene.Preload = {
    _queue: null,
    _images: [{
        id: "bj",
        src: "bj.jpg"
    }, {
        id: "beijing",
        src: "bj.jpg"
    }, {
        id: "bg",
        src: "bj.jpg"
    }],
    _gallerys: [{
        src: "jw-bg.jpg",
        id: "_3"
    }, {
        src: "section1-s28ccaa875f.png",
        id: "_4"
    }, {
        src: "share-sf572aa8621.png",
        id: "_5"
    }, {
        src: "detail-s17a6011d8d.png",
        id: "_6"
    }, {
        src: "section2-s0b2e4b7ee7.png",
        id: "_7"
    }, {
        src: "section3-s8976cb8efe.png",
        id: "_11"
    }, {
        src: "share-bg.jpg",
        id: "_8"
    }, {
        src: "section5-sccbe03fc4d.png",
        id: "_9"
    }, {
        src: "section5-bg.jpg",
        id: "_10"
    }, {
        id: "star1",
        src: "aa.png"
    }, {
        id: "star2",
        src: "bb.png"
    }, {
        id: "star3",
        src: "cc.png"
    }, {
        id: "star4",
        src: "dd.png"
    },{
        id: "star5",
        src: "ee.png"
    }],
    _models: [],
    _sounds: [],
    init: function() {
        this._queue = new createjs.LoadQueue(!0),
        this._queue.loadManifest(this._images, !1, "images/")
    },
    ready: function() {
        this._queue.loadManifest(this._gallerys, !1, "images/")
    },
    load: function(e, t) {
        e && this._queue.on("progress", e, this),
        t && this._queue.on("complete", t, this),
        this._queue.load()
    },
    getQueue: function() {
        return this._queue
    },
    getResult: function(e) {
        return this._queue.getResult(e)
    }
},
Gene.Event = {
    GAME_START: "gameStart",
    GAME_INIT: "gameInit",
    GAME_OVER: "gameOver",
    MOVE_FINISH: "moveFinish",
    SLOGAN_CLICK: "sloganClick",
    PLAY_TOUCHSTART: "playTouchstart"
},
Gene.main = function(e) {
    function t() {
        if (!(x >= b.length)) {
            var e = b[x]
              , t = new Gene.Gallery(e.id);
            window.info = window.info || {},
            window.info[e.id] = t,
            t.position.x = parseInt(e.x),
            t.position.y = parseInt(e.y),
            t.position.z = parseInt(e.z),
            e.hasOwnProperty("rotate") && (t.rotation.z = e.rotate * (Math.PI / 180)),
            e.hasOwnProperty("rotationX") && (t.rotation.x = e.rotationX * Math.PI / 180),
            e.hasOwnProperty("scale") && (t.scale.x = t.scale.y = t.scale.z = e.scale),
            e.hasOwnProperty("scaleY") && (t.scale.y = e.scaleY),
            e.hasOwnProperty("flip") && ("h" == e.flip && (t.scale.x = -t.scale.x),
            "v" == e.flip && (t.scale.y = -t.scale.y)),
            e.hasOwnProperty("shake") && t.shake(),
            e.hasOwnProperty("zoom") && t.zoom(),
            e.hasOwnProperty("href") && (t.setHref(e.href, e.minP, e.maxP),
            C.push(t)),
            e.hasOwnProperty("videoUri") && (t.setVideoUri(e.videoUri, e.minP, e.maxP),
            T.push(t)),
            e.hasOwnProperty("move") && 1 == e.move && (t.xSpeed = e.xSpeed,
            t.ySpeed = e.ySpeed,
            t.initPositionX = e.x,
            t.initPositionY = e.y,
            t.initCameraZ = e.initCameraZ,
            t.range = e.range || 1440,
            M.push(t)),
            H || t.opacity(0),
            e.hasOwnProperty("fadeInFlag") && (t.fadeInFlag = e.fadeInFlag,
            I.push(t),
            t.showFlag = !1),
            v.add(t),
            x++
        }
    }
    function i(e) {
        for (var t in C)
            isNaN(t) || C[t].remind()
    }
    function n(e, t) {
        var i = {};
        i.x = e / window.innerWidth * 2 - 1,
        i.y = -t / window.innerHeight * 2 + 1,
        z.setFromCamera(i, h);
        var n = z.intersectObjects(C);
        if (n.length > 0) {
            a = n[0].object;
            (r = h.position.z) > a.getHrefMinP() && r < a.getHrefMaxP() && u.dispatchEvent({
                type: Gene.Event.SLOGAN_CLICK,
                href: a.getHref()
            })
        }
        var s = z.intersectObjects(T);
        if (s.length > 0) {
            var a = s[0].object
              , r = h.position.z;
            r > a.getVideoMinP() && r < a.getVideoMaxP() && u.dispatchEvent({
                type: Gene.Event.PLAY_TOUCHSTART,
                videoUri: a.getVideoUri()
            })
        }
    }
    function s() {
        for (var e = h.position.z, t = 0; t < I.length; t++) {
            var i = I[t].position.z;
            I[t].showFlag && e - 2e3 > i && (I[t].showFlag = !1,
            I[t].fadeOut()),
            !I[t].showFlag && e - 2e3 < i && (I[t].showFlag = !0,
            I[t].fadeIn(1))
        }
    }
    function a(e) {
        e = e || .001;
        for (var t = h.position.z, i = 0; i < M.length; i++) {
            M[i].position.z;
            var n = M[i].initCameraZ
              , s = h.position.z
              , a = M[i].xSpeed
              , r = M[i].ySpeed
              , o = M[i].range || 1440;
            t < n && t > n - o && (M[i].position.x = M[i].initPositionX + (n - s) * e * a,
            M[i].position.y = M[i].initPositionY + (n - s) * e * r)
        }
    }
    function r(e) {
        event.preventDefault(),
        n(e.touches[0].clientX, e.touches[0].clientY),
        S = e.touches[0].clientY,
        E.pauseAuto()
    }
    function o(e) {
        if (event.preventDefault(),
        S) {
            var t = S - e.touches[0].clientY;
            E.step(t)
            //d()
        }
        S = e.touches[0].clientY
    }
    function c(e) {
        event.preventDefault(),
        E.resumeAuto(),
        S = null
    }
    //function d() {}
    function l() {
        requestAnimationFrame(l),
        m && m.update(),
        R && R.update(),
        TWEEN.update(),
        E.eyeCamera(h),
        //d(),
        t(),
        a(),
        s();
        var e = h.position.z
          , i = parseInt(Math.abs(e) / Math.abs(parseInt((_ + 2160) / 6))) + 1
          , n = i > 7 ? 7 : i;
        window.n != n && window.loadingAnimate && (window.n = n,
        $("#section2 .inner .tip").addClass("hide"),
        $("#section2").find(".tip" + i).removeClass("hide").hide().fadeIn(1500)),
        window.backArrow && e > -1440 ? (window.backArrow = !1,
        window.forwardArrow = !0,
        $("#section2").find(".arrow-tip,.arrow").removeClass("hide").hide().fadeIn(1e3)) : window.forwardArrow && e < -1440 && (window.backArrow = !0,
        window.forwardArrow = !1,
        $("#section2").find(".arrow-tip,.arrow").fadeOut(1e3),
        setTimeout(function() {
            $("#section2").find(".arrow-tip,.arrow").show().addClass("hide")
        }, 1500)),
        0 != _ && e < _ + 2880 && (0 == F || e > F) && (E.pauseAuto(),
        u.playVideo()),
        0 != F && e < F && u.pauseVideo(),
        0 != N && !window.section1Flag && e < N && (window.section1Flag = !0,
        $("#game,#section2,#section3").fadeOut(),
        setTimeout(function() {
            $("#game,#section2,#section3").show().addClass("hide")
        }, 1e3),
        $("#video").hide(),
        $("#section1").removeClass("hide").hide().fadeIn(1500)),
        u.updateVideo(),
        w.render(f, h)
    }
    var u = this
      , p = 0
      , g = 0
      , h = null
      , f = null
      , w = null
      , m = null
      , y = null
      , v = null
      , E = null
      , b = []
      , x = 0
      , z = new THREE.Raycaster
      , C = []
      , T = []
      , I = []
      , M = [];
    window._fadeInObjsArray = I;
    var P, O, k, G, A, _ = 0, H = !1, R = null, S = null, F = 0, N = 0;
    VISUAL_MAX = 8e3,
    u.init = function(e) {
        p = window.innerWidth,
        g = window.innerHeight,
        h = new THREE.PerspectiveCamera(70,p / g,1,VISUAL_MAX),
        window.camera = h,
        f = new THREE.Scene,
        window.scene = f;
        var t = new THREE.AmbientLight(16777215);
        f.add(t),
        u.videoInit(),
        (w = new THREE.WebGLRenderer({
            canvas: e,
            alpha: !0
        })).setPixelRatio(window.devicePixelRatio),
        w.setSize(p, g),
        w.setClearColor(16777215, 0)
    }
    ,
    u.playVideo = function() {
        "playing" != k.state && (k.play(),
        wx.ready(function() {
            WeixinJSBridge.invoke("getNetworkType", {}, function(e) {
                k.play()
            })
        }),
        F = window.info.tv.position.z + 5,
        N = window.info.logo1.position.z - 200,
        A.position.set(-2, -75, F),
        k.state = "playing")
    }
    ,
    u.pauseVideo = function() {
        "playing" == k.state && (k.pause(),
        k.state = "pause")
    }
    ,
    u.updateVideo = function() {
        "playing" == k.state && (P.drawImage(k, 0, 0, 377, 185),
        O && (O.needsUpdate = !0))
    }
    ,
    u.videoInit = function() {
        $("body").append('<video width="100%" height="100%" id="video" src="source/video.mp4" x-webkit-airplay="true" playsinline webkit-playsinline airplay="allow"x5-video-player-type="h5" style="position:absolute;top: 0px;left: 0px;background-color: #000;opacity: 0;pointer-events: none"></video>'),
        k = document.getElementById("video"),
        (G = document.createElement("canvas")).width = 377,
        G.height = 185,
        window.vvvv = k,
        $(k).on("touchstart", function() {
            $(k).css({
                opacity: 0,
                "pointer-events": "none"
            })
        }),
        $("body").one("touchstart", function() {
            k.play(),
            wx.ready(function() {
                WeixinJSBridge.invoke("getNetworkType", {}, function(e) {
                    k.play(),
                    k.pause()
                })
            }),
            k.pause()
        }),
        (P = G.getContext("2d")).fillRect(0, 0, G.width, G.height),
        (O = new THREE.Texture(G)).minFilter = THREE.LinearFilter,
        O.magFilter = THREE.LinearFilter;
        var e = new THREE.MeshBasicMaterial({
            map: O,
            overdraw: !0,
            side: THREE.DoubleSide
        })
          , t = new THREE.PlaneGeometry(377,185,4,4);
        (A = new THREE.Mesh(t,e)).scale.x = A.scale.y = .89,
        f.add(A),
        window.movieScreen = A
    }
    ,
    u.launch = function() {
        window.camera = h,
        y = new THREE.Object3D,
        f.add(y),
        E = new Gene.Person,
        v = new THREE.Object3D,
        y.add(v),
        u.control(),
        l()
    }
    ,
    u.setup = function(e, t, n, s, a) {
        for (var r = v.children.length, o = 0; o < r; o++)
            v.remove(v.children[0]);
        _ = a;
        var c = "string" == typeof e ? JSON.parse(e) : e;
        b = c,
        x = 0,
        E.setScope(s, a),
        E.setAuto(t),
        E.setUnit(n),
        E.pauseAuto(),
        E.addEventListener(Gene.Event.MOVE_FINISH, i)
    }
    ,
    u.start = function() {
        E.resumeAuto(),
        H = !0;
        for (var e in v.children)
            if (!isNaN(e)) {
                var t = v.children[e];
                1 == t.fadeInFlag || (2 == t.fadeInFlag ? t.material.opacity = 0 : t.fadeIn(3))
            }
    }
    ,
    u.audioPlay = function() {
        null.play(),
        wx.ready(function() {
            WeixinJSBridge.invoke("getNetworkType", {}, function(e) {
                null.play()
            })
        })
    }
    ,
    u.control = function() {
        w.domElement.addEventListener("touchstart", r, !1),
        w.domElement.addEventListener("touchmove", o, !1),
        w.domElement.addEventListener("touchend", c, !1)
    }
    ,
    u.init(e)
}
,
Object.assign(Gene.main.prototype, THREE.EventDispatcher.prototype),
Gene.main.prototype.constructor = Gene.main,
Gene.Gallery = function(e) {
    var t, i, n, s, a, r = this, o = null;
    r.init = function(e) {
        THREE.Mesh.call(r);
        var t = Gene.Preload.getResult(e)
          , i = new THREE.PlaneGeometry(t.width,t.height,1,1)
          , n = new THREE.Texture(t);
        n.needsUpdate = !0;
        var s = new THREE.MeshBasicMaterial({
            transparent: !0
        });
        s.side = THREE.DoubleSide,
        s.map = n,
        r.material = s,
        r.geometry = i
    }
    ,
    r.fadeIn = function(e) {
        r.material.opacity = 0,
        1 == e ? new TWEEN.Tween(r.material).to({
            opacity: 1
        }, 1e3).start() : 2 == e ? new TWEEN.Tween(r.material).delay(50).to({
            opacity: 1
        }, 1e3).start() : 3 == e && new TWEEN.Tween(r.material).to({
            opacity: 1
        }, 1e3).start()
    }
    ,
    r.fadeOut = function() {
        new TWEEN.Tween(r.material).to({
            opacity: 0
        }, 1e3).start()
    }
    ,
    r.opacity = function(e) {
        r.material.opacity = e
    }
    ,
    r.remind = function() {
        var e = 1.05 * r.scale.x;
        new TWEEN.Tween(r.scale).to({
            x: e,
            y: e,
            z: e
        }, 1e3).repeat(1 / 0).yoyo(!0).easing(TWEEN.Easing.Quadratic.InOut).start()
    }
    ,
    r.zoom = function() {
        var e = 1.1 * r.scale.x
          , t = 1.1 * r.scale.y;
        new TWEEN.Tween(r.scale).to({
            x: e,
            y: t,
            z: e
        }, 1e3).repeat(1 / 0).yoyo(!0).easing(TWEEN.Easing.Quadratic.InOut).start()
    }
    ,
    r.shake = function() {
        r.rotation;
        r.rotation.z = r.rotation.z - 3 * Math.PI / 180;
        var e = r.rotation.z + 6 * Math.PI / 180;
        new TWEEN.Tween(r.rotation).to({
            x: this.rotation.x,
            y: this.rotation.y,
            z: e
        }, 1e3).repeat(1 / 0).yoyo(!0).easing(TWEEN.Easing.Quadratic.InOut).start()
    }
    ,
    r.setHref = function(e, t, i) {
        o = e,
        a = t,
        s = i
    }
    ,
    r.getHref = function() {
        return o
    }
    ,
    r.setVideoUri = function(e, s, a) {
        t = e,
        i = s,
        n = a
    }
    ,
    r.getHrefMinP = function() {
        return a
    }
    ,
    r.getHrefMaxP = function() {
        return s
    }
    ,
    r.getVideoUri = function() {
        return t
    }
    ,
    r.getVideoMinP = function() {
        return i
    }
    ,
    r.getVideoMaxP = function() {
        return n
    }
    ,
    r.init(e)
}
,
Gene.Gallery.prototype = Object.create(THREE.Mesh.prototype),
Gene.Gallery.prototype.constructor = Gene.Gallery,
Gene.Person = function() {
    var e = this
      , t = {
        min: 0,
        max: 0
    }
      , i = 0
      , n = 0
      , s = 1
      , a = 0
      , r = !1
      , o = 0;
    e.init = function() {
        THREE.Object3D.call(e)
    }
    ,
    e.forward = function() {
        e.step(-i)
    }
    ,
    e.back = function() {
        e.step(i)
    }
    ,
    e.step = function(t) {
        a = t,
        e.position.z += t * s
    }
    ,
    e.setSpeed = function(e) {
        i = e
    }
    ,
    e.setUnit = function(e) {
        s = e
    }
    ,
    e.setScope = function(i, n) {
        i = parseInt(i),
        n = parseInt(n),
        e.position.z = o = i,
        t.min = i,
        t.max = n
    }
    ,
    e.setAuto = function(t) {
        n = parseInt(t),
        e.resumeAuto()
    }
    ,
    e.pauseAuto = function() {
        e.setSpeed(0)
    }
    ,
    e.resumeAuto = function() {
        e.position.z <= o && e.setSpeed(n)
    }
    ,
    window.setPosition = function(t, i, n) {
        e.position.x = t,
        e.position.y = i,
        e.position.z = n
    }
    ,
    e.eyeCamera = function(n) {
        i > 0 && e.forward(),
        Math.abs(a) < 1 ? a = 0 : a *= .97,
        e.position.z += a,
        e.position.z < o && (o = e.position.z),
        e.position.z > t.min && (i = a = 0,
        e.position.z = t.min),
        e.position.z < t.max && (e.position.z = t.max,
        i = a = 0,
        r || (r = !0,
        e.dispatchEvent({
            type: Gene.Event.MOVE_FINISH
        }))),
        e.position.y = 0,
        n.position.copy(e.position),
        n.rotation.copy(e.rotation),
        window.onPositionChangeCb && window.onPositionChangeCb(e, a)
    }
    ,
    e.init()
}
,
Gene.Person.prototype = Object.create(THREE.Object3D.prototype),
Gene.Person.prototype.constructor = Gene.Person,
function() {
    function e(e) {
        g.loaded = !0,
        $("#loading,#loading1").removeClass("hide"),
        a()
    }
    function t(e) {}
    function i(t) {
        if (0 == g.queue) {
            g.queue = 1,
            (p = new Gene.main($("#game")[0])).launch(),
            p.addEventListener(Gene.Event.SLOGAN_CLICK, n),
            p.addEventListener(Gene.Event.PLAY_TOUCHSTART, s);
            var i = new createjs.LoadQueue(!0);
            i.addEventListener("complete", e),
            i.loadManifest(u.properties.manifest)
        } else
            1 == g.queue && (g.queue = 2)
    }
    function n(e) {
        window.location.href = e.href
    }
    function s() {
        $("#video").css({
            opacity: 1,
            "pointer-events": "auto"
        })
    }
    function a() {
        g.loading && g.loaded && (Gene.Preload.ready(),
        Gene.Preload.load(function(e) {
            $("#loading .percent").text(parseInt(100 * e.progress) + "%")
        }, function(e) {
            setTimeout(function() {
                $("#loading").fadeOut(),
                $("#game,#section3").removeClass("hide").hide().fadeIn(1500),
                setTimeout(function() {
                    $("#loading1 .logo").addClass("logo-scale"),
                    setTimeout(function() {
                        l(),
                        $("#loading1, #loading").remove(),
                        window.loadingAnimate = !0,
                        window.backArrow = !0,
                        window.forwardArrow = !1,
                        $("#section2").find(".arrow-tip,.arrow").removeClass("hide").hide().fadeIn(1e3)
                    }, 2500)
                }, 1500)
            }, 1500)
        }))
    }
    function r(e) {
        for (var t = e.split("-"), i = parseFloat(t[1].slice(4)), n = 0; n < h.length; n++)
            if (parseFloat(h[n].slice(4)) >= i)
                return n
    }
    function o(e) {
        for (var t = e.slice(4), i = 0; i < f.length; i++) {
            var n = f[i].split("-");
            if (t >= parseFloat(n[0].slice(4)) && t < parseFloat(n[1].slice(4)))
                return i + 1
        }
    }
    function c(e) {
        for (var t = 0; t < w.length; t++)
            for (var i = 0; i < e.length; i++)
                if (w[t].id == e[i].id) {
                    $.extend(e[i], w[t].kvs);
                    break
                }
    }
   // function d() {
   //      for (var e = [{
   //          id: "light3",
   //          x: 70,
   //          y: -80,
   //          z: -1440 * o(h[9]) - 1440 - 4320 + 10,
   //          scale: .5
   //      }, {
   //          id: "light4",
   //          x: 60,
   //          y: -50,
   //          z: -1440 * o(h[10]) - 1440 - 4800 + 10,
   //          scale: .6
   //      }, {
   //          id: "light5",
   //          x: -50,
   //          y: -85,
   //          z: -1440 * o(h[16]) - 1440 - 7680 + 10,
   //          scale: .5
   //      }, {
   //          id: "light6",
   //          x: -10,
   //          y: -55,
   //          z: -1440 * o(h[17]) - 1440 - 8160 + 10,
   //          scale: .5
   //      }, {
   //          id: "light7",
   //          x: 70,
   //          y: -80,
   //          z: -1440 * o(h[25]) - 1440 - 12e3 + 10,
   //          scale: .5
   //      }, {
   //          id: "light8",
   //          x: 60,
   //          y: -50,
   //          z: -1440 * o(h[26]) - 1440 - 12480 + 10,
   //          scale: .6
   //      }, {
   //          id: "light9",
   //          x: -50,
   //          y: -85,
   //          z: -1440 * o(h[32]) - 1440 - 15360 + 10,
   //          scale: .5
   //      }, {
   //          id: "light10",
   //          x: -10,
   //          y: -55,
   //          z: -1440 * o(h[33]) - 1440 - 15840 + 10,
   //          scale: .5
   //      }, {
   //          id: "light11",
   //          x: 70,
   //          y: -80,
   //          z: -1440 * o(h[43]) - 1440 - 20640 + 10,
   //          scale: .5
   //      }, {
   //          id: "light12",
   //          x: 60,
   //          y: -50,
   //          z: -1440 * o(h[44]) - 1440 - 21120 + 10,
   //          scale: .6
   //      }, {
   //          id: "cloud1",
   //          x: 70,
   //          y: -80,
   //          z: -1440 * o(h[1]) - 1440 - 480 + 50,
   //          scale: .5
   //      }, {
   //          id: "cloud2",
   //          x: 0,
   //          y: -100,
   //          z: -1440 * o(h[2]) - 1440 - 960 + 50,
   //          scale: .6
   //      }, {
   //          id: "cloud3",
   //          x: 70,
   //          y: -80,
   //          z: -1440 * o(h[7]) - 1440 - 3360 + 50,
   //          scale: .5
   //      }, {
   //          id: "cloud4",
   //          x: 0,
   //          y: -100,
   //          z: -1440 * o(h[8]) - 1440 - 3840 + 50,
   //          scale: .6
   //      }, {
   //          id: "cloud5",
   //          x: 70,
   //          y: -80,
   //          z: -1440 * o(h[20]) - 1440 - 9600 + 50,
   //          scale: .5
   //      }, {
   //          id: "cloud6",
   //          x: 0,
   //          y: -100,
   //          z: -1440 * o(h[21]) - 1440 - 10080 + 50,
   //          scale: .6
   //      }, {
   //          id: "cloud7",
   //          x: 70,
   //          y: -80,
   //          z: -1440 * o(h[28]) - 1440 - 13440 + 50,
   //          scale: .5
   //      }, {
   //          id: "cloud8",
   //          x: 0,
   //          y: -100,
   //          z: -1440 * o(h[29]) - 1440 - 13920 + 50,
   //          scale: .6
   //      }, {
   //          id: "cloud9",
   //          x: 70,
   //          y: -80,
   //          z: -1440 * o(h[35]) - 1440 - 16800 + 50,
   //          scale: .5
   //      }, {
   //          id: "cloud10",
   //          x: 0,
   //          y: -100,
   //          z: -1440 * o(h[36]) - 1440 - 17280 + 50,
   //          scale: .6
   //      }, {
   //          id: "cloud11",
   //          x: 70,
   //          y: -80,
   //          z: -1440 * o(h[40]) - 1440 - 19200 + 50,
   //          scale: .5
   //      }, {
   //          id: "cloud12",
   //          x: 0,
   //          y: -100,
   //          z: -1440 * o(h[41]) - 1440 - 19680 + 50,
   //          scale: .6
   //      }, {
   //          id: "tv",
   //          x: -3,
   //          y: -122,
   //          z: -1440 * f.length - 1440 + -480 * (h.length - 1) - 720,
   //          scale: .9,
   //          videoUri: "",
   //          minP: -1440 * f.length - 1440 + -480 * (h.length - 1) - 720,
   //          maxP: -1440 * f.length - 1440 + -480 * h.length - 2160 + 400 + 2880
   //      }, {
   //          id: "logo1",
   //          x: 0,
   //          y: -150,
   //          z: -1440 * f.length - 1440 + -480 * (h.length - 1) - 2160,
   //          scale: .7
   //      }], t = 0; t < f.length; t++) {
   //          var i, n;
   //          0 == t ? (i = {
   //              id: "bazaar" + t,
   //              x: 0,
   //              y: -250,
   //              z: -1440 * t - 1440 - 1040,
   //              scale: 1
   //          },
   //          n = {
   //              id: "title" + t,
   //              x: 0,
   //              y: -150,
   //              z: -1440 * t - 1440 - 1120,
   //              scale: 1
   //          }) : (i = {
   //              id: "bazaar" + t,
   //              x: 0,
   //              y: -250,
   //              z: -1440 * t - 1440 - 1040 + -480 * r(f[t - 1]),
   //              scale: 1,
   //              fadeInFlag: 1
   //          },
   //          n = {
   //              id: "title" + t,
   //              x: 0,
   //              y: -150,
   //              z: -1440 * t - 1440 - 1120 + -480 * r(f[t - 1]),
   //              scale: 1,
   //              fadeInFlag: 1
   //          }),
   //          1 == t || 3 == t || 7 == t ? e.push(n) : (e.push(i),
   //          e.push(n))
   //      }
   //      for (t = 0; t < h.length; t++) {
   //          var s;
   //          s = t % 2 == 0 ? {
   //              id: h[t],
   //              x: -60,
   //              y: -30,
   //              z: -1440 * o(h[t]) - 1440 + -480 * t,
   //              scale: .3521
   //          } : {
   //              id: h[t],
   //              x: 60,
   //              y: -30,
   //              z: -1440 * o(h[t]) - 1440 + -480 * t,
   //              scale: .3521
   //          },
   //          e.push(s)
   //      }
   //      c(e),
   //      p.setup(e, 2, 1, 0, -1440 * f.length - 1440 + -480 * h.length - 2160, -1440 * f.length - 1440 + -480 * h.length - 2160 + 400)
   //  }
    function l() {
        p.start(),
        window.onPositionChangeCb = function(e, t) {
            e.position.z >= -1550 && e.position.z
        }
    }
    var u = {}
      , p = null
      , g = {
        loading: !0,
        loaded: !1,
        game: !1,
        ready: !1,
        queue: 0
    };
    u.properties = {
        manifest: {
            path: "images/",
            manifest: [{
                src: "loading-bg.jpg",
                id: "_1"
            }, {
                src: "loading-s94108564a4.png",
                id: "_2"
            }]
        }
    },
    $(function(e) {
        Gene.Preload.init(),
        Gene.Preload.load(t, i)
    });
    window.n = -1;
    var h = ["star1", "star2", "star3", "star4", "star5"]
      , f = ["star1-star5"]
      , w = [{
        id: "star1",
        kvs: {
            x: 80
        }
    }, {
        id: "star2",
        kvs: {
            x: -90
        }
    }, {
        id: "star3",
        kvs: {
            x: -90
        }
    }, {
        id: "star4",
        kvs: {
            x: -66
        }
    }, {
        id: "star5",
        kvs: {
            x: -80
        }
    }];
    document.addEventListener("touchstart", function(e) {
        "IMG" != e.target.tagName && e.preventDefault()
    }),
    $(".btn-share").on("touchstart", function() {
        window.location.href = "http://dwz.cn/6q6SW2"
    }),
    $(".btn-return").on("touchstart", function() {
        $("#video").show(),
        $("#game,#section2,#section3").removeClass("hide"),
        $("#section1").addClass("hide"),
        window.setPosition(0, 0, 0),
        window.section1Flag = !1
    }),
    $("#section1 .bg").on("touchstart", function() {
        $(".butterfly1").removeClass("butterfly1-amination"),
        $(".butterfly2").removeClass("butterfly2-amination"),
        $(".butterfly3").removeClass("butterfly3-amination"),
        $("#section1").find(".bg,.content,.theme").addClass("hide")
    })
}(),
function() {
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
    var t, i, n, s = 0, a = 0, r = 0, o = $("#section1 .container").find(".item").length, c = 109 * (o - 5);
    o <= 5 && $(".arrow-right").addClass("hide"),
    $("#section1 .head").on("touchstart", function(e) {
        r = a = e.changedTouches[0].clientX,
        i = parseInt(s)
    }).on("touchmove", function(e) {
        r = e.targetTouches[0].clientX,
        n = -((n = -(i + (r - a))) < 0 ? 0 : n < c ? n : c),
        $("#section1 .container").css("left", n)
    }).on("touchend", function(e) {
        Math.abs(r - a) < 80 ? $("#section1 .container").css("left", i) : (r = e.changedTouches[0].clientX,
        n = -(i + (r - a)),
        n = 109 * parseInt(n / 109 + 1),
        n = -(n < 0 ? 0 : n < c ? n : c),
        $("#section1 .container").css({
            left: n,
            transition: "left .5s",
            "-webkit-transition": "left .5s"
        }),
        s = n,
        0 != n ? $(".arrow-left").removeClass("hide") : $(".arrow-left").addClass("hide"),
        n != -c ? $(".arrow-right").removeClass("hide") : $(".arrow-right").addClass("hide"))
    }),
    $("#section1 .head .container").on("click", "img", function() {
        var e = $(this).parent().parent().data("tag");
        $(".head-container img").attr("src", "images/name-head/" + e + ".png"),
        $("#section1 .inner2 .name").css("background", "url(images/name-head/name-" + e + ".png) no-repeat center center"),
        (t = "resource/source/audio-" + e + ".mp3") && $("#music").hasClass("on") ? window.musicOn = !0 : window.musicOn = !1,
        window.prevPlay = 0,
        $("#section1 .inner2,#section1 .detail-bg").removeClass("hide")
    }),
    $("#section1").find(".close").on("touchstart", function() {
        $("#section1 .inner2,#section1 .detail-bg").addClass("hide"),
        document.getElementById("personMusic").pause(),
        $(".btn-music").removeClass("on"),
        window.musicOn && (playMusic("bgMusic", "music"),
        window.musicOn = !1)
    }),
    $(".btn-music").on("touchstart", function() {
        $(this).hasClass("on") ? (document.getElementById("personMusic").pause(),
        $(this).removeClass("on"),
        window.musicOn && (document.getElementById("personMusic").pause(),
        playMusic("bgMusic", "music"),
        window.musicOn = !1)) : ($("#music").hasClass("on") ? window.musicOn = !0 : window.musicOn = !1,
        t && (e(t),
        $(this).addClass("on")))
    }),
    $(".btn-info").on("touchstart", function() {
        $("#section5").removeClass("hide"),
        $(".butterfly1").addClass("butterfly1-amination"),
        $(".butterfly2").addClass("butterfly2-amination"),
        $(".butterfly3").addClass("butterfly3-amination")
    }),
    $("#section5").on("touchstart", function() {
        $(this).addClass("hide"),
        $(".butterfly1").removeClass("butterfly1-amination"),
        $(".butterfly2").removeClass("butterfly2-amination"),
        $(".butterfly3").removeClass("butterfly3-amination")
    }),
    $(".arrow-right").on("touchstart", function() {
        var e = Math.abs(parseInt(s));
        e < c && (e += 109),
        e = -e,
        $("#section1 .container").css({
            left: e,
            transition: "left .5s",
            "-webkit-transition": "left .5s"
        }),
        s = e,
        0 != e ? $(".arrow-left").removeClass("hide") : $(".arrow-left").addClass("hide"),
        e != -c ? $(".arrow-right").removeClass("hide") : $(".arrow-right").addClass("hide")
    }),
    $(".arrow-left").on("touchstart", function() {
        var e = Math.abs(parseInt(s));
        e > 0 && (e -= 109),
        e = -e,
        $("#section1 .container").css({
            left: e,
            transition: "left .5s",
            "-webkit-transition": "left .5s"
        }),
        s = e,
        0 != e ? $(".arrow-left").removeClass("hide") : $(".arrow-left").addClass("hide"),
        e != -c ? $(".arrow-right").removeClass("hide") : $(".arrow-right").addClass("hide")
    })
}();
