const axios = require("axios");
const cts = require("../constants/url");

const getValue = async (url, field) => {
  const { data } = await axios({ method: "get", url });

  return data[field];
};

const getPeople = async () => {
  const url = cts.URL;
  const { data } = await axios({ method: "get", url });
  const { results } = data;

  return results;
};

module.exports = {
  getValue,
  getPeople,
};