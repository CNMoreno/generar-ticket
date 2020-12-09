const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('sigienteTicket', (data, callback) => {
        let ticket = ticketControl.siguiente();
        console.log(ticket);
        callback(ticket);
    });

    //emitir un evento estado 'actual'

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {

            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //Actualizar / Notificar cambios en los ULTIMOS 4

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    });
});