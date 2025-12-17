// generate-hash.js
const bcrypt = require('bcrypt');

const password = 'babiguling'; // Ganti dengan password yang Anda mau
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Password:', password);
    console.log('Hash:', hash);
    console.log('\nCopy hash di atas untuk digunakan di SQL query.');
  }
});