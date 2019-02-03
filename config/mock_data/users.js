const bCrypt = require('bcrypt-nodejs');
let userNameList = [
        process.env.ADMIN_USERNAME,
        'maryam dodo',
        'fifi fofo',
        'mohamed abidi',
        'rachid sousi',
    ],
    passWordList = [
        process.env.ADMIN_PASSWORD,
        'yyyyy',
        'rrrrr',
        'ooooo',
        'ppppp',
    ],
    AdminList = [
        true,
    ];

// to count how many users we have
module.exports.count = userNameList.length;

module.exports.List = (counter)=>{
    return {
        user_name: userNameList[counter],
        password: bCrypt.hashSync(passWordList[counter], bCrypt.genSaltSync(8), null),
        is_admin: AdminList[counter]
    }
};

