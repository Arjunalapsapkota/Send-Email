$(document).ready(function() {
  function messagesent() {
    swal("congrats!! ", "You sent the message", "success");
  }
  function failure() {
    swal("Email not valid", "failed");
  }
  $(".login100-form-btn").click(function(e) {
    e.preventDefault();
    console.log("I am clicked");
    var email = $("#email").val();
    var Regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(Regex.test(email));
    if (Regex.test(email))
      $.post("https://sendomail.herokuapp.com/send", { email: email }, function(
        data
      ) {
        $("#email").val("");
        messagesent();
      });
    else failure();
  });
});
