
# In TEE Mode
Step 1;
# build docker

```./sconify.sh```

Step 2:
# run docker

```docker run --rm mfssia-off-chain-business-contract-verifier```

## Deploying in the bellecour sidehcain testnet :
```iexec app deploy --chain bellecour```

# Create order
```
.Create orders for your app at https://protocol.docs.iex.ec/for-developers/advanced/manage-your-apporders.
```
## Executing in the bellecour sidehcain testnet :

```iexec app run --args 1234 --watch --chain bellecour --callback <address of the onchain oracle> ```

```
iexec app run --args 1234 --workerpool prod-v8-learn.main.pools.iexec.eth --watch

```
## Fetching results
```iexec task show <task_id> --download my-app-result --chain bellecour && unzip my-app-result.zip -d my-app-result ```

You can also download your results using the iExec explorer.

##  Publish your app on the iExec Marketplace
```iexec app publish --chain bellecour```


## Run oracle on developer mode

```iexec app run appAddress --args "1234" --watch --workerpool 0x5210cD9C57546159Ac60DaC17B3e6cDF48674FBD  --params {\"iexec_developer_logger\":true} --chain viviani```

# To debug oracle
- iexec task debug <taskid> --logs --chain bellecour

 ### Steps 
- Git clone the project with this command :  “git clone https://melitus@bitbucket.org/alexnorta/mfssia-authcoin.git”
 
- Change directory to src/business-contract-off chain-oracle
 
- To install the project dependencies, run the command in the root folder “npm install” or “yarn install”
 
- To run the project, run “npm start 1234” 
 
- To push image to docker hub registry, run the command “ npm docker” or “yarn docker”
 
- After pushing it to docker hub, get the digest key


ℹ apporder successfully published with orderHash 0x41b348372bc2c0c435e6e159df61fc99e848246e050e14fc58b163aa3341ae34
