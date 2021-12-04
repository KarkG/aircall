import React, { useState, useEffect, Fragment } from 'react'
import ReactDOM from 'react-dom'

import Header from './components/Header.jsx'
import ActivityFeed from './components/ActivityFeed.jsx'
import BottomTabs from './components/BottomTabs.jsx'

const App = () => {
	const [currentTab, setCurrentTab] = useState('callLog')

	return (
		<div className='container'>
			<div className='phone'>
				<Header />
				<ActivityFeed
					// calls={calls}
					// setCalls={setCalls}
					currentTab={currentTab}
				/>
				<BottomTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
			</div>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('app'))

export default App
