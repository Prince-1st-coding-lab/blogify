const express = require('express')
const app = express();
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = {
    bcrypt,
    jwt
};

