export class CouldNotAlterDataException extends Error {
  constructor() {
    super("Could not alter data in DB");
  }
}
