localStorage.setItem("seasonID", "0000");

$("#seasonID").val(localStorage.getItem("seasonID"));

$(document).ready(function(){
    $.ajax({ 
        url: "/auth",
        data: { value: $('#seasonID').val() }, 
        method: "post", 
    });
});