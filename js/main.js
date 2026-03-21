/* =========================
   Scroll Event AOS
   ========================= */
$(function(){
    AOS.init({
        duration: 800,  // 애니메이션 지속 시간 (밀리초)
        easing:'ease-in-out',  // 애니메이션의 이징 함수
        once: true, // 초기 1번만 실행
        mirror: false,
    });
});



/* =========================
   Header
   ========================= */
$(function(){

    // header 높이 (fixed 대응)
    var headerH = $("header").outerHeight() || 0;

    // 섹션 위치 저장 객체
    var sectTop = {};

    // 클릭 여부 (스크롤 이벤트 충돌 방지)
    var isClick = false;


    // 1. 섹션 위치 저장 함수
    function setSectTop(){
        $("section").each(function(){
            var key = $(this).data("sect");
            sectTop[key] = $(this).offset().top - headerH;
        });
    }

    // 최초 실행
    setSectTop();


    // 2. 스크롤 이벤트 (메뉴 active)
    $(window).on("scroll", function(){

        // 클릭 이동 중이면 무시 (깜빡임 방지)
        if(isClick) return;

        var scrollTop = $(this).scrollTop();
        var currentSect = "";

        // 현재 섹션 찾기
        $.each(sectTop, function(key, value){
            if(scrollTop >= value){
                currentSect = key;
            }
        });

        // 메뉴 active 처리
        $(".nav-list li").removeClass("on");

        $(".nav-list li").each(function(){
            var menuSect = $(this).data("sect");

            if(menuSect === currentSect){
                $(this).addClass("on");
            }
        });

    });


    // 3. 메뉴 클릭 시 부드러운 이동
    $(".nav-list li").on("click", function(e){

        e.preventDefault();

        var target = $(this).data("sect");
        var $targetSect = $("section[data-sect='" + target + "']");
        var targetTop = $targetSect.offset().top - headerH;

        // 클릭 상태 ON
        isClick = true;

        // 메뉴 active 바로 적용
        $(".nav-list li").removeClass("on");
        $(this).addClass("on");

        // 스크롤 이동
        $("html, body").stop().animate({
            scrollTop: targetTop
        }, 600);

        // 애니메이션 끝나면 다시 scroll 이벤트 허용
        setTimeout(function(){
            isClick = false;
        }, 650);

    });


    // 4. 리사이즈 시 위치 재계산 (반응형 대응)
    $(window).on("resize", function(){
        setSectTop();
    });

});


/* =========================
   Skills Section
   ========================= */
$(function(){

    // elements
    const $sect = $(".sect-skills");
    const $skill = $sect.find(".skill");

    // hover : 배경 변경 + 리스트 토글
    $skill.on("mouseenter", function(){

        const cls = $(this).data("skill");

        // 이미 활성화된 경우 실행 방지
        if($(this).hasClass("hover")) return;

        // 초기화
        $skill.removeClass("hover")
              .find(".dot-list").stop(true,true).slideUp(300);

        // 배경 변경
        $sect.removeClass("design publishing")
             .addClass(cls)
             .find(".bg").removeClass("on")
             .filter("." + cls).addClass("on");

        // 현재 요소 활성화
        $(this).addClass("hover")
               .find(".dot-list").stop(true,true).slideDown(300);
    });

});


/* =========================
   Flow Cursor (About Section)
   ========================= */

// position
let posX = 0, posY = 0;
let mouseX = 0, mouseY = 0;
let active = false;

// mouse enter
$(".flow-area").on("mouseenter", function(){
    active = true;
    $(".cursor").show();
});

// mouse move (영역 기준 좌표)
$(".flow-area").on("mousemove", function(e){
    const offset = $(this).offset();

    mouseX = e.pageX - offset.left;
    mouseY = e.pageY - offset.top;
});

// mouse leave
$(".flow-area").on("mouseleave", function(){
    active = false;
    $(".cursor").hide();
});

// animation loop (부드러운 따라다니기)
function loop(){

    if(active){
        posX += (mouseX - posX) * 0.1;
        posY += (mouseY - posY) * 0.1;

        $(".cursor").css({
            left: posX,
            top: posY
        });
    }

    requestAnimationFrame(loop);
}

loop();


/* =========================
   Scroll Top Button
   ========================= */
$(function () {

    const $btn = $('.scrollTop');

    // 스크롤 시 버튼 노출
    $(window).on('scroll', () => 
        $btn.toggleClass('on', $(window).scrollTop() > 100)
    );

    // 클릭 시 상단 이동
    $btn.on('click', () => 
        $('html, body').animate({ scrollTop: 0 }, 600)
    );
});


/* =========================
   Responsive Work Section
   ========================= */
$(function(){

    function initSlick(){
        var winWid = $(window).width();

        if(winWid <= 960){
            // 이미 slick이면 다시 만들지 않음
            if(!$(".work-list").hasClass("slick-initialized")){
                $(".work-list").slick({
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 0,
                    speed: 12000,
                    cssEase: 'linear',
                    arrows: false,
                    draggable: true,
                    responsive: [
                        {
                            breakpoint:481,
                            settings: {
                                slidesToShow: 1,
                            }
                        },
                    ]
                });
            }
        } else {
            // 960px 초과 시 slick 제거
            if($(".work-list").hasClass("slick-initialized")){
                $(".work-list").slick("unslick");
            }
        }
    }

    // 최초 실행
    initSlick();

    // resize 시 실행
    $(window).on("resize", function(){
        initSlick();
    });

});