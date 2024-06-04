import React, { useRef, useEffect, useContext, useState } from 'react';
import { ArtistContext } from '../context/ArtistContext';
import { FaXmark, FaRegSquare, FaMinus, FaMagnifyingGlass, FaEllipsis, FaAngleLeft, FaAngleRight, FaHouse } from "react-icons/fa6";

function Spotify() {
  const boxRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    const header = headerRef.current;
    const form = formRef.current;

    const centerBox = () => {
      const parentRect = box.parentElement.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();
      const centerX = (parentRect.width - boxRect.width) / 2;
      const centerY = (parentRect.height - boxRect.height) / 2;
      box.style.left = `${centerX}px`;
      box.style.top = `${centerY}px`;
    };
    centerBox();

    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    const onMouseDown = (e) => {
      if (form.contains(e.target)) {
        return;
      }

      isDragging = true;
      offsetX = e.clientX - box.getBoundingClientRect().left;
      offsetY = e.clientY - box.getBoundingClientRect().top;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;

      const rect = box.getBoundingClientRect();
      const parentRect = box.parentElement.getBoundingClientRect();

      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX + rect.width > parentRect.width) newX = parentRect.width - rect.width;
      if (newY + rect.height > parentRect.height) newY = parentRect.height - rect.height;

      box.style.left = `${newX}px`;
      box.style.top = `${newY}px`;
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    header.addEventListener('mousedown', onMouseDown);

    return () => {
      header.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  return (
    <div ref={boxRef} className="box">
      <header ref={headerRef}>
        <div className='top-left'>
          <nav>
            <ul className='flex'>
              <li><FaEllipsis/></li>
              <li className='flex arrows'>
                <FaAngleLeft/>
                <FaAngleRight/>
              </li>
              <li>
                <FaHouse/>
              </li>
            </ul>
          </nav>
        </div>
        <div className='top-center'>
          <form ref={formRef} className='searchs'>
            <button type='submit' className='search-button'>
              <FaMagnifyingGlass />
            </button>
            <input type='text' placeholder='Search for an Artist'/>
          </form>
        </div>
        <div className='top-right'>
          <nav>
            <ul className='flex'>
              <li><FaMinus/></li>
              <li><FaRegSquare className='square'/></li>
              <li><FaXmark/></li>
            </ul>
          </nav>
        </div>
      </header>
      <section className='main flex'>
        <aside>

        </aside>
        <div>

        </div>
        <div>

        </div>
      </section>
    </div>
  );
}

export default Spotify;
