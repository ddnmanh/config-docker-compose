import React, { useEffect, useState } from 'react';
import './app.css'
import axios from 'axios';

const init_form = {file: null, name: '', desc: ''};

export default function Gallery() {

  const [dataForm, setDataForm] = useState(init_form);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('image_file', dataForm.file);
      formData.append('name', dataForm.name);
      formData.append('description', dataForm.desc);

      const response = await axios.post(`${process.env.REACT_APP_DOMAIN_SERVER_API + process.env.REACT_APP_PATH_IMAGE_UPLOAD}`, formData);
      
      if (!response.data.error) {
        alert(response.data.data.success ? 'Upload ảnh thành công' : 'Upload ảnh thất bại!');
        if (response.data.data.success) {
          handleGetImage();
        }
      }
    } catch (error) {
      console.error(error);
      alert('Upload ảnh thất bại!');
    }
  }; 

  const [imageList, setImageList] = useState([]);

  const handleGetImage = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_DOMAIN_SERVER_API + process.env.REACT_APP_PATH_IMAGE_GET}?items=100&page=1`);

      if (!response?.data?.error) {
        if (response?.data?.data.length != 0)
          setImageList(response.data.data)
      }
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetImage();
  }, []);

  return (
    <div className='container'>
      <div className='upload-image'>
        <form className='form'>
          <div className='input-cluster'>
            <label for="file">Chọn file ảnh:</label>
            <input type="file" id="file" onChange={(e) => {
              setDataForm(prev => ({...prev, file: e.target.files[0]}))
            }}/>
          </div>
          <div className='input-cluster'>
            <label for="name">Tên ảnh</label>
            <input type='text' name='name' id="name"
              onChange={(e) => {
                setDataForm(prev => ({...prev, name: e.target.value}))
              }}
            ></input>
          </div>
          <div className='input-cluster'>
            <label for="desc">Mô tả</label>
            <input type='text' name='desc' id="desc"
              onChange={(e) => {
                setDataForm(prev => ({...prev, desc: e.target.value}))
              }}
            ></input>
          </div>
          <button type='button' onClick={handleSubmit}>Upload</button>
        </form>
      </div>
      <div className='gallery-container'>
        {
          imageList
          &&
          imageList.map(item => {
            return (
              <div class="item">
                <a target="_blank" className='frame' href={process.env.REACT_APP_DOMAIN_SERVER_STATICS + item.path}>
                  <img src={process.env.REACT_APP_DOMAIN_SERVER_STATICS + item.path} alt="Cinque Terre"/>
                </a>
                <div class="name">{item.name}</div>
                <div class="desc">{item.description}</div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};
