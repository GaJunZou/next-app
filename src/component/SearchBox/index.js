'use client';
import { useEffect } from 'react';
import './style.css';
export default (props) => {
  const { onSearch } = props;
  useEffect(() => {
    const input = document.querySelector(".search-box-input");
    const searchBtn = document.querySelector(".search-box-btn");
    const expand = () => {
      searchBtn.classList.toggle("close");
      input.classList.toggle("square");
    };
    searchBtn.addEventListener("click", expand);
  }, []);
  return <div className='search-box'>
    <div id="content">
      <input type="search" name="input" className="search-box-input" />
      <button type="reset" class="search-box-btn"></button>
    </div>
  </div>
}