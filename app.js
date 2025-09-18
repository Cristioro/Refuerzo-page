const salir = document.getElementById("salir");
const bgMusic = document.getElementById("bgMusic");
const welcome = document.getElementById("welcome");
const startBtn = document.getElementById("startBtn");
const welcometitle = document.getElementById("welcome-title");

let contador = 0;

if (welcometitle) {
    const mensajes = [
        welcometitle.textContent,
        "El tiempo corre, no te quedes atrás...",
        "Este es tu segundo intento",
        "Las segundas oportunidades también pesan",
        "Aquí estoy, frente a los restos de lo que olvidé",
        "Cada página que repaso es un fantasma que regresa",
        "El refuerzo es la cicatriz de mis errores"
    ];
    let index = 0;
    setInterval(() => {
        index = Math.floor(Math.random() * mensajes.length); // aleatorio
        welcometitle.textContent = mensajes[index];
        welcometitle.classList.add("glitch-strong");
        setTimeout(() => {
            welcometitle.classList.remove("glitch-strong");
        }, 500); // dura medio segundo el glitch fuerte
    }, 2000);
}

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
