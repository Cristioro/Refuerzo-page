const salir = document.getElementById("salir");
const bgMusic = document.getElementById("bgMusic");
const welcome = document.getElementById("welcome");
const startBtn = document.getElementById("startBtn");

let contador = 0;

if (startBtn) {
    startBtn.addEventListener("click", () => {
        bgMusic.currentTime = 0; // arranca desde el inicio
        bgMusic.play().catch(err => console.log("Error:", err));
        document.getElementById("welcome").style.display = "none";
        bgMusic.volume = 0.2; // volumen más bajo
    });
}

if (salir) {
    salir.addEventListener("click", (event) => {
        event.preventDefault();
        contador++;
        switch (contador) {
            case 1:
                salir.textContent = "¿Estás seguro?";
                break;
            case 2:
                alert("no hay salida");
                break;
            case 3:
                salir.textContent = "¿De verdad quieres salir?";
                break;
            case 4:
                alert("no hay salida");
                break;
            case 5:
                salir.textContent = "Salir";
                contador = 0;
                break;
        }
    });
}
