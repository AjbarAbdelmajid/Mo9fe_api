let firstNameList = [
        'maryam',
        'malika',
        'rachida',
        'Hafid',
        'fares',
    ],
    lastNameList = [
        'saidi',
        'sousi',
        'semlali',
        'rachidi',
        'mokhtari',
    ],
    ageList = [
        19,
        20,
        18,
        25,
        30,
    ],
    experienceDurationList = [
        3,
        5,
        7,
        16,
        18,
    ],
    importFileList = [
        'video1',
        'image2',
        'image3',
        'wordfile',
        'image5',
    ],
    profileDescriptionList = [
        'Im a competitive person Im a competitive person Im a competitive person Im a competitive person Im a competitive person Im a competitive person',
        'Im a hardworking person Im a hardworking person Im a hardworking personIm a hardworking personIm a hardworking person Im a hardworking person ',
        'Im a honest person Im a honest person Im a honest person Im a honest person Im a honest person Im a honest person Im a honest person Im a honest person',
        'Im a hardworking person Im a hardworking person Im a hardworking personIm a hardworking personIm a hardworking person Im a hardworking person ',
        'Im a hardworking person Im a hardworking person Im a hardworking personIm a hardworking personIm a hardworking person Im a hardworking person ',
    ],
    picturesList = [
        'image1',
        'image2',
        'image3',
        'image4',
        'image5',
    ],
    genderList = [
        'Male',
        'Female',
        'Male',
        'Male',
        'Male',
    ];
// to count how many profiles we have
module.exports.count = firstNameList.length;

module.exports.List = (counter)=>{
    return {
        first_name: firstNameList[counter],
        last_name: lastNameList[counter],
        age: ageList[counter],
        experience_dur: experienceDurationList[counter],
        import_file: importFileList[counter],
        profile_description: profileDescriptionList[counter],
        picture: picturesList[counter],
        gender : genderList[counter],
    }
};