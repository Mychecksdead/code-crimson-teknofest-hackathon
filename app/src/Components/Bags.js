import React, {Component} from 'react';
import Axios from 'axios';
import logo from '../Images/logo.png';


const st = {
    width: 'inherit',
    height: '500px',
    fontSize: '20px',
    textAlign: 'left',
    color: '#000',
    border: '2px solid black'
};


class Bags extends Component{
    constructor(props){
        super();

        this.state = {
            name: props.name,
            lastName: props.lastName,
            pnr: props.pnr,
            baggs: [],
            gotBags: false
        }
        this.b = [];
        this.getBags = (gotbags) => {
            if(gotbags) return;
            let ownername = this.state.name;
            let ownersurname = this.state.lastName;
            let pnr = this.state.pnr;
            Axios.post('http://localhost:3001/getupdates',
            {
                ownerName: ownername,
                ownerSurname: ownersurname,
                pnrID: pnr
            }).then(response => {
                console.log(response);
                if(response.data.result == true){
                    let bags = response.data.baggages;
                    bags = Object.values(bags);
                    this.setState({
                        baggs: [],
                        gotBags: true
                    });
                    for(let i = 0; i < bags.length; ++i){
                        console.log(bags[i]);
                        let c = [];
                        for(let j = 0; j < bags[i].scannerList.length; ++j){
                            c.push(<div key={j+37}>{bags[i].scannerList[j].scannerName} : {bags[i].scannerList[j].updateTime.slice(11, 19)}<br/> </div>);
                        }
                        let d = <p>{bags[i].baggageName}</p>;

                        this.b.push(<div key={i} style={st}>{d}{c}</div>);
                    }
                }
            });
        };
    }

    componentDidMount(){
        this.getBags(this.state.gotBags);
    }

    render(){
        return (
            <div class="main" style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}>
                <div class="switch" id="switch-cnt">
                  <div class="switch__circle"></div>
                  <div class="switch__circle switch__circle--t"></div>
                  <div class="switch__container" id="switch-c1">
                    <h2 class="switch__title title">Hoş geldiniz !</h2>
                    <p class="switch__description description">Türk Hava Yolları Bavul Takip Sistemi</p>
                    <img src={logo} style={{
                      width: '400px'
                    }}></img>
                    <h1>Ad: {this.state.name}</h1>
                    <h1>Soyad: {this.state.lastName}</h1>
                    <h1>PNR: {this.state.pnr}</h1>
                  </div>
                </div>
                <div class="container a-container" id="a-container">
                  <section class="form" id="a-form" method="" action="">
                    <h2 class="form_title title">Bavullarınız</h2>
                    {this.state.gotBags ? this.b : <p>Bavulunuz bulunamamıştır.</p>}
                  </section>
                </div>
              </div>
        );
    }
}

export default Bags;
