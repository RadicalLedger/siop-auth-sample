import * as DID_SIOP from 'did-siop';
import { optionsWithClaims, PARAMS } from './params';

let siop_rp: any = undefined;
let request: any;

async function startProcess() {
  console.log('startProcess');

  let keyResolv2020 = new DID_SIOP.Resolvers.KeyDidResolver(
    'key',
    '@digitalbazaar/ed25519-verification-key-2020'
  );

  siop_rp = await DID_SIOP.RP.getRP(
    PARAMS.KEY_RP.redirect_uri, // RP's redirect_uri
    PARAMS.KEY_RP.did, // RP's did, // RP's did
    // 'did:web:did-web.godiddy.com:891dd1be-7703-4749-997f-4aaf48518ae7',
    PARAMS.KEY_RP.registration,
    undefined,
    [keyResolv2020]
  );

  console.log('Got RP instance ....');
  siop_rp.addSigningParams(PARAMS.KEY_RP.sigining_key); // Private key
  //siop_rp.addSigningParams(`2pZzJP2VDAVEwHkZf8spoVJfsMAoN5TiEhMmxBDF4tb7pgdM8`); // Private key

  console.log('RP SigningParams added ...');
  request = await siop_rp.generateRequest(optionsWithClaims);

  console.log(request);

  const url = new URL(request);
  const jwtWithoutSignature = url.searchParams
    .get('request')
    ?.split('.')
    .slice(0, -1)
    .join('.');
  console.log('Request generated ...', jwtWithoutSignature);
}

console.log('on the main function');
startProcess();
