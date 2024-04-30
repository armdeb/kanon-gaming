describe('Game List', () => {
  it('should displays a list of games that fetched from the server', () => {
    const mockGames = [
      {
        'id': 'playngo_legacy-of-dead',
        'slug': 'playngo-legacy-of-dead',
        'title': 'Legacy of Dead',
        'providerName': 'Play\'n GO',
        'thumb': {
          'url': '//images.ctfassets.net/5acrbcz937qe/3tqUiWTXh5AbOmcyQoR7zJ/606fcd268a6a24c14ba86ad55dc8d4cd/LegacyOfDead_280x280.jpg'
        }
      },
      {
        'id': 'yggdrasil_holmes-and-the-stolen-stones',
        'slug': 'yggdrasil-holmes-and-the-stolen-stones',
        'title': 'Holmes and The Stolen Stones',
        'providerName': 'Yggdrasil',
        'thumb': {
          'url': '//images.ctfassets.net/5acrbcz937qe/36CkCaqcpdSo27Q4fNoSgk/f4939429718677d6a7212f8f9697d600/yggdrasil_holmes-and-the-stolen-stones_any'
        }
      },
      {
        'id': 'pragmatic_pragmatic-play_madame-destiny-megaways',
        'slug': 'pragmatic-play-madame-destiny-megaways',
        'title': 'Madame Destiny Megaways',
        'providerName': 'Pragmatic Play',
        'thumb': {
          'url': '//images.ctfassets.net/5acrbcz937qe/3BpYK9ahhXlExknFsR2AEX/de54a36618f0e38bde57ca23a71a23f2/MadameDestinyMegaways_280x280.jpg'
        }
      },
    ];

    cy.visit('/');

    cy.get('[data-testid="game-list"]').should('be.visible');
    cy.get('[data-testid="game-list-item"]').should('have.length.gt', 3);
    cy.get('[data-testid="game-list-item"]:lt(3)').each(($gameItem, index) => {
      cy.wrap($gameItem).find('[data-testid="game-cover"]').should('have.attr', 'src', mockGames[index].thumb.url);
      cy.wrap($gameItem).find('[data-testid="game-title"]').contains(mockGames[index].title);
      cy.wrap($gameItem).find('[data-testid="game-provider"]').contains('Provider: ' + mockGames[index].providerName);
    });
  });

  it('should searches what user typed and reset list when user empty the search', () => {
    cy.visit('/');

    cy.get('[data-testid="game-search"]').type('madame destiny');
    cy.get('[data-testid="game-list-item"]').should('have.length', 1);

    cy.get('[data-testid="game-search"]').clear();
    cy.get('[data-testid="game-list-item"]').should('have.length.gt', 3);
  });
});
