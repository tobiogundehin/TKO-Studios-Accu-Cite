const axios = require("axios");

class EntryAPI {
  constructor() {
    //this.apiUrl = "https://api.coindesk.com/v1/bpi/historical/close.json";
  }

  // eslint-disable-next-line class-methods-use-this
 /* formatDate(date) {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = `${d.getFullYear()}`;

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join("-");
  } */

  async getEntries() {
    return this.connection.query("SELECT * FROM entries");
  }
}

module.exports = EntryAPI;