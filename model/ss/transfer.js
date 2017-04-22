'use strict';

const Sequelize = require('sequelize');

const sequelize = require('../../lib/sequelize');

module.exports = sequelize.define('transfer', {
  transfer_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: '流量 Id',
  },
  user_id: {
    type: Sequelize.STRING(32),
    allowNull: false,
    comment: '用户 Id',
  },
  node_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '节点 Id',
  },
  flow_up: {
    type: Sequelize.BIGINT,
    allowNull: false,
    defaultValue: 0,
    comment: '上传流量',
  },
  flow_down: {
    type: Sequelize.BIGINT,
    allowNull: false,
    defaultValue: 0,
    comment: '下载流量',
  },
  active_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
    comment: '活跃时间',
  },
}, {
  createdAt: false,
  updatedAt: false,
  underscored: true,
  freezeTableName: true,
  tableName: 'ss_transfer',
});
