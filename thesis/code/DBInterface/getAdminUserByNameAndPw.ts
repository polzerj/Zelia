export async function getAdminUserByNameAndPw(
    userName: string,
    hash: string
  ): Promise<AdminUserEntity> {
    let data: AdminUser;
    try {
      data = await getAdminUser(userName, hash);
    } catch (e) {
      throw new DatabaseNotAvailableException();
    }
    console.log(data);
  
    if (data === null) {
      throw new NoAdminUsersFoundException();
    }
    return data;
  }