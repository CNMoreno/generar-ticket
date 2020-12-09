// COMANDO PARA ESTABLECER LA CONEXION

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Perdimos la conexion con el servidor');
});

socket.on('estadoActual', (mensaje) => {
    console.log(mensaje)
    label.text(mensaje.actual);
});

$('button').on('click', () => {

    socket.emit('sigienteTicket', null, (siguienteTicket) => {

        label.text(siguienteTicket);
    });

});