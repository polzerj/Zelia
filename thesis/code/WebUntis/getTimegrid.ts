async getTimegrid(validateSession = true) {
  return await this._request('getTimegridUnits', {}, validateSession);
}
    