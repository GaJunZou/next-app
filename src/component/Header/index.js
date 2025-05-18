import { useEffect, useRef, useState } from "react";
import { Popup, Avatar, ImageUploader, Toast } from "antd-mobile";
import { CameraOutline, SetOutline } from "antd-mobile-icons";

import SearchBox from "../SearchBox";

import "./style.css";
import { getUserProfile, mockUpload, updateUserProfile } from "@/api";
export default () => {
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState([]);
  const [userdata, setUserdata] = useState({});
  const imageUploaderRef = useRef();
  useEffect(() => {
    getUserProfile('6829eee2d3496c42467ade3f').then((user) => {
      setUserdata(user);
    })
  }, []);
  return (
    <div className="personal-wrapper">
      <div
        className={`avatar-setting ${visible ? 'header-avatar' : ''}`}
        onClick={() => {
          setVisible(true);
        }}
      >
        <Avatar
          src={userdata.avatarUrl}
          style={{ "--size": "72px", "--border-radius": "50%" }}
        ></Avatar>
        <span className="setting">
          {
            visible ?
              <>
                <CameraOutline fontSize={24} onClick={() => {
                  const nativeInput = imageUploaderRef.current?.nativeElement
                  if (nativeInput) {
                    nativeInput.click()
                  }
                }} />
                <ImageUploader
                  ref={imageUploaderRef}

                  upload={async (file) => {
                    const result = await mockUpload(file);
                    Toast.show({
                      content: '更新头像...'
                    });
                    updateUserProfile({
                      id: '6829eee2d3496c42467ade3f',
                      avatarUrl: result.url
                    }).then(() => {
                      setUserdata({
                        avatarUrl: result.url
                      });
                    })
                    return result;
                  }}
                  multiple={false}
                  style={{ "--cell-size": "100px", display: 'none' }}
                />
              </>
              :
              <SetOutline fontSize={24} />
          }
        </span>
        <Popup
          visible={visible}
          onMaskClick={() => {
            setVisible(false);
          }}
          onClose={() => {
            setVisible(false);
          }}
          position="left"
          bodyStyle={{ width: "60vw" }}
        >
          <div></div>
        </Popup>
      </div>
      <SearchBox></SearchBox>
    </div>
  );
};
