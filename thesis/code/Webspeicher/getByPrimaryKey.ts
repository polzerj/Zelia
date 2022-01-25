dbOpenRequest.addEventListener("success", (e) => {
  let idb = dbOpenRequest.result;
  // create a transaction:
  let transaction = idb.transaction(
    ["<object stores which are affected>"],
    "[readonly | readwrite]"
  );
  // get the Object Store:
  let objectStore = transaction.getObjectStore("<name of the Object Store>");
  // get the data:
  let getRequest = objectStore.get("<primary key>");
  getRequest.addEventListener("success", (e) => {
    let data = getRequest.result;
    // The data object is the object of the database
  });
});
