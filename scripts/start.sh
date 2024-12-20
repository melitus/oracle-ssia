#!/bin/bash
sudo docker build -t mfssia-off-chain-business-contract-verifier .

sudo docker run --rm \
    -v ./tmp/iexec_in:/iexec_in \
    -v ./tmp/iexec_out:/iexec_out \
    -e IEXEC_IN=/iexec_in \
    -e IEXEC_OUT=/iexec_out \
    mfssia-off-chain-business-contract-verifier 1234


# sudo docker tag mfssia-off-chain-business-contract-verifier melitus/mfssia-off-chain-business-contract-verifier:2.0.0

# sudo docker push melitus/mfssia-off-chain-business-contract-verifier:2.0.0

