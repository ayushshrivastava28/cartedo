// import React from "react";
// import './Card.css'
// const Card = props => {

//     console.log("checking: ", props.blockChainCardDetails)
//     return props.blockChainCardDetails.map((val, idx) => {
//         let name = `name-${idx}`
//         var PreviousHash
//         if (idx === 0) {
//             PreviousHash = `0`
//         }
//         else {
//             PreviousHash = `${val.hash}`
//         }
//         var Genesis
//         if (idx === 0) {
//             Genesis = `GENESIS BLOCK`
//         } else {
//             Genesis = `BLOCK#${idx}`
//         }

//         let Date = val.date.substring(0, 28)
//         return (
//             <div>
//                 <div key={val.index} className='blockchain-card'>
//                     <div className="Card-Header">
//                         <button disabled={true} style={{ width: '6em' }}>DATA</button>
//                         <div style={{ width: "100%" }}>
//                             <input
//                                 type="text"
//                                 className="ant-input"
//                                 value={val.name}
//                                 data-id={idx}
//                                 id={name}
//                                 onChange={(e) => props.handleChange(e)}
//                             />
//                         </div>
//                     </div>
//                     <div className='content'>
//                         <div style={{ whiteSpace: "nowrap", fontWeight: 'lighter', fontSize: '13px', opacity: '0.8' }}>PREVIOUS HASH</div>
//                         <div style={{ fontSize: "15px", float: "right", display: "block", bordercColor: "transparent", marginLeft: '1%' }}><span class="ant-tag-text">{PreviousHash}</span></div>
//                     </div>
//                     <div className='HashContent'>
//                         <div style={{ marginRight: "15px", fontWeight: 'lighter', fontSize: '13px', opacity: '0.8' }}>HASH</div>
//                         <div className="ant-tag-green-style" style={{ border: "1px solid green", borderRadius: '5px', padding: '2px' }}><span className="ant-tag-text">{val.hash}</span></div>
//                     </div>
//                     <div className='footer'>
//                         <h2 style={{ letterSpacing: '5px', fontWeight: 'lighter' }}>{Genesis}</h2>
//                         <div style={{ fontSize: '12px', marginTop: '6%', justifyContent: 'center', display: "flex", fontWeight: 'lighter', marginLeft: '2%' }}>on {Date}</div>
//                         <span style={{ fontSize: '20px', marginTop: '4%', fontWeight: 'lighter', padding: '2px', marginLeft: '17%' }}>{Math.floor(val.random)}</span>
//                     </div>
//                 </div>
//                 <div className="blockChain-addCard">
//                     <div className="Card-Header">
//                         <button disabled={true} style={{ width: '6em' }}>DATA</button>
//                         <div style={{ width: "100%" }}>
//                             <input
//                                 type="text"
//                                 className="ant-input"
//                                 value=''
//                                 onChange={props.handleChange()}
//                                 data-id={idx}
//                                 id={name}
//                             />
//                         </div>
//                     </div>
//                     <div className="add-button" onClick={() => props.add(val)} type="button">
//                         + ADD NEW BLOCK
//                     </div>
//                 </div>
//             </div>
//         );
//     });
// };
// export default Card;










import React, { useState, useEffect } from "react";
import './Card.css'
const Card = (props) => {
    const [blockChainCardDetails, setBlockChainCardDetails] = useState([
        {
            index: Math.random(),
            name: "Welcome to Blockchain Demo 2.0!",
            previousHash: '0',
            hash: '000dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf',
            block: "",
            date: 'on Tue, 17 Oct 2017 19:53:20 GMT',
            random: 604
        }
    ]);
    const addNewRow = e => {
        const values = [...blockChainCardDetails];
        console.log("values: ", values)
        values.push({
            index: Math.random(),
            name: "",
            previousHash: '',
            hash: '',
            block: "",
            date: Date().toLocaleString(),
            random: (Math.random() * (1000))
        })

        setBlockChainCardDetails(values)
        console.log("state: ", values)
    };

    const handleChange = (index, event) => {
        const values = [...blockChainCardDetails];
        if (event.target.name === "lastname") {
            values[index].name = event.target.value
        } else {
            values[index].name = event.target.value
        }
        setBlockChainCardDetails(values)
    };
    // const handleChangeData = (index, event) => {
    //     console.log("handle change: ", event.target.value)
    //     // const values = [...blockChainCardDetails];
    //     event.preventDefault()
    //     setBlockChainCardDetails({ ...blockChainCardDetails, name: event.target.value })
    // };

    console.log("checking: ", blockChainCardDetails)
    return blockChainCardDetails.map((val, idx) => {
        let name = `name-${idx}`
        var PreviousHash
        if (idx === 0) {
            PreviousHash = `0`
        }
        else {
            console.log("hash", val.hash)
            PreviousHash = `${val.hash}`
        }
        var Genesis
        if (idx === 0) {
            Genesis = `GENESIS BLOCK`
        } else {
            Genesis = `BLOCK#${idx}`
        }
        let Date = val.date.substring(0, 28)
        return (
            <div>
                <div key={val.index} className='blockchain-card'>
                    <div className="Card-Header">
                        <button disabled={true} style={{ width: '6em' }}>DATA</button>
                        <div style={{ width: "100%" }}>
                            <input
                                type="text"
                                className="ant-input"
                                value={val.name}
                                data-id={idx}
                                id={name}
                                onChange={(e) => handleChange(idx, e)}
                            />
                        </div>
                    </div>
                    <div className='content'>
                        <div style={{ whiteSpace: "nowrap", fontWeight: 'lighter', fontSize: '13px', opacity: '0.8' }}>PREVIOUS HASH</div>
                        <div style={{ fontSize: "15px", float: "right", display: "block", bordercColor: "transparent", marginLeft: '1%' }}><span class="ant-tag-text">{PreviousHash}</span></div>
                    </div>
                    <div className='HashContent'>
                        <div style={{ marginRight: "15px", fontWeight: 'lighter', fontSize: '13px', opacity: '0.8' }}>HASH</div>
                        <div className="ant-tag-green-style" style={{ border: "1px solid green", borderRadius: '5px', padding: '2px' }}><span className="ant-tag-text">{val.hash}</span></div>
                    </div>
                    <div className='footer'>
                        <h2 style={{ letterSpacing: '5px', fontWeight: 'lighter' }}>{Genesis}</h2>
                        <div style={{ fontSize: '12px', marginTop: '6%', justifyContent: 'center', display: "flex", fontWeight: 'lighter', marginLeft: '2%' }}>on {Date}</div>
                        <span style={{ fontSize: '20px', marginTop: '4%', fontWeight: 'lighter', padding: '2px', marginLeft: '17%' }}>{Math.floor(val.random)}</span>
                    </div>
                </div>
                <div className="blockChain-addCard">
                    <div className="Card-Header">
                        <button disabled={true} style={{ width: '6em' }}>DATA</button>
                        <div style={{ width: "100%" }}>
                            <input
                                type="text"
                                className="ant-input"
                                value=''
                                onChange={e => handleChange(idx, e)}
                                data-id={idx}
                                id={name}
                                name="lastName"
                            />
                        </div>
                    </div>
                    <div className="add-button" onClick={() => { addNewRow() }} type="button">
                        + ADD NEW BLOCK
                    </div>
                </div>
            </div>
        );
    });
};
export default Card;


