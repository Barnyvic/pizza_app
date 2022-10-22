const { auth } = require('express-openid-connect');
require("dotenv").config()

const authConfig = {
   authRequired: false,
  auth0Logout: true,
  secret: process.env.SECERT,
  baseURL: 'http://localhost:8116',
  clientID:  process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
  }

  module.exports = auth(authConfig)