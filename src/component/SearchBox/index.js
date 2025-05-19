"use client";
import { useEffect, useRef, useState } from "react";
import "./style.css";
export default (props) => {
  const { onSearch } = props;

  const [expand, setExpand] = useState(false);
  const ref = useRef();
  return (
    <div className="search-box">
      <div className="search-box-content">
        <input
          ref={ref}
          type="search"
          name="input"
          className={`search-box-input ${expand ? "square" : ""}`}
          focus={expand ? true : undefined}
          enterKeyHint="search"
        />
        <button
          type="reset"
          className={`search-box-btn ${expand ? "close" : ""}`}
          onClick={() => {
            setExpand(!expand);
          }}
        ></button>
      </div>
    </div>
  );
};
