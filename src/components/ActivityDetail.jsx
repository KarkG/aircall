import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import '../css/activityDetail.css'

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
				<h2 className='modal_title'>
					<strong>Call Details</strong>
				</h2>
				<p className='modal_description'>
					{callDetails && `From: ${callDetails.from}`}
				</p>
				<p className='modal_description'>
					{callDetails && `To: ${callDetails.to}`}
				</p>
				<p className='modal_description'>
					{callDetails && `Date: ${callDetails.created_at}`}
				</p>
				<p className='modal_description'>
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
				<p className='modal_description'>
					{callDetails && `Via: ${callDetails.via}`}
				</p>
				<div className='modal_button'>
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
