import Bignumber from "bignumber.js";

Number.prototype.format = function () {
  return "$" + new Bignumber(this).toFormat();
};
