# @write-for-christ/pic-piper

A useful node library to pipe the pics and convert them continously in reactive way.

[![Build Status](https://travis-ci.org/write-for-CHRIST/pic-piper.svg?branch=master)](https://travis-ci.org/write-for-CHRIST/pic-piper)
[![Coverage Status](https://coveralls.io/repos/github/write-for-CHRIST/pic-piper/badge.svg?branch=master)](https://coveralls.io/github/write-for-CHRIST/pic-piper?branch=master)
[![David](https://david-dm.org/write-for-CHRIST/pic-piper.svg)](https://david-dm.org/write-for-CHRIST/pic-piper.svg)
[![David](https://img.shields.io/david/dev/write-for-CHRIST/pic-piper.svg)](pic-piper)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Greenkeeper badge](https://badges.greenkeeper.io/write-for-CHRIST/pic-piper.svg)](https://greenkeeper.io/)
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-configured-green.svg)](https://wallabyjs.com)

## Features

* Run all or watch for pics changed in different pipe stream.
* Execute actions in the stack with configured priorities.
* Convert pics to another format with the help of [images](https://www.npmjs.com/package/images).

## Installation

  `npm install @write-for-christ/pic-piper`

## How to use?

```javascript
  const picpiper = require('@write-for-christ/pic-piper');

  const dirOut = path.join(__dirname, '/dist');
  const dirOne = path.join(__dirname, '/origin/source1/');
  const dirTwo = path.join(__dirname, '/origin/source2/');

  const pipe1 = new picpiper.Pipe(dirOne, { recursive: true }, p => {
    // Should resolve relative path and file name before convert
    return p.rel;
  });
  const pipe2 = new picpiper.Pipe(dirTwo, { recursive: true }, p => {
    // Should resolve relative path and file name before convert
    return p.rel;
  });

  picpiper.pipe([pipe1, pipe2], dirOut, {
    convertTo: [
      {
        ext: '.webp',
        size: '210x118'
      },
      {
        ext: '.jpg',
        size: '210x118'
      }
    ],
    default: '/path/to/default/image/if/error.jpg'
  });

```