"use client";
import React, { useState } from "react";
import { Avatar, Tabs, SearchBar, ErrorBlock, Button, ImageUploader, Tag, Image } from "antd-mobile";
import { SetOutline, AddOutline } from "antd-mobile-icons";
import { DatePicker, Input, Timeline } from "antd";

import CtmModal from "@components/CtmModal";
import AddDataForm from "@/component/AddDataForm";

const longPressEvents = function ({ onStartCallback, onEndCallback, ms = 2000 }) {
  let timeout;
  let target;

  const start = (event) => {
    if (event.nativeEvent instanceof TouchEvent) target = event.nativeEvent.target;
    return (timeout = setTimeout(() => onStartCallback(target), ms));
  };
  const stop = (event) => {
    timeout && window.clearTimeout(timeout); // 合成事件，要先 clear，否则报 warning
    // 下边的其实可以不用，如果不需要结束回调的话
    if (event.nativeEvent instanceof TouchEvent) target = event.nativeEvent.target;
    onEndCallback?.(target);
  };

  return {
    onTouchStart: start,
    onTouchMove: stop,
    onTouchEnd: stop,
  };
};

export default () => {
  const [visible, setVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const [data, setData] = useState([
    {
      title: "title",
      description: "description",
      dateValue: "2025-05-16",
      fileList: [
        {
          url: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60",
        },
      ],
    },
    {
      title: "title",
      description: "description",
      dateValue: "2025-05-16",
      fileList: [
        {
          url: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60",
        },
      ],
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
        <Tabs.Tab title={<div {...longPressEvents({
          onEndCallback: () => {
            console.log('12321312');
          }
        })}>tab1</div>} key="1" />
        <Tabs.Tab title="tab2" key="2" />
        <Tabs.Tab title="tab3" key="3" />
      </Tabs>
      {data.length === 0 && <ErrorBlock status="empty" />}
      <div className="timeline-wrapper">
        <Timeline
          items={data.map((v) => {
            return {
              children: (
                <div className="timeline-item">
                  <div>
                    <Tag color="#2db7f5">{v.dateValue}</Tag>
                  </div>
                  <div style={{ fontSize: "18", fontWeight: 700 }}>{v.title}</div>
                  <p>{v.description}</p>
                  <div>
                    {(v.fileList || []).map((l, index) => {
                      return (
                        <Image key={index} src={l.url} width={64} height={64} fit="cover" style={{ borderRadius: 4 }} />
                      );
                    })}
                  </div>
                </div>
              ),
            };
          })}
        />
      </div>

      <div
        className={`bottom-button ${visible ? "change-to-close-btn" : "change-to-add-btn"}`}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        <AddOutline fontSize={36} fontWeight={900} color="#fff" />
      </div>

      <CtmModal isOpen={visible}>
        <AddDataForm
          onSave={(formData) => {
            setVisible(false);
            console.log(formData);
            setData([...data, formData]);
          }}
        ></AddDataForm>
      </CtmModal>
    </div>
  );
};
