import { ServiceParams } from "../Typings/Params";
import Cookies from 'universal-cookie';

const axios = require('axios').default;

export class http{
    private _url:string;

    private _token:string;

    private _cookies:Cookies;

    constructor() { 
        this._url = `http://localhost:8080`;
        this._cookies = new Cookies();
        let token = this._cookies.get('jwtToken');
        if(token && token != ""){
            this._token = token;
        }else{
            this._token = '';
        }
        this.Init();
    }
    // check if token is here, if token is here, then check token, if fail reauthenticate
    private Init = async () => {
        try{
            if(this._token != ''){
                let params: ServiceParams = {
                    url:'Auth/Check',
                    method:"Get"
                }
                let response = await this.Get(params);
                if(response.token){
                    this._cookies.set('jetToken', response.token);
                    this._token = response.token;
                }
            }else{
                let params:ServiceParams = {
                    url:'Auth/Authorize',
                    method:"Get"
                }
                let token = await this.Get(params);
                console.log(token);
                this._token = token.data;
                this._cookies.set('jwtToken', token.data);
            }
        }catch(err){
            console.error(`Cannot authorize the site - token unverified/unable to be retrieved ${err}`);
        }
        
    }

    private Auth = async () =>{

    }
    
    public Get = async (params:ServiceParams) => {
        // Validate
        this.Check(params, params.method == "Post" ? true : false);
        let url = `${this._url}/${params.url}`;
        let data = await axios({
            method:params.method,
            url:url,
            data:params.body,
            headers:{
                authorization: `Bearer ${this._token}`
            }
        })
        if(params.method =="Get" && !data){
            throw `No data retrieved from remote service`;
        }
        if(data){
            return data;
        }
    }

    private Check = (params:ServiceParams, checkBody?:boolean) =>{
        if(!params.url){
            throw `Request does not have url associated`;
        }
        if(checkBody){
            if(!params.body){
                throw `Request does not have body associated`;
            }
        }
    }
}