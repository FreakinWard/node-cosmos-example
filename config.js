// @ts-check
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "Tasks",
    containerId: "Items",
    partitionKey: { kind: "Hash", paths: ["/category"] }
};

module.exports = config;
