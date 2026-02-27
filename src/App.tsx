import Layout from './presentation/components/Layout'
import { Router, Route } from './presentation/components/shared/Router'
import LandingPage from './presentation/pages/LandingPage'
import ConfiguratorPage from './presentation/pages/ConfiguratorPage'
import AssessmentPage from './presentation/pages/AssessmentPage'

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/" component={LandingPage} />
        <Route path="/configurator" component={ConfiguratorPage} />
        <Route path="/assessment" component={AssessmentPage} />
      </Layout>
    </Router>
  )
}

export default App
