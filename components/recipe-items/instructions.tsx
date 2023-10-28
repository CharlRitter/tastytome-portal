import { Box, Divider, IconButton, List, ListItem, ListItemText, Stack, TextField, Typography } from '@mui/material';
import { cloneDeep } from 'lodash';
import React, { JSX, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { BiSend } from 'react-icons/bi';
import { VscClose } from 'react-icons/vsc';

import { RecipeInstructionRequest } from '@/types/recipe';

import { ListContainer, SendButton } from './styled';

export type RecipeInstructionsProps = {
  items: RecipeInstructionRequest[];
  handleSetItems: (value: RecipeInstructionRequest[]) => void;
};

export function RecipeInstructions(props: RecipeInstructionsProps): JSX.Element {
  const [fieldText, setFieldText] = useState('');

  const { items, handleSetItems } = props;
  const label = 'instruction';
  const ariaLableItem = label.charAt(0).toLowerCase() + label.slice(1);

  function HandleItemAdd() {
    if (fieldText.trim() !== '') {
      const updatedItems = cloneDeep(items);
      const itemTitle = fieldText.charAt(0).toUpperCase() + fieldText.slice(1);
      const newItem: RecipeInstructionRequest = { title: itemTitle };

      updatedItems.push(newItem);
      handleSetItems(updatedItems);
      setFieldText('');
    }
  }

  function HandleDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    const updatedItems = cloneDeep(items);
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);

    updatedItems.splice(result.destination.index, 0, reorderedItem);

    handleSetItems(updatedItems);
  }

  return (
    <DragDropContext onDragEnd={(result: DropResult) => HandleDragEnd(result)}>
      <ListContainer>
        <Typography variant="h6">Instructions *</Typography>
        <Droppable droppableId="item-list">
          {(provided: DroppableProvided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => {
                const uniqueKey = `${item.title}-${index}`;

                return (
                  <Draggable key={uniqueKey} draggableId={`item-${index}`} index={index}>
                    {(innerProvided) => (
                      <Box
                        key={uniqueKey}
                        ref={innerProvided.innerRef}
                        {...innerProvided.draggableProps}
                        {...innerProvided.dragHandleProps}
                      >
                        <ListItem
                          secondaryAction={
                            <IconButton
                              onClick={() => handleSetItems(items.filter((_, i) => i !== index))}
                              edge="end"
                              aria-label={`remove ${ariaLableItem}`}
                              color="primary"
                            >
                              <VscClose />
                            </IconButton>
                          }
                        >
                          <Stack direction="row" alignItems="center" width="100%">
                            <ListItemText primary={`${index + 1}. ${item.title}`} />
                          </Stack>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </Box>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            label={`Add ${label}`}
            fullWidth
            value={fieldText}
            onChange={(event) => setFieldText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                HandleItemAdd();
              }
            }}
          />
          <SendButton
            value={fieldText}
            onClick={() => HandleItemAdd()}
            aria-label={`add ${ariaLableItem}`}
            color="primary"
          >
            <BiSend />
          </SendButton>
        </Stack>
      </ListContainer>
    </DragDropContext>
  );
}
