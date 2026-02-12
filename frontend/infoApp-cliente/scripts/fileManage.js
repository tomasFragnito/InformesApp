const inputFile = document.getElementById("inputFile");
const dropZone = document.querySelector(".drop-zone");
const fileText = document.getElementById("fileText");
const btnRemoveFile = document.getElementById("btnRemoveFile");

inputFile.addEventListener("change", () => {
  if (inputFile.files.length > 0) {
    dropZone.classList.add("loaded");
    fileText.textContent = `Archivo cargado: ${inputFile.files[0].name}`;
    btnRemoveFile.hidden = false;
  }
});

dropZone.addEventListener("click", () => {
  inputFile.click();
});

btnRemoveFile.addEventListener("click", () => {
  inputFile.value = "";
  dropZone.classList.remove("loaded");
  fileText.innerHTML = "Suelte el archivo aquí<br>o haga click";
  btnRemoveFile.hidden = true;

  document.dispatchEvent(new Event("file-removed"));
});
