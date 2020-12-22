import React from 'react'
import {
	Box,
	Typography,
	Grid,
} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';

import TableLayout from './../components/Tables'
import Graph from '../components/graph/DashboardGraph'
import TextGraph from '../components/graph/TextGraph.tsx'

const useStyles = makeStyles((theme) => ({
	root: {
		background: 'rgba(0, 121, 69, 0.05)',
		borderRadius: '25px'
	},
	avatar: {
		color: '#FF5C00',
		backgroundColor: '#FAEAE1',
		width: '30px',
		height: '30px',
		textAlign: 'center',
		fontFamily: 'Roboto',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '16px',
		lineHeight: '19px',
	},
	button: {
		'&:hover,&:focus': {
			backgroundColor: '#ffffff00',
		},
	},
	typography: {
		fontFamily: 'Century Gothic',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: '18px',
		lineHeight: '28px',
		letterSpacing: '0.1px',
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
	},
	notify: {
		textDecoration: 'none',
		'&:hover,&:focus,&:active,&:visited': {
			textDecoration: 'none',
		},
	}
}))

const Dashboard = () => {
	const path = '/dashboard'
	const classes = useStyles()

	const gridBoxes = [
		{
			color: '#FFFFFF',
			text: 'Total Users',
			background: '#007945',
			data: '10,000',
			marginBottom: '50px',
		},
		{
			color: '#FFFFFF',
			text: 'Loans Disbursed Percentage',
			background: '#71DB71',
			data: '50%',
			marginBottom: '30px',
		},
		{
			color: '#FFFFFF',
			text: 'Loans Missed',
			background: '#FF0000',
			data: '10,000',
			marginBottom: '50px',
		},
		{
			color: '#FFFFFF',
			text: 'Messages',
			background: '#2F80ED',
			data: 5000,
			marginBottom: '50px',
		},
		{
			color: '#000060',
			text: 'Employees',
			background: 'rgba(255, 211, 0, 0.7)',
			data: 1000,
			marginBottom: '50px',
		},
		{
			color: '#FFFFFF',
			text: 'Module Permission Role',
			background: '#000060',
			data: 100,
			marginBottom: '30px',
		}
	]

	return (
		<TableLayout path={path}>
			<Box style={{
				display: "flex",
				// justifyContent: "space-between",
				// alignItems: "center",
			}}>
				<Typography
					className={classes.typography}
					style={{
						fontWeight: '400',
						fontSize: '54px',
						color: '#007945',
					}}
				>
					Dashboard
				</Typography>
			</Box>

			<Box
				display="flex"
				style={{
					marginTop: '50px',
				}}
			>
				<Grid
					container
					spacing={3}
					direction="row"
					justify="flex-start"
					alignItems="flex-start"
				>
					{
						gridBoxes.map((box, i) => (
							<Grid
								item xs={4} sm={4} md={4} lg={4} xl={4}
								key={i}
							// style={{
							// 	flexBasic: '40%'
							// }}
							>
								<Box
									display="flex"
									flexDirection="column"
									style={{
										width: '85%',
										height: '160px',
										background: box.background,
										borderRadius: '13px',
										paddingTop: '15px',
										paddingBottom: '25px',
										paddingLeft: '20px',
										paddingRight: '20px',
									}}
								>
									<Typography
										className={classes.box}
										style={{
											color: box.color,
											marginBottom: box.marginBottom,
										}}
									>
										{box.text}
									</Typography>

									<Typography
										className={classes.box}
										style={{
											color: box.color,
											fontWeight: 'normal',
											fontSize: '24px',
										}}
									>
										{box.data}
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
					width: '100%',
					marginTop: '30px'
				}}
			>
				{/* <Graph /> */}
				<TextGraph />
			</Box>
		</TableLayout>
	)
}

export default Dashboard
