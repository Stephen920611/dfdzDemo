import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
// 加载基础样式
import 'antd/lib/message/style';
import 'antd/lib/modal/style';

import ParticpleComponent from './routes/participle/components/index';

ReactDOM.render(
  <ParticpleComponent />,
  document.getElementById('wrapper')
);
