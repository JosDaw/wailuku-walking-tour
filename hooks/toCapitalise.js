export default function toCapitalise(string) {
  let splitString = string.split(' ')
  let capitalizedString = splitString.map((element) => {
    return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
  })
  return capitalizedString.join(' ')
}