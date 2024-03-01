const { Client } = require("@elastic/elasticsearch");

require("dotenv").config();

const elasticClient = new Client({
  node: "http://localhost:9200", 
  auth: {
    username:'elastic', 
    password: "rashik123", 
  },
});

export default elasticClient;