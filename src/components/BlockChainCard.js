import React, { useState, useEffect } from "react";
import Card from "./Card";
import Faker from 'faker'
import firebase from '../config/firebase'
import './Card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const BlockChainCard = () => {

    const [peers, setPeers] = useState([]);
    const [name, setName] = useState('');
    const [blockChainCardDetails, setBlockChainCardDetails] = useState([
        {
            index: 0,
            name: "Welcome to Blockchain Demo 2.0!",
            previousHash: '0',
            hash: '000dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf',
            block: "",
            date: 'on Tue, 17 Oct 2017 19:53:20 GMT',
            random: 604
        }
    ]);
    const addNewRow = e => {
        setBlockChainCardDetails(st => [...st, {
            index: st.length,
            name,
            previousHash: st[st.length - 1].hash,
            hash: '',
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
                    snapshot.forEach((snap) => {
                        setPeers(st => [...st, snap.data().name])
                    })
                }).catch((e) => { console.log(e) })
            }
        })
    }, [])

    useEffect(() => {
        console.log(peers)
    }, [peers])

    const addPeers = async () => {
        const email = firebase.auth().currentUser.email
        const name = Faker.name.firstName()
        firebase.firestore().collection('Users').add({ name, by: email })
        setPeers(st => [...st, name])
    }
    return (
        <div style={{ marginTop: '7%' }} >
            <h2 className='name' style={{ fontWeight: "unset", fontSize: '50px', letterSpacing: '3px', margin: '33px', opacity: '0.8' }}>BLOCKCHAIN</h2>
            <div onClick={() => { addPeers() }}>
                Add peers
                    <FontAwesomeIcon icon={faTimes} />{peers}
            </div>


            <div className="row">
                <Card
                    blockChainCardDetails={blockChainCardDetails}
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

