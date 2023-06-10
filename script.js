// Obtener elementos del DOM
const participantNameInput = document.getElementById("participant-name");
const participantNumberInput = document.getElementById("participant-number");
const addParticipantBtn = document.querySelector(".add-participant-btn");
const startDrawBtn = document.querySelector(".start-draw-btn");
const resetDrawBtn = document.querySelector(".reset-draw-btn");
const participantList = document.getElementById("participant-list");
const winnerContainer = document.getElementById("winner");
const soundToggle = document.getElementById("sound-toggle");

// Arreglo para almacenar los participantes
let participants = [];

// Función para agregar un participante
function addParticipant() {
  const name = participantNameInput.value.trim();
  const number = participantNumberInput.value.trim();

  // Validar que los campos no estén vacíos
  if (name === "" || number === "") {
    alert("Por favor, ingrese un nombre y un número para el participante.");
    return;
  }

  // Crear objeto de participante
  const participant = {
    name,
    number
  };

  // Agregar el participante al arreglo
  participants.push(participant);

  // Limpiar los campos de entrada
  participantNameInput.value = "";
  participantNumberInput.value = "";

  // Actualizar la tabla de participantes
  updateParticipantTable();
}

// Función para actualizar la tabla de participantes
function updateParticipantTable() {
  // Limpiar la tabla
  participantList.innerHTML = "";

  // Recorrer los participantes y crear las filas de la tabla
  participants.forEach((participant, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${participant.name}</td>
      <td>${participant.number}</td>
      <td>
        <button class="delete-participant-btn" onclick="deleteParticipant(${index})">Eliminar</button>
      </td>
    `;
    participantList.appendChild(row);
  });
}

// Función para eliminar un participante
function deleteParticipant(index) {
  participants.splice(index, 1);
  updateParticipantTable();
}

// Función para realizar el sorteo
function startDraw() {
  // Verificar si hay participantes suficientes para realizar el sorteo
  if (participants.length < 2) {
    alert("No hay suficientes participantes para realizar el sorteo.");
    return;
  }

  // Generar un índice aleatorio para seleccionar al ganador
  const winnerIndex = Math.floor(Math.random() * participants.length);
  const winner = participants[winnerIndex];

  // Mostrar el ganador en el contenedor
  winnerContainer.innerHTML = `
    <h2>¡El ganador es:</h2>
    <p>${winner.name} - Número ${winner.number}</p>
  `;
}

// Función para reiniciar el sorteo
function resetDraw() {
  participants = [];
  winnerContainer.innerHTML = "";
  updateParticipantTable();
}

// Evento para agregar un participante
addParticipantBtn.addEventListener("click", addParticipant);

// Evento para realizar el sorteo
startDrawBtn.addEventListener("click", startDraw);

// Evento para reiniciar el sorteo
resetDrawBtn.addEventListener("click", resetDraw);
