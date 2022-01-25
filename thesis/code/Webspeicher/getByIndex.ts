let getRequest = objectStore.index("<index name>").get("value");
// or
let getRequest = objectStore.index("<index name>").getAll("value");
getRequest.addEventListener("success", (e) => {
  let data = getRequest.result;
  // The data object is the object of the database
});
