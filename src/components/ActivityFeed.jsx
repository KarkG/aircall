import React, { useState, useEffect, Fragment } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import CallIcon from '@mui/icons-material/Call'
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback'
import CallMadeIcon from '@mui/icons-material/CallMade'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VoicemailIcon from '@mui/icons-material/Voicemail'
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox'
import UnarchiveIcon from '@mui/icons-material/Unarchive'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import '../css/activityFeed.css'
import ActivityDetail from './ActivityDetail.jsx'

const ActivityFeed = ({ currentTab }) => {
	const [calls, setCalls] = useState([])
	const [callPapers, setCallPapers] = useState([])
	const [displayedCalls, setDisplayedCalls] = useState([])
	const [dividerDates, setDividerDates] = useState([])
	const [displayedDividers, setDisplayedDividers] = useState([])
	const [callDetails, setCallDetails] = useState(null)
	const [openModal, setOpenModal] = useState(false)

	useEffect(() => {
		fetchCalls()
	}, [])

	useEffect(() => {
		let oldArray = []
		setDisplayedCalls(oldArray)
		setCallPapers([])
		calls.forEach((call) => {
			const newCreatedAt = new Date(call.created_at)
			const newDate = formatData(call.created_at)
			const newTime = newCreatedAt
				.toLocaleTimeString('en-US')
				.replace(/(.*)\D\d+/, '$1')
			call.newDate = newDate
			call.newTime = newTime
			if (currentTab === 'callLog' && !call.is_archived) {
				oldArray = Object.assign([], oldArray)
				oldArray.push(call)
				setDisplayedCalls(oldArray)
			}
			if (currentTab === 'archive' && call.is_archived) {
				oldArray = Object.assign([], oldArray)
				oldArray.push(call)
				setDisplayedCalls(oldArray)
			}
		})
	}, [calls, currentTab])

	useEffect(() => {
		renderCallPaper()
	}, [displayedDividers])

	useEffect(() => {
		const dividers = dividerDates.map((divider) => {
			if (divider.displayed) return <Divider>{divider.date}</Divider>
			else return null
		})
		setDisplayedDividers(dividers)
	}, [dividerDates])

	useEffect(() => {
		let oldArray = []
		displayedCalls.forEach((call) => {
			oldArray = Object.assign([], oldArray)
			if (oldArray.find((obj) => obj.date == call.newDate) === undefined) {
				oldArray.push({ date: call.newDate, displayed: true })
			} else {
				oldArray.push({ date: call.newDate, displayed: false })
			}
			setDividerDates(oldArray)
		})
	}, [displayedCalls])

	const fetchCalls = () => {
		fetch('https://aircall-job.herokuapp.com/activities').then((res) => {
			res.json().then((data) => {
				setCalls(data)
			})
		})
	}

	const formatData = (date) => {
		const newCreatedAt = new Date(date)
		return newCreatedAt.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	}

	const handleOpen = (call) => {
		fetch(`https://aircall-job.herokuapp.com/activities/${call.id}`).then(
			(res) => {
				res.json().then((data) => {
					setCallDetails({
						via: data.via,
						durationSec: data.duration - Math.floor(data.duration / 60) * 60,
						durationMin: Math.floor(data.duration / 60),
						durationHr: Math.floor(data.duration / 3600),
						to: data.to,
						from: data.from,
						created_at: formatData(data.created_at),
					})
				})
			}
		)
		setCallDetails({
			via: call.via,
			durationSec: call.duration - Math.floor(call.duration / 60) * 60,
			durationMin: Math.floor(call.duration / 60),
			durationHr: Math.floor(call.duration / 3600),
			to: call.to,
			from: call.from,
			created_at: call.newDate,
		})
		setOpenModal(true)
	}

	const archiveCall = (call) => {
		let callsArray = Object.assign([], calls)
		let callIndex = callsArray.findIndex((callObj) => callObj.id == call.id)
		callsArray[callIndex].is_archived = !callsArray[callIndex].is_archived
		fetch(`https://aircall-job.herokuapp.com/activities/${call.id}`, {
			crossDomain: true,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				is_archived: callsArray[callIndex].is_archived,
			}),
		})
			.then(() => {
				fetchCalls()
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const renderCallPaper = () => {
		const callPapersArray = displayedCalls.map((call, index) => (
			<Fragment key={index}>
				{displayedDividers[index]}
				<Paper
					className='paper_container'
					sx={
						call.call_type == 'missed'
							? {
									color: '#ff0000',
							  }
							: null
					}
				>
					<div className='paper_div'>
						<div className='icon_container'>
							{call.direction == 'inbound' ? (
								<div className='icon_div'>
									<PhoneCallbackIcon
										style={
											call.call_type == 'voicemail'
												? {
														fontSize: 18,
														top: 0,
												  }
												: null
										}
									/>
									{call.call_type == 'voicemail' && (
										<VoicemailIcon
											style={{
												fontSize: 12,
												position: 'absolute',
												left: 0,
												bottom: 0,
												color: '#63c8ff',
											}}
										/>
									)}
								</div>
							) : (
								<div>
									<CallMadeIcon
										sx={{ fontSize: 12 }}
										style={{ position: 'absolute', right: 3, top: 2 }}
									/>
									<CallIcon />
								</div>
							)}
						</div>
						<div>
							<div className='call_from_div'>{call.from}</div>
							<div className='call_to_div'>
								{call.call_type == 'missed'
									? `tried to call on ${call.to}`
									: call.to}
								{` at ${call.newTime}`}
							</div>
						</div>
						<div className='right_bottom_icons_div'>
							<Button
								style={{
									minWidth: 0,
									padding: 10,
								}}
								onClick={() => {
									archiveCall(call)
								}}
							>
								{call.is_archived ? (
									<UnarchiveIcon sx={{ color: '#009aed' }} />
								) : (
									<MoveToInboxIcon sx={{ color: '#009aed' }} />
								)}
							</Button>

							<Button
								style={{
									minWidth: 0,
									padding: 0,
								}}
								onClick={() => handleOpen(call)}
							>
								<MoreVertIcon sx={{ color: '#000000' }} />
							</Button>
						</div>
					</div>
				</Paper>
			</Fragment>
		))
		setCallPapers(callPapersArray)
	}

	return (
		<div className='calls'>
			<Stack spacing={2} style={{ width: '100%' }}>
				{callPapers}
			</Stack>
			<ActivityDetail
				openModal={openModal}
				setOpenModal={setOpenModal}
				callDetails={callDetails}
			/>
		</div>
	)
}

export default ActivityFeed
