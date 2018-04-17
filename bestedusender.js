let soap = require('soap');
let url = 'http://localhost:8088/bestedu?WSDL';

module.exports = {


    getCanReceive: function (receiverOrgnr) {

        let args = { receiver: { orgnr: receiverOrgnr } };
        soap.createClient(url, function (err, client) {
            client.GetCanReceiveMessage(args, function (err, result) {
                console.log(result);
            });
        });
    },

    putMessage: function (receivedMesssage, id) {
        let args = {
            envelope: {
                attributes: { conversationId: receivedMesssage.envelope.attributes.conversationId } ,
                sender: {
                    orgnr: receivedMesssage.envelope.sender.orgnr,
                    ref: receivedMesssage.envelope.sender.ref
                },
                receiver: {
                    orgnr: receivedMesssage.envelope.receiver.orgnr,
                    ref: receivedMesssage.envelope.receiver.ref
                }
            },
            payload: getPutMessagePayload(id)
        }
        soap.createClient(url, function (err, client) {
            client.GetCanReceiveMessage(args, function (err, result) {
                console.log(result);
            });
        });
    },
    
    getId: function(){
        min = Math.ceil(1);
        max = Math.floor(100000);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

function getPutMessagePayload(id){
    let xml = "<AppReceipt type=\"OK\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://www.arkivverket.no/Noark/Exchange/types\"><message code=\"ID\" xmlns=\"\"><text>"+id+"</text></message></AppReceipt>";
    return xml;
}

