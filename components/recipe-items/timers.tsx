import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { cloneDeep } from 'lodash';
import React, { JSX, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { BiSend } from 'react-icons/bi';
import { VscClose } from 'react-icons/vsc';

import { RecipeTimerRequest } from '@/types/recipe';

import { AdditionalInputAutocomplete, ListContainer, SendButton } from './styled';

export type RecipeTimersProps = {
  items: RecipeTimerRequest[];
  handleSetItems: (value: RecipeTimerRequest[]) => void;
};

export function RecipeTimers(props: RecipeTimersProps): JSX.Element {
  const theme = useTheme();
  const [fieldText, setFieldText] = useState('');
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { items, handleSetItems } = props;
  const label = 'timer';
  const ariaLableItem = label.charAt(0).toLowerCase() + label.slice(1);

  function HandleItemAdd() {
    if (fieldText.trim() !== '') {
      const updatedItems = cloneDeep(items);
      const itemTitle = fieldText.charAt(0).toUpperCase() + fieldText.slice(1);
      const newItem: RecipeTimerRequest = {
        title: itemTitle,
        hours: 0,
        minutes: 0
      };

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

  function setTimerHours(newValue: string | null, index: number) {
    const updatedItems = items.map((item, itemIndex) => {
      if (index === itemIndex) {
        return {
          ...item,
          hours: newValue ? parseInt(newValue, 10) : 0
        };
      }

      return item;
    });

    handleSetItems(updatedItems);
  }

  function setTimerMinutes(newValue: string | null, index: number) {
    const updatedItems = items.map((item, itemIndex) => {
      if (index === itemIndex) {
        return {
          ...item,
          minutes: newValue ? parseInt(newValue, 10) : 0
        };
      }

      return item;
    });

    handleSetItems(updatedItems);
  }

  return (
    <DragDropContext onDragEnd={(result: DropResult) => HandleDragEnd(result)}>
      <ListContainer>
        <Typography variant="h6">Timers</Typography>
        <Droppable droppableId="item-list">
          {(provided: DroppableProvided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => {
                const timeOptions = Array.from({ length: 60 }, (_, i) => `${i + 1}`);
                const uniqueKey = `${item.title}-${index}`;

                timeOptions.unshift('');

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
                            <Stack
                              direction={isMediumScreen ? 'column' : 'row'}
                              spacing={1}
                              alignItems={isMediumScreen ? 'stretch' : 'center'}
                            >
                              <AdditionalInputAutocomplete
                                options={timeOptions}
                                value={item.hours?.toString() || ''}
                                onChange={(_, newValue) => setTimerHours(newValue, index)}
                                renderInput={(params) => <TextField {...params} label="Hours" />}
                              />
                              <AdditionalInputAutocomplete
                                options={timeOptions}
                                value={item.minutes?.toString() || ''}
                                onChange={(_, newValue) => setTimerMinutes(newValue, index)}
                                renderInput={(params) => <TextField {...params} label="Minutes" />}
                              />
                            </Stack>
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
