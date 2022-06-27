import * as DID_SIOP from 'did-siop'
import { PARAMS } from "./params"

let siop_rp: any = undefined;
let request: any;

async function startProcess(){
    console.log('startProcess');
    
    let keyResolv2020 = new DID_SIOP.Resolvers.KeyDidResolver('key', "@digitalbazaar/ed25519-verification-key-2020")
    siop_rp = await DID_SIOP.RP.getRP(
        PARAMS.KEY_RP.redirect_uri, // RP's redirect_uri
        PARAMS.KEY_RP.did, // RP's did
        PARAMS.KEY_RP.registration,
        undefined,
        [keyResolv2020]
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
    let keyResolv2020 = new DID_SIOP.Resolvers.KeyDidResolver('key', "@digitalbazaar/ed25519-verification-key-2020")
    const provider = await DID_SIOP.Provider.getProvider(PARAMS.KEY_USER.did,undefined,[keyResolv2020]);

    return new Promise(async (resolve, reject) => {
        console.log('User DID set to Provider ...');
    
        provider.addSigningParams(
            PARAMS.KEY_USER.sigining_key); // User's private key
            // If several keys are provided, one will be selected randomly when generating the request. To remove a key use provider.removeSigningParams(kid)
        
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