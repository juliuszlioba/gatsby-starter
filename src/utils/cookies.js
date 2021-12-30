function setCookie(cname, cvalue, exdays = 365) {
  const d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  const expires = "expires=" + d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;Secure"
}

function getCookie(cname) {
  const name = cname + "="
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

function checkCookie(cname) {
  const cookie = getCookie(cname)
  if (cookie === "") {
    return false
  } else {
    return true
  }
}

function deleteCookie(cname) {
  document.cookie =
    cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;Secure"
}

function deleteAllCookies() {
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++)
    document.cookie =
      ca[i] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;Secure"
}

export { setCookie, getCookie, checkCookie, deleteCookie, deleteAllCookies }
