dbOpenRequest.addEventListener("upgradeneeded", (e) => {
    let idb = dbOpenRequest.result;
    let objStore =
        idb.createObjectStore("<name of the Object Store>", {
            keyPath: "<path to the primary key>"
            // or 
            autoIncrement: true
        });
    objStore.createIndex("<name of the index>", 
"<name of the attribute the index is created on>", {
        unique: < attibute is unique or not >
    });
});
