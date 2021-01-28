import React from 'react'
import './Card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import firebase from '../config/firebase';

export default function PeersView(props) {
    const history = useHistory();

    const deletePeer = (val) => {
        firebase.firestore().collection("Users").doc(val._id).delete().then((snapshot) => {
            props.setPeers(st => st.filter(x => x._id !== val._id));
        }).catch((e) => { })
    }

    return props.peers.map((val, idx) => {
        console.log('val', val)
        return (
            <div style={{ display: 'flex', flexDirection: "row", opacity: props.activePeer == val._id ? 0.5 : 1.0 }}
                onClick={() => props.onClick(val._id)}>
                <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center', marginLeft: '50px' }}>
                    <FontAwesomeIcon icon={faUserFriends} size='3x' />
                    {val.name}
                </div>
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => deletePeer(val)}
                >X</div>
            </div>
        )
    })
}
