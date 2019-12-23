import $ from 'zepto'

export default function(router) {
  router.map({
    '*': {
      component (resolve) {
        require(['./views/welcome'], resolve)
      }
    },
    '/': {
      component (resolve) {
        require(['./views/welcome'], resolve)
      }
    },
    '/home': {
      component (resolve) {
        require(['./views/home'], resolve)
      }
    },
    '/doctor/specialist': {
      component (resolve) {
        require(['./views/doctor/specialist'], resolve)
      }
    },
    '/doctor/list': {
      component (resolve) {
        require(['./views/doctor/list.vue'], resolve)
      }
    },
    '/step4': {
      component (resolve) {
        require(['./views/step4'], resolve)
      }
    }
  })

  router.beforeEach(({to, from, next}) => {
    let toPath = to.path
    let fromPath = from.path
    console.log(`to: ${toPath} from: ${fromPath}`)
    if (toPath.replace(/[^/]/g, '').length > 1) {
      router.app.isIndex = false
    // eslint-disable-next-line brace-style
    } else {
      let depath = toPath === '/' || toPath === '/invite' || toPath === '/rank'
      router.app.isIndex = depath ? 0 : 1
    }
    next()
  })

  router.afterEach(function({to}) {
    console.log(`${to.path}`)
    $.refreshScroller()
  })
}
