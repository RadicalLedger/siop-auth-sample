import * as DID_SIOP from 'did-siop'
import { PARAMS } from "./params"

let siop_rp: any = undefined;
let request: any;

async function startProcess(){
    console.log('startProcess');
    
    console.log(
        PARAMS.KEY_RP.redirect_uri, // RP's redirect_uri
        PARAMS.KEY_RP.did, // RP's did
        PARAMS.KEY_RP.registration);
    
    siop_rp = await DID_SIOP.RP.getRP(
        PARAMS.KEY_RP.redirect_uri, // RP's redirect_uri
        PARAMS.KEY_RP.did, // RP's did
        PARAMS.KEY_RP.registration
    )
    console.log('Got RP instance ....');
    siop_rp.addSigningParams(
        PARAMS.KEY_RP.sigining_key, // Private key
        PARAMS.KEY_RP.kid, // Corresponding authentication method in RP's did document (to be used as kid value for key)
        PARAMS.KEY_RP.key_format, //Format in which the key is supplied. List of values is given below
        PARAMS.KEY_RP.key_algorithm
    );

    console.log('RP SigningParams added ...');
    request = await siop_rp.generateRequest();

    console.log('Request generated ...', request);

    console.log('Moving to Provider side ...');

    let resJWT = await OnExtension(request);    
    
    let valid = await siop_rp.validateResponse(resJWT);
    console.log('Response validated...');
    console.log('Validated response',valid); 
}

async function OnExtension(request:string):Promise<string>{
    const provider = new DID_SIOP.Provider();

    return new Promise(async (resolve, reject) => {
        await provider.setUser(PARAMS.KEY_USER.did);// User's did
        console.log('User DID set to Provider ...');
    
        provider.addSigningParams(
            PARAMS.KEY_USER.sigining_key, // User's private key
            PARAMS.KEY_USER.kid, // Corresponding authentication method in user's did document (to be used as kid value for key)
            PARAMS.KEY_USER.key_format, //Format in which the key is supplied. List of values is given below
            PARAMS.KEY_USER.key_algorithm
            );// If several keys are provided, one will be selected randomly when generating the request. To remove a key use provider.removeSigningParams(kid)
        
        console.log('User SigningParams added ...');

        // Request validation and response generation
        provider.validateRequest(request).then(async (decodedRequest) => {
            console.log('Request validation completed ...');
            console.log('decodedRequest',decodedRequest);
            let jwtExpiration = 5000;
            try {
            await provider.generateResponse(decodedRequest.payload, jwtExpiration).then(responseJWT => {
                console.log('Response generated ...');
                console.log('responseJWT',responseJWT); 
                resolve(responseJWT);
          })
        }
        catch (err){
            console.log("provider.generateResponse Error " , err);
        }
        })
        .catch(err => {
          console.log("invalid request" , err);
          reject(err);
        })            

    } );
}

console.log('on the main function');
startProcess();
