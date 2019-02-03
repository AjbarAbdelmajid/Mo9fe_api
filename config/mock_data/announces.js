let announceTitleList = [
        'Developpeur web',
        'Commercial expert',
        'Responsable Achats',
        'Chef dequipe electricien Automaticien ',
        'Inginieur deploitation',
    ],
    isActiveList = [
        true,
        true,
        false,
        true,
        true,
    ],
    priceList = [
        10000,
        14000,
        15000,
        16000,
        40000,
    ],
    announceDescriptionList = [
        ' Nous recherchons un developpeur web ...',
        'Nous recrutons des commerciaux expert en ...',
        'Nous recrutons un Responsable Achats Missions :..',
        'Société à El Jadida cherche un chef dequipe Elictricien Automaticien ...',
        'Nous recrutons un Ingénieur dexploitation Mission :...',
    ],
    keepSearchingList =[
        true,
        false,
        true,
        true,
        true,
    ],
    rejoinFileList = [
        'image1',
        'image2',
        'image3',
        'image4',
        'image5',
    ];

// to count how many announces we have
module.exports.count = announceTitleList.length;

module.exports.List = (counter)=>{
    return {
        announce_title: announceTitleList[counter],
        is_active: isActiveList[counter],
        price: priceList[counter],
        announce_description: announceDescriptionList[counter],
        keep_searching: keepSearchingList[counter],
        rejoin_file: rejoinFileList[counter],
    }
};