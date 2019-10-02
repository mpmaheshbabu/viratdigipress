$('document').ready(() => {

    $("body").niceScroll({cursorcolor:"#2962ff"});
    var html = document.documentElement;
    var body = document.body;
    var scroller = {
        target: document.querySelector("#root"),
        ease: 0.06, // <= scroll speed
        endY: 0,
        y: 0,
        resizeRequest: 1,
        scrollRequest: 0,
    };
    var requestId = null;

    TweenLite.set(scroller.target, {
        rotation: 0.01,
        force3D: true
    });

    window.addEventListener("load", onLoad)

    function onLoad () {
        updateScroller();
        window.focus();
        window.addEventListener("resize", onResize, true);
        document.addEventListener("scroll", onScroll, true);
    }

    function updateScroller () {
        var resized = scroller.resizeRequest > 0;
        if (resized) {
            var height = scroller.target.clientHeight;
            body.style.height = `${height}px`;
            scroller.resizeRequest = 0;
        }
        var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
        scroller.endY = scrollY;
        scroller.y += (scrollY - scroller.y) * scroller.ease;
        if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
            scroller.y = scrollY;
            scroller.scrollRequest = 0;
        }
        TweenLite.set(scroller.target, {
            y: -scroller.y
        });
        requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
    }

    function onScroll() {
        scroller.scrollRequest++;
        if (!requestId) {
            requestId = requestAnimationFrame(updateScroller);
        }
    }

    function onResize() {
        scroller.resizeRequest++;
        if (!requestId) {
            requestId = requestAnimationFrame(updateScroller);
        }
    }
});

window.onload = function(){

    $.get("navbar.html", function(data){
        $("#navbar").html(data);
    });
    $("#navbar").addClass("sticky-top");

    $('.js-tilt').tilt({
        maxTilt: 10,
        glare: true,
        maxGlare: 0.4
    });

    // init controller
    var controller = new ScrollMagic.Controller();

    var sections = document.getElementsByClassName('section');
    var sectionTitles = [];
    var sectionsCount = sections.length;
    for(var i = 0; i < sectionsCount; i++){
        sectionTitles.push('#section0'+(i+1)+' .section-title');
    }
    sectionTitles.forEach(function (sectionTitle) {
        // Create Animations
        var title = $(sectionTitle).find('h1'),
            text = $(sectionTitle).find('p'),
            button = $(sectionTitle).find('a');
        var tweenText = new TimelineMax({pause: true});
        tweenText.add("start") // add timeline label
            .fromTo(title, 0.6, { y: '40px', opacity: 0 }, { y: 0, opacity: 1, ease: Power2.EaseInOut }, "start")
            .fromTo(text, 0.6, { y: '60px', opacity: 0 }, { y: 0, opacity: 1, ease: Power2.EaseInOut }, "start")
            .fromTo(button, 0.6, { y: '100px', opacity: 0 }, { y: 0, opacity: 1, ease: Power2.EaseInOut }, "start");
        // Create the Scene and trigger when visible
        var sectionTitleScene = new ScrollMagic.Scene({
            triggerElement: sectionTitle,
            triggerHook: 0.8,
            offset: 80 /* offset the trigger Npx below scene's top */
        })
            .setTween(tweenText)
            .addTo(controller);
    });

    $(".parallax-text-container").each(function() {
        var tl = new TimelineMax();
        var child = $(this).find(".parallax-text");
        tl.to(child, 1, { y: -80, ease: Linear.easeNone });

        var scene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 1,
            duration: "100%"
        })
            .setTween(tl)
            .addTo(controller);
    });

};