# @write-for-christ/pic-piper

A useful node library to pipe the pics and convert them continously in reactive way.

[![Build Status](https://travis-ci.org/write-for-CHRIST/pic-piper.svg?branch=master)](https://travis-ci.org/write-for-CHRIST/pic-piper)
[![Coverage Status](https://coveralls.io/repos/github/write-for-CHRIST/pic-piper/badge.svg?branch=master)](https://coveralls.io/github/write-for-CHRIST/pic-piper?branch=master)
[![David](https://david-dm.org/write-for-CHRIST/pic-piper.svg)](https://david-dm.org/write-for-CHRIST/pic-piper.svg)
[![David](https://img.shields.io/david/dev/write-for-CHRIST/pic-piper.svg)](pic-piper)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Greenkeeper badge](https://badges.greenkeeper.io/write-for-CHRIST/pic-piper.svg)](https://greenkeeper.io/)

## Features

* Run all or watch for pics changed in different pipe stream.
* Execute actions in the stack with configured priorities.
* Convert pics to another format with the help of [images](https://www.npmjs.com/package/images).

## Installation

  `npm install @write-for-christ/pic-piper`

## How to use?

```javascript
  const picpiper = require('pic-piper');

  const stack = [
    '/path/source/one', // Root of the first choice
    '/path/source/two', // Root of the second choice if above not exist
  ];
  const defaultPic = '/path/to/default.jpg';

  picpiper.pipe(stack, '/path/output', {
    inputExt: '.jpg',
    outputExt: '.webp',
    default: defaultPic
  });

```