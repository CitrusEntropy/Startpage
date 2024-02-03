/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"4KdABxDISYR2TiYI","label":"Social","bookmarks":[{"id":"xKlFHUVuddIuDKMf","label":"Reddit","url":"https://www.reddit.com/"},{"id":"14Zmx1fBTKgMPz6v","label":"Youtube","url":"https://www.youtube.com/"},{"id":"v7o4xlefNYMADehv","label":"Github","url":"https://github.com/"}]},{"id":"BCXIf2SHIkWLEuKw","label":"Personal","bookmarks":[{"id":"F7lULE7ybyH5xB5k","label":"Mail","url":"https://mail.google.com/mail/u/0/#inbox"},{"id":"RArWy5shcKPLPnC8","label":"Calendar","url":"https://calendar.google.com/calendar/u/0/r?pli=1"},{"id":"F51dSra5m4jz8qui","label":"Drive","url":"https://drive.google.com/drive/home"}]},{"id":"V8vUd68C1prCWZFV","label":"School","bookmarks":[{"id":"JXth7N1h4oBge5CE","label":"Mail","url":"https://outlook.office365.com/mail/inbox/id/AAQkAGY2OTM2MjRjLTVlMGMtNDRmZi05NDc2LTAzYTBhMDEwMmE3NAAQACCV0WkVlEXCnmUroAdEumA%3D"},{"id":"rn5gyS3tZZdpv5aw","label":"MyWashburn","url":"https://experience.elluciancloud.com/mywashburn/"},{"id":"CII6iD1hchfZ8rNW","label":"d2l","url":"https://d2l.washburn.edu/d2l/home"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
