import elasticClient from './elasticClient'

export  const createIndex = async (indexName:string) => {
  await elasticClient.indices.create({ index: indexName });
  console.log("Index created");
};

