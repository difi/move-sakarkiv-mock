import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import './Dashboard.css';
import ReactModal from 'react-modal';
import MessageForm from "../NewMessage/NewMessageModal/MessageForm";

let data = [
    {
        "mottaker": "427466221",
        "avsender": "083567473",
        "conversationId": "b4e6238a-4947-43e5-ae86-8ebbb33f9b79",
        "timestamp": "2018-05-21T11:39:19 -02:00"
    },
    {
        "mottaker": "117634507",
        "avsender": "755136255",
        "conversationId": "1c43fc28-7074-4fc2-84f4-0f253723dc7f",
        "timestamp": "2015-05-29T10:40:54 -02:00"
    },
    {
        "mottaker": null,
        "avsender": "491838973",
        "conversationId": "0f324910-07f1-44ba-9467-bb1763a334ef",
        "timestamp": "2014-05-18T06:33:52 -02:00"
    },
    {
        "mottaker": "176723955",
        "avsender": "218327834",
        "conversationId": "6b70fbbd-0369-442b-af0b-dfc74cf4fe05",
        "timestamp": "2016-10-05T03:13:16 -02:00"
    },
    {
        "mottaker": "392089810",
        "avsender": "214615827",
        "conversationId": "911b8872-21e3-4d35-9fcb-ed08bc0ad138",
        "timestamp": "2014-01-08T02:23:27 -01:00"
    },
    {
        "mottaker": "778028514",
        "avsender": "841999290",
        "conversationId": "7e33f7a4-bf7a-4844-baa4-338ccc6f9c87",
        "timestamp": "2015-11-19T02:14:03 -01:00"
    },
    {
        "mottaker": "925334499",
        "avsender": "254946885",
        "conversationId": "6e9606eb-4227-4908-9906-ed05d5602837",
        "timestamp": "2017-05-12T09:20:52 -02:00"
    },
    {
        "mottaker": "996940594",
        "avsender": "661619791",
        "conversationId": "1d973f00-5f08-4ac9-9a7c-971c90889d31",
        "timestamp": "2017-01-25T05:17:02 -01:00"
    },
    {
        "mottaker": null,
        "avsender": "276027670",
        "conversationId": "eab74537-5212-4d7f-b1fe-dc294e455dd8",
        "timestamp": "2016-06-05T01:12:58 -02:00"
    },
    {
        "mottaker": "537441011",
        "avsender": "495929124",
        "conversationId": "09c3d435-2cfc-448a-883b-193524eb8971",
        "timestamp": "2017-06-29T01:40:07 -02:00"
    },
    {
        "mottaker": "559854158",
        "avsender": "911470497",
        "conversationId": "3a072abe-4d44-4876-9e27-a0865225cbc4",
        "timestamp": "2018-04-15T09:21:18 -02:00"
    },
    {
        "mottaker": "829617293",
        "avsender": "272326002",
        "conversationId": "c3c16967-ad14-461e-8b84-8a04dd7ea213",
        "timestamp": "2018-01-29T05:23:53 -01:00"
    },
    {
        "mottaker": "382385667",
        "avsender": "605602703",
        "conversationId": "d263fe8d-b6dd-414c-83ee-bf2b1913d796",
        "timestamp": "2018-05-12T03:38:29 -02:00"
    },
    {
        "mottaker": "773644772",
        "avsender": "605555993",
        "conversationId": "9be6c26c-be82-423f-9818-6a4f4eda07de",
        "timestamp": "2016-01-24T02:21:21 -01:00"
    },
    {
        "mottaker": "415836880",
        "avsender": "716507998",
        "conversationId": "ac991571-06fb-4ea1-a6fb-4b531ef4aed3",
        "timestamp": "2016-02-23T02:07:33 -01:00"
    },
    {
        "mottaker": "469367339",
        "avsender": "824536627",
        "conversationId": "52e13316-4b41-4e33-a421-7ab601c3a8f7",
        "timestamp": "2018-02-28T11:23:41 -01:00"
    },
    {
        "mottaker": "086886049",
        "avsender": "330447818",
        "conversationId": "48c4fbef-81f6-4606-8fd0-992beb989eb8",
        "timestamp": "2014-09-15T12:53:20 -02:00"
    },
    {
        "mottaker": "348765094",
        "avsender": "457232683",
        "conversationId": "d336969a-3a5b-41d0-aa3a-0523c0aadec7",
        "timestamp": "2017-05-11T05:25:24 -02:00"
    },
    {
        "mottaker": "664689707",
        "avsender": "126932987",
        "conversationId": "7983aa3c-fb00-49d4-bf0a-51eb6cbc4872",
        "timestamp": "2018-03-31T05:15:18 -02:00"
    },
    {
        "mottaker": "394502499",
        "avsender": "386399573",
        "conversationId": "b1c01b8b-9e64-41eb-b98d-d7b93f0d7ebc",
        "timestamp": "2015-04-23T08:34:22 -02:00"
    },
    {
        "mottaker": "973117300",
        "avsender": "103913446",
        "conversationId": "ae318d09-4ac3-4420-8e8f-1d049b9cdfaa",
        "timestamp": "2015-09-17T06:13:45 -02:00"
    },
    {
        "mottaker": "952252836",
        "avsender": "494893096",
        "conversationId": "9ee8b7fe-8c13-4a9d-861b-62d021d6e403",
        "timestamp": "2017-04-20T03:28:00 -02:00"
    },
    {
        "mottaker": "530118169",
        "avsender": "149603492",
        "conversationId": "ae2b5e3d-dde4-42ef-b073-1ef5abce4b0f",
        "timestamp": "2014-03-19T05:34:39 -01:00"
    },
    {
        "mottaker": "465544163",
        "avsender": null,
        "conversationId": "b8513e96-dabd-48b0-b0a7-53adbafeb0be",
        "timestamp": "2016-05-08T09:50:50 -02:00"
    },
    {
        "mottaker": "647587631",
        "avsender": "029544662",
        "conversationId": "e3c7aaa3-7500-4ccf-a9ff-b8f9f788f1aa",
        "timestamp": "2018-05-19T01:08:20 -02:00"
    },
    {
        "mottaker": "959986177",
        "avsender": "278693139",
        "conversationId": "d15cd052-4e3b-4f5c-9e55-439e465be1e6",
        "timestamp": "2017-06-17T05:01:18 -02:00"
    },
    {
        "mottaker": "979093322",
        "avsender": "473973006",
        "conversationId": "f0d02ccc-4357-4558-acd5-21d91fbeab05",
        "timestamp": "2014-12-24T11:40:51 -01:00"
    },
    {
        "mottaker": "182192236",
        "avsender": "533436897",
        "conversationId": "eab36b0b-9865-47f4-9915-70ce941d8527",
        "timestamp": "2014-10-13T05:53:10 -02:00"
    },
    {
        "mottaker": "993146897",
        "avsender": "337889417",
        "conversationId": "2d74c3b9-0215-4820-89f8-a3c1296169b6",
        "timestamp": "2015-10-22T07:16:07 -02:00"
    },
    {
        "mottaker": "482003303",
        "avsender": "148549672",
        "conversationId": "e58bb39b-ded8-4c93-ad34-0e1d3c89246d",
        "timestamp": "2015-12-11T04:22:16 -01:00"
    },
    {
        "mottaker": "958404867",
        "avsender": "763445690",
        "conversationId": "70447488-cb3c-4944-8407-069ae53ed983",
        "timestamp": "2017-04-16T03:12:13 -02:00"
    },
    {
        "mottaker": "809067246",
        "avsender": "188708986",
        "conversationId": "a17deda8-347d-4a93-8d6a-226fd8bf9b8f",
        "timestamp": "2015-09-04T05:21:07 -02:00"
    },
    {
        "mottaker": "974556162",
        "avsender": "784781143",
        "conversationId": "cbadd361-64f0-48b4-9cf4-a4f6fccc94e5",
        "timestamp": "2017-06-04T07:55:09 -02:00"
    },
    {
        "mottaker": "732593772",
        "avsender": "804481141",
        "conversationId": "00f95631-b973-481f-b24f-f1bb7095e865",
        "timestamp": "2018-02-25T08:38:55 -01:00"
    },
    {
        "mottaker": "583346236",
        "avsender": "153746079",
        "conversationId": "7288bca7-95f7-4750-87cb-424dfccd8d58",
        "timestamp": "2015-01-03T01:12:40 -01:00"
    },
    {
        "mottaker": "555962770",
        "avsender": "699121312",
        "conversationId": "86c0ee0c-7c5a-4e5c-b523-2a0c14368bfe",
        "timestamp": "2016-08-27T06:15:40 -02:00"
    },
    {
        "mottaker": "523869108",
        "avsender": "301165609",
        "conversationId": "532e87d1-8b86-4d1f-a4c3-e96c02e6f6cb",
        "timestamp": "2017-03-24T03:01:28 -01:00"
    },
    {
        "mottaker": "800549035",
        "avsender": "715877619",
        "conversationId": "2fbf8ab9-b6d3-4f13-8a57-513d63fb4fe4",
        "timestamp": "2018-05-15T10:58:17 -02:00"
    },
    {
        "mottaker": "622498561",
        "avsender": "628291470",
        "conversationId": "363a421c-d3e7-48d1-82cb-b17bb5a25bc2",
        "timestamp": "2017-03-10T07:56:00 -01:00"
    },
    {
        "mottaker": "476691907",
        "avsender": "334558177",
        "conversationId": "6998dbda-e111-4d07-8699-2c7a52a25e1b",
        "timestamp": "2017-02-25T11:17:16 -01:00"
    },
    {
        "mottaker": null,
        "avsender": "136490311",
        "conversationId": "5c53d254-54c0-4b01-9d67-207de1497865",
        "timestamp": "2016-07-01T02:10:38 -02:00"
    },
    {
        "mottaker": "990081328",
        "avsender": "115349465",
        "conversationId": "19fab1a1-5d69-48af-b514-d27435793b60",
        "timestamp": "2016-04-06T04:47:11 -02:00"
    },
    {
        "mottaker": "166343445",
        "avsender": "604173760",
        "conversationId": "eaf0314e-7ea5-44d7-b8ea-454da541e78f",
        "timestamp": "2017-10-23T02:01:08 -02:00"
    },
    {
        "mottaker": "820894618",
        "avsender": "683485179",
        "conversationId": "e56fabe2-0818-44f6-8b7d-e11a9c459dfe",
        "timestamp": "2018-05-21T03:39:14 -02:00"
    },
    {
        "mottaker": "936135234",
        "avsender": "979960565",
        "conversationId": "625449cf-9b40-47eb-80e4-6640fb157dfe",
        "timestamp": "2016-04-17T01:15:18 -02:00"
    },
    {
        "mottaker": "743740602",
        "avsender": "192687160",
        "conversationId": "611ec87c-5beb-4b24-af4a-3fcb523eb09b",
        "timestamp": "2017-08-28T02:36:03 -02:00"
    },
    {
        "mottaker": "003727882",
        "avsender": "305053406",
        "conversationId": "ea01ba13-4cf5-4a50-92e4-b85af475fafb",
        "timestamp": "2017-01-22T01:42:40 -01:00"
    },
    {
        "mottaker": "592064383",
        "avsender": "647322980",
        "conversationId": "014ba60c-5c35-48f4-8d16-7dc4296012ac",
        "timestamp": "2016-08-14T06:44:52 -02:00"
    },
    {
        "mottaker": "153735158",
        "avsender": "847768479",
        "conversationId": "60d3b7bb-1494-4571-919e-96f6b9495ce4",
        "timestamp": "2016-11-24T03:32:32 -01:00"
    },
    {
        "mottaker": "382058941",
        "avsender": "887164207",
        "conversationId": "b189fbd9-4fe7-489c-96c4-6e1bfd771cd3",
        "timestamp": "2018-04-29T10:17:29 -02:00"
    },
    {
        "mottaker": "618793907",
        "avsender": "620449962",
        "conversationId": "28efeb0a-4aef-4f85-97c2-299952a6ab16",
        "timestamp": "2015-09-19T10:19:52 -02:00"
    },
    {
        "mottaker": "588312143",
        "avsender": "584582715",
        "conversationId": "0fc6bdbe-0fa6-45e8-8594-e1b1febb1120",
        "timestamp": "2018-02-01T09:29:09 -01:00"
    },
    {
        "mottaker": "007790937",
        "avsender": null,
        "conversationId": "7ec0c997-b032-4d95-a546-1de9cf15a780",
        "timestamp": "2018-05-24T11:51:00 -02:00"
    },
    {
        "mottaker": "614396970",
        "avsender": "047154952",
        "conversationId": "f67cbb76-5614-4253-875b-761eeab998ff",
        "timestamp": "2017-06-05T07:04:24 -02:00"
    },
    {
        "mottaker": "132184364",
        "avsender": "293804834",
        "conversationId": "a55e7dbe-26ea-421f-97d1-9df1b2b3ebba",
        "timestamp": "2016-12-28T11:40:41 -01:00"
    },
    {
        "mottaker": "768350809",
        "avsender": "965877150",
        "conversationId": "00d86177-7479-4c6f-bb6e-40f7b9eeca5a",
        "timestamp": "2017-08-08T12:27:55 -02:00"
    },
    {
        "mottaker": "106185131",
        "avsender": "390376219",
        "conversationId": "d743e035-17fe-4050-9cf6-0c9693452a22",
        "timestamp": "2017-09-02T12:53:31 -02:00"
    },
    {
        "mottaker": "250392001",
        "avsender": "648919840",
        "conversationId": "f477c78d-bc54-4233-beea-12f7929b2066",
        "timestamp": "2016-04-12T04:36:25 -02:00"
    },
    {
        "mottaker": "239543375",
        "avsender": "589999487",
        "conversationId": "160118a8-d6ca-4436-ae5a-e16b94b2e82d",
        "timestamp": "2014-05-17T03:24:20 -02:00"
    },
    {
        "mottaker": "984233736",
        "avsender": "542415665",
        "conversationId": "8c1a2817-92c5-4f11-9944-8a80404a8312",
        "timestamp": "2017-10-29T12:22:34 -02:00"
    },
    {
        "mottaker": "174459193",
        "avsender": "740323504",
        "conversationId": "7ac26f70-ff74-4fee-af5e-de67250749cf",
        "timestamp": "2018-04-17T11:54:19 -02:00"
    },
    {
        "mottaker": "575203205",
        "avsender": "521068035",
        "conversationId": "bc71aa59-4e42-4dc0-8001-4f8b8726c56e",
        "timestamp": "2018-02-02T06:53:38 -01:00"
    },
    {
        "mottaker": "302680361",
        "avsender": "102639685",
        "conversationId": "29c4d292-a143-4734-9026-7fedec6964b1",
        "timestamp": "2017-03-20T03:45:32 -01:00"
    },
    {
        "mottaker": null,
        "avsender": "436729707",
        "conversationId": "2e813ff0-4899-4bf9-a6da-1918d5ecc8de",
        "timestamp": "2017-03-08T04:00:03 -01:00"
    },
    {
        "mottaker": "394548758",
        "avsender": "436417330",
        "conversationId": "ddb6b128-5b24-4585-a8f4-daf1019927e4",
        "timestamp": "2016-06-29T01:22:08 -02:00"
    },
    {
        "mottaker": "094625440",
        "avsender": "523029096",
        "conversationId": "95e30281-6070-4ac7-8ad7-671019d29fd7",
        "timestamp": "2017-04-23T10:11:05 -02:00"
    },
    {
        "mottaker": "304874244",
        "avsender": null,
        "conversationId": "480474fc-1bda-4802-a536-d71c5248e98e",
        "timestamp": "2017-07-28T04:19:04 -02:00"
    },
    {
        "mottaker": "016399515",
        "avsender": "529081472",
        "conversationId": "f5af28c9-62e9-4c6f-9d98-12a9e3332d6f",
        "timestamp": "2018-02-09T03:11:16 -01:00"
    },
    {
        "mottaker": "574731763",
        "avsender": "596994008",
        "conversationId": "0ac7f8a5-945e-45cd-bc27-7fb0430c6c42",
        "timestamp": "2016-04-29T01:05:52 -02:00"
    },
    {
        "mottaker": "590294659",
        "avsender": "920785204",
        "conversationId": "10fcc800-b0e3-449c-8d9e-cfc77c297889",
        "timestamp": "2014-12-16T07:07:55 -01:00"
    }
];

