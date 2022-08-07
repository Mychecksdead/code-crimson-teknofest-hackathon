import React, {Component} from 'react';
import logo from '../Images/logo.png';
import Axios from 'axios';


let data;
class Login extends Component{
    constructor(){
        super();
        this.tryLogin = () => {
          Axios.post('http://localhost:3001/login', 
          {
            username: this.state.name,
            lastname: this.state.lastName, 
            PNR: this.state.userPNR,
            title: this.state.usertitle
          }).then(response => {
            data = response;
            console.log(data);
            if(data['status'] == 200){
              sessionStorage.setItem('currentloggedin', 'yes');
              sessionStorage.setItem('name', this.state.name);
              sessionStorage.setItem('lastname', this.state.lastName);
              sessionStorage.setItem('pnr', this.state.userPNR);
              console.log('Logged in');
              window.location.reload();
            }
          });
        }
        this.state = {
            userPNR: '',
            name: '',
            lastName: '',
            usertitle: ''
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
                  <h2 class="form_title title">Giriş Yap</h2>
                  <input class="form__input" type="text" placeholder="Ad" onChange={e => this.setState({name: e.target.value})}/>
                  <input class="form__input" type="text" placeholder="Soyad" onChange={e => this.setState({lastName: e.target.value})}/>
                  <input class="form__input" type="password" placeholder="PNR" onChange={e => this.setState({userPNR: e.target.value})}/>
                  <input class="form__input" type="password" placeholder="Cinsiyet (E veya K)" onChange={e => this.setState({usertitle: e.target.value})}/>
                  <button class="form__button button" onClick={this.tryLogin}>GİRİŞ YAP</button>
                </section>
              </div>
            </div>
        );
    }
}

export default Login;
