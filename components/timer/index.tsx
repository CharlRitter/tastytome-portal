import { IconButton, Stack, Typography } from '@mui/material';
import React, { JSX } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { FaArrowsRotate } from 'react-icons/fa6';
import { useTimer } from 'react-timer-hook';

import { RecipeTimerResponse } from '@/types/recipe';

export type TimerProps = {
  timer: RecipeTimerResponse;
};

export function Timer(props: TimerProps): JSX.Element {
  const { timer } = props;
  const expiryTimestamp = new Date();

  if (timer.minutes && timer.minutes > 0) {
    expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + timer.minutes);
  }

  if (timer.hours && timer.hours > 0) {
    expiryTimestamp.setHours(expiryTimestamp.getHours() + timer.hours);
  }

  const { totalSeconds, seconds, minutes, hours, isRunning, start, pause, resume, restart } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => console.log('onExpire called') // TODO change to real notification
  });
  const totalTime = timer.hours * 3600 + timer.minutes * 60;
  const hasStarted = totalSeconds < totalTime;

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography>{timer.title}</Typography>
      <IconButton
        color="primary"
        aria-label="timer controller"
        onClick={() => {
          if (isRunning) {
            pause();
          } else if (hasStarted) {
            resume();
          } else {
            start();
          }
        }}
      >
        {isRunning ? <FaPause /> : <FaPlay />}
      </IconButton>
      <IconButton
        color="primary"
        aria-label="timer controller"
        disabled={!hasStarted}
        onClick={() => {
          const newExpiryTimestamp = new Date();

          if (timer.minutes && timer.minutes > 0) {
            newExpiryTimestamp.setMinutes(newExpiryTimestamp.getMinutes() + timer.minutes);
          }

          if (timer.hours && timer.hours > 0) {
            newExpiryTimestamp.setHours(newExpiryTimestamp.getHours() + timer.hours);
          }

          restart(newExpiryTimestamp);
          pause();
        }}
      >
        <FaArrowsRotate />
      </IconButton>
      <Typography variant="body2" color="text.secondary">
        {`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`}
      </Typography>
    </Stack>
  );
}
