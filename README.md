# siop-auth-sample
This sample illustrate usage of basic funcitons of [did-siop](https://github.com/RadicalLedger/did-siop-lib/tree/master) library. 

### Try it out ###
Run following commands and check the console logs for the output.
```
npm install 
tsc

// to try basic authentication (NO VP Data)
node dist/auth_vpdata_method_key.js

// to try with Verifiable Presentations (WITH VP Data)
node dist/auth_vpdata_method_key.js

```

### src/params.ts ###
You could find all necessary data for testing here. Please note, private keys are hardcoded in this for demonstration purposes only. You should never do so in a real-world/test application.
