import {expect} from 'chai';
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe ('Our first test', () => {
  it ('should pass', () => {
      expect(true).to.equal(true);
  })
});

describe ('index.html', () => {
  // it ('should say hello', () => {
    it ('should have h1 says Users', () => {
    JSDOM.fromFile('./src/index.html')
    .then(dom => {
      const h1 = dom.window.document.getElementsByTagName('h1')[0];
      // TODO: not working at the moment
      // expect(h1.innerHTML).to.equal("Hello World? ");
      expect(h1.innerHTML).to.equal("Users");
      dom.window.close();
    });
  })
});
