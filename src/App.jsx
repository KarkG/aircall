import React, { useState, useEffect, Fragment } from 'react'
import ReactDOM from 'react-dom'

import Header from './Header.jsx'
import ActivityFeed from './ActivityFeed.jsx'
import BottomTabs from './BottomTabs.jsx'

const App = () => {
	const [currentTab, setCurrentTab] = useState('callLog')

	// useEffect(() => {
	// 	console.log('calls', calls)
	// 	console.log('currentTab', currentTab)
	// }, [calls, currentTab])

	// useEffect(() => {
	// 	fetch('https://aircall-job.herokuapp.com/activities').then((res) => {
	// 		res.json().then((data) => {
	// 			setCalls(data)
	// 		})
	// 	})
	// }, [])

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

			{/* <div className='container-view'>Some activities should be here</div> */}
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('app'))

export default App
