// https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color

function invertHex(hex) {
    return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
}
  
invertHex('00FF00');