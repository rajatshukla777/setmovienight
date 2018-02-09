$(function() {
    //$("#body_smn").append("<div id='test'></div>");
    removeMask();

    function removeMask() {
       setTimeout(removeMask,10);
       if ($('.md-scroll-mask').length) {
            $('.md-scroll-mask').remove();
            /*$( "#test" ).click(function(){
                $( "#test" ).remove();
            });
            $( "#test" ).click();*/
            //$("#menu-toggle").trigger("click");
            //$( "#test2" ).click();
            //document.getElementById("body_smn").setAttribute("style", "position:;width:;");
            document.getElementById("body_smn").setAttribute("style", "");
       };
    }
});