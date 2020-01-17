import React, { useState } from 'react';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { Button, List, ListItem, Grid } from '@material-ui/core';

import FormRender from '../formRender/index';

import Options from '../dialogs/modal';

import { openOptionsModal } from '../dialogs/actions';
import { selectModal } from '../dialogs/selectors';

function FormBuilder(props) {
	const [ items, setitems ] = useState([]);
	const [ opcoes, setopcoes ] = useState();
	const { modal } = props;

	function renderTextInput() {
		setitems([ ...items, { type: 'button', value: Math.random(), minRows: 5 } ]);
	}

	function renderTable() {
		setitems([ ...items, { type: 'table', rows: 3, columns: 2 } ]);
	}

	function handleDrag(e) {
		e.dataTransfer.setData('123', { type: 'button', value: '123123' });
	}

	function callModal() {
		props.openOptionsModal();
	}

	function modal_set_options(dados) {
		setitems([ ...items, dados ]);
	}

	return (
		<div>
			<Options setOptions={modal_set_options} />

			<Grid container>
				<Grid item xs={1}>
					<List>
						<ListItem>
							<Button onClick={renderTextInput} onDragStart={(e) => handleDrag(e)} draggable={true}>
								Input
							</Button>
						</ListItem>
						<ListItem>
							<Button onClick={renderTable} draggable="true">
								Tabela
							</Button>
						</ListItem>
						<ListItem onClick={() => callModal()}>
							<Button>paragraph</Button>
						</ListItem>
					</List>
				</Grid>

				<Grid item xs={8}>
					{<FormRender dados={items} />}
				</Grid>
			</Grid>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	modal: selectModal
});

const mapDispatchToProps = {
	openOptionsModal
};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhance(FormBuilder);
