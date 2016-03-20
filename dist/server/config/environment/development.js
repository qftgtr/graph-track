'use strict';

// Development specific configuration
// ==================================
module.exports = {
  port: 9001,
  // Session store options
  session: {
    store: 'Redis',
    client: 'redis://192.168.99.100:6379'
  },

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/graphtrack-dev'
  },

  // Seed database on startup
  seedDB: true

};
//# sourceMappingURL=development.js.map
