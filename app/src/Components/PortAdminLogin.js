import React, {Component} from 'react';
import logo from '../Images/logo.png';
import Axios from 'axios';


let data;
class PortAdminLogin extends Component{
  constructor(){
    super();
    this.tryLogin = () => {
      // port admin try login
    }
    this.state = {
      username: '',
      password: ''
    };
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
              </div>
            </div>
            <div class="container a-container" id="a-container">
              <section class="form" id="a-form" method="" action="">
                <h2 class="form_title title">Port Admin</h2>
                <input class="form__input" type="text" placeholder="Kullanıcı Adı" onChange={e => this.setState({username: e.target.value})}/>
                <input class="form__input" type="password" placeholder="Şifre" onChange={e => this.setState({password: e.target.value})}/>
                <button class="form__button button" onClick={this.tryLogin}>GİRİŞ YAP</button>
              </section>
            </div>
          </div>
      );
  }
}

export default PortAdminLogin;
