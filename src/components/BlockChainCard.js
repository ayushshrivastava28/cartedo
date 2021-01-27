import React from "react";
import Card from "./Card";

class BlockChainCard extends React.Component {

    state = {
        blockChainCardDetails: [
            {
                index: Math.random(),
                name: "Welcome to Blockchain Demo 2.0!",
                previousHash: '0',
                hash: '000dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf',
                block: "",
                date: 'on Tue, 17 Oct 2017 19:53:20 GMT',
                random: 604
            }
        ]
    };
    handleChange = e => {

        if (
            ["name", "previousHash", "hash"].includes(
                e.target.name
            )
        ) {
            let blockChainCardDetails = [...this.state.blockChainCardDetails];
            blockChainCardDetails[e.target.dataset.id][e.target.name] = e.target.value;
        } else {
            this.setState({ [e.target.name]: e.target.value });
        } console.log("details: ", this.blockChainCardDetails)
    };
    addNewRow = e => {
        this.setState(prevState => ({
            blockChainCardDetails: [
                ...prevState.blockChainCardDetails,
                {
                    index: Math.random(),
                    name: "",
                    previousHash: '',
                    hash: '',
                    block: "",
                    date: Date().toLocaleString(),
                    random: (Math.random() * (1000))
                }
            ]
        }));
        console.log("state: ", e)
    };


    render() {
        let { blockChainCardDetails } = this.state;
        return (
            <div style={{ marginTop: '7%' }} >
                <h2 className='name' style={{ fontWeight: "unset", fontSize: '50px', letterSpacing: '3px', margin: '33px', opacity: '0.8' }}>BLOCKCHAIN</h2>
                <div className="row">
                    <Card
                        add={this.addNewRow}
                        handleChange={this.handleChange}
                        blockChainCardDetails={blockChainCardDetails}
                    />
                </div>


            </div>
        );
    }
}
export default BlockChainCard;

