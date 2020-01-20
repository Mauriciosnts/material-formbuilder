import React from 'react';
import * as Styled from './styled';

const ComponentItem = ({ provided, snapshot, item }) => {
    return (
        <React.Fragment>
            <Styled.Item
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                isDragging={snapshot.isDragging}
                style={provided.draggableProps.style}>
                {item.content}
            </Styled.Item>
            {snapshot.isDragging && <Styled.Clone>{item.content}</Styled.Clone>}
        </React.Fragment>
    );
};

export default ComponentItem;
