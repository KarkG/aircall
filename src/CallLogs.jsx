import React, { useState, useEffect, Fragment } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import CallIcon from '@mui/icons-material/Call'
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback'
import CallMadeIcon from '@mui/icons-material/CallMade'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VoicemailIcon from '@mui/icons-material/Voicemail'
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox'
import UnarchiveIcon from '@mui/icons-material/Unarchive'
export default function CallLogs({
	call,
	index,
	newDate,
	newTime,
	callDetails,
	setCallDetails,
}) {
	const [openModal, setOpenModal] = useState(false)

	const handleOpen = (call, newDate) => {
		setCallDetails({
			via: call.via,
			durationSec: call.duration - Math.floor(call.duration / 60) * 60,
			durationMin: Math.floor(call.duration / 60),
			durationHr: Math.floor(call.duration / 3600),
			to: call.to,
			from: call.from,
			created_at: newDate,
		})
		setOpenModal(true)
	}

	const handleClose = () => {
		setOpenModal(false)
	}

	const archiveCall = (call) => {
		let callsArray = Object.assign([], calls)
		let callIndex = callsArray.findIndex((callObj) => callObj.id == call.id)
		callsArray[callIndex].is_archived = true
		setCalls(callsArray)
	}
	return (
		<div>
			<Fragment key={index}>
				{/* {callDateDisplayed[index] != null && !call.is_archived ? (
						<Divider>{callDateDisplayed[index]}</Divider>
					) : null} */}
				{/* {renderCallDivider(call, index)} */}
				{/* {callDates[index].display && <Divider>{callDates[index].date}</Divider>} */}
				{!call.is_archived && (
					<Paper
						style={{
							padding: 10,
							textAlign: 'center',
						}}
						sx={
							call.call_type == 'missed'
								? {
										color: '#ff0000',
								  }
								: null
						}
					>
						<div
							style={{
								display: 'inline-flex',
								width: '100%',
								justifyContent: 'space-between',
							}}
						>
							<div
								style={{
									position: 'relative',
									display: 'inline-block',
									alignSelf: 'center',
								}}
							>
								{call.direction == 'inbound' ? (
									<div
										style={{
											height: 24,
											width: 24,
										}}
									>
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
								<div
									style={{
										fontSize: 20,
										marginBottom: 5,
									}}
								>
									{call.from}
								</div>
								<div
									style={{
										fontSize: 10,
									}}
								>
									{call.call_type == 'missed'
										? `tried to call on ${call.to}`
										: call.to}
									{` at ${newTime}`}
								</div>
							</div>
							<div
								style={{
									color: '#000000',
									alignItems: 'center',
									display: 'inline-flex',
								}}
							>
								<Button
									style={{
										minWidth: 0,
										padding: 10,
									}}
									onClick={() => {
										archiveCall(call)

										setArchive(true)
										let dateArray = callDates

										dateArray[index].display = false
										if (dateArray[index + 1] == newDate)
											dateArray[index + 1].display = true
										setCallDates(dateArray)
									}}
								>
									{call.is_archived ? (
										<MoveToInboxIcon sx={{ color: '#009aed' }} />
									) : (
										<UnarchiveIcon sx={{ color: '#009aed' }} />
									)}
								</Button>

								<Button
									style={{
										minWidth: 0,
										padding: 0,
									}}
									onClick={() => handleOpen(call, newDate)}
								>
									<MoreVertIcon sx={{ color: '#000000' }} />
								</Button>
							</div>
						</div>
					</Paper>
				)}
				<Modal
					hideBackdrop
					open={openModal}
					onClose={handleClose}
					aria-labelledby='child-modal-title'
					aria-describedby='child-modal-description'
				>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							bgcolor: 'background.paper',
							border: '2px solid #000',
							boxShadow: 24,
							pt: 2,
							px: 2,
							pb: 1,
							width: 200,
						}}
					>
						<h2
							id='child-modal-title'
							style={{
								fontSize: 20,
							}}
						>
							<strong>Call Details</strong>
						</h2>
						<p id='child-modal-description'>
							{callDetails && `From: ${callDetails.from}`}
						</p>
						<p id='child-modal-description'>
							{callDetails && `To: ${callDetails.to}`}
						</p>
						<p id='child-modal-description'>
							{callDetails && `Date: ${callDetails.created_at}`}
						</p>
						<p id='child-modal-description'>
							{callDetails &&
								`Duration of call: ${
									callDetails.durationHr > 0
										? `${callDetails.durationHr} hours `
										: ''
								}${
									callDetails.durationMin > 0
										? `${callDetails.durationMin} min `
										: ''
								}${
									callDetails.durationSec > 0
										? `${callDetails.durationSec} sec `
										: ''
								}`}
						</p>
						<p id='child-modal-description'>
							{callDetails && `Via: ${callDetails.via}`}
						</p>
						<div style={{ textAlign: 'center' }}>
							<Button style={{ alignSelf: 'center' }} onClick={handleClose}>
								Close
							</Button>
						</div>
					</Box>
				</Modal>
			</Fragment>
		</div>
	)
}
