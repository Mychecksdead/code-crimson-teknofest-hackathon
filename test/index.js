	
import fetch from 'node-fetch';
const res = await fetch('http://localhost:3001/getupdates?pnrID=HA1');
const json = await res.json();
console.log(json);