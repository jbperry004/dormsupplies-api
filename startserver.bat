cd "C:\Program Files\MongoDB\Server\3.6\bin"
START mongod --dbpath "C:\Users\Bliss Perry\mongodb\dormsupplies-api\data\db" --port 5000
TIMEOUT 1
cd "C:\Users\Bliss Perry\dormsupplies-api"
node app.js
