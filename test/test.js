import React from 'react';
import { shallow, mount, render } from 'enzyme';
// import { exportAllDeclaration } from '@babel/types'; // ? added automatically
import request from 'request';

test('API call for a specific username returns that User record', (done) => {
  request('http://localhost:3004/users/slipperybounce', (err, res, body) => {
    var user = JSON.parse(body);
    expect(user.length).toBe(1);
    expect(user[0].username).toBe('slipperybounce');
    done();
  });
});

test('API call for a non-existant username returns a specific Error', (done) => {
  request('http://localhost:3004/users/slippery', (err, res, body) => {
    expect(body).toEqual(expect.stringContaining('That username is not in the database'));
    done();
  });
});

test('API call to "/users" returns 100 Users from database', (done) => {
  request('http://localhost:3004/users', (err, res, body) => {
    var userArray = JSON.parse(body);
    expect(userArray.length).toBe(100);
    expect(userArray[0].photo).toEqual(expect.stringContaining('unsplash.com'));
    expect(userArray[0].username).toEqual(expect.stringContaining('slipperybounce'));
    expect(typeof userArray[0].followers).toBe('number');
    expect(typeof userArray[0].tracks).toBe('number');
    expect(userArray[0].description.length).toBeGreaterThan(1);
    expect(userArray[0].location).toEqual(expect.stringContaining(','));
    done();
  });
});

test('API call to "/username" instead of "/users" still returns 100 Users', (done) => {
  request('http://localhost:3004/username', (err, res, body) => {
    var userArray = JSON.parse(body);
    expect(userArray.length).toBe(100);
    done();
  });
});