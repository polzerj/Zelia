dbOpenRequest.addEventListener("upgradeneeded", (e) => {
  let idb = dbOpenRequest.result;

  // Create an objectStore
  let objStore = idb.createObjectStore("<name of the Object Store>", {
    // Set name of the primary key
    keyPath: "<path to the primary key>",
    // or enable an auto-incrementing primary key
    autoIncrement: true,
  });
  
  // Create an index
  objStore.createIndex(
    "<name of the index>",
    "<name of the attribute the index is created on>",
    {
      unique: < attibute is unique or not >
    }
  );
});
