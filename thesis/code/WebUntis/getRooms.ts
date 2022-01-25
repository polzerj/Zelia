async getRooms(validateSession = true) {
    return await this._request('getRooms', {}, validateSession);
}
