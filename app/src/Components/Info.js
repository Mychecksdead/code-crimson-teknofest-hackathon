import React, {Component} from 'react';
import Profile from './Profile';
import Bags from './Bags';
import Login from './Login';
import Axios from 'axios';

let data;

class Info extends Component{
    constructor(props){
        super();

        this.state = {
            userPNR: '',
            name: '',
            lastName: '',
            isloggedin: false
        };

        this.isloggedIn = () => {
            if(sessionStorage.getItem('currentloggedin') == 'yes'){
                this.setState({
                    name: sessionStorage.getItem('name'),
                    isloggedin: true,
                    lastName: sessionStorage.getItem('lastname'),
                    userPNR: sessionStorage.getItem('pnr')
                });
            }
            console.log(sessionStorage.getItem('currentloggedin'));
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
                        <Profile name={this.state.name} lastName={this.state.lastName}></Profile>
                        <Bags name={this.state.name} lastName={this.state.lastName}></Bags>
                    </div>
                    :
                    <Login></Login>
                }
            </div>
        );    
    }
}

export default Info;
