import Survey from '../components/Survey'
import '../styles/common.css'
import fetch from 'isomorphic-unfetch'
import { server } from '../config'

const Page = ({ surveyData }) => {
  if (surveyData) {
    return <Survey data={surveyData} />
  }

  return 'error white fetching data'
}

Page.getInitialProps = async () => {
  const res = await fetch(server + '/api/results')
  const surveyData = await res.json()
  return { surveyData }
}

export default Page
