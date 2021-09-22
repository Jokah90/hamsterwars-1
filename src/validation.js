// function isProperIndex(index, maxIndex) {
//     return index >= 0 && index < maxIndex
// }

//PUT Object
function isHamsterChanged(maybe) {
  if (typeof maybe !== "object") {
    console.log(typeof maybe);
    return false;
  }

  let keys = Object.keys(maybe);
  if (!keys.includes("wins") || !keys.includes("games")) {
    return false;
  }

  return true;
}

//POST object
function isHamsterObject(maybe) {
  if (typeof maybe !== "object") {
    console.log(typeof maybe);
    return false;
  }

  let keys = Object.keys(maybe);

  if (
    !keys.includes("age") ||
    !keys.includes("imgName") ||
    !keys.includes("loves") ||
    !keys.includes("favFood") ||
    !keys.includes("wins") ||
    !keys.includes("defeats") ||
    !keys.includes("games") ||
    !keys.includes("name")
  ) {
    return false;
  }

  return true;
}

module.exports = { isHamsterObject, isHamsterChanged };
