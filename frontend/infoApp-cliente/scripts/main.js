
const inputReason = document.getElementById("inputReason");
const inputFile = document.getElementById("inputFile");
const inputNote = document.getElementById("inputNote");
const inputEmail = document.getElementById("inputEmail");
const btnSend = document.getElementById("btnSend");

inputReason.addEventListener("input", validateForm);
inputFile.addEventListener("change", validateForm);
document.addEventListener("file-removed", validateForm);

const DNS = "fragapp.duckdns.org";
const ip = "localhost:3000";

function validateForm(){
    const reasonOk = inputReason.value.trim() !== "";
    const fileOk = inputFile.files.length > 0;
    btnSend.disabled = !(reasonOk && fileOk);
}

btnSend.addEventListener("click", async () => {
    const formData = new FormData();

    formData.append("reason", inputReason.value);
    formData.append("note", inputNote.value);
    formData.append("forward", inputEmail.value);
    formData.append("file", inputFile.files[0]);

    const res = await fetch("http://"+ip+"/api/reports", {method: "POST",body: formData});
    //const res = await fetch("/reports", {method: "POST",body: formData});

    if (!res.ok){
        console.error("Error en envio");
        window.location.href = "screen/error.html";
    }
    else{

        window.location.href = "screen/ok.html";
    } 

});

function emailValidation(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

inputEmail.addEventListener("input", () => {
    if (validarEmail(inputEmail.value)) {
        console.log("Formato de email correcto ✅");
    } else {
        console.log("Formato de email incorrecto ❌");
    }
});