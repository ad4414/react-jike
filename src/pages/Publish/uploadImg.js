import { Input } from 'antd';
import axios from 'axios';
import { request } from '../../request';

const UploadComponent = () => {
  const handleUpload = async (data) => {
    try {
      const response = await request.post('/upload', {
        // 可以在这里添加需要上传的数据
         data
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-requested-with': 'XMLHttpRequest' // 设置自定义请求头
        }
      });
      
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <input type='file' onClick={handleUpload}>Upload Image</input>
  );
};

export default UploadComponent;