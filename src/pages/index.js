"use client";
import React, { useState } from "react";
import { Avatar, Tabs, SearchBar, ErrorBlock, Button, ImageUploader, Tag, Image } from "antd-mobile";
import { SetOutline, AddOutline } from "antd-mobile-icons";
import { DatePicker, Input, Timeline } from "antd";

import CtmModal from "@components/CtmModal";
import AddDataForm from "@/component/AddDataForm";
import AV from 'leancloud-storage';
AV.init({
  appId: "vToPA8oTWcdLHN5foUtAF5Jy-gzGzoHsz",
  appKey: "REOnycCNmfg6J8nhQNH0Tj61",
  serverURL: "https://vtopa8ot.lc-cn-n1-shared.com",
});

function save() {
  // 声明 class
  const Notes = AV.Object.extend("Notes");
  // 构建对象
  const notes = new Notes();

  // 为属性赋值
  notes.set("userId", "");
  notes.set("title", "工程师周会");
  notes.set("description", "周二两点，全体成员");
  notes.set("dateValue", "周二两点，全体成员");
  notes.set("imageList", []);

  // 将对象保存到云端 
  notes.save().then(
    (note) => {
      // 成功保存之后，执行其他逻辑
      console.log(`保存成功。objectId：${note.id}`);
    },
    (error) => {
      // 异常处理
      console.log(error);

    }
  );
}


function query() {
  const query = new AV.Query("Notes");
  query.equalTo("title", "工程师周会");

  // query.get("68275067d3496c42466ad9c3").then
  query.find().then((todos) => {
    // todo 就是 objectId 为 582570f38ac247004f39c24b 的 Todo 实例
    // const title = todo.get("title");
    // const priority = todo.get("priority");
    // // 获取内置属性
    // const objectId = todo.id;
    // const updatedAt = todo.updatedAt;
    // const createdAt = todo.createdAt;
    console.log(todos);

  });
}







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
          // query();
          setVisible(!visible);
        }}
      >
        <AddOutline fontSize={36} fontWeight={900} color="#fff" />
      </div>

      <CtmModal isOpen={visible}>
        <AddDataForm
          onSave={(formData) => {
            // save();
            setVisible(false);
            console.log(formData);
            setData([...data, formData]);
          }}
        ></AddDataForm>
      </CtmModal>
    </div>
  );
};
