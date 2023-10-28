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
  const [fieldText, setFieldText] = useState('');
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { items, handleSetItems } = props;
  const label = 'ingredient';
  const ariaLableItem = label.charAt(0).toLowerCase() + label.slice(1);

  function HandleItemAdd() {
    if (fieldText.trim() !== '') {
      const updatedItems = cloneDeep(items);
      const itemTitle = fieldText.charAt(0).toUpperCase() + fieldText.slice(1);
      const newItem: RecipeIngredientRequest = {
        title: itemTitle,
        measurementtype: null,
        measurementunit: null,
        measurementamount: null
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
        <Typography variant="h6">Ingredients *</Typography>
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
                            <Stack
                              direction={isMediumScreen ? 'column' : 'row'}
                              spacing={1}
                              alignItems={isMediumScreen ? 'stretch' : 'center'}
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
                                // TODO Replace measurementsystem once hooked up
                                options={measurementunits.filter(
                                  (measurementunit) =>
                                    (measurementunit.measurementsystemid === 1 ||
                                      measurementunit.measurementsystemid === null) &&
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
