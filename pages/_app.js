import '../styles/globals.css'
import '../styles/images/icons/favicon.ico'
import '../styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../styles/fonts/iconic/css/material-design-iconic-font.min.css'
import '../styles/vendor/animate/animate.css'
import '../styles/vendor/css-hamburgers/hamburgers.min.css'
import '../styles/vendor/animsition/css/animsition.min.css'
import '../styles/vendor/select2/select2.min.css'
import '../styles/vendor/daterangepicker/daterangepicker.css'
import '../styles/css/util.css'
import '../styles/css/main.css'
import '../styles/theme.css'
import "../styles/bootstrap/css/bootstrap.min.css"
import '../styles/userNavbar.css'
import '../styles/userFooter.css'
import "../styles/fonts/fontawesome-all.min.css"
import "../styles/fonts/font-awesome.min.css"
import "../styles/pagination.css"
import "../styles/userTestimonial.css"
import "../styles/user.css"
import { useRouter } from 'next/router'
import LayoutUser from '../layout/user/LayoutUser'
import LayoutMitra from '../layout/admin/LayoutAdmin'
import LayoutDev from '../layout/dev/LayoutDev'
import LayoutRegister from '../layout/register/LayoutRegister'
import { SessionProvider } from "next-auth/react"
import moment from 'moment'


function MyApp({ Component, pageProps }) {
  var a = moment("10:00:00", "HH:mm:ss");
  var b = moment("15:30:00", "HH:mm:ss");
  console.log('difference:')
  console.log(b.diff(a, 'minutes'))
  console.log('adding:')
  console.log(a.add(1, 'hours').format("HH:mm:ss"))
  const router = useRouter()
  if (router.pathname.startsWith('/mitra/')) {
    return (
      <SessionProvider session={pageProps.session}>
      <LayoutMitra>
        <Component {...pageProps} />
      </LayoutMitra>
      </SessionProvider >
    )
  }
  if (router.pathname.startsWith('/register/')) {
    return (
      <SessionProvider session={pageProps.session}>
        <LayoutRegister>
          <Component {...pageProps} />
        </LayoutRegister>
      </SessionProvider >
    )
  }
  else if (router.pathname.startsWith('/dev/')) {
    return (
      <LayoutDev>
        <Component {...pageProps} />
      </LayoutDev>
    )

  }
  else if (router.pathname.startsWith('/')) {
    return (
      <SessionProvider session={pageProps.session}>
      <LayoutUser>
        <Component {...pageProps} />
        </LayoutUser>
      </SessionProvider>
    )
  }
  else {
    return <RecoilRoot> <Component {...pageProps} /> </RecoilRoot>

  }
}

export default MyApp
