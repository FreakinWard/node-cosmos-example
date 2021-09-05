// @ts-check
const useDatabase = require("./services/useDatabase")

const newItem = {
    id: "33",
    category: "fun",
    name: "Cosmos DB",
    description: "Complete Cosmos DB Node.js Quickstart ⚡",
    isComplete: false
};

async function main() {
    const {load, fetchQuery, createItem, updateItem, deleteItem} = useDatabase();

    try {
        await load();

        const querySpec = {
            query: "SELECT * from c"
        };
        await fetchQuery(querySpec)

        const createdItem = await createItem(newItem);

        const modifiedItem = {
            ...createdItem,
            isComplete: true,
        }

        const updatedItem = await updateItem(modifiedItem)

        console.log(`Updated isComplete to ${updatedItem.isComplete}\r\n`);

        await deleteItem(createdItem.id, createdItem.category);

    } catch (err) {
        console.error(`whoops...${err.message}`);
        throw(err)
    }
}

main();
