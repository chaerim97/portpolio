// skills section :: background
$(function(){

    const $sect = $(".sect-skills");
    const $skill = $sect.find(".skill");

    $skill.on("mouseenter", function(){

        const cls = $(this).data("skill");
        if($(this).hasClass("hover")) return;

        $skill.removeClass("hover")
              .find(".dot-list").stop(true,true).slideUp(300);

        $sect.removeClass("design publishing").addClass(cls)
             .find(".bg").removeClass("on")
             .filter("." + cls).addClass("on");

        $(this).addClass("hover")
               .find(".dot-list").stop(true,true).slideDown(300);

    });

});


// about section :: flow text hover event
var posX = 0, posY = 0;
var mouseX = 0, mouseY = 0;
var active = false;

$(".flow-area").on("mouseenter", function(){
    active = true;
    $(".cursor").show();
});

$(".flow-area").on("mousemove", function(e){

    var offset = $(this).offset();

    mouseX = e.pageX - offset.left;
    mouseY = e.pageY - offset.top;

});

$(".flow-area").on("mouseleave", function(){
    active = false;
    $(".cursor").hide();
});

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