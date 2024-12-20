# Build Stage 1
# This build created a staging docker image
#
FROM node:14-alpine

## Set current working directory
WORKDIR /mfssia-business-contract-verifier

## Copy the dockerfile's context's community server files
COPY . .

# install utilities
RUN yarn install --ignore-engines

# making entrypoint executable
ENTRYPOINT [ "node", "src/app.js"]

