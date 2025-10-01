
/*La función actualizarPuntosRestantes() controla que el jugador no gaste
 más de los puntos permitidos al asignar fuerza, destreza e inteligencia. 
 Primero suma los valores de esas tres estadísticas y calcula cuántos puntos 
 quedan disponibles (restantes). Si el total es menor o igual al máximo, muestra
  los puntos restantes normalmente. Si el total excede el límite, pone los 
  puntos restantes en 0 y corrige automáticamente el valor del atributo que se 
  estaba editando en ese momento, restando el exceso para que nunca se pase del tope. 
  De esta manera, asegura que la distribución siempre sea válida.*/ 
  
const puntosMaximos = 15;
const fuerza = document.getElementById('fuerza');
const destreza = document.getElementById('destreza');
const inteligencia = document.getElementById('inteligencia');
const puntosRestantesEl = document.getElementById('puntosRestantes');
const btnFicha = document.getElementById('btnFicha');
const ficha = document.getElementById('fichaPersonaje');

function actualizarPuntosRestantes() {
  let total = parseInt(fuerza.value) + parseInt(destreza.value) + parseInt(inteligencia.value);
  let restantes = puntosMaximos - total;

  if (restantes >= 0) {
    puntosRestantesEl.textContent = "Puntos restantes: " + restantes;
  } else {
    puntosRestantesEl.textContent = "Puntos restantes: 0";
    let exceso = total - puntosMaximos;
    if (document.activeElement === fuerza) fuerza.value = parseInt(fuerza.value) - exceso;
    if (document.activeElement === destreza) destreza.value = parseInt(destreza.value) - exceso;
    if (document.activeElement === inteligencia) inteligencia.value = parseInt(inteligencia.value) - exceso;
  }
}

fuerza.addEventListener('input', actualizarPuntosRestantes);
destreza.addEventListener('input', actualizarPuntosRestantes);
inteligencia.addEventListener('input', actualizarPuntosRestantes);

btnFicha.addEventListener('click', function() {
  const nombre = document.getElementById('nombre').value;
  const arma = document.getElementById('arma').value;
  const clase = document.getElementById('clase').value;
  const alineacion = document.getElementById('alineacion').value;
  const edad = document.getElementById('edad').value;
  const colorPiel = document.getElementById('colorPiel').value;

  const habilidades = [];
  for (let i = 1; i <= 6; i++) {
    const checkbox = document.getElementById('habilidad' + i);
    if (checkbox.checked) habilidades.push(checkbox.value);
  }

  ficha.innerHTML = `
    <button class="btn btn-cerrar btn-sm" id="cerrarFicha">X</button>
    <div class="text-center">
      <h3>Ficha de personaje</h3>
      <p>Bienvenido <strong>${nombre}</strong>. Te espera un mundo lleno de aventuras.</p>
      <p>Coge tu <strong>${arma}</strong> y ¡ánimo!</p>
      <hr>
      <p><strong>Clase:</strong> ${clase}</p>
      <p><strong>Alineación:</strong> ${alineacion}</p>
      <p><strong>Edad:</strong> ${edad}</p>
      <p><strong>Fuerza:</strong> ${fuerza.value} | <strong>Destreza:</strong> ${destreza.value} | <strong>Inteligencia:</strong> ${inteligencia.value}</p>
      <p><strong>Color de piel:</strong> <span style="background:${colorPiel}; padding:0 10px; border:1px solid #000;">&nbsp;</span></p>
      <p><strong>Habilidades:</strong> ${habilidades.join(', ') || 'Ninguna'}</p>
    </div>
  `;
  
  ficha.style.display = 'block'; // mostrar la ficha

  // cerrar ficha al hacer clic en el botón
  document.getElementById('cerrarFicha').addEventListener('click', () => {
    ficha.style.display = 'none';
  });
});
