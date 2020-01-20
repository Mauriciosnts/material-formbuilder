import React from 'react';
import * as Styled from './styled';

import DeleteIcon from "@material-ui/icons/Delete"

const EditIcon = ({ addList }) => (
    <React.Fragment>
        <Styled.Button onClick={addList}>
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                />
            </svg>
            
            <Styled.ButtonText>Add List</Styled.ButtonText>
        </Styled.Button>
    </React.Fragment>
);

export default EditIcon;
