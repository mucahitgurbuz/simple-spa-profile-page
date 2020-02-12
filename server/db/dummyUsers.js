const sha256 = require("crypto-js/sha256");

module.exports = [
  {
    fName: "Hande",
    lName: "Adıgüzel",
    email: "handeadiguzel@oplog.com.tr",
    userCode: "hande",
    password: sha256("demo").toString(),
    photo: {
      thumbnailUrl: "https://picsum.photos/100/100/?image=667",
      originalUrl: "https://picsum.photos/800/800/?image=667"
    }
  }
];
