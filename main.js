document.addEventListener('DOMContentLoaded', function() {
  const form = document.forms['formulario'];
  const guardarBtn = document.getElementById('guardar');
  const borrarTodoBtn = document.getElementById('borrarTodo');
  let editMode = false;
  let editEvent = null;

  if (localStorage.getItem('calendario_datos')) {
    const datosCalendario = JSON.parse(localStorage.getItem('calendario_datos'));
    datosCalendario.forEach(dato => agregarEvento(dato));
  }

  guardarBtn.addEventListener('click', function() {
    const recordatorio = form['recordatorio'].value;
    const descripcion = form['descripcion'].value;
    const diaSemana = form['diaSemana'].value;
    const hora = form['hora'].value;
    const categoria = form['categoria'].value;

    const dato = {
      recordatorio,
      descripcion,
      diaSemana,
      hora,
      categoria
    };

    if (editMode) {
      editEvent.querySelector('.title').textContent = recordatorio;
      editEvent.querySelector('.description').textContent = descripcion;
      editEvent.querySelector('.time').textContent = hora;
      editEvent.querySelector('.category').textContent = categoria;
      editMode = false;
      editEvent = null;

      actualizarLocalStorage();
    } else {
      agregarEvento(dato);
      guardarEnLocalStorage(dato);
    }

    form.reset();
  });

  borrarTodoBtn.addEventListener('click', function() {
    document.querySelectorAll('.events').forEach(function(events) {
      events.innerHTML = '';
    });
    localStorage.removeItem('calendario_datos');
  });

  function agregarEvento(dato) {
    const { recordatorio, descripcion, diaSemana, hora, categoria } = dato;
    const eventHTML = `
      <div class="event">
        <div class="title">${recordatorio}</div>
        <div class="description">${descripcion}</div>
        <div class="time">${hora}</div>
        <div class="category">${categoria}</div>
        <button class="editarB">Editar</button>
        <button class="borrarB">Eliminar</button>
      </div>`;
    document.getElementById(diaSemana).querySelector('.events').insertAdjacentHTML('beforeend', eventHTML);
    addEventListeners();
  }

  function addEventListeners() {
    document.querySelectorAll('.editarB').forEach(function(button) {
      button.addEventListener('click', function() {
        editEvent = this.parentElement;
        form['recordatorio'].value = editEvent.querySelector('.title').textContent;
        form['descripcion'].value = editEvent.querySelector('.description').textContent;
        form['hora'].value = editEvent.querySelector('.time').textContent;
        form['categoria'].value = editEvent.querySelector('.category').textContent;
        editMode = true;
      });
    });

    document.querySelectorAll('.borrarB').forEach(function(button) {
      button.addEventListener('click', function() {
        this.parentElement.remove();
        actualizarLocalStorage();
      });
    });
  }

  function guardarEnLocalStorage(dato) {
    let datosCalendario = JSON.parse(localStorage.getItem('calendario_datos')) || [];
    datosCalendario.push(dato);
    localStorage.setItem('calendario_datos', JSON.stringify(datosCalendario));
  }

  function actualizarLocalStorage() {
    let datosCalendario = [];
    document.querySelectorAll('.event').forEach(event => {
      const dato = {
        recordatorio: event.querySelector('.title').textContent,
        descripcion: event.querySelector('.description').textContent,
        diaSemana: event.closest('.day').id,
        hora: event.querySelector('.time').textContent,
        categoria: event.querySelector('.category').textContent
      };
      datosCalendario.push(dato);
    });
    localStorage.setItem('calendario_datos', JSON.stringify(datosCalendario));
  }


  if (localStorage.getItem('contact_nombre')) {
    document.getElementById('nombre').value = localStorage.getItem('contact_nombre');
  }
  if (localStorage.getItem('contact_email')) {
    document.getElementById('email').value = localStorage.getItem('contact_email');
  }
  if (localStorage.getItem('contact_mensaje')) {
    document.getElementById('mensaje').value = localStorage.getItem('contact_mensaje');
  }

  document.forms['contactForm'].addEventListener('submit', function(e) {
    e.preventDefault();
    localStorage.setItem('contact_nombre', document.getElementById('nombre').value);
    localStorage.setItem('contact_email', document.getElementById('email').value);
    localStorage.setItem('contact_mensaje', document.getElementById('mensaje').value);
    alert('Gracias, nos pondremos en contacto pronto.');
    document.forms['contactForm'].reset();
  });
});

document.getElementById('info-btn').addEventListener('click', function() {
  var datosCursada = document.getElementById('datos-cursada');
  if (datosCursada.classList.contains('d-none')) {
      datosCursada.classList.remove('d-none');
  } else {
      datosCursada.classList.add('d-none');
  }
});