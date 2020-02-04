import Survey from '../components/Survey'
import '../styles/common.css'
import fetch from 'isomorphic-unfetch'
import { server } from '../config'
import { useRouter } from 'next/router'

const Page = ({ topics, isActive }) => {
  const router = useRouter()
  const pass = router.query.p

  if (topics && pass) {
    return <Survey data={topics} isActive={isActive} pass={pass} />
  }

  return 'error white fetching data'
}

Page.getInitialProps = async () => {
  const res = await fetch(server + '/api/results')

  const surveyData = await res.json()

  return { ...surveyData }
}

export default Page
