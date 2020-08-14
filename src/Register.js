import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { PersonAdd } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { baseUrl, emailRegex } from './helper';
import { message, Space } from 'antd';
import { LinearProgress } from '@material-ui/core';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='#'>
				Cloud Computing Cell
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Register() {
	const classes = useStyles();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loader, setLoader] = useState(false);

	const signup = () => {
		if (!name || !email || !password) {
			message.error('Please enter all fields!');
			setLoader(false);
			return;
		}

		if (!emailRegex.test(email)) {
			message.error('Invalid email!');
			return;
		}
		if (password.length < 6) {
			message.error('Password must be atleast 6 charaters long!');
			return;
		}
		setLoader(true);
		fetch(`${baseUrl}/signup`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				//console.log(response);
				if (response.message) {
					message.success('Registration Successfull');
					setName('');
					setEmail('');
					setPassword('');
				} else {
					message.error(response.error);
				}
				setLoader(false);
			})
			.catch((error) => {
				console.log(error);
				message.error('Server is down!');
				setLoader(false);
			});
	};

	return (
		<div>
			{loader && <LinearProgress style={{ color: 'black' }} />}
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<PersonAdd />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Register
					</Typography>
					<div className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12}>
								<TextField
									autoComplete='name'
									name='Name'
									variant='outlined'
									required
									fullWidth
									id='Name'
									label='Name'
									autoFocus
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									autoComplete='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									autoComplete='current-password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Grid>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
							onClick={() => signup()}
							//disabled={loader}
							disabled={true}
							disableElevation
						>
							Register
						</Button>
					</div>
				</div>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
		</div>
	);
}
