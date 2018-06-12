import React from 'react';
import Form from "../../../components/Form/Form";

import TextInput from "../../../components/Form/TextInput";
import FormValidator from "../../../components/Form/FormValidator";
import './MessageForm.css';
import config from "../../../modules/config";
import envelope from "../../../messages/envelope";
import payload from "../../../messages/payload";
import MDSpinner from "react-md-spinner";
import 'prismjs';
import 'prismjs/themes/prism.css';
import {PrismCode} from "react-prism";
import moment from "moment";
import getFile from "../../../messages/file";

const formValidator = new FormValidator();
const formValidator2 = new FormValidator();



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIntOfSize(size){
    let returnArray = [...Array(size)].map(()=>{
        return getRandomInt(0, 9)
    });
    return parseInt(returnArray.join(''))
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

const jpJpostnr = getRandomIntOfSize(2);
const jpSeknr = getRandomIntOfSize(6);
const jpJdato = new moment().format('YYYY-MM-DD');
const jpJaar = new moment().format('YYYY');
const jpId = `${jpJaar}${jpJpostnr}`;
const jpDokdato = new moment().format('YYYY-MM-DD');
const saSaar = new moment().format('YYYY-MM-DD');
const saDato = new moment().format('YYYY-MM-DD');
const saSeknr = getRandomIntOfSize(5);
const saArkdel = `Sakarkiv + ${new moment().format('YYYY')}`;
// Mangler
// - jpInnhold
// - saSaar
// - jpSaseknr
// - jpOffinnhold
//<jpDokdato>{datetime.now format: yyyy-mm-dd}</jpDokdato>
//<jpJaar>{datetime.now.year}</jpJaar>
//<jpId>{jpJaar + jpJpostnr}</jpId>

export default class MessageForm extends React.Component {
    
    state = {
        // "selectedOrg": {
        //     "orgNum": 911986302,
        //     "orgName": "KRG GROUP AS"
        // },
        // "formValid": true,
        // showMessage: true
    };


    componentDidMount() {
        formValidator2.addListener(this.onFormUpdate)
    };

    componentWillUnMount() {
        formValidator2.removeListener(this.onFormUpdate)
    };

    onFormUpdate = isValid => {
        this.setState({
            formValid : isValid
        });
    };


    checkBRR = () => {

        //MDSpinner

        this.setState({
            isCheckingBR: true
        }, () => {
            let orgNum = formValidator.getData().get('receiver').value;
            fetch(`http://data.brreg.no/enhetsregisteret/enhet/${orgNum}.json`)
                .then((res) => {
                    if (res.ok){
                        return res.json()
                    }
                    this.setState({
                        isCheckingBR: false,
                        error: {
                            message: res.status === 404 ?
                                'Ingen organisasjon funnet.' :
                                'Kall mot brreg feilet.'
                        }
                    });
                    throw Error(res.statusText);
                })
                .then((data) => {
                    this.setState({
                        isCheckingBR: false,
                        error: null,
                        selectedOrg: {
                            orgNum: data.organisasjonsnummer,
                            orgName: data.navn
                        }
                    });
                }).catch((err) => {
                    console.log(err);
            });
        });
    };

    changeSender = () => {
        this.setState({
            showMessage: false,
            selectedOrg: null,
            unconfirmedOrgNum: this.state.selectedOrg.orgNum
        });
    };

    toggleShowMessage = () => {

        let shouldShow = !this.state.showMessage
        let caseTitle, docTitle;
        if (shouldShow){
            caseTitle = formValidator2.getData().get('caseTitle').value;
            docTitle = formValidator2.getData().get('docTitle').value;
        }

        this.setState({
            showMessage: !this.state.showMessage,
            caseTitle: caseTitle,
            docTitle: docTitle
        });
    };

    getPayload(){
        let caseTitle = '';
        let docTitle = '';

        if (formValidator2.checkValidForm()){
            caseTitle = formValidator2.getData().get('caseTitle').value;
            docTitle = formValidator2.getData().get('docTitle').value;
        }

        return payload(
            jpId, jpJaar, jpSeknr,
            jpJpostnr, jpJdato, jpDokdato,
            this.state.selectedOrg.orgNum,
            this.state.selectedOrg.orgName,
            saSaar, saSeknr, saDato, saArkdel,
            docTitle, caseTitle);
    }

    getEnvelope(){
        return envelope(
            config.orgNum,
            config.orgName,
            config.email,
            "eklrngerkjn",
            this.state.selectedOrg.orgNum,
            this.state.selectedOrg.orgName,
            "ergkm@eaglkrg.no",
            "lkretnkrtjnehkjn"
        );
    }

    sendMessage = () => {
        fetch('/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                envelope: this.getEnvelope(),
                payload: this.getPayload()
            })
        });
    };

    render(){

        return (
            <div style={{
                height: "100%",
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ maxHeight: "96%", overflow: 'scroll' }}>

            <div className="MessageForm container">

                <h3>Ny melding</h3>

                <div className="row wrapper">

                    <div className="col-lg-6">

                        <h4>Mottaker</h4>

                        { !this.state.selectedOrg &&
                            <Form formValidator={formValidator}
                                  onSubmit={this.checkBRR}
                                  submitButtonText={"Sett avsender"}>

                                {  !this.state.isCheckingBR &&
                                    <TextInput
                                        formValidator={formValidator}
                                        name="receiver"
                                        validations="orgNum"
                                        isRequired={true}
                                        label="Mottaker *"
                                        type="text"
                                        errorMessage="Vennligst angi et gyldig org nummer."
                                        initialValue={this.state.unconfirmedOrgNum  || null}
                                        inputFunction='trim'
                                    />
                                }

                                {  this.state.isCheckingBR &&
                                    <MDSpinner
                                        size={24}
                                        color1="#498CBB"
                                        color2="#8F6693"
                                        color3="#5ACAFA"
                                        color4="#C7B3CA"
                                    />
                                }

                            </Form>
                        }

                        { this.state.selectedOrg &&
                            <div>
                                <ul>
                                    <li>Orgnr: { this.state.selectedOrg.orgNum }</li>
                                    <li>Navn: { this.state.selectedOrg.orgName }</li>
                                </ul>

                                <button type="button" className="btn btn-outline-primary btn-sm" onClick={this.changeSender}>Skift mottaker</button>


                                <Form formValidator={formValidator2}
                                      onSubmit={this.sendMessage}
                                      submitButtonText={"Send"}
                                      hideSubmitButton={true}
                                >

                                    <TextInput
                                        formValidator={formValidator2}
                                        name="reference"
                                        isRequired={true}
                                        label="Referanse *"
                                        type="text"
                                        errorMessage="Vennligst angi referanse."
                                    />

                                    <TextInput
                                        formValidator={formValidator2}
                                        name="convId"
                                        isRequired={true}
                                        label="ConversationId *"
                                        type="text"
                                        errorMessage="Vennligst angi ConversationId."
                                    />


                                    <TextInput
                                        formValidator={formValidator2}
                                        name="caseTitle"
                                        isRequired={true}
                                        label="Sakstittel *"
                                        type="text"
                                        errorMessage="Vennligst angi sakstittel."
                                    />

                                    <TextInput
                                        formValidator={formValidator2}
                                        name="docTitle"
                                        isRequired={true}
                                        label="Dokumenttittel *"
                                        type="text"
                                        errorMessage="Vennligst angi dokumenttittel."
                                    />
                                </Form>
                            </div>
                        }

                        { this.state.error &&
                            <div>{ this.state.error.message }</div>
                        }

                    </div>

                    <div className="col-lg-6">

                        <h4>Avsender</h4>
                        <ul>
                            <li>Orgnr: { config.orgNum }</li>
                            <li>Navn: { config.orgName }</li>
                        </ul>
                    </div>


                    { this.state.showMessage &&

                        <div className="col-lg-12">

                            <h5>Envelope:</h5>
                            <PrismCode component="pre" className="language-markup">
                                { this.getEnvelope() }
                            </PrismCode>

                            <h5>Payload:</h5>
                            <PrismCode component="pre" className="language-markup">
                                { this.getPayload() }
                            </PrismCode>
                        </div>
                    }
                </div>

            </div>

                </div>

                <div className='form-buttons'>

                        <div className='message-buttons'>
                            <button type="button" className={`btn btn-outline-primary  ${ !this.state.formValid && 'disabled' }`} onClick={() => {
                                if (this.state.formValid) this.sendMessage();
                            }}>Send</button>
                            <button type="button" className="btn btn-outline-primary" onClick={() => {
                                download('test.pdf', getFile())
                            }}>Vis fil</button>
                            <button type="button" className="btn btn-outline-primary" onClick={this.toggleShowMessage}>{ this.state.showMessage ? 'Skjul melding' : 'Vis melding' }</button>
                        </div>

                    <button type="button" className="btn btn-outline-secondary btn-sm cancel-button" onClick={this.props.dismiss}>Avbryt</button>
                </div>

            </div>

        );
    }
}