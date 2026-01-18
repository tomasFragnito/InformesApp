const inputDate = document.getElementById("inputDate");
const inputReason = document.getElementById("inputReason");
const inputFile = document.getElementById("inputFile");
const inputNote = document.getElementById("inputNote");
const inputForward = document.getElementById("inputForward");

const btnSend = document.getElementById("btnSend");

const formData = new FormData();

formData.append("date", inputDate.value);
formData.append("reason", inputReason.value);
formData.append("note", inputNote.value);
formData.append("forward", inputForward.value);
formData.append("file", inputFile.files[0]);

const PORT_APP = 3000;

btnSend.addEventListener("click", sendReport);

async function sendReport() {

    const file = inputFile.files[0];
    if (!file) return;

    const res = await fetch("http://localhost:"+PORT_APP+"/reports", {
        method: "POST",
        body: formData
    });

    if (!res.ok) {
        console.error("Error en envio");
        return;
    }

    console(res.ok);
    console(res);

    window.location.href = "./ok.html";
}