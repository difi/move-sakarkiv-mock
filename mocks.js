let bestedu = require('./bestedusender.js');

const mocks = [
    {
        name: "P360",
        pathName: '/p360',
        wsdlUrl: 'wsdl\\p360.wsdl',
        service: {
            EDUImportService: {
                BasicHttpBinding_IEDUImport: {                    
                    GetCanReceiveMessage : function(args) {

                        bestedu.getCanReceive(args.receiver.orgnr);

                        return {
                            result : "true"
                        };
                    },
                    PutMessage : function(args) {

                        let id = bestedu.getId();
                        bestedu.putMessage(args, id);

                        return {
                            result : 
                                {
                                    attributes: { type: 'OK'} ,
                                    message: {
                                        attributes: {code: 'ID'},
                                        text: id
                                }}
                        };
                    }
                }
            }
        }
    }
];

module.exports = mocks;