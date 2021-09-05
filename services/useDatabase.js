const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("../config");
const dbContext = require("../data/databaseContext");
const { v4: uuidv4 } = require('uuid');

module.exports = function useDatabase() {
    const { endpoint, key, databaseId, containerId } = config;

    const client = new CosmosClient({ endpoint, key });

    const database = client.database(databaseId);
    const container = database.container(containerId);

    const load = async ()=> {
        // Make sure Tasks database is already setup. If not, create it.
        await dbContext.create(client, databaseId, containerId);
    }

    const createItem = async (newItem) => {
        const itemWithId = {
            ...newItem,
            id: uuidv4(),
        };
        const {resource: createdItem} = await container.items.create(itemWithId);

        console.log(`created item: ${createdItem.id}`);

        return createdItem;
    }

    const fetchQuery = async query => {
        const { resources: fetchedItems } = await container.items.query(query).fetchAll()

        fetchedItems.forEach(fetchedItem => {
            console.log(`fetched item: ${fetchedItem.id}`);
        });

        return fetchedItems;
    }

    const updateItem = async (item) => {
        const { resource: updatedItem } = await container.item(item.id, item.category).replace(item);

        console.log(`\r\nupdated item: ${updatedItem.id}`);

        return updatedItem;
    }

    const deleteItem = async (id, partitionKey) => {
        const { resource: result } = await container.item(id, partitionKey).delete();

        console.log(`Deleted item: ${id}`)

        return result;
    }

    return {load, fetchQuery, createItem, updateItem, deleteItem}
}
