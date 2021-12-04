import React, { useState, Fragment } from 'react'
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback'
import ArchiveIcon from '@mui/icons-material/Archive'
import DialpadIcon from '@mui/icons-material/Dialpad'
import ContactsIcon from '@mui/icons-material/Contacts'
import SettingsIcon from '@mui/icons-material/Settings'
import Button from '@mui/material/Button'
import '../css/bottomTab.css'

const BottomTabs = ({ currentTab, setCurrentTab }) => {
	return (
		<div className='bottomTab'>
			<div className='bottomTab_container'>
				<Icon
					icon='callLog'
					currentTab={currentTab}
					setCurrentTab={setCurrentTab}
				/>
				<Icon
					icon='archive'
					currentTab={currentTab}
					setCurrentTab={setCurrentTab}
				/>
				<Icon
					icon='call'
					currentTab={currentTab}
					setCurrentTab={setCurrentTab}
				/>
				<Icon
					icon='contacts'
					currentTab={currentTab}
					setCurrentTab={setCurrentTab}
				/>
				<Icon
					icon='settings'
					currentTab={currentTab}
					setCurrentTab={setCurrentTab}
				/>
			</div>
		</div>
	)
}

const Icon = (props) => (
	<Button onClick={() => props.setCurrentTab(props.icon)}>
		<Fragment>
			{props.icon == 'callLog' && (
				<PhoneCallbackIcon
					sx={[
						{ fontSize: 30 },
						props.currentTab === 'callLog'
							? { color: '#2AC420' }
							: { color: '#009aed' },
					]}
				/>
			)}
			{props.icon == 'archive' && (
				<ArchiveIcon
					sx={[
						{ fontSize: 30 },
						props.currentTab === 'archive'
							? { color: '#2AC420' }
							: { color: '#009aed' },
					]}
				/>
			)}
			{props.icon == 'call' && (
				<DialpadIcon
					sx={[
						{ fontSize: 30 },
						props.currentTab === 'call'
							? { color: '#2AC420' }
							: { color: '#009aed' },
					]}
				/>
			)}
			{props.icon == 'contacts' && (
				<ContactsIcon
					sx={[
						{ fontSize: 30 },
						props.currentTab === 'contacts'
							? { color: '#2AC420' }
							: { color: '#009aed' },
					]}
				/>
			)}
			{props.icon == 'settings' && (
				<SettingsIcon
					sx={[
						{ fontSize: 30 },
						props.currentTab === 'settings'
							? { color: '#2AC420' }
							: { color: '#009aed' },
					]}
				/>
			)}
		</Fragment>
	</Button>
)

export default BottomTabs
