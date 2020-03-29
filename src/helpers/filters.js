import Vue from 'vue'

const filters = {
  www: (url) => {
    return url.replace('https://mbasic.facebook.com/', 'https://fb.com/')
  },
  limit_str: (value, size = 50) => {
    if (!value) return ''
    value = value.toString()

    if (value.length <= size) {
      return value
    }
    return value.substr(0, size) + '...'
  }
}

for (const f in filters) {
  Vue.filter(f, filters[f])
}
