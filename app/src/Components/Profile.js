import React, {Component, useState, useEffect} from 'react';




function Profile(props){
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        setName(props.name);
        setLastName(props.lastName);
    }, []);



    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            left: '250px',
            fontSize: '30px',
            fontFamily: 'monospace',
            border: 'solid 5px black',
            padding: '50px 50px',
            textAlign: 'left'
        }}>
           <div>Name: {name}</div>
           <div>Surname: {lastName}</div>
        </div>    
    );
}

export default Profile;
