const pool = require("../config/pool");

async function checkEmail(value) {
  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    `${value}`,
  ]);

  if (user.rows.length !== 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = {checkEmail};