
function reply_click(clicked_id){
    console.log(clicked_id)
    $(".db" +clicked_id).toggle();
}

function reply_clickapi(clicked_id){
    console.log(clicked_id)
    $("." +clicked_id).toggle();
}

function signup(){
    $("#signup").toggle()
}