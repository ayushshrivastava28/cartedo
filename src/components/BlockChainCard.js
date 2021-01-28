import React, { useState, useEffect } from "react";
import Card from "./Card";
import PeersView from './PeersView'
import Faker from 'faker'
import firebase from '../config/firebase'
import './Card.css'
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const BlockChainCard = () => {
    const history = useHistory();
    const [peers, setPeers] = useState([]);
    const [activePeer, setActivePeer] = useState("");
    const [name, setName] = useState('');
    const [blockChainCardDetails, setBlockChainCardDetails] = useState([]);
    const randomString = (length, chars) => {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    var rString = randomString(64, '000dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf');

    const addNewRow = e => {
        setBlockChainCardDetails(st => [...st, st.length === 0 ?
            {
                _id: activePeer,
                index: 0,
                name: "Welcome to Blockchain Demo 2.0!",
                previousHash: 0,
                hash: "000dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf",
                block: "",
                date: Date().toLocaleString(),
                random: (Math.random() * (1000))
            } : {
                _id: activePeer,
                index: st.length,
                name,
                previousHash: st[st.length - 1].hash,
                hash: rString,
                block: "",
                date: Date().toLocaleString(),
                random: (Math.random() * (1000))
            }]);
        setName("");
        // console.log("state: ", values)
    };
    useEffect(() => {
        firebase.auth().onAuthStateChanged((client) => {
            if (client) {
                console.log(client)
                firebase.firestore().collection('Users').where("by", "==", client.email).get().then((snapshot) => {
                    setPeers([]);
                    snapshot.forEach((snap) => {
                        setPeers(st => [...st, { ...snap.data() }])
                        setActivePeer(snap.data()._id)
                        setBlockChainCardDetails(st => [...st, {
                            _id: snap.data()._id,
                            index: 0,
                            name: "Welcome to Blockchain Demo 2.0!",
                            previousHash: 0,
                            hash: "000dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf",
                            block: "",
                            date: Date().toLocaleString(),
                            random: (Math.random() * (1000))
                        }])
                    })
                    // setActivePeer(snapshot[0].data()._id)
                    if (snapshot.empty) {
                        addPeers()
                    }
                }).catch((e) => { console.log(e) })
            }
        })
    }, [])

    const addPeers = async () => {
        const email = firebase.auth().currentUser.email
        const name = Faker.name.firstName()
        const _id = uuidv4();
        firebase.firestore().collection('Users').doc(_id).set({ name, by: email, _id });
        setPeers(st => [...st, { name, _id }])
        setActivePeer(_id.toString());
        setBlockChainCardDetails(ch => [...ch, {
            _id,
            index: 0,
            name: "Welcome to Blockchain Demo 2.0!",
            previousHash: '0',
            hash: '000dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf',
            block: "",
            date: 'on Tue, 17 Oct 2017 19:53:20 GMT',
            random: 604
        }])
    }

    return (
        <div style={{ marginTop: '7%' }} >
            <div >
                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <button onClick={() => { addPeers() }} style={{ background: '#1890ff', color: 'white', borderColor: '#1890ff', borderRadius: '5px', padding: '5px' }}>
                        Add peers
                </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '60px', marginBottom: '20px', fontSize: '20px', letterSpacing: '5px' }}>
                    <h1>PEERS</h1>
                </div>


                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '5px' }} >
                    <PeersView
                        peers={peers}
                        setPeers={setPeers}
                        onClick={(peer) => setActivePeer(peer)}
                        activePeer={activePeer}
                    />
                </div>
            </div>
            <h2 className='name' style={{ fontWeight: "unset", fontSize: '50px', letterSpacing: '3px', margin: '33px', opacity: '0.8', textAlign: 'center' }}>BLOCKCHAIN</h2>




            <div className="row">
                <Card
                    blockChainCardDetails={blockChainCardDetails.filter(x => x._id == activePeer)}
                    setBlockChainCardDetails={setBlockChainCardDetails}
                />
            </div>
            <div className="blockChain-addCard">
                <div className="Card-Header">
                    <button disabled={true} style={{ width: '6em' }}>DATA</button>
                    <div style={{ width: "100%" }}>
                        <input
                            type="text"
                            className="ant-input"
                            value={name}
                            onChange={(e) => setName(e.currentTarget.value)}
                        />
                    </div>
                </div>
                <div className="add-button" onClick={() => { addNewRow() }} type="button">
                    + ADD NEW BLOCK
                    </div>
            </div>


        </div>
    );
}
export default BlockChainCard;

