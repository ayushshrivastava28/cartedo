import React from "react";
import './Card.css'
const Card = props => {

    console.log("checking: ", props.blockChainCardDetails)
    return props.blockChainCardDetails.map((val, idx) => {
        let name = `name-${idx}`
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
                            />
                        </div>
                    </div>
                    <div className='content'>
                        <div style={{ whiteSpace: "nowrap", fontWeight: 'lighter', fontSize: '13px', opacity: '0.8' }}>PREVIOUS HASH</div>
                        <div style={{ fontSize: "15px", float: "right", display: "block", bordercColor: "transparent", marginLeft: '1%' }}><span class="ant-tag-text">{val.previousHash}</span></div>
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
            </div>
        );
    });
};
export default Card;