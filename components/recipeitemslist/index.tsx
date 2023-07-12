import React, { ChangeEvent, KeyboardEvent, ReactElement, useState } from 'react';
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
import { MeasurementSystems, MeasurementTypes } from '@/constants/measurements';
import { ListTypes } from '@/constants/general';
import { getMeasurementUnits } from '@/utils/measurements';
import { Step } from '@/types/recipes';
import { ListContainer, SendButton, AdditionalInputAutocomplete, AdditionalInputTextField } from './styled';

export default function RecipeItemsList(props: {
  title: string;
  items: Step[];
  label: string;
  type?: string;
  handleSetItems: (value: Step[]) => void;
}): ReactElement {
  const { title, items, label, type, handleSetItems } = props;
  const [fieldText, setFieldText] = useState('');
  const ariaLableItem = label.charAt(0).toLowerCase() + label.slice(1);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  function HandleItemAdd(event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) {
    if (fieldText.trim() !== '') {
      if (
        event.type === 'click' ||
        (event.type === 'keydown' && (event as React.KeyboardEvent<HTMLInputElement>).key === 'Enter')
      ) {
        const updatedItems = cloneDeep(items);
        const itemTitle = fieldText.charAt(0).toUpperCase() + fieldText.slice(1);
        const newItem: Step = {
          title: itemTitle
        };

        if (type === ListTypes.Ingredients) {
          newItem.measurementType = null;
          newItem.measurementUnit = null;
          newItem.amount = null;
        } else if (type === ListTypes.Timers) {
          newItem.hours = null;
          newItem.minutes = null;
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

  function setMeasurementType(newValue: string, index: number) {
    const updatedItems = items.map((item, itemIndex) => {
      if (index === itemIndex) {
        return {
          ...item,
          measurementType: newValue,
          measurementUnit: null,
          amount: null
        };
      }

      return item;
    });

    handleSetItems(updatedItems);
  }

  function setMeasurementUnit(newValue: string, index: number) {
    const updatedItems = items.map((item, itemIndex) => {
      if (index === itemIndex) {
        return {
          ...item,
          measurementUnit: newValue,
          amount: null
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
          amount: parseFloat(newValue)
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

  function additionalInputs(item: Step, index: number): ReactElement | null {
    if (type === ListTypes.Ingredients) {
      const measurementTypeOptions = Object.values(MeasurementTypes).filter(
        (value) => value !== MeasurementTypes.Time && value !== MeasurementTypes.Tempreture
      );
      const measurementUnitOptions = getMeasurementUnits(MeasurementSystems.Metric, item.measurementType || '');

      return (
        <Stack
          direction={isMediumScreen ? 'column' : 'row'}
          spacing={1}
          alignItems={isMediumScreen ? 'stretch' : 'center'}
        >
          <AdditionalInputAutocomplete
            options={measurementTypeOptions}
            value={item.measurementType}
            onChange={(event: ChangeEvent<HTMLInputElement>, newValue: string) => setMeasurementType(newValue, index)}
            renderInput={(params) => <TextField {...params} label="Type" />}
          />
          <AdditionalInputAutocomplete
            options={measurementUnitOptions}
            value={item.measurementUnit}
            onChange={(event: ChangeEvent<HTMLInputElement>, newValue: string) => setMeasurementUnit(newValue, index)}
            renderInput={(params) => <TextField {...params} label="Unit" />}
            disabled={!item.measurementType}
          />
          <AdditionalInputTextField
            label="Amount"
            type="number"
            InputProps={{ inputProps: { min: 0, step: 0.01 } }}
            value={item.amount || ''}
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
            disabled={!item.measurementUnit}
            InputLabelProps={{ shrink: Boolean(item.amount) }}
          />
        </Stack>
      );
    }

    if (type === ListTypes.Timers) {
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
          >
            <BiSend />
          </SendButton>
        </Stack>
      </ListContainer>
    </DragDropContext>
  );
}
