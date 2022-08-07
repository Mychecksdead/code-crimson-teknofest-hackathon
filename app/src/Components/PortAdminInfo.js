import React, {Component} from 'react';
import Bags from './Bags';
import PortAdminLogin from './PortAdminLogin';
import Axios from 'axios';
import AddBaggage from './AddBaggage';

let data;

class Info extends Component{
    constructor(props){
        super();

        this.state = {
            username: '',
            isloggedin: false
        };

        this.isloggedIn = () => {
            if(sessionStorage.getItem('currentportadminloggedin') == 'yes'){
                this.setState({
                    name: sessionStorage.getItem('username'),   
                    isloggedin: true,
                });
            }
            console.log(sessionStorage.getItem('currentportadminloggedin'));
        }
    }

    componentDidMount(){
        this.isloggedIn();
    }

    render(){
        return(
            <div>
                {this.state.isloggedin ? 
                    <AddBaggage>
                    </AddBaggage>
                    :
                    <PortAdminLogin></PortAdminLogin>
                }
            </div>
        );    
    }
}

export default Info;
