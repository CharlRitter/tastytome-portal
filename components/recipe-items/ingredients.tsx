import { Box, IconButton, List, ListItem, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { cloneDeep } from 'lodash';
import React, { JSX } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { BsPlus } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { VscClose } from 'react-icons/vsc';

import { useAppSelector } from '@/reducers/hooks';
import { RootState } from '@/reducers/store';
import { SliceItem } from '@/types/common';
import { MeasurementType, MeasurementUnit } from '@/types/enum';
import { RecipeIngredientRequest } from '@/types/recipe';

import { AdditionalInputAutocomplete, AdditionalInputTextField, ListContainer, SendButton } from './styled';

export type RecipeIngredientsProps = {
  items: RecipeIngredientRequest[];
  handleSetItems: (value: RecipeIngredientRequest[]) => void;
};

export function RecipeIngredients(props: RecipeIngredientsProps): JSX.Element {
  const theme = useTheme();
  const { data: measurementtypes } = useAppSelector(
    (state: RootState): SliceItem<MeasurementType[]> => state.enumSlice.measurementtypes
  );
  const { data: measurementunits } = useAppSelector(
    (state: RootState): SliceItem<MeasurementUnit[]> => state.enumSlice.measurementunits
  );
  const isMD = useMediaQuery(theme.breakpoints.down('md'));

  const { items, handleSetItems } = props;
  const label = 'ingredient';
  const ariaLableItem = label.charAt(0).toLowerCase() + label.slice(1);

  function HandleItemAdd() {
    const updatedItems = cloneDeep(items);
    const newItem: RecipeIngredientRequest = {
      title: '',
      measurementtype: null,
      measurementunit: null,
      measurementamount: null
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

  function setMeasurementType(newValue: MeasurementType | null, index: number) {
    const updatedItems = items.map((item, itemIndex) => {
      if (index === itemIndex) {
        return {
          ...item,
          measurementtype: newValue,
          measurementunit: null,
          measurementamount: null
        };
      }

      return item;
    });

    handleSetItems(updatedItems);
  }

  function setMeasurementUnit(newValue: MeasurementUnit | null, index: number) {
    const updatedItems = items.map((item, itemIndex) => {
      if (index === itemIndex) {
        return {
          ...item,
          measurementunit: newValue,
          measurementamount: null
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

  function setAmount(newValue: string, index: number) {
    const updatedItems = items.map((item, itemIndex) => {
      if (index === itemIndex) {
        return {
          ...item,
          measurementamount: parseFloat(newValue)
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
          <Typography variant="h6">Ingredients *</Typography>
          <SendButton onClick={() => HandleItemAdd()} aria-label={`add ${ariaLableItem}`} color="primary">
            <BsPlus />
          </SendButton>
        </Stack>
        <Droppable droppableId="item-list">
          {(provided: DroppableProvided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => {
                const uniqueKey = `${index}`;

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
                              direction={isMD ? 'column' : 'row'}
                              spacing={1}
                              alignItems={isMD ? 'stretch' : 'center'}
                              width="100%"
                            >
                              <AdditionalInputAutocomplete
                                options={measurementtypes.filter(
                                  (measurementtype) => measurementtype.id !== 2 && measurementtype.id !== 3
                                )}
                                getOptionLabel={(option) => option.value}
                                value={item.measurementtype}
                                onChange={(_, newValue) => setMeasurementType(newValue, index)}
                                renderInput={(params) => <TextField {...params} label="Type" />}
                              />
                              <AdditionalInputAutocomplete
                                options={measurementunits.filter(
                                  (measurementunit) =>
                                    item.measurementtype &&
                                    measurementunit.measurementtypeid === item.measurementtype.id
                                )}
                                getOptionLabel={(option) => option.value}
                                value={item.measurementunit}
                                onChange={(_, newValue) => setMeasurementUnit(newValue, index)}
                                renderInput={(params) => <TextField {...params} label="Unit" />}
                                disabled={!item.measurementtype}
                              />
                              <AdditionalInputTextField
                                label="Amount"
                                type="number"
                                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                                value={item.measurementamount || ''}
                                onKeyDown={(event) => {
                                  if (
                                    event.key === 'e' ||
                                    event.key === 'E' ||
                                    event.key === '-' ||
                                    event.key === '+'
                                  ) {
                                    event.preventDefault();
                                  }
                                }}
                                onChange={(event) => {
                                  const pattern2Decimal = /^\d*\.?\d{0,2}$/;
                                  const inputValue = event.target.value;

                                  if (pattern2Decimal.test(inputValue) || inputValue === '') {
                                    setAmount(inputValue, index);
                                  }
                                }}
                                disabled={!item.measurementunit}
                                InputLabelProps={{ shrink: Boolean(item.measurementamount) }}
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
