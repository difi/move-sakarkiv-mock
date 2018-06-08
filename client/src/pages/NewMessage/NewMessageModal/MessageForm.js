import React from 'react';
import Form from "../../../components/Form/Form";

import TextInput from "../../../components/Form/TextInput";
import FormValidator from "../../../components/Form/FormValidator";
import './MessageForm.css';

const formValidator = new FormValidator();

export default class MessageForm extends React.Component {
    
    state = {};


// {"organisasjonsnummer":988054054,"navn":"ADACA IMPORT ADA CAROLINA CHEMES","registreringsdatoEnhetsregisteret":"2005-04-16","maalform":"Bokmål","registrertIFrivillighetsregisteret":"N","registrertIMvaregisteret":"N","registrertIForetaksregisteret":"J","registrertIStiftelsesregisteret":"N","antallAnsatte":0,"orgform":{"kode":"ENK","beskrivelse":"Enkeltpersonforetak"},"institusjonellSektorkode":{"kode":"8200","beskrivelse":"Personlig næringsdrivende"},"naeringskode1":{"kode":"46.900","beskrivelse":"Uspesifisert engroshandel"},"forretningsadresse":{"adresse":"Grefsenveien 90","postnummer":"0489","poststed":"OSLO","kommunenummer":"0301","kommune":"OSLO","landkode":"NO","land":"Norge"},"konkurs":"N","underAvvikling":"N","underTvangsavviklingEllerTvangsopplosning":"N","links":[{"rel":"self","href":"http://data.brreg.no/enhetsregisteret/enhet/988054054"}],"organisasjonsform":"ENK"}

    sendMessage = () => {
      console.log('Send it!');

      let orgNum = formValidator.getData().get('receiver').value;


        fetch(`http://data.brreg.no/enhetsregisteret/enhet/${orgNum}.json`)
            .then((res) => {
                console.log(res);
                if (res.ok){
                    return res.json()
                }
                this.setState({
                    error: {
                        message: res.status === 404 ?
                            'Ingen organisasjon funnet.' :
                            'Kall mot brreg feilet.'
                    }
                });
                throw Error(res.statusText);

            })
            .then((data) => {
                console.log(data);
                this.setState({
                    selectedOrg: {
                        orgNum: data.organisasjonsnummer,
                        orgName: data.navn
                    }
                });
            }).catch((err) => {
                console.log(err);
            })

    };

    render(){

        return (
            <div className="MessageForm container">

                <h3>Ny melding</h3>

                <div className="row">

                <div className="col-lg-6">

                    <h4>Avsender</h4>

                    { !this.state.selectedOrg &&

                    <Form formValidator={formValidator}
                          onSubmit={this.sendMessage}
                          submitButtonText={"Save"}>
                        <TextInput
                            formValidator={formValidator}
                            name="receiver"
                            validations="orgNum"
                            isRequired={true}
                            label="Mottaker *"
                            type="text"
                            errorMessage="Vennligst angi et gyldig org nummer."
                        />
                    </Form>

                    }


                    { this.state.selectedOrg &&
                        <div>{ JSON.stringify(this.state.selectedOrg) }</div>
                    }




                    { this.state.error &&
                        <div>{ this.state.error.message }</div>
                    }

                </div>

                <div className="col-lg-6">

                    <h4>Mottaker</h4>

                </div>


                </div>



                <button type="button" className="btn btn-outline-secondary btn-sm cancel-button" onClick={this.props.dismiss}>Avbryt</button>
            </div>

        );
    }
}