import React, {Component} from 'react';
import Axios from 'axios';

class Bags extends Component{
    constructor(props){
        super();
        this.nodes = [];

    }

    render(){
        return (
            <div style={{
                position: 'absolute',
                top: '225px',
                left: '550px',
                width: '1200px',
                height: '600px',
                border: '5px solid black'
            }}>
                {this.nodes}
            </div>    
        );
    }
}

export default Bags;
