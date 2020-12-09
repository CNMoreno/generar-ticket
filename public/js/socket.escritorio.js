var socket = io();

//var label = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Perdimos la conexion con el servidor');
});

var searchParamas = new URLSearchParams(window.location.search);

if (!searchParamas.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es necesario');
}
var escritorio = searchParamas.get('escritorio');
var label = $('small');
console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', () => {


    socket.emit('atenderTicket', { escritorio }, (resp) => {
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return

        }
        label.text(resp.numero);

    });

});