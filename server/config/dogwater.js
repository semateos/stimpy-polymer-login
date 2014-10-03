var Path = require('path');
var config = require('./index');

module.exports = {
    
    models: Path.normalize(__dirname + '/../models'),
    
    data: {
    fixtures: [
        {
          model: 'cats',
          items: [
              {
                id: 1,
                name: 'Stimpy',
                clicks: 0
              }
          ]
        },
        {
        model: 'posts',
        items: [
          {
            id: 1,
            text : "Have you heard about the Web Components revolution?",
            username : "Eric",
            avatar : 1,
            favorite: false
          },
          {
            id: 2,
            text : "Loving this Polymer thing.",
            username : "Rob",
            avatar : 2,
            favorite: false
          },
            {
            id: 3,
            text : "So last year...",
            username : "Dimitri",
            avatar : 3,
            favorite: false
          },
          {
            id: 4,
            text : "Pretty sure I came up with that first.",
            username : "Ada",
            avatar : 4,
            favorite: false
          },
          {
            id: 5,
            text : "Yo, I heard you like components, so I put a component in your component.",
            username : "Grace",
            avatar : 6,
            favorite: false
          },
          {
            id: 6,
            text : "Centralize, centrailize.",
            username : "John",
            avatar : 11,
            favorite: false
          },
          {
            id: 7,
            text : "Has anyone seen my cat?",
            username : "Zelda",
            avatar : 7,
            favorite: false
          },
          {
            id: 8,
            text : "Decentralize!",
            username : "Norbert",
            avatar : 5,
            favorite: false
          }
        ]
        }
      ]
    },
    
    connections: {
      diskDb: {
        adapter: 'disk'
      }
    },
    
    adapters: {
      disk: require('sails-disk')
    }
    
}
