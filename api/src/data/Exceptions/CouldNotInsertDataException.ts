export class CouldNotInsertDataException extends Error {
  constructor() {
    super("Could not insert data into DB");
  }
}
