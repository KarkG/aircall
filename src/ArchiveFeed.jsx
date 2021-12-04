import React from 'react'

export default function ArchiveFeed() {
	return (
		<div className='calls'>
			<Stack spacing={2} style={{ width: '100%' }}>
				{callPapers}
			</Stack>
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
					<p id='child-modal-description' style={style}>
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
		</div>
	)
}
