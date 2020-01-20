import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { openOptionsModal } from './controllers/actions';
import { selectModal } from './controllers/selectors';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import * as Styled from './styled';
import OptionsModal from '../../components/dialog/';
// Component
import EditItem from './EditItem';
import ComponentItem from './ComponentItem';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [ removed ] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const item = sourceClone[droppableSource.index];

	destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
	callModal();
	return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [ removed ] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	return result;
};

const callModal = () => {
	console.log('Call modal function');
	this.props.openOptionsModal();
};

const ITEMS = [
	{
		id: uuid(),
		content: 'Headline'
	},
	{
		id: uuid(),
		content: 'Copy'
	},
	{
		id: uuid(),
		content: 'Button',
		type: 'button'
	},
	{
		id: uuid(),
		content: 'Input',
		type: 'input'
	},
	{
		id: uuid(),
		content: 'Image',
		type: 'img'
	},
	{
		id: uuid(),
		content: 'Slideshow'
	},
	{
		id: uuid(),
		content: 'Quote'
	}
];

class FormBuilder extends Component {
	state = {
		listOfValues: []
	};

	constructor(props) {
		super(props);		
	}

	componentDidMount() {}

	componentDidUpdate() {
		//   console.log(this.state);
	}

	onDragEnd = (result) => {
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}

		switch (source.droppableId) {
			case destination.droppableId:
				this.setState({
					[destination.droppableId]: reorder(this.state[source.droppableId], source.index, destination.index)
				});
				break;
			case 'ITEMS':
				this.setState({
					[destination.droppableId]: copy(ITEMS, this.state[destination.droppableId], source, destination)
				});
				break;
			default:
				this.setState(
					move(this.state[source.droppableId], this.state[destination.droppableId], source, destination)
				);
				break;
		}
	};

	// Normally you would want to split things out into separate components.
	// But in this example everything is just done in one place for simplicity
	render() {
		// console.log(this.state)

		console.log(this.props.open);

		return (
			<React.Fragment>
				<OptionsModal />
				<DragDropContext onDragEnd={this.onDragEnd}>
					<Droppable droppableId="ITEMS" isDropDisabled={true}>
						{(provided, snapshot) => (
							<Styled.Kiosk ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
								{ITEMS.map((item, index) => (
									<Draggable key={item.id} draggableId={item.id} index={index}>
										{(provided, snapshot) => (
											<ComponentItem provided={provided} snapshot={snapshot} item={item} />
										)}
									</Draggable>
								))}
							</Styled.Kiosk>
						)}
					</Droppable>

					<Styled.Content>
						{Object.keys(this.state).map((list, i) => (
							<Droppable key={list} droppableId={list}>
								{(provided, snapshot) => (
									<Styled.Container ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
										{this.state[list].length ? (
											this.state[list].map((item, index) => (
												<Draggable key={item.id} draggableId={item.id} index={index}>
													{(provided, snapshot) => (
														<EditItem provided={provided} snapshot={snapshot} item={item} />
													)}
												</Draggable>
											))
										) : (
											<Styled.Notice>Drop items here</Styled.Notice>
										)}
										{provided.placeholder}
									</Styled.Container>
								)}
							</Droppable>
						))}
					</Styled.Content>
				</DragDropContext>
			</React.Fragment>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	open: selectModal
});

const mapDispatchToProps = {
	openOptionsModal
};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));
export default enhance(FormBuilder);
