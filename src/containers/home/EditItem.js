import React from 'react';
import * as Styled from './styled';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Build';

import { getContent } from "./GetData"  

const RemoveItem = (item) => {
	
};

const EditItem = ({ provided, snapshot, item }) => {
	return (
		<Styled.Item
			ref={provided.innerRef}
			{...provided.draggableProps}
			isDragging={snapshot.isDragging}
			style={provided.draggableProps.style}
		>
			<Styled.Handle {...provided.dragHandleProps}>
				<EditIcon />
				<DeleteIcon onClick={() => RemoveItem(item)} />
			</Styled.Handle>

			{getContent(item)}
		</Styled.Item>
	);
};

export default EditItem;