const modalStyle = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 100000
    },
    content: {
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
        maxWidth: '1000px',
        maxHeight: '500px',
        margin: '0 auto'
    }
}

export default class sDashboard extends React.Component {

    state = {
        showNewMessage: true
    };

    // 1. Avsender
    // 2. Mottaker
    // 3. ConversationID
    // 4. Mulighet til å vise XML av meldinga.
    // 5. Timestamp.


    toggleNewMessage = () => {
        this.setState({
            showNewMessage: !this.state.showNewMessage
        });
    };

    dismissNewMessage = () => {
        this.setState({
            showNewMessage: !this.state.showNewMessage
        });
    };

    render(){
        return (
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Dashboard</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group mr-2">
                            {/*<button className="btn btn-sm btn-outline-secondary">Share</button>*/}
                            <button className="btn btn-sm btn-outline-secondary" onClick={this.toggleNewMessage}>Ny melding</button>
                        </div>
                        {/*<button className="btn btn-sm btn-outline-secondary dropdown-toggle">*/}
                            {/*<span data-feather="calendar" />*/}
                            {/*This week*/}
                        {/*</button>*/}
                    </div>
                </div>

                <h2>Section title</h2>
                <div className="table-responsive">

                    <ReactTable
                        data={data}
                        columns={ [
                            {
                                Header: "Avsender",
                                accessor: "avsender",
                                filterable:true
                            },
                            {
                                Header: "Mottaker",
                                accessor: "mottaker",
                                filterable:true
                            },
                            {
                                Header: "Conversation ID",
                                accessor: "conversationId"
                            },
                            {
                                Header: "Timestamp",
                                accessor: "timestamp"
                            }
                        ]}
                        defaultPageSize={10}
                        className=" -highlight"
                    />

                    <ReactModal
                        style={modalStyle}
                        isOpen={this.state.showNewMessage}
                        contentLabel="Minimal Modal Example"
                        onSave={this.showNewMessage}
                    >
                        <MessageForm
                            dismiss={this.toggleNewMessage}
                        />
                    </ReactModal>

                </div>
            </main>
        );
    }
}