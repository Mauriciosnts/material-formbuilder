import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	MenuItem,
	FormControlLabel,
	Switch
} from '@material-ui/core';

import { selectModal } from '../dialogs/selectors';
import { closeOptionsModal } from '../dialogs/actions';

function Modal(props) {
	const [ state, setstate ] = React.useState();
	const { open, setOptions } = props;

	const handleChange = (event) => {
		setstate({ ...state, [event.target.name]: event.target.value });
	};

	const handleCheckChange = (event) => {
		setstate({ ...state, [event.target.name]: event.target.checked });
	};

	const handleClose = () => {
		props.closeOptionsModal();
	};

	const setComponentOptions = () => {
		props.setOptions({ type: 'paragraph', value: state.value, variant: state.variant });
		handleClose();
	};

	return (
		<Dialog maxWidth="lg" onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
			<DialogTitle id="simple-dialog-title">Typograph properties</DialogTitle>
			<DialogContent style={{ width: 600 }}>
				<TextField fullWidth id="standard-required" onChange={handleChange} name="value" label="Label" />

				<TextField
					id="standard-select-currency"
					select
					label="Variant"
					value={state && state.variant}
					onChange={handleChange}
					name="variant"
					fullWidth
				>
					<MenuItem value="h1">h1</MenuItem>
					<MenuItem value="h2">h2</MenuItem>
					<MenuItem value="h3">h3</MenuItem>
					<MenuItem value="h4">h4</MenuItem>
					<MenuItem value="h5">h5</MenuItem>
					<MenuItem value="h6">h6</MenuItem>
					<MenuItem value="subtitle1">subtitle1</MenuItem>
					<MenuItem value="subtitle2">subtitle2</MenuItem>
					<MenuItem value="body1">body1</MenuItem>
					<MenuItem value="body2">body2</MenuItem>
				</TextField>

				<TextField
					id="select-paragraph-align"
					select
					label="Align"
					value={state && state.align}
					onChange={handleChange}
					name="align"
					fullWidth
				>
					<MenuItem value="inherit">inherit</MenuItem>
					<MenuItem value="left">left</MenuItem>
					<MenuItem value="center">center</MenuItem>
					<MenuItem value="right">right</MenuItem>
					<MenuItem value="justify">justify</MenuItem>
				</TextField>

				<FormControlLabel
					control={
						<Switch checked={state && state.fullWidth} onChange={handleCheckChange} name="fullWidth" />
					}
					label="Full width"
				/>
			</DialogContent>

			<DialogActions>
				<Button onClick={setComponentOptions} disabled={!state} color="primary">
					Adicionar
				</Button>
			</DialogActions>
		</Dialog>
	);
}

const mapStateToProps = createStructuredSelector({
	open: selectModal
});

const mapDispatchToProps = {
	closeOptionsModal
};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhance(Modal);
