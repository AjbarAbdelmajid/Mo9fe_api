let codePostalList = [
    '80000',
    '23000',
    '12000',
    '10000',
    '50000',
],
    cityNameList = [
    'Agadir',
    'Tiznit',
    'warzazat',
    'Tarfaya',
    'Tanger',
];

// to count how many cities we have
module.exports.count = cityNameList.length;

module.exports.List = (counter)=>{
    return {
        code_postal: codePostalList[counter],
        city_name: cityNameList[counter],
    }
};