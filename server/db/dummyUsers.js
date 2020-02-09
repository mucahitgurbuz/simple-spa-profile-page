const sha256 = require('crypto-js/sha256');

module.exports = [
  {
    fName: 'Belita',
    lName: 'Livesley',
    email: 'blivesley0@ca.gov',
    userCode: 'blivesley0',
    password: sha256('SCj3fXICIF').toString(),
    photo: {
      thumbnailUrl: 'https://picsum.photos/100/100/?image=667',
      originalUrl: 'https://picsum.photos/800/800/?image=667',
    },
  },
  {
    fName: 'Vern',
    lName: 'Dahlbom',
    email: 'vdahlbom1@people.com.cn',
    userCode: 'vdahlbom1',
    password: sha256('pYPs0Ym').toString(),
    photo: {
      thumbnailUrl: 'https://picsum.photos/100/100/?image=667',
      originalUrl: 'https://picsum.photos/800/800/?image=667',
    },
  },
  {
    fName: 'Rheta',
    lName: 'Steed',
    email: 'rsteed2@umich.edu',
    userCode: 'rsteed2',
    password: sha256('yQMgFHsE9').toString(),
    photo: {
      thumbnailUrl: 'https://picsum.photos/100/100/?image=667',
      originalUrl: 'https://picsum.photos/800/800/?image=667',
    },
  },
  {
    fName: 'Bridgette',
    lName: 'Glennon',
    email: 'bglennon3@cisco.com',
    userCode: 'bglennon3',
    password: sha256('VCdiGJdLnp').toString(),
    photo: {
      thumbnailUrl: 'https://picsum.photos/100/100/?image=667',
      originalUrl: 'https://picsum.photos/800/800/?image=667',
    },
  },
  {
    fName: 'Carolin',
    lName: 'Bloxsum',
    email: 'cbloxsum4@apache.org',
    userCode: 'cbloxsum4',
    password: sha256('tUZOh6RZ').toString(),
    photo: {
      thumbnailUrl: 'https://picsum.photos/100/100/?image=667',
      originalUrl: 'https://picsum.photos/800/800/?image=667',
    },
  },
  {
    fName: 'Brantley',
    lName: 'Wield',
    email: 'bwield5@google.it',
    userCode: 'bwield5',
    password: sha256('6wffHGZSv').toString(),
    photo: {
      thumbnailUrl: 'https://picsum.photos/100/100/?image=667',
      originalUrl: 'https://picsum.photos/800/800/?image=667',
    },
  },
];
