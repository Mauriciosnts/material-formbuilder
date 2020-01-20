import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import * as Styled from './styled';
import EditItem from './EditItem';

const EditDroppable = ({ list, provided, snapshot }) => (
    <Styled.Container
        ref={this.props.provided.innerRef}
        isDraggingOver={this.props.snapshot.isDraggingOver}>
        {[list].length
            ? [list].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided2, snapshot2) => (
                          <EditItem
                              provided2={provided2}
                              snapshot2={snapshot2}
                              item={item}
                          />
                      )}
                  </Draggable>
              ))
            : !this.props.provided.placeholder && (
                  <Styled.Notice>Drop items here</Styled.Notice>
              )}
        {this.props.provided.placeholder}
    </Styled.Container>
);

export default EditDroppable;
