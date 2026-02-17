import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { CiSearch } from 'react-icons/ci';
import { FaSearch } from 'react-icons/fa';

export default function Search({ placeholder = "Search...", onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
     // نرسل القيمة للأب اللي بيستعمل الكومبوننت
  };

  return (
    <div className='search-box input-group w-25 my-3    border   rounded-5   border_color  overflow-hidden'>
      <span className='search-icon input-group-text bg-white border-0'><CiSearch /> </span>
        <input type="text"
        placeholder={placeholder} className='form-control search-input'
        onChange={handleChange}/>
    
    </div>
   
  )

// </div>
//     <InputGroup className="mb-3 w-50" >
//       <span>
//         <FaSearch />
//       </span>
//       <FormControl
//         type="text"
//         placeholder={placeholder}
//         onChange={handleChange}
//       />
//     </InputGroup>
//   );
}
