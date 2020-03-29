import puppeteer from 'puppeteer'
import Store from './localdb'

export default class Crawler {
  metaKey = 'ControlLeft'
  debugMode = true
  options = {
    headless: true,
    defaultViewport: { width: 1368, height: 1024 },
    args: ['--window-size=1368,1024'],
    executablePath: puppeteer.executablePath().replace('app.asar', 'app.asar.unpacked')
  }

  page = null
  browser = null
  baseUrl = 'https://mbasic.facebook.com/'
  content = ''
  context = null
  constructor (context = null, debugMode = true) {
    if (require('os').platform() === 'darwin') {
      this.metaKey = 'Meta'
    }
    this.options.headless = this.debugMode = !debugMode
    this.options.executablePath = puppeteer.executablePath().replace('app.asar', 'app.asar.unpacked')
    this.context = context
  }

  async createBrowser () {
    this.browser = await puppeteer.launch(this.options)
  }

  async createPage () {
    this.page = await this.browser.newPage()
    const store = new Store({
      configName: 'user-cookie',
      defaults: {
        cookie: ''
      }
    })
    const cookies = store.get('cookie')
    for (const cookie of cookies) {
      await this.page.setCookie(cookie)
    }
  }

  async checkLogin () {
    await this.createPage()
    await this.page.goto(this.uri('profile'), { waitUntil: 'networkidle2' })
    return !this.page.url().includes('refsrc')
  }

  uri (path = 'profile') {
    return `${this.baseUrl}${path}`
  }

  async run (item) {
    try {
      await this.createPage()
      await this.goPage(item.url)
      await this.fillForm()
      await this.submit()
      await this.page.close()
      return 3
    } catch (e) {
      return 1
    }
  }

  async goPage (url) {
    await this.page.goto(url.replace('www', 'mbasic'), { waitUntil: 'networkidle2' })
  }

  async fillForm () {
    await this.page.focus('#mbasic-composer-form textarea[name=xc_message]')
    await this.page.keyboard.type(this.content)
    await this.page.waitFor(1000)
  }

  async submit () {
    await this.page.click('#mbasic-composer-form input[type=submit]')
    await this.page.waitFor(2000)
  }

  async runCrawlerGroups () {
    let elements
    await this.createBrowser()
    if (await this.checkLogin()) {
      await this.createPage()
      await this.goPage('https://mbasic.facebook.com/groups/?seemore', { waitUntil: 'networkidle2' })
      elements = await this.page.evaluate(() => {
        const arr = []
        const elList = document.querySelectorAll('#objects_container table  table a')
        Array.from(elList).forEach(function (el) {
          arr.push({ text: el.innerText, href: el.href, value: false })
        })
        return arr
      })
    }
    await this.browser.close()
    return elements
  }
}
