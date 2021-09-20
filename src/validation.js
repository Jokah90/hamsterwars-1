function isProperIndex(index, maxIndex) {
    return index >= 0 && index < maxIndex
}

function isHamsterObject(maybe) {
    if ((typeof maybe) !== 'object') {
        console.log(typeof maybe);
        return false
    }
    console.log('isHamsterObject0')

    let keys = Object.keys(maybe)
    if (
        !keys.includes('age') ||
        !keys.includes('imgName') ||
        !keys.includes('loves') ||
        !keys.includes('favFood') ||
        !keys.includes('wins') ||
        !keys.includes('defeats') ||
        !keys.includes('games') ||
        !keys.includes('name') ||
        !keys.includes('id')) {
        console.log('isHamsterObject1', maybe)
        return false
    }
    console.log('isHamsterObject2')
    return true
}

module.exports = { isHamsterObject, isProperIndex }