'use strict';

const axios = require("axios");

const IKALAS_BASE_URL = "https://ikalas.com"



class Client{
    constructor(){
        this.auth = '';

        this.defaultHeaders = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          };

        this.defaultRequest = {
            baseUrl: IKALAS_BASE_URL,
            url: '',
            method: 'GET',
            headers: {},
            maxContentLength: Infinity, // Don't limit the content length.
            maxBodyLength: Infinity,
          };

        this.apiKey = ''
    }

    setApiKey(apiKey) {
        this.apiKey = apiKey;
        this.auth = 'Bearer ' + apiKey;
        this.setDefaultRequest('baseUrl', IKALAS_BASE_URL);
        axios.defaults.headers.common['apikey'] = this.apiKey;
      }
    
    async execute(appName) {
        try{
            let headers= this.defaultHeaders;
            
            let response = await axios({
              url: `${IKALAS_BASE_URL}/kli/execute-function/${appName}`,
              method: "POST",
              headers: headers
            })
            if (response != null && response.data!=null) {
              console.log(response.data)
              return response.data.result;
            }
            
        }catch (error){
            console.log(error)
            return null;
        }
        
    }

    setDefaultHeader(key, value) {
      if (key !== null && typeof key === 'object') {
        // key is an object
        Object.assign(this.defaultHeaders, key);
        return this;
      }
  
      this.defaultHeaders[key] = value;
      return this;
    }
  
    setDefaultRequest(key, value) {
      if (key !== null && typeof key === 'object') {
        // key is an object
        Object.assign(this.defaultRequest, key);
        return this;
      }
  
      this.defaultRequest[key] = value;
      return this;
    }
}

module.exports = Client;