const fetch = require('node-fetch');

const userController = {
   authenticateUser: async (req, res) => {
      const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.headers['x-auth-token']}`);
      const data = await response.json();
      return res.json(data);
   }
}

module.exports = userController;