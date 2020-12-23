import React, { useState, Fragment } from 'react'
import {
	Typography,
	Button,
	Box,
	Grid,
} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment'

import TableLayout from './../components/Tables'
// import Graph from './../components/graph/DashboardGraph'

const useStyles = makeStyles((theme) => ({
	root: {
		background: 'rgba(0, 121, 69, 0.05)',
		borderRadius: '25px'
	},
	typography: {
		fontFamily: 'Century Gothic',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: '18px',
		lineHeight: '28px',
		letterSpacing: '-1%',
		color: '#007945',
	},
	box: {
		fontFamily: 'Century Gothic',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: '24px',
		lineHeight: '28px',
		letterSpacing: '0.1px',
	},
	button: {
		'&:hover,&:focus': {
			backgroundColor: '#ffffff00',
		},
		border: '1px solid #E4EBF6',
		borderRadius: '4px',
	},
	button2: {
		'&:hover,&:focus': {
			backgroundColor: '#ffffff00',
		}
	},
	tContainer: {
		border: '1px solid #E4EBF6',
		borderRadius: '10px',
		background: '#FFFFFF'
	},
	box2: {
		paddingRight: 20,
		width: '100%',
		display: 'flex',

	},
}))



const gridBoxes = [
	{
		color: '#FFFFFF',
		text: 'Read Messages',
		background: '#0B9157',
		total: 100,
	},
	{
		color: '#FFFFFF',
		text: 'Pending Messages',
		background: '#007945',
		total: 200,
	},
]



function Messages() {
	const path = '/messages'
	const classes = useStyles()

	const message = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
	magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco`

	const users = []
	for (let id = 1; id <= 3; id++)
		for (let date of [moment().format('ddd:DD/MM/YYYY')])
			for (let name of ['Olubanjo Oluseyi', 'Thelma Thelma'])
				for (let status of ['pending', 'read'])
					for (let messages of [message])
						users.push({ id, date, name, status, messages })

	return (
		<TableLayout path={path}>
			<Box
				display="flex"
				style={{
					marginTop: '5px',
					marginBottom: '15px'
				}}
			>
				<Grid
					container
					spacing={0}
					direction="row"
					justify="flex-start"
					alignItems="flex-start"
				>
					{
						gridBoxes.map((box, i) => (
							<Grid
								item xs={4} sm={4} md={4} lg={4} xl={4}
								key={i}
							>
								<Box
									display="flex"
									flexDirection="column"
									style={{
										width: '80%',
										height: '148px',
										background: box.background,
										borderRadius: '13px',
										paddingTop: '20px',
										paddingBottom: '20px',
										paddingLeft: '30px',
										paddingRight: '20px',
									}}
								>
									<Typography
										className={classes.box}
										style={{
											color: box.color,
											marginBottom: '20px',
											fontWeight: '400',
											fontFamily: 'Roboto',
											fontSize: '24px',
											lineHeight: '28px',
											letterSpacing: '0.1px'
										}}
									>
										{box.text}
									</Typography>

									<Typography
										className={classes.box}
										style={{
											color: box.color,
											marginBottom: '20px',
											fontWeight: '700',
											fontFamily: 'Mulish',
											fontSize: '40px',
											lineHeight: '18px',
											letterSpacing: '1px'
										}}
									>
										{box.total}
									</Typography>
								</Box>
							</Grid>
						))
					}
				</Grid>
			</Box>

			<Box
				display="flex"
				style={{
					width: '83%',
					paddingTop: '30px',
				}}
			>
				<Typography
					className={classes.typography}
					style={{
						fontFamily: 'Roboto',
						fontSize: '36px',
						lineHeight: '28px',
						letterSpacing: '0.1px',
						fontWeight: '500'
					}}
				>
					Messages
				</Typography>

				<Box
					display="flex"
					justifyContent="flex-end"
					style={{
						width: '100%',
						paddingRight: '20px',
					}}
				>
					<Button
						variant="text"
						className={classes.button2}
						disableRipple
						size="small"
					>
						<Typography
							style={{
								fontSize: '14px',
								lineHeight: '28px',
								color: '#007945',
								fontWeight: '500',
								letterSpacing: '0.1px',
								fontFamily: 'Roboto',
								fontStyle: 'normal'
							}}
						>
							Sort by
            </Typography>
					</Button>
				</Box>
			</Box>

			<Box
				className={classes.box2}
				flexDirection="column"
				style={{
					paddingTop: '10px'
				}}
			>
				{
					users.map((user, i) => (
						<Fragment key={i}>
							<Box display="flex">
								<Typography
									className={classes.typography}
									style={{
										fontSize: '18px',
										lineHeight: '28px',
										letterSpacing: '0.1px',
										fontWeight: '400',
										color: '#000000'
									}}
								>
									<span
										style={{
											fontSize: '18px',
											lineHeight: '28px',
											color: '#006350',
											fontWeight: '500',
											letterSpacing: '0.1px',
											fontFamily: 'Roboto',
											fontStyle: 'normal'
										}}
									>
										{i + 1}
									</span>. {user.date}
								</Typography>
							</Box>

							<Box
								display="flex"
								style={{
									width: '85%',
									paddingLeft: '20px',
									paddingTop: '5px',
								}}
							>
								<Typography
									className={classes.typography}
									style={{
										fontSize: '18px',
										lineHeight: '28px',
										letterSpacing: '0.1px',
										fontWeight: '600',
										color: '#000000'
									}}
								>
									{user.name}
								</Typography>

								<Box
									display="flex"
									justifyContent="flex-end"
									style={{
										width: '80%',
									}}
								>
									<Typography
										style={{
											fontSize: '24px',
											lineHeight: '28px',
											color: '#3B414B',
											fontWeight: '500',
											letterSpacing: '0.1px',
											fontFamily: 'Roboto',
											fontStyle: 'normal'
										}}
									>
										Status
									</Typography>
								</Box>
							</Box>

							<Box
								display="flex"
								style={{
									width: '95%',
									paddingLeft: '20px',
									paddingTop: '10px',
									paddingBottom: '20px',
								}}
							>
								<Box
									display="flex"
									alignItems="center"
									style={{
										width: '70%',
										height: '94px',
										background: '#FFFFFF',
										borderRadius: '4px',
										padding: '22px'
									}}
								>
									<Typography
										style={{
											fontSize: '14px',
											lineHeight: '20px',
											color: '#4D4D4D',
											fontWeight: '400',
											letterSpacing: '0.1px',
											fontFamily: 'Roboto',
											fontStyle: 'normal'
										}}
									>
										{user.messages}
									</Typography>
								</Box>

								<Box
									display="flex"
									alignItems="center"
									justifyContent="center"
									style={{
										width: '15%',
										margin: 'auto',
										height: '34px',
										background: user.status === 'read' ? '#007945' :'#2F80ED',
										borderRadius: '3px',
										// padding: '22px'
									}}
								>
									<Typography
										className={classes.typography}
										style={{
											color: '#FFFFFF',
											fontWeight: '400',
										}}
									>
										{user.status}
									</Typography>
								</Box>
							</Box>
						</Fragment>
					))
				}
			</Box>
		</TableLayout>
	)
}

export default Messages
