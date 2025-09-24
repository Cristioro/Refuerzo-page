const salir = document.getElementById("salir");
const bgMusic = document.getElementById("bgMusic");
const welcome = document.getElementById("welcome");
const startBtn = document.getElementById("startBtn");
const welcometitle = document.getElementById("welcome-title");
const taskTitles = document.querySelectorAll(".task-title");

// Fecha objetivo (30 septiembre 2025, 18:00 Colombia UTC-5)
const targetDate = new Date("2025-09-30T18:00:00-05:00");

let warningMostrado = false;
let contador = 0;

start = false;

// === ESCRITURA AUTOMÁTICA ROTA ===
function typewriterGlitch(elementId, frases, velocidad = 100, glitchProb = 0.2) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let fraseIndex = 0;
    let charIndex = 0;
    let escribiendo = true;

    const glitchChars = ["#", "%", "@", "╬", "▒", "░", "╳", "ø", "¿", "∆"];

    function escribir() {
        let frase = frases[fraseIndex];

        if (escribiendo) {
            if (charIndex < frase.length) {
                let char = frase[charIndex];
                if (Math.random() < glitchProb) {
                    char = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    el.innerHTML += `<span class="glitch-char">${char}</span>`;
                } else {
                    el.innerHTML += char;
                }
                charIndex++;
                setTimeout(escribir, velocidad);
            } else {
                escribiendo = false;
                setTimeout(borrar, 2000); // espera antes de borrar
            }
        }
    }

    function borrar() {
        if (charIndex > 0) {
            el.innerHTML = el.innerHTML.slice(0, -1);
            charIndex--;
            setTimeout(borrar, velocidad / 2);
        } else {
            escribiendo = true;
            fraseIndex = (fraseIndex + 1) % frases.length;
            setTimeout(escribir, velocidad);
        }
    }

    escribir();
}

// Inicializar en tu pantalla de bienvenida
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        typewriterGlitch("welcome-title", [
            " El tiempo corre, no te quedes atrás...",
            "Cada error regresa con otra forma",
            "La memoria también duele",
            "Refuerza o repite, tú decides"
        ], 120, 0.25);
    }, 5000);

});

if (startBtn) {
    startBtn.addEventListener("click", () => {
        bgMusic.currentTime = 0; // arranca desde el inicio
        bgMusic.play().catch(err => console.log("Error:", err));
        document.getElementById("welcome").style.display = "none";
        bgMusic.volume = 0.2; // volumen más bajo
        start = true;
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


document.addEventListener("mouseleave", () => {
    const overlay = document.createElement("div");
    overlay.classList.add("exit-warning");

    // Mensajes aleatorios
    const mensajes = [
        "¿Crees que puedes huir?",
        "No hay escapatoria...",
        "Siempre regreso...",
        "La salida no existe.",
        "Tu error fue volver aquí."
    ];
    overlay.textContent = mensajes[Math.floor(Math.random() * mensajes.length)];

    document.body.appendChild(overlay);

    // Se borra solo después de unos segundos
    setTimeout(() => overlay.remove(), 2500);
});


function createDust() {
    for (let i = 0; i < 20; i++) {
        const dust = document.createElement("div");
        dust.classList.add("dust");
        dust.style.left = Math.random() * 100 + "vw";
        dust.style.animationDuration = (5 + Math.random() * 10) + "s";
        dust.style.animationDelay = (Math.random() * 5) + "s";
        document.body.appendChild(dust);
    }
}


function updateCountdown() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
        document.getElementById("countdown").innerHTML = "⛓️ ¡El destino llegó!";
        clearInterval(timer);
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("countdown").innerHTML =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown();

function ChangeTaskTitle() {
    // Lista de frases
    let frases = [
        "tarea " + (Math.floor(Math.random() * 535) + 1),
        "🩸 Deber pendiente",
        "☠️ Juicio académico",
        "🕯️ Examen del ocaso",
        "📜 Escrito de redención",
        "⚰️ Última oportunidad"
    ];
    if (!start) return;

    taskTitles.forEach((el) => {
        // Escoge frase aleatoria
        const nuevoTitulo = frases[Math.floor(Math.random() * frases.length)];

        // efecto glitch temporal
        el.classList.add("glitch-text");
        setTimeout(() => {
            el.textContent = nuevoTitulo;
            el.setAttribute("data-text", nuevoTitulo); // si usas glitch.css
            el.classList.remove("glitch-text");
        }, 500);
    });

    // Vuelve a cambiar en un tiempo aleatorio entre 3s y 7s
    const randomTime = Math.floor(Math.random() * (7000 - 3000) + 3000);
    setTimeout(ChangeTaskTitle, randomTime);
}

// Inicia el ciclo después de 2 segundos
setTimeout(ChangeTaskTitle, 2000);


createDust();
