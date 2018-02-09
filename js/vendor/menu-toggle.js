$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $temp=$("#menu-toggle").text();
    if($.trim($temp) === "<"){
        $("#menu-toggle").html('<b> > </b>');
        //$("#menu-toggle").css('background-color', '#2BD1FF');
    }
    else{
        $("#menu-toggle").html('<b> < </b>');
        //$("#menu-toggle").css('background-color', '#FFFFFF');
    }
    $("#wrapper").toggleClass("toggled");
});

$("#movie").click(function(e) {
    $("#menu-toggle").trigger("click");
});

$("#siteTitle").click(function(e) {
    $("#menu-toggle").trigger("click");
});

$("#selectCelebs").click(function(e) {
    $("#menu-toggle").trigger("click");
});

$("#keyword").click(function(e) {
    $("#menu-toggle").trigger("click");
});