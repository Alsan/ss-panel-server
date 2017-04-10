'use strict';

const path = require('path');

const config = require('config');
const moment = require('moment');
const filesize = require('filesize');
const UpYun = require('upyun');
const Promise = require('bluebird');

let upyun = module.exports = {};

upyun.instance = Promise.promisifyAll(
  new UpYun(
    config.upyun.bucket,
    config.upyun.operator,
    config.upyun.password,
    config.upyun.endpoint,
    {apiVersion: 'v2'}
  )
);

upyun.checkRequest = function (res) {
  if (res.statusCode !== 200) {
    throw new Error(JSON.stringify(res.data));
  }
};

upyun.sortFile = function (data) {
  data.sort(function (a, b) {
    if (a.type === 'F' && b.type !== 'F') {
      return -1;
    } else if (a.type !== 'F' && b.type === 'F') {
      return 1;
    }
    return a.name > b.name ? 1 : -1;
  });
  return data;
};

upyun.formatFile = function (file) {
  let time_format = 'YYYY-MM-DD HH:mm:ss';
  file.size_v = filesize(file.size);
  file.time_v = moment.unix(file.time).format(time_format);
  return file;
};

let listDirAsync = upyun.instance.listDirAsync.bind(upyun.instance);
upyun.listDirAsync = function* (remote_path) {
  let res = yield listDirAsync(remote_path, 999999, 'asc', 0);
  this.checkRequest(res);

  if (!res.data) {
    return [];
  }

  let files = [];
  let lines = res.data.split('\n');
  for (let line of lines) {
    let attrs = line.split('\t');
    files.push({
      name: attrs[0],
      type: attrs[1],
      size: attrs[2],
      time: attrs[3],
    });
  }

  for (let file of files) {
    this.formatFile(file);
  }
  return this.sortFile(files);
};

let makeDirAsync = upyun.instance.makeDirAsync.bind(upyun.instance);
upyun.makeDirAsync = function* (remote_path) {
  let res = yield makeDirAsync(remote_path);
  this.checkRequest(res);
  return true;
};

let removeDirAsync = upyun.instance.removeDirAsync.bind(upyun.instance);
upyun.removeDirAsync = function* (remote_path) {
  let res = yield removeDirAsync(remote_path);
  this.checkRequest(res);
  return true;
};

let putFileAsync = upyun.instance.putFileAsync.bind(upyun.instance);
upyun.putFileAsync = function* (remote_path, local_file, opts) {
  let res = yield putFileAsync(remote_path, local_file, null, false, opts);
  this.checkRequest(res);
  return true;
};

let headFileAsync = upyun.instance.headFileAsync.bind(upyun.instance);
upyun.headFileAsync = function* (remote_path) {
  let res = yield headFileAsync(remote_path);
  this.checkRequest(res);
  let file = {
    size: res.headers['x-upyun-file-size'],
    time: res.headers['x-upyun-file-date'],
    name: path.basename(remote_path),
    type: res.headers['x-upyun-file-type'],
  };
  return this.formatFile(file);
};

let deleteFileAsync = upyun.instance.deleteFileAsync.bind(upyun.instance);
upyun.deleteFileAsync = function* (remote_path) {
  let res = yield deleteFileAsync(remote_path);
  this.checkRequest(res);
  return true;
};
