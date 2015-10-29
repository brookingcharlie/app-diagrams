'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {
  describe('index.html', function() {
    beforeEach(function() {
      browser.get('index.html');
    });

    it('should render ', function() {
      expect(element.all(by.css('h1')).first().getText()).
        toMatch(/Application Diagram/);
      expect(element.all(by.css('p.node-title')).first().getText()).
        toMatch(/really-long-name.of.awesome.application/);
    });
  });
});
