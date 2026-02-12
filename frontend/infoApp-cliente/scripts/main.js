const API = "https://infoappapi.onrender.com";

const inputReason = document.getElementById("inputReason");
const inputFile = document.getElementById("inputFile");
const inputNote = document.getElementById("inputNote");
const inputEmail = document.getElementById("inputEmail");
const btnSend = document.getElementById("btnSend");

const chkEmail = document.getElementById("chkEmail");
const emailInputCorrection = document.getElementById("emailInputCorrection");

inputReason.addEventListener("input", validateForm);
inputFile.addEventListener("change", validateForm);
document.addEventListener("file-removed", validateForm);

document.addEventListener("DOMContentLoaded", () => {
    chkEmail.checked = false;
    inputEmail.style.display = "none";
    inputEmail.value = "";
    emailInputCorrection.style.display = "none";
});

function validateForm(){
    const reasonOk = inputReason.value.trim() !== "";
    const fileOk = inputFile.files.length > 0;
    btnSend.disabled = !(reasonOk && fileOk);
}

btnSend.addEventListener("click", async () => {

    if (btnSend.disabled) return;

    btnSend.disabled = true;
    document.body.classList.add("loading");

    const formData = new FormData();

    formData.append("reason", inputReason.value);
    formData.append("note", inputNote.value);
    formData.append("file", inputFile.files[0]);

    if (chkEmail.checked) {
        formData.append("email", inputEmail.value);
    }

    const res = await fetch(API+"/api/reports", {method: "POST",body: formData});
    //const res = await fetch("/reports", {method: "POST",body: formData});

    if (!res.ok) {
        btnSend.disabled = false;
        document.body.classList.remove("loading");

        window.location.href = "screen/error.html";
        
        return;
    }
    await res.text();

    window.location.href = "screen/ok.html";
});

function emailValidation(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

chkEmail.addEventListener("change", () => {
    if (chkEmail.checked) {
        inputEmail.style.display = "block";
    } else {
        inputEmail.style.display = "none";
        inputEmail.value = "";
        emailInputCorrection.style.display = "none";
    }
});

inputEmail.addEventListener("input", () => {
    if (!chkEmail.checked) return;

    if ((!emailValidation(inputEmail.value)) && !(inputEmail.value === "")) {
        emailInputCorrection.textContent = "Formato de email incorrecto";
        emailInputCorrection.style.display = "inline-block";
    } else {
        emailInputCorrection.style.display = "none";
    }
});