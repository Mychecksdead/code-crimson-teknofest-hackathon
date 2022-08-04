import React, {Component, useState, useEffect} from 'react';




function Profile(props){
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        setName(props.name);
        setLastName(props.lastName);
    }, []);


    const logOut = () => {
        window.location.reload();
    }

    return (
        <div>
           <div>Name: {name}</div>
           <div>Surname: {lastName}</div>
        </div>    
    );
}

export default Profile;
