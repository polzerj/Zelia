class NoAdminUsersFoundException extends Error {
  constructor() {
    super("No Admin Users in Database found");
  }
}
