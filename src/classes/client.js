'use strict';

const axios = require("axios");


class Client{
    constructor(){
        this.auth = '';
        this.baseUrl = "https://ikalas.com";

        this.defaultHeaders = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          };

        this.defaultRequest = {
            baseUrl: this.baseUrl,
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
        axios.defaults.headers.common['apikey'] = this.apiKey;
    }

    setBaseUrl(baseUrl) {
      this.baseUrl = baseUrl;
    }
    
    async execute(appName, inputFunction) {
        try{
            let headers= this.defaultHeaders;
            axios.defaults.headers.common['apikey'] = this.apiKey;
            
            let response = await axios({
              url: `${this.baseUrl}/api/v1/${appName}`,
              method: "POST",
              headers: headers,
              data: inputFunction
            })
            if (response != null && response.data!=null) {
              // console.log(response.data)
              return response.data.result;
            }
            
        }catch (error){
            
            if(error.response!=null){
              console.log(error.response.status)
            }else{
              console.log(error)
            }
            throw error;
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