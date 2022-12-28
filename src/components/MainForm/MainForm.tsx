import React from 'react';

const MainForm = () => {
  return (
    <div className='border border-dark'>
      <form>
        <div className='text-center p-5'>
          <div className='mb-3'>
            <input className='form-control' type="text" placeholder='dish'/>
          </div>
          <div className='mb-3'>
            <input className='form-control' type="number" placeholder='price'/>
          </div>
          <div className='mb-3'>
            <input className='form-control' type="text" placeholder='image'/>
          </div>
          <button className='btn btn-primary'>save</button>
        </div>
      </form>
    </div>
  );
};

export default MainForm;