let cityNameList = [
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
        city_name: cityNameList[counter],
    }
};