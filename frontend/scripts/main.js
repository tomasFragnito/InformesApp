
const inputReason = document.getElementById("inputReason");
const inputFile = document.getElementById("inputFile");
const inputNote = document.getElementById("inputNote");
const inputForward = document.getElementById("inputForward");
const btnSend = document.getElementById("btnSend");

inputReason.addEventListener("input", validateForm);
inputFile.addEventListener("change", validateForm);
document.addEventListener("file-removed", validateForm);

function validateForm(){

  const reasonOk = inputReason.value.trim() !== "";
  const fileOk = inputFile.files.length > 0;
  btnSend.disabled = !(reasonOk && fileOk);

}

btnSend.addEventListener("click", async () => {
  const formData = new FormData();

  formData.append("reason", inputReason.value);
  formData.append("note", inputNote.value);
  formData.append("forward", inputForward.value);
  formData.append("file", inputFile.files[0]);

  const res = await fetch("http://localhost:3000/reports", {
    method: "POST",
    body: formData
  });

  if (!res.ok) return console.error("Error en envio");

  window.location.href = "./ok.html";

});
