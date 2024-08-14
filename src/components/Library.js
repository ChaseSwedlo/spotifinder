import { 
  FaMagnifyingGlass, 
  FaArrowRightToBracket,
  FaPlus,
  FaListUl
} from "react-icons/fa6";

function Library() {
  return (
    <aside className='playlist'>
      <div className='flex library'>
        <h2>Your Library</h2>
        <div className='flex'>
          <FaPlus/>
          <FaArrowRightToBracket/>
        </div>
      </div>
      <div className='options center'>
        <ul className='flex'>
          <li>Playlist</li>
          <li>Albums</li>
          <li>Artist</li>
        </ul>
      <div className="options-two">
        <FaMagnifyingGlass/>
        <FaListUl/>
      </div>
      </div>
      {/*
        <ul className='lists'>
          <li className='flex'>
            <div className='playlist-icon'></div>
            <h3>Liked Songs</h3>
          </li>
          <li className='flex'>
            <div className='playlist-icon'></div>
            <h3>Liked Songs</h3>
          </li>
          <li className='flex'>
            <div className='playlist-icon'></div>
            <h3>Liked Songs</h3>
          </li>
          <li className='flex'>
            <div className='playlist-icon'></div>
            <h3>Liked Songs</h3>
          </li>
        </ul>
      */}
        </aside>
  );
}

export default Library;