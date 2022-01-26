/* Get the timetable for a specific day for a specific element.
* @param {Date} date
* @param {number} id
* @param {WebUntisElementType} type
* @param {Boolean} [validateSession=true]
* @returns {Promise<Array>}
*/	
async getTimetableFor(date, id, type, validateSession = true) {
	return await this._timetableRequest(id, type, date, date, validateSession);
}
