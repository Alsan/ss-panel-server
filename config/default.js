'use strict';

const path = require('path');

const pkg = require('../../package');

let config = {
  protocol: 'http',
  host: '127.0.0.1',
  port: '8001',

  env: 'development',
  debug: true,

  swagger: {
    info: {
      version: pkg.version,
    },
  },

  session: {
    secret: 'shard_secret',
    name: 'session',
  },

  redis: {
    session: {
      host: '127.0.0.1',
      port: 6379,
      keyPrefix: 'shard:session:',
    },
    wechat: {
      host: '127.0.0.1',
      port: 6379,
      keyPrefix: 'shard:wechat:',
    },
    network: {
      host: '127.0.0.1',
      port: 6379,
      keyPrefix: 'shard:network:',
    },
  },

  mysql: {
    shard: {
      poolSize: 5,
      host: '127.0.0.1',
      user: 'shard',
      password: 'FhfLaS4uzv5qwnPh',
      database: 'shard',
    },
  },

  wechat: {
    tick: {
      corpid: 'wx1eedf3f9bb7f47b0',
      secret: 'fWOjVeC5lfjSezwAv8W6r2OT-s8ZlxGZyXsVaX4AexSG2VTgGhI-Dr66pSPoJnJW',
      apps: {
        shard: {
          agentid: 9,
          token: 'fwBsDyTJHpfgw5StNNCaEpb9oZ',
          aeskey: 'Z8KHa1fXSXkVnA86IXaMzWCFD5rCxBkT7pzuxlEMP8A',
        },
      },
    },
  },

  logger: {
    file: {
      filename: '/tmp/shard.log',
    },
  },

  network: {
    flow: {
      threshold: 2500000,
      Interface: 'eth0:',
    },
  },

  client_dir: path.join(__dirname, '../../client'),
};

module.exports = config;
