import puppeteer from 'puppeteer'
import Store from './localdb'
import { resolve } from 'path'

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

  async run (item, campaign) {
    try {
      this.context.$notifier.showFooterMessage({ message: `chuẩn bị dữ liệu cho ${campaign.name}` })
      await this.createPage()
      await this.goPage(item.href)
      await this.fillForm(campaign.content)
      if (campaign.image) {
        this.context.$notifier.showFooterMessage({ message: 'bypass image cho bài viết' })
        await this.page.setBypassCSP(true)
        await this.page.waitFor(500)
        this.context.$notifier.showFooterMessage({ message: 'nạp ảnh cho bài viết' })
        await this.page.click('#mbasic-composer-form input[name=view_photo]')
        await this.page.waitForSelector('input[name=file1]')
        this.context.$notifier.showFooterMessage({ message: 'upload ảnh' })
        await this.page.waitFor(500)
        const inputUploadHandle = await this.page.$('input[name=file1]')
        await inputUploadHandle.uploadFile(resolve(campaign.image))
        await this.page.waitFor(1000)
        await this.page.click('#objects_container input[name=add_photo_done]')
      }
      await this.submit()
      await this.page.close()
      this.context.$notifier.showFooterMessage({ message: `hoàn thành cho group ${campaign.name}` })
      return 3
    } catch (e) {
      this.context.$notifier.showFooterMessage({ message: `không thể gửi bài viết vào ${campaign.name}` })
      return 1
    }
  }

  async goPage (url) {
    this.context.$notifier.showFooterMessage({ message: `đi đến ${url}` })
    await this.page.goto(url.replace('www', 'mbasic'), { waitUntil: 'networkidle2' })
  }

  async fillForm (content) {
    this.context.$notifier.showFooterMessage({ message: 'tạo nội dung bài viết' })
    await this.page.focus('#mbasic-composer-form textarea[name=xc_message]')
    await this.page.keyboard.type(content)
    await this.page.waitFor(1000)
  }

  async submit () {
    this.context.$notifier.showFooterMessage({ message: 'submit bài viết' })
    await this.page.waitForSelector('input[name=view_post]')
    await this.page.click('input[name=view_post]')
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
          arr.push({ text: el.innerText, href: el.href, value: false, state: 1 })
        })
        return arr
      })
    }
    await this.browser.close()
    return elements
  }
}
