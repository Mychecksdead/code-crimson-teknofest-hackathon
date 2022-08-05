import React, {Component} from 'react';
import Profile from './Profile';
import Bags from './Bags';
import PortAdminLogin from './PortAdminLogin';
import Axios from 'axios';

let data;

class Info extends Component{
    constructor(props){
        super();

        this.state = {
            username: '',
            password: '',
            isloggedin: false
        };

        this.isloggedIn = () => {
            if(sessionStorage.getItem('currentportadminloggedin') == 'yes'){
                this.setState({
                    name: sessionStorage.getItem('username'),
                    isloggedin: true,
                    lastName: sessionStorage.getItem('password'),
                    userPNR: sessionStorage.getItem('pnr')
                });
            }
            console.log(sessionStorage.getItem('currentportadminloggedin'));
            console.log(this.state.isloggedin);
        }
    }

    componentDidMount(){
        this.isloggedIn();
    }

    render(){
        return(
            <div>
                {this.state.isloggedin ? 
                    <div>
                    </div>
                    :
                    <PortAdminLogin></PortAdminLogin>
                }
            </div>
        );    
    }
}

export default Info;
