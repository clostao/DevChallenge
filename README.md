# Dev Challenge for UniFi Protocol.

The project consists of a one-page React App that interacts, using MetaMask, with a smart contract that has the interface described by the given ABI. It only works on the Ropsten network since is in the only network where the contract is deployed but it would be possible to add new networks adding the contract address in `` src/config/network.config.ts ``. 

In order to launch the application you must have nodejs and npm installed, and execute the following commands:

```
    npm install
    npm start
```

Afterwards, a webpage should be hosted in  ``localhost:3000``. In order to connect to the smart contract you will need to have installed the MetaMask. Once the app is open, MetaMask will ask you for permission to connect to the app, and now the app is ready to use.  

