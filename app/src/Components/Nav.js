import React, {Component} from 'react';
import logo from '../Images/logo.png';
import bag from '../Images/bag.png';
import profile from '../Images/profile.png';

const st = {
    width: '200px',
    height: '100vh',
    backgroundColor: '#990011FF',  
    boxShadow: '2px 0 8px #990011FF'
};

const imgSt = {
    maxWidth: '200px', 
    maxHeight: '150px'
}

class Nav extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div style={st} className="navbar">
                <div style={{height: '150px'}}>
                    <a href='https://www.turkishairlines.com/tr-tr/'><img src={logo} style={imgSt}></img></a>
                </div>
                <div style={{height: '150px'}}>
                    <a href='/'><img src={profile} style={imgSt}></img></a>
                </div>
                <div style={{height: '150px'}}>
                    <a href='/bags'><img src={bag} style={imgSt}></img></a>
                </div>
            </div>
        );
    }
}

export default Nav;
