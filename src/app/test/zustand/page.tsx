'use client';
import React from 'react';
import useCounterState from '@/hooks/states/useCounterState';

const Page: React.FC = () => {
  const { counter, increment, reset } = useCounterState();
  // const counter = useCounterState((state) => state.counter); // counter is changed => re-render, max is changed => not

  return (
    <div>
      Counter ({counter})
      <button onClick={() => increment()} className="btn btn-primary mx-1">
        Increment
      </button>
      <button onClick={() => reset()} className="btn btn-primary mx-1">
        Reset
      </button>
    </div>
  );
};

export default Page;
