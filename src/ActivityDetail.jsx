import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default function ActivityDetail({
	openModal,
	setOpenModal,
	callDetails,
}) {
	return (
		<Modal
			hideBackdrop
			open={openModal}
			onClose={() => setOpenModal(false)}
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
					<Button
						style={{ alignSelf: 'center' }}
						onClick={() => setOpenModal(false)}
					>
						Close
					</Button>
				</div>
			</Box>
		</Modal>
	)
}
