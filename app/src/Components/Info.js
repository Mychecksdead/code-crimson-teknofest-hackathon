import React, {Component} from 'react';
import Profile from './Profile';
import Bags from './Bags';
import Axios from 'axios';

let data;

class Info extends Component{
    constructor(props){
        super();
        this.tryLogin = () => {
            Axios.post('http://localhost:3001/login', 
            {
                username: this.state.name,
                lastname: this.state.lastName, 
                PNR: this.state.userPNR
            }).then(response => {
                data = response;
                console.log(data);
                if(data['status'] == 200){
                    this.setState({isloggedin: true});
                }
            });
        }
        this.state = {
            userPNR: '',
            name: '',
            lastName: '',
            isloggedin: false
        };
    }
    

    render(){
        return(
            <div>
                {this.state.isloggedin ? 
                    <div>
                        <Profile name={this.state.name} lastName={this.state.lastName}></Profile>
                        <Bags name={this.state.name} lastName={this.state.lastName}></Bags>
                    </div>
                    :
                    <div class="box">
                        <form>
                            <span class="text-center">Giriş Yap</span>
                            <div class="input-container">
                                <input type="text" required="" onChange={e => this.setState({name: e.target.value})}/>
                                <label>İsim</label>		
                            </div>
                            <div class="input-container">		
                                <input type="mail" required="" onChange={e => this.setState({lastName: e.target.value})}/>
                                <label>Soyad</label>
                            </div>
                            <div class="input-container">		
                                <input type="mail" required="" onChange={e => this.setState({userPNR: e.target.value})}/>
                                <label>PNR</label>
                            </div>
                            <button type="button" class="btn" onClick={this.tryLogin}>Gönder</button>
                        </form>	
                    </div>
                }
            </div>
        );    
    }
}

export default Info;
