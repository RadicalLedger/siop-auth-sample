import * as DID_SIOP from 'did-siop'
import { PARAMS, optionsWithClaims, tokenData } from "./params"


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
    request = await siop_rp.generateRequest(optionsWithClaims);    

    console.log('Request generated ...', request);

    console.log('Moving to Provider side ...');

    let siopTokenEncoded = await OnExtension(request);    
    
    let siopTokenObjects = await siop_rp.validateResponseWithVPData(siopTokenEncoded, {
        redirect_uri: PARAMS.KEY_RP.redirect_uri,
        isExpirable: true,
        nonce: optionsWithClaims.nonce,
    })

    console.log('Response validated...');
    console.log('Validated response',siopTokenObjects); 
}

async function OnExtension(request:string):Promise<DID_SIOP.SIOPTokensEcoded>{
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
                let vps: DID_SIOP.VPData = {
                    vp_token : tokenData.good.singleVP.vp_token,
                    _vp_token : tokenData.good.singleVP.id_token._vp_token
                };
                let siopTokenEncoded = await provider.generateResponseWithVPData(decodedRequest.payload, 5000,vps);
                console.log('Response generated ...');
                console.log('responseJWT',siopTokenEncoded); 
                resolve(siopTokenEncoded);
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
