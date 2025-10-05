import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, incrementBy, push, pop } from "./counterSlice";
import { useState } from "react";

export const App = () => {
  const dispatch = useDispatch();
  const { count, stack } = useSelector((state) => state.counter);

  const [value, setValue] = useState(""); 
  const [stackValue, setStackValue] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>

      <div style={{ marginTop: "10px" }}>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          placeholder="Enter value"
        />
        <button onClick={() => dispatch(incrementBy(Number(value)))}>Increment By</button>
      </div>

      <hr />

      <h2>Stack</h2>
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={stackValue}
          onChange={(e) => setStackValue(e.target.value)}
          placeholder="Enter stack value"
        />
        <button onClick={() => dispatch(push(stackValue))}>Push</button>
        <button onClick={() => dispatch(pop())}>Pop</button>
      </div>

      <p>Stack values: [{stack.join(", ")}]</p>
    </div>
  );
};