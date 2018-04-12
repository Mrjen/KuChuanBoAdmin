const myGlobel = {
  sign: '30340544d122375a570ab95643ec888b',
  currentApplet: 0,
  currentAppletName: '小程序总览'
}

if (sessionStorage.getItem('currentApplet') != null) {
  myGlobel.currentApplet = sessionStorage.getItem('currentApplet')
} else {
  sessionStorage.setItem('currentApplet', 0)
}

export default myGlobel
