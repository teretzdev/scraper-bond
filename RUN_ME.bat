@echo off
IF NOT EXIST ./node_modules (
    npm install
)
node index.cjs %*
