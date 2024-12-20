#!/bin/bash

# declare the app entrypoint
ENTRYPOINT="/root/miniconda/bin/node /app/app.js"
# declare an image name
IMG_NAME=onnxruntime-confidential

IMG_FROM=${IMG_NAME}:non-tee
IMG_TO=${IMG_NAME}:tee

# build the regular non-TEE image
docker build . -t ${IMG_FROM}

# run the sconifier to build the TEE image based on the non-TEE image
docker run -it --rm \
            -v /var/run/docker.sock:/var/run/docker.sock \
            registry.scontain.com:5050/sconecuratedimages/iexec-sconify-image:5.3.3-glibc \
            sconify_iexec \
            --base=registry.scontain.com:5050/sconecuratedimages/iexecsgx:hello-world-c-ubuntu \
            --name=${IMG_NAME} \
            --from=${IMG_FROM} \
            --to=${IMG_TO} \
            --binary-fs \
            --fs-dir=/app \
            --host-path=/etc/hosts \
            --host-path=/etc/resolv.conf \
            --binary=/root/miniconda/bin/node \
            --heap=1G \
            --dlopen=2 \
            --no-color \
            --verbose \
            --command=${ENTRYPOINT} \
            && echo -e "\n------------------\n" \
            && echo "successfully built TEE docker image => ${IMG_TO}" \
            && echo "application mrenclave.fingerprint is $(docker run -it --rm -e SCONE_HASH=1 ${IMG_TO})"