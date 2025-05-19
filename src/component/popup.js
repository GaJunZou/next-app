import { Popup } from 'antd-mobile';
import { useState } from 'react';
import ReactDOM from 'react-dom';

export function usePopup(initProps) {

  const [visible, setVisible] = useState();
  const container = (props) => {
    return <Popup
      visible={visible}
      onMaskClick={() => {
        setVisible(false)
      }}
      onClose={() => {
        setVisible(false)
      }}
      bodyStyle={{ height: '40vh' }}
    >
      <div>123</div>
    </Popup>
  }

  const open = (props) => {
    const don = ReactDOM.createPortal(<div>123</div>, document.body);
    const root = ReactDOM.createRoot(document.body);
    root.render(<div>123</div>);
  }

  return open;
}