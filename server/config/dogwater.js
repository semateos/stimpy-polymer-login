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
            avatar : config.api + "/images/avatar-01.svg",
            favorite: false
          },
          {
            id: 2,
            text : "Loving this Polymer thing.",
            username : "Rob",
            avatar : config.api + "/images/avatar-02.svg",
            favorite: false
          },
            {
            id: 3,
            text : "So last year...",
            username : "Dimitri",
            avatar : config.api + "/images/avatar-03.svg",
            favorite: false
          },
          {
            id: 4,
            text : "Pretty sure I came up with that first.",
            username : "Ada",
            avatar : config.api + "/images/avatar-07.svg",
            favorite: false
          },
          {
            id: 5,
            text : "Yo, I heard you like components, so I put a component in your component.",
            username : "Grace",
            avatar : config.api + "/images/avatar-08.svg",
            favorite: false
          },
          {
            id: 6,
            text : "Centralize, centrailize.",
            username : "John",
            avatar : config.api + "/images/avatar-04.svg",
            favorite: false
          },
          {
            id: 7,
            text : "Has anyone seen my cat?",
            username : "Zelda",
            avatar : config.api + "/images/avatar-06.svg",
            favorite: false
          },
          {
            id: 8,
            text : "Decentralize!",
            username : "Norbert",
            avatar : config.api + "/images/avatar-05.svg",
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
