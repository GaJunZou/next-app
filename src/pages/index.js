"use client";
import React, { useState } from "react";
import { Avatar, Tabs, SearchBar, ErrorBlock, Button, ImageUploader } from "antd-mobile";
import { SetOutline, AddOutline } from "antd-mobile-icons";
import { DatePicker, Input } from "antd";

import CtmModal from "@components/CtmModal";

function sleep(timeout) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true);
    }, timeout);
  });
}

export async function mockUpload(file) {
  await sleep(3000);
  return {
    url: URL.createObjectURL(file),
  };
}

export async function mockUploadFail() {
  await sleep(3000);
  throw new Error("Fail to upload");
}

export default () => {
  const [visible, setVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const [data, setData] = useState([]);
  const [fileList, setFileList] = useState([
    {
      url: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60",
    },
  ]);
  return (
    <div className="app-wrapper">
      <div className="personal-wrapper">
        <Avatar
          src={"https://placehold.co/10x10/orange/white"}
          style={{ "--size": "30px", "--border-radius": "50%" }}
        />
        <SearchBar placeholder="请输入内容" clearable />
        <SetOutline fontSize={20} />
      </div>
      <Tabs className="tabs" onChange={(key) => setActiveKey(key)} activeKey={activeKey}>
        <Tabs.Tab title="tab1" key="1" />
        <Tabs.Tab title="tab2" key="2" />
        <Tabs.Tab title="tab3" key="3" />
        <Tabs.Tab title="tab4" key="4" />
        <Tabs.Tab title="tab5" key="5" />
      </Tabs>
      <div>{data.length === 0 && <ErrorBlock status="empty" />}</div>
      <div
        className={`bottom-button ${visible ? "change-to-close-btn" : "change-to-add-btn"}`}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        <AddOutline fontSize={36} fontWeight={900} color='#fff'/>
      </div>

      <CtmModal isOpen={visible}>
        <div className="modal-inner-content">
          <Input placeholder="标题" variant={"filled"}></Input>
          <Input.TextArea
            variant={"filled"}
            onChange={(e) => {}}
            placeholder="Controlled autosize"
            autoSize={{ minRows: 3, maxRows: 5 }}
            showCount
            maxLength={100}
          />
          <DatePicker variant={"filled"} />
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={mockUpload}
            maxCount={4}
            multiple={true}
            style={{ "--cell-size": "160px" }}
          />
        </div>
      </CtmModal>
    </div>
  );
};
