# siop-auth-sample

```
npm install
tsc

node dist/auth_basic_method_key.js
```
**Note 1:** did-siop is pulled from GitHub repo's **pub branch** (github:RadicalLedger/did-siop-lib#pub) (instead of npmjs). if you are rebuilding (npm install), delete the package-lock.json & node modules both to make sure you get the latest source.

**Note 2:** Current did:key Resolver uses Crypto Suite Ed25519VerificationKey2018 based DIDs/DidDocs.
