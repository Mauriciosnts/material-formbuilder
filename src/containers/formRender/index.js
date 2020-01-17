import React from 'react';

import { Button, Input, FormControl, TextField, Grid, Typography } from '@material-ui/core';

function FormBuilder(props) {
	const { dados } = props;

	function getDados() {
		return dados.map((el, index) => {
			if (el.type === 'button') {
				return (
					<Grid item xs={8}>
						<TextField fullWidth required id="standard-required" label="Required" defaultValue={el.value} />
					</Grid>
				);
			}

			if (el.type === 'paragraph') {
				return (
					<Grid item xs={12}>
						<Typography
							align={el.align ? el.align : undefined}
							variant={el.variant ? el.variant : undefined}
						>
							{el.value}
						</Typography>
					</Grid>
				);
			}

			if (el.type === 'table') {
				return (
					<Grid container justify="center" alignItems="center">
						{renderRows(el.columns, el.rows).map((item) => item)}
					</Grid>
				);
			}
		});
	}

	const get_dados = (e) => {
		const r = e.dataTransfer.getData('123');
	};

	function renderColumn(column, rowsnumber) {
		let a = [];
		for (let linhas = 0; linhas < column; linhas++) {
			a.push(
				<Grid
					item
					xs={12 / column}
					style={{ backgroundColor: '#c3c3', height: 100, padding: '0 5%', textAlign: 'center' }}
					onDrop={(e) => get_dados(e)}
					onDragOver={(e) => {
						e.preventDefault();
					}}
				>
					gen item
				</Grid>
			);
		}

		return a;
	}
	function renderRows(columns, rows) {
		let a = [];
		for (let linhas = 0; linhas < rows; linhas++) {
			a.push(<Grid container> {renderColumn(columns, linhas)}</Grid>);
		}

		return a;
	}

	return (
		<Grid container direction="row" justify="center" alignItems="center">
			{getDados()}
		</Grid>
	);
}

export default FormBuilder;
