const axios = require('axios');

const DNS_ADDRESS = `https://api.digitalocean.com/v2/domains/${process.env.RECORD_DOMAIN}/records/${process.env.RECORD_ID}`
const API_KEY = process.env.DIGITALOCEAN_OAUTH_KEY;
const RECORD_NAME = process.env.RECORD_NAME;


const updateDNS = async() => {
    var externalIP = await axios.get('https://api.ipify.org').then(res => res.data);
    console.log("External IP: ", externalIP);
    var headers = {
        Authorization: `Bearer ${API_KEY}` 
    }

    var data = {
        name: RECORD_NAME,
        data: externalIP

    }
    await axios.put(DNS_ADDRESS, data, {headers: headers}).then(res => {
        if (res.data.domain_record) {
            console.log("Record Updated")
        }
        else  {
            console.error("An Unknown Error Occured: ", res.data)
        }
    }).catch(err => {
        console.error(err)
    })
}
console.log('Starting');
updateDNS();