'use strict';

// Development specific configuration
// ==================================
module.exports = {
  port: 9001,
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/graphtrack-dev'
  },

  // Seed database on startup
  seedDB: true

};
