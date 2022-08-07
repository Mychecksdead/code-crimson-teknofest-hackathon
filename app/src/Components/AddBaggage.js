import React, {Component} from 'react';
import logo from '../Images/logo.png';
import Axios from 'axios';
import { QRCode } from 'react-qrcode-logo';


let data;
class AddBaggage extends Component{
  constructor(){
    super();
    this.state = {
        qr: '',
        pnr: '',
        lastname: '',
        name: '',
        token: '',
        isgenerated: false,
        token: ''
    };
    this.addBaggage = () => {
        let adminName = sessionStorage.getItem('username');
        let adminPassword = sessionStorage.getItem('password');

        Axios.post('http://localhost:3001/registerBaggage', 
        {
          adminName: adminName,
          adminPass: adminPassword, 
          pnrID: this.state.pnr,
          ownerName: this.state.name,
          ownerSurname: this.state.lastname,
          baggageName: 'dostumbruh'
        }).then(response => {
          data = response;
          console.log(data);
          if(data.data.result == true){
            this.setState({token: data.data.token})
            this.createQR(this.state.token);
          }
        });
    }
    this.createQR = (token) => {
      this.setState({isgenerated: true});
      console.log(token);
    };
  }
  render(){
      return (  
        <div>
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
                </div>
              </div>
              <div class="container a-container" id="a-container">
                <section class="form" id="a-form" method="" action="">
                  <h2 class="form_title title">Port Admin : {sessionStorage.getItem('username')} </h2>
                  <input class="form__input" type="text" placeholder="PNR" onChange={e => this.setState({pnr: e.target.value})}/>
                  <input class="form__input" type="password" placeholder="Ad" onChange={e => this.setState({lastname: e.target.value})}/>
                  <input class="form__input" type="password" placeholder="Soyad" onChange={e => this.setState({name: e.target.value})}/>
                  <button class="form__button button" onClick={this.addBaggage}>Tanımla</button>
                </section>
              </div>
            </div>
            <div id="token" style={{
                position: 'absolute',
                top: '300px',
                left: '200px',
                width: '100px',
                height: '200px'
              }}>
                {
                  this.state.isgenerated ? 
                    <QRCode value={this.state.token} id="qrcode"></QRCode>
                  : 
                    <div></div>
                }
              </div>
          </div>
      );
  }
}

export default AddBaggage;
