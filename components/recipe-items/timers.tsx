import { Box, IconButton, List, ListItem, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { cloneDeep } from 'lodash';
import React, { JSX } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { BsPlus } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { VscClose } from 'react-icons/vsc';

import { RecipeTimerRequest } from '@/types/recipe';

import { AdditionalInputAutocomplete, ListContainer, SendButton } from './styled';

export type RecipeTimersProps = {
  items: RecipeTimerRequest[];
  handleSetItems: (value: RecipeTimerRequest[]) => void;
};

export function RecipeTimers(props: RecipeTimersProps): JSX.Element {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { items, handleSetItems } = props;
  const label = 'timer';
  const ariaLableItem = label.charAt(0).toLowerCase() + label.slice(1);

  function HandleItemAdd() {
    const updatedItems = cloneDeep(items);
    const newItem: RecipeTimerRequest = {
      title: '',
      hours: 0,
      minutes: 0
    };

    updatedItems.push(newItem);
    handleSetItems(updatedItems);
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

  function setFieldText(newValue: string, index: number) {
    const updatedItems = items.map((item, itemIndex) => {
      if (index === itemIndex) {
        return {
          ...item,
          title: newValue
        };
      }

      return item;
    });

    handleSetItems(updatedItems);
  }

  return (
    <DragDropContext onDragEnd={(result: DropResult) => HandleDragEnd(result)}>
      <ListContainer>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Timers</Typography>
          <SendButton onClick={() => HandleItemAdd()} aria-label={`add ${ariaLableItem}`} color="primary">
            <BsPlus />
          </SendButton>
        </Stack>
        <Droppable droppableId="item-list">
          {(provided: DroppableProvided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => {
                const timeOptions = Array.from({ length: 60 }, (_, i) => `${i + 1}`);
                const uniqueKey = `${index}`;

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
                          <Stack direction="row" alignItems="center" width="100%" spacing={1}>
                            <IconButton disabled>
                              <RxHamburgerMenu />
                            </IconButton>
                            <Typography>{`${index + 1}.`}</Typography>
                            <TextField
                              label={`Add ${label}`}
                              fullWidth
                              value={item.title}
                              onChange={(event) => setFieldText(event.target.value, index)}
                            />
                            <Stack
                              direction={isMediumScreen ? 'column' : 'row'}
                              spacing={1}
                              alignItems={isMediumScreen ? 'stretch' : 'center'}
                              width="100%"
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
                      </Box>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </ListContainer>
    </DragDropContext>
  );
}
