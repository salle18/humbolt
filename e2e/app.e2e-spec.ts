import { HumboltClientPage } from './app.po';

describe('humbolt-client App', function() {
  let page: HumboltClientPage;

  beforeEach(() => {
    page = new HumboltClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
