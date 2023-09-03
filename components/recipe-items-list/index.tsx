import React, { ChangeEvent, KeyboardEvent, ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { VscClose } from 'react-icons/vsc';
import { BiSend } from 'react-icons/bi';
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
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided } from 'react-beautiful-dnd';
import { cloneDeep } from 'lodash';
import { ListTypes } from '@/constants/general';
import { RecipeIngredient, RecipeInstruction, RecipeTimer } from '@/types/recipe';
import { EnumState, MeasurementType, MeasurementUnit } from '@/types/enum';
import { ListContainer, SendButton, AdditionalInputAutocomplete, AdditionalInputTextField } from './styled';

export default function RecipeItemsList(props: {
  title: string;
  items: Partial<RecipeIngredient>[] | Partial<RecipeInstruction>[] | Partial<RecipeTimer>[];
  label: string;
  type?: string;
  handleSetItems: (value: Partial<RecipeIngredient>[] | Partial<RecipeInstruction>[] | Partial<RecipeTimer>[]) => void;
}): ReactElement {
  const theme = useTheme();
  const { measurementtypes, measurementunits } = useSelector((state: { enum: EnumState }) => state.enum);
  const { title, items, label, type, handleSetItems } = props;
  const [fieldText, setFieldText] = useState('');

  const ariaLableItem = label.charAt(0).toLowerCase() + label.slice(1);
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  function HandleItemAdd(event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) {
    if (fieldText.trim() !== '') {
      if (
        event.type === 'click' ||
        (event.type === 'keydown' && (event as React.KeyboardEvent<HTMLInputElement>).key === 'Enter')
      ) {
        const updatedItems = cloneDeep(items);
        const itemTitle = fieldText.charAt(0).toUpperCase() + fieldText.slice(1);
        let newItem: Partial<RecipeIngredient> | Partial<RecipeInstruction> | Partial<RecipeTimer> = {};

        if (type === ListTypes.Ingredients) {
          newItem = {
            title: itemTitle,
            measurementtype: null,
            measurementunit: null,
            measurementamount: null
          };
        } else if (type === ListTypes.Timers) {
          newItem = {
            title: itemTitle,
            hours: null,
            minutes: null
          };
        } else {
          newItem = {
            title: itemTitle
          };
        }

        updatedItems.push(newItem);
        handleSetItems(updatedItems);
        setFieldText('');
      }
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

  function setMeasurementType(newValue: MeasurementType, index: number) {
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

  function setMeasurementUnit(newValue: MeasurementUnit, index: number) {
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

  function setTimerHours(newValue: string, index: number) {
    const updatedItems = items.map((item, itemIndex) => {
      if (index === itemIndex) {
        return {
          ...item,
          hours: newValue ? parseInt(newValue, 10) : null
        };
      }

      return item;
    });

    handleSetItems(updatedItems);
  }

  function setTimerMinutes(newValue: string, index: number) {
    const updatedItems = items.map((item, itemIndex) => {
      if (index === itemIndex) {
        return {
          ...item,
          minutes: newValue ? parseInt(newValue, 10) : null
        };
      }

      return item;
    });

    handleSetItems(updatedItems);
  }

  function isRecipeIngredient(
    item: Partial<RecipeIngredient> | Partial<RecipeInstruction> | Partial<RecipeTimer>
  ): item is RecipeIngredient {
    return 'measurementtype' in item && 'measurementunit' in item && 'measurementamount' in item;
  }

  function isRecipeTimer(
    item: Partial<RecipeIngredient> | Partial<RecipeInstruction> | Partial<RecipeTimer>
  ): item is RecipeTimer {
    return 'hours' in item && 'minutes' in item;
  }

  function additionalInputs(
    item: Partial<RecipeIngredient> | Partial<RecipeInstruction> | Partial<RecipeTimer>,
    index: number
  ): ReactElement | null {
    if (type === ListTypes.Ingredients && isRecipeIngredient(item)) {
      return (
        <Stack
          direction={isMediumScreen ? 'column' : 'row'}
          spacing={1}
          alignItems={isMediumScreen ? 'stretch' : 'center'}
        >
          <AdditionalInputAutocomplete
            options={measurementtypes.value.filter(
              (measurementtype) => measurementtype.id !== 2 && measurementtype.id !== 3
            )}
            getOptionLabel={(option) => option.value}
            value={item.measurementtype}
            onChange={(event: ChangeEvent<HTMLInputElement>, newValue: MeasurementType) =>
              setMeasurementType(newValue, index)
            }
            renderInput={(params) => <TextField {...params} label="Type" />}
          />
          <AdditionalInputAutocomplete
            // TODO Replace measurementsystem once hooked up
            options={measurementunits.value.filter(
              (measurementunit) =>
                (measurementunit.measurementsystemid === 1 || measurementunit.measurementsystemid === null) &&
                item.measurementtype &&
                measurementunit.measurementtypeid === item.measurementtype.id
            )}
            getOptionLabel={(option) => option.value}
            value={item.measurementunit}
            onChange={(event: ChangeEvent<HTMLInputElement>, newValue: MeasurementUnit) =>
              setMeasurementUnit(newValue, index)
            }
            renderInput={(params) => <TextField {...params} label="Unit" />}
            disabled={!item.measurementtype}
          />
          <AdditionalInputTextField
            label="Amount"
            type="number"
            InputProps={{ inputProps: { min: 0, step: 0.01 } }}
            value={item.measurementamount || ''}
            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'e' || event.key === 'E' || event.key === '-' || event.key === '+') {
                event.preventDefault();
              }
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
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
      );
    }
    if (type === ListTypes.Timers && isRecipeTimer(item)) {
      const timeOptions = Array.from({ length: 60 }, (_, i) => `${i + 1}`);

      timeOptions.unshift('');

      return (
        <Stack
          direction={isMediumScreen ? 'column' : 'row'}
          spacing={1}
          alignItems={isMediumScreen ? 'stretch' : 'center'}
        >
          <AdditionalInputAutocomplete
            options={timeOptions}
            value={item.hours?.toString() || ''}
            onChange={(event: ChangeEvent<HTMLInputElement>, newValue: string) => setTimerHours(newValue, index)}
            renderInput={(params) => <TextField {...params} label="Hours" />}
          />
          <AdditionalInputAutocomplete
            options={timeOptions}
            value={item.minutes?.toString() || ''}
            onChange={(event: ChangeEvent<HTMLInputElement>, newValue: string) => setTimerMinutes(newValue, index)}
            renderInput={(params) => <TextField {...params} label="Minutes" />}
          />
        </Stack>
      );
    }

    return null;
  }

  return (
    <DragDropContext onDragEnd={HandleDragEnd}>
      <ListContainer>
        <Typography variant="h6">{title}</Typography>
        <Droppable droppableId="item-list">
          {(provided: DroppableProvided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={index} draggableId={`item-${index}`} index={index}>
                  {(innerProvided) => (
                    <Box
                      key={index}
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
                          {additionalInputs(item, index)}
                        </Stack>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            label={`Add ${label}`}
            fullWidth
            value={fieldText}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setFieldText(event.target.value)}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => HandleItemAdd(event)}
          />
          <SendButton
            value={fieldText}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => HandleItemAdd(event)}
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
