const sha256 = require("crypto-js/sha256");

module.exports = [
  {
    id: 1,
    fName: "Hande",
    lName: "Adıgüzel",
    email: "handeadiguzel@oplog.com.tr",
    userCode: "hande",
    password: sha256("demo").toString(),
    photo: {
      thumbnailUrl: "https://picsum.photos/100/100/?image=667",
      originalUrl: "https://picsum.photos/800/800/?image=667"
    }
  },
  {
    id: 2,
    fName: "Mucahit",
    lName: "Gurbuz",
    email: "gurbuz@metu.edu.tr",
    userCode: "gurbuz",
    password: sha256("demo").toString(),
    photo: {
      thumbnailUrl: "https://picsum.photos/100/100/?image=667",
      originalUrl: "https://picsum.photos/800/800/?image=667"
    }
  },
  {
    id: 3,
    fName: "Sevgi",
    lName: "Çiçek",
    email: "lorem@ipsum.com",
    userCode: "sevgi",
    password: sha256("demo").toString(),
    photo: {
      thumbnailUrl: "https://picsum.photos/100/100/?image=667",
      originalUrl: "https://picsum.photos/800/800/?image=667"
    }
  }
];
