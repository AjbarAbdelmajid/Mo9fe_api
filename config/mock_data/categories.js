let domainNameList = [
    'Education',
    'Healthcare',
    'Accounting',
    'Photographie',
    'Animation',
];

// to count how many categories we have
module.exports.count = domainNameList.length;

module.exports.List = (counter)=>{
    return {
        categories_name: domainNameList[counter],
    }
};