1.	     * Get the timetable for a specific day for a specific element.
2.	     * @param {Date} date
3.	     * @param {number} id
4.	     * @param {WebUntisElementType} type
5.	     * @param {Boolean} [validateSession=true]
6.	     * @returns {Promise<Array>}
7.	     */
8.	    async getTimetableFor(date, id, type, validateSession = true) {
9.	return await this._timetableRequest(id, type, date, date, validateSes-sion);
10.	    }
