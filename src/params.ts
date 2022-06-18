import * as DID_SIOP from 'did-siop'

export const claims_basic = {
    "userinfo":
     {
      "given_name": {"essential": true},
      "nickname": null,
      "email": {"essential": true},
      "email_verified": {"essential": true},
      "picture": null,
      "http://example.info/claims/groups": null
     },
    "id_token":
     {
      "auth_time": {"essential": true},
      "acr": {"values": ["urn:mace:incommon:iap:silver"] }
     }
   }

   export const claims ={
    good:{
        "id_token": {
            "email": null
        },
        "vp_token": {
            "presentation_definition": {
                "id": "vp token example",
                "input_descriptors": [
                    {
                        "id": "id card credential",
                        "format": {
                            "ldp_vc": {
                                "proof_type": [
                                    "Ed25519Signature2018"
                                ]
                            }
                        },
                        "constraints": {
                            "fields": [
                                {
                                    "path": [
                                        "$.type"
                                    ],
                                    "filter": {
                                        "type": "string",
                                        "pattern": "IDCardCredential"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    },
    bad:{
        "id_token": {
            "email": null
        },
        "vp_token": {}    
    }
}

export const tokenData ={
  good:{
      singleVP : {
          id_token :{
              "iss": "https://self-issued.me/v2",
              "aud": "https://book.itsourweb.org:3000/client_api/authresp/uhn",
              "iat": 1615910538,
              "exp": 1615911138,
              "sub": "NzbLsXh8uDCcd-6MNwXF4W_7noWXFZAfHkxZsRGC9Xs",
              "sub_jwk": {
                  "kty": "RSA",
                  "n": "0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx...DKgw",
                  "e": "AQAB"
              },
              "auth_time": 1615910535,
              "nonce": "960848874",
              "_vp_token": {
                  "presentation_submission": {
                      "id": "Selective disclosure example presentation",
                      "definition_id": "Selective disclosure example",
                      "descriptor_map": [
                          {
                              "id": "ID Card with constraints",
                              "format": "ldp_vp",
                              "path": "$",
                              "path_nested": {
                                  "format": "ldp_vc",
                                  "path": "$.verifiableCredential[0]"
                              }
                          }
                      ]
                  }
              }
          },
          vp_token : {
              "@context": [
                  "https://www.w3.org/2018/credentials/v1"
              ],
              "type": [
                  "VerifiablePresentation"
              ],
              "verifiableCredential": [
                  {
                      "@context": [
                          "https://www.w3.org/2018/credentials/v1",
                          "https://www.w3.org/2018/credentials/examples/v1"
                      ],
                      "id": "https://example.com/credentials/1872",
                      "type": [
                          "VerifiableCredential",
                          "IDCardCredential"
                      ],
                      "issuer": {
                          "id": "did:example:issuer"
                      },
                      "issuanceDate": "2010-01-01T19:23:24Z",
                      "credentialSubject": {
                          "given_name": "Fredrik",
                          "family_name": "Str&#246;mberg",
                          "birthdate": "1949-01-22"
                      },
                      "proof": {
                          "type": "Ed25519Signature2018",
                          "created": "2021-03-19T15:30:15Z",
                          "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..PT8yCqVjj5ZHD0W36zsBQ47oc3El07WGPWaLUuBTOT48IgKI5HDoiFUt9idChT_Zh5s8cF_2cSRWELuD8JQdBw",
                          "proofPurpose": "assertionMethod",
                          "verificationMethod": "did:example:issuer#keys-1"
                      }
                  }
              ],
              "id": "ebc6f1c2",
              "holder": "did:example:holder",
              "proof": {
                  "type": "Ed25519Signature2018",
                  "created": "2021-03-19T15:30:15Z",
                  "challenge": "n-0S6_WzA2Mj",
                  "domain": "https://client.example.org/cb",
                  "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..GF5Z6TamgNE8QjE3RbiDOj3n_t25_1K7NVWMUASe_OEzQV63GaKdu235MCS3hIYvepcNdQ_ZOKpGNCf0vIAoDA",
                  "proofPurpose": "authentication",
                  "verificationMethod": "did:example:holder#key-1"
              }
          }
      },

  },
  bad:{
      singleVP : {
          id_token : {
              _vp_token:{}
          },
          vp_token : {
              test:{}
          }
      }
  }
}

export const optionsWithClaims = {
    state: 'af0ifjsldkj',
    nonce: 'n-0S6_WzA2Mj',
    response_mode: "form_post",
    claims : claims.good
}


export const PrintClaims = () => {
    console.log("from module claims==>", claims);
}

export const DID_TEST_RESOLVER_DATA_NEW = [
    { //0
       method: 'did:ethr',
       did: "did:ethr:rinkeby:0x0345dd0c781893a801588a36051e3bdc61f15f0dd51aa716915e763bd2a2f613f6",
       resolverReturn: {
          "didDocument":{
             "@context": [
                "https://www.w3.org/ns/did/v1",
                "https://identity.foundation/EcdsaSecp256k1RecoverySignature2020/lds-ecdsa-secp256k1-recovery2020-0.0.jsonld"
              ],
              "id": "did:ethr:rinkeby:0x0345dd0c781893a801588a36051e3bdc61f15f0dd51aa716915e763bd2a2f613f6",
              "verificationMethod": [
                {
                  "id": "did:ethr:rinkeby:0x0345dd0c781893a801588a36051e3bdc61f15f0dd51aa716915e763bd2a2f613f6#controller",
                  "type": "EcdsaSecp256k1RecoveryMethod2020",
                  "controller": "did:ethr:rinkeby:0x0345dd0c781893a801588a36051e3bdc61f15f0dd51aa716915e763bd2a2f613f6",
                  "blockchainAccountId": "0x1471b1ca1E8515b07825a690c9D6CAbBfAa42e49@eip155:4"
                },
                {
                  "id": "did:ethr:rinkeby:0x0345dd0c781893a801588a36051e3bdc61f15f0dd51aa716915e763bd2a2f613f6#controllerKey",
                  "type": "EcdsaSecp256k1VerificationKey2019",
                  "controller": "did:ethr:rinkeby:0x0345dd0c781893a801588a36051e3bdc61f15f0dd51aa716915e763bd2a2f613f6",
                  "publicKeyHex": "0345dd0c781893a801588a36051e3bdc61f15f0dd51aa716915e763bd2a2f613f6"
                }
              ],
              "authentication": [
                "did:ethr:rinkeby:0x0345dd0c781893a801588a36051e3bdc61f15f0dd51aa716915e763bd2a2f613f6#controller",
                "did:ethr:rinkeby:0x0345dd0c781893a801588a36051e3bdc61f15f0dd51aa716915e763bd2a2f613f6#controllerKey"
              ],
              "assertionMethod": [
                "did:ethr:rinkeby:0x0345dd0c781893a801588a36051e3bdc61f15f0dd51aa716915e763bd2a2f613f6#controller",
                "did:ethr:rinkeby:0x0345dd0c781893a801588a36051e3bdc61f15f0dd51aa716915e763bd2a2f613f6#controllerKey"
              ]         
           },
       },
       keys: [
          {
             id: 'did:ethr:rinkeby:0x02fc5d9954170fb9bd2d1d18bb9ca645828bc3555edf5f501f0b3cd0dfa8cc17e1#owner',
             kty: DID_SIOP.KTYS.EC,
             alg: DID_SIOP.ALGORITHMS['ES256K'],
             format: DID_SIOP.KEY_FORMATS.ETHEREUM_ADDRESS,
             publicKey: '0x02fc5d9954170fb9bd2d1d18bb9ca645828bc3555edf5f501f0b3cd0dfa8cc17e1'
          }
       ],
       keyInfo: {
          address: '0x1471b1ca1E8515b07825a690c9D6CAbBfAa42e49',
          privateKey: '2d0651990af6802bf1509cafe5784f98ec35932cb57ee2d8ef7ab0f8f43cf83e',
          publicKey: '0345dd0c781893a801588a36051e3bdc61f15f0dd51aa716915e763bd2a2f613f6',
          identifier: '0x0345dd0c781893a801588a36051e3bdc61f15f0dd51aa716915e763bd2a2f613f6' 
       }
    },
    { //1
       method: 'did:ethr',
       did: "did:ethr:rinkeby:0x02be73dcaa2013a714b6745f54ff8576df151f8226cc3923538bfbfb9a014584fe",
       resolverReturn: {
          "didDocument":{
             "@context": [
                "https://www.w3.org/ns/did/v1",
                "https://identity.foundation/EcdsaSecp256k1RecoverySignature2020/lds-ecdsa-secp256k1-recovery2020-0.0.jsonld"
              ],
              "id": "did:ethr:rinkeby:0x02be73dcaa2013a714b6745f54ff8576df151f8226cc3923538bfbfb9a014584fe",
              "verificationMethod": [
                {
                  "id": "did:ethr:rinkeby:0x02be73dcaa2013a714b6745f54ff8576df151f8226cc3923538bfbfb9a014584fe#controller",
                  "type": "EcdsaSecp256k1RecoveryMethod2020",
                  "controller": "did:ethr:rinkeby:0x02be73dcaa2013a714b6745f54ff8576df151f8226cc3923538bfbfb9a014584fe",
                  "blockchainAccountId": "0xAf425F2104E9450aB070F03dc6097144C169391d@eip155:4"
                },
                {
                  "id": "did:ethr:rinkeby:0x02be73dcaa2013a714b6745f54ff8576df151f8226cc3923538bfbfb9a014584fe#controllerKey",
                  "type": "EcdsaSecp256k1VerificationKey2019",
                  "controller": "did:ethr:rinkeby:0x02be73dcaa2013a714b6745f54ff8576df151f8226cc3923538bfbfb9a014584fe",
                  "publicKeyHex": "02be73dcaa2013a714b6745f54ff8576df151f8226cc3923538bfbfb9a014584fe"
                }
              ],
              "authentication": [
                "did:ethr:rinkeby:0x02be73dcaa2013a714b6745f54ff8576df151f8226cc3923538bfbfb9a014584fe#controller",
                "did:ethr:rinkeby:0x02be73dcaa2013a714b6745f54ff8576df151f8226cc3923538bfbfb9a014584fe#controllerKey"
              ],
              "assertionMethod": [
                "did:ethr:rinkeby:0x02be73dcaa2013a714b6745f54ff8576df151f8226cc3923538bfbfb9a014584fe#controller",
                "did:ethr:rinkeby:0x02be73dcaa2013a714b6745f54ff8576df151f8226cc3923538bfbfb9a014584fe#controllerKey"
              ]           
           },
       },
       keys: [
          {
             id: 'did:ethr:rinkeby:0x02fc5d9954170fb9bd2d1d18bb9ca645828bc3555edf5f501f0b3cd0dfa8cc17e1#owner',
             kty: DID_SIOP.KTYS.EC,
             alg: DID_SIOP.ALGORITHMS["ES256K"],
             format: DID_SIOP.KEY_FORMATS.ETHEREUM_ADDRESS,
             publicKey: '0x02fc5d9954170fb9bd2d1d18bb9ca645828bc3555edf5f501f0b3cd0dfa8cc17e1'
          }
       ],
       keyInfo: {
          address: '0xAf425F2104E9450aB070F03dc6097144C169391d',
          privateKey: 'c4873e901915343baf7302b0b87bae70bf5726e9280d415b3f7fc85908cc9d5a',
          publicKey: '02be73dcaa2013a714b6745f54ff8576df151f8226cc3923538bfbfb9a014584fe',
          identifier: '0x02be73dcaa2013a714b6745f54ff8576df151f8226cc3923538bfbfb9a014584fe'         
       }
    },
    { //2 
      method: 'did:key',
      did: 'did:key:z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv',
      resolverReturn: {
         "didDocument":{
          '@context': [
            'https://www.w3.org/ns/did/v1',
            'https://w3id.org/security/suites/ed25519-2018/v1',
            'https://w3id.org/security/suites/x25519-2019/v1'
          ],
          id: 'did:key:z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv',
          verificationMethod: [
            {
              id: 'did:key:z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv#z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv',
              type: 'Ed25519VerificationKey2018',
              controller: 'did:key:z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv',
              publicKeyBase58: 'Ccjgf9anYFuvgf3JRo9yghXoaxPsnN3fuEJuz3peEdQY'
            }
          ],
          authentication: [
            'did:key:z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv#z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv'
          ],
          assertionMethod: [
            'did:key:z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv#z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv'
          ],
          capabilityDelegation: [
            'did:key:z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv#z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv'
          ],
          capabilityInvocation: [
            'did:key:z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv#z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv'
          ],
          keyAgreement: [
            {
              id: 'did:key:z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv#z6LSoGhqMKrk8Zcv6Wq4pwp3tkqeYDqwTTzxnk9oGLyytBDw',
              type: 'X25519KeyAgreementKey2019',
              controller: 'did:key:z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv',
              publicKeyBase58: 'CbXfq23t36uB18TJJJJ6aAdAh5JpkrpoumS7mtLTAoTB'
            }
          ]
        }
      },
      keys: [
         {
            id: 'did:key:z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv#z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv',
            kty: DID_SIOP.KTYS.OKP,
            alg: DID_SIOP.ALGORITHMS.EdDSA,
            format: DID_SIOP.KEY_FORMATS.BASE58,
            publicKey: 'Ccjgf9anYFuvgf3JRo9yghXoaxPsnN3fuEJuz3peEdQY'
         }
      ],
      keyInfo: {
         address: '',
         privateKey: '3jz6AEkock9fif1dt2VBUtqmMg6JjHYKHdpBd3J6H23zmt6pfYK8NCbFkWpGLuwHNepzL5G3PMZNr6qjyPBrnhfA',
         publicKey: 'Ccjgf9anYFuvgf3JRo9yghXoaxPsnN3fuEJuz3peEdQY',
         identifier: 'did:key:z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv#z6Mkr4zjFPqDsoQPo9t17N7pXo5oQXfjCFJ2bFDqpKnf9rBv'         
      }
   },
   { //3 
       method: 'did:key',
       did: 'did:key:z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN',
       resolverReturn: {
          "didDocument":{
             '@context': [
               'https://www.w3.org/ns/did/v1',
               'https://w3id.org/security/suites/ed25519-2018/v1',
               'https://w3id.org/security/suites/x25519-2019/v1'
             ],
             id: 'did:key:z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN',
             verificationMethod: [
               {
                 id: 'did:key:z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN#z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN',
                 type: 'Ed25519VerificationKey2018',
                 controller: 'did:key:z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN',
                 publicKeyBase58: 'B2wUEUMZNLdD8kuVCDQsqLNXtqEZGbna9pDiXs2Fq3Uz'
               }
             ],
             authentication: [
               'did:key:z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN#z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN'
             ],
             assertionMethod: [
               'did:key:z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN#z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN'
             ],
             capabilityDelegation: [
               'did:key:z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN#z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN'
             ],
             capabilityInvocation: [
               'did:key:z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN#z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN'
             ],
             keyAgreement: [
               {
                 id: 'did:key:z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN#z6LSr95e5osYAGxuc83dB82EJRVPLFFcoSqZzmVKiqiV8krL',
                 type: 'X25519KeyAgreementKey2019',
                 controller: 'did:key:z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN',
                 publicKeyBase58: 'FTuUZW4g4pFAWjfreUWGyqGuV6iW6qfR7nmeEP4xRP5a'
               }
             ]
           }
       },
       keys: [
          {
             id: 'did:key:z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN#z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN',
             kty: DID_SIOP.KTYS.OKP,
             alg: DID_SIOP.ALGORITHMS.EdDSA,
             format: DID_SIOP.KEY_FORMATS.BASE58,
             publicKey: 'B2wUEUMZNLdD8kuVCDQsqLNXtqEZGbna9pDiXs2Fq3Uz'
          }
       ],
       keyInfo: {
          address: '',
          privateKey: '7ikaQndFgH8daoLve2h6qDyRdx6LZ1B6g778ScfXGGYrJNwB6heiraN6pShS5SDnQJrRiq2QoZfWzeE9dQXw8sY',
          publicKey: 'B2wUEUMZNLdD8kuVCDQsqLNXtqEZGbna9pDiXs2Fq3Uz',
          identifier: 'did:key:z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN#z6MkpVCWpibzht7gFFkBsnNigRvXiQWQgV2vqq8eN8zGkGGN'
       }
    }              
 ]


 export const PARAMS = Object.freeze({
    RP: {
        redirect_uri : 'localhost:4200/home',
        did: DID_TEST_RESOLVER_DATA_NEW[0].did,
        registration : {
            "jwks_uri": "https://uniresolver.io/1.0/identifiers/did:example:0xab;transform-keys=jwks",
            "id_token_signed_response_alg": ["ES256K","ES256K-R", "EdDSA", "RS256"]
            },
        sigining_key:DID_TEST_RESOLVER_DATA_NEW[0].keyInfo.privateKey,
        kid: DID_TEST_RESOLVER_DATA_NEW[0].keys[0].id, // Corresponding authentication method in RP's did document (to be used as kid value for key)
        key_format:DID_SIOP.KEY_FORMATS.HEX,
        key_algorithm:DID_SIOP.ALGORITHMS['ES256K']
    },
    USER:{
        did: DID_TEST_RESOLVER_DATA_NEW[1].did,
        sigining_key:DID_TEST_RESOLVER_DATA_NEW[1].keyInfo.privateKey,
        kid: DID_TEST_RESOLVER_DATA_NEW[1].keys[0].id, // Corresponding authentication method in User's did document (to be used as kid value for key)
        key_format:DID_SIOP.KEY_FORMATS.HEX,
        key_algorithm:DID_SIOP.ALGORITHMS['ES256K']
    },
    KEY_RP: {
      redirect_uri : 'localhost:4200/home',
      did: DID_TEST_RESOLVER_DATA_NEW[3].did,
      registration : {
          "jwks_uri": "https://uniresolver.io/1.0/identifiers/did:example:0xab;transform-keys=jwks",
          "id_token_signed_response_alg": ["ES256K","ES256K-R", "EdDSA", "RS256"]
          },
      sigining_key:DID_TEST_RESOLVER_DATA_NEW[3].keyInfo.privateKey,
      kid: DID_TEST_RESOLVER_DATA_NEW[3].keys[0].id, // Corresponding authentication method in RP's did document (to be used as kid value for key)
      key_format:DID_SIOP.KEY_FORMATS.BASE58,
      key_algorithm:DID_SIOP.ALGORITHMS['EdDSA']
  },
  KEY_USER:{
      did: DID_TEST_RESOLVER_DATA_NEW[3].did,
      sigining_key:DID_TEST_RESOLVER_DATA_NEW[3].keyInfo.privateKey,
      kid: DID_TEST_RESOLVER_DATA_NEW[3].keys[0].id, // Corresponding authentication method in User's did document (to be used as kid value for key)
      key_format:DID_SIOP.KEY_FORMATS.BASE58,
      key_algorithm:DID_SIOP.ALGORITHMS['EdDSA']
  }

});
