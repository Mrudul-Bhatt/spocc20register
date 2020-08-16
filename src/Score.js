import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
	Container,
	Grid,
	Paper,
	Divider,
	List,
	ListItem,
	ListItemText,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	LinearProgress,
} from '@material-ui/core';
import { baseUrl } from './helper';
import { Delete, Edit } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { message } from 'antd';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
	paper: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
		// maxWidth: 500,
		// maxHeight: 500,
		// maxHeight: '100%',
		// height: '100%',
		maxHeight: 590,
		overflow: 'auto',
	},
}));

export const Scores = () => {
	const classes = useStyles();
	const [loader, setLoader] = useState(false);
	const [data, setData] = useState([]);
	const history = useHistory();

	useEffect(() => {
		setLoader(true);
		fetch(`${baseUrl}/scores`)
			.then((res) => res.json())
			.then((response) => {
				console.log(response);

				setData(response.scores);
				setLoader(false);
			})
			.catch((error) => {
				console.log(error);
				message.error('Server is down!');
				setLoader(false);
			});
	}, []);

	return (
		<Container component='main' maxWidth='lg'>
			{loader && <LinearProgress />}
			<Grid container spacing={2} style={{ marginTop: 20, marginBottom: 20 }}>
				{data &&
					data.map((item, index) => {
						return (
							<Grid item lg={12} sm={12} xs={12} key={item._id}>
								<Paper variant='outlined' style={{ width: '100%' }}>
									<h3>{index + 1}</h3>
									<h3>Email :{item.email}</h3>
									<h3>Name :{item.name}</h3>
									<h3>Score :{item.score}</h3>
									{/* <h3>{item.start}</h3>
									<h3>{item.end}</h3> */}
								</Paper>
								<Divider />
							</Grid>
						);
					})}
			</Grid>
		</Container>
	);
};
