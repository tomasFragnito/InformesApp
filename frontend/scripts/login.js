const btnIndex = document.getElementById("btnSendPage");

btnSendPage.addEventListener("click", btnGoSend);

function btnGoSend(){
  window.location.href = "./send.html";
}