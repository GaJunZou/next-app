"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Tabs,
  SearchBar,
  ErrorBlock,
  Button,
  ImageUploader,
  Tag,
  Image,
  Toast,
} from "antd-mobile";
import { SetOutline, AddOutline, MoreOutline } from "antd-mobile-icons";

import CtmModal from "@components/CtmModal";
import AddDataForm from "@/component/AddDataForm";
import AV from "leancloud-storage";
import TimelineContent from "@/component/TimelineContent";
import SlidingTabs from "@/component/SlidingTabs";
import SearchBox from "@/component/SearchBox";
AV.init({
  appId: "vToPA8oTWcdLHN5foUtAF5Jy-gzGzoHsz",
  appKey: "REOnycCNmfg6J8nhQNH0Tj61",
  serverURL: "https://vtopa8ot.lc-cn-n1-shared.com",
});

function addNoteItem(data) {
  // 声明 class
  const Notes = AV.Object.extend("Notes");
  // 构建对象
  const notes = new Notes();

  // 为属性赋值
  notes.set("userId", data.userId || "1");
  // notes.set("title", data.title);
  notes.set("description", data.description);
  notes.set("dateValue", data.dateValue);
  notes.set("fileList", data.fileList);

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

function queryByUserId() {
  const query = new AV.Query("Notes");
  query.equalTo("userId", "1");

  // query.get("68275067d3496c42466ad9c3").then
  return new Promise((resolve, reject) => {
    query.find().then((notes) => {
      // todo 就是 objectId 为 582570f38ac247004f39c24b 的 Todo 实例
      // const title = todo.get("title");
      // const priority = todo.get("priority");
      // // 获取内置属性
      // const objectId = todo.id;
      // const updatedAt = todo.updatedAt;
      // const createdAt = todo.createdAt;
      console.log(notes);
      resolve(
        notes.map((n) => {
          return {
            ...n.attributes,
            id: n.id,
          };
        })
      );
    });
  });
}

async function updateNoteItem(data) {
  const note = AV.Object.createWithoutData("Notes", data.id);
  // note.set("title", data.title);
  note.set("description", data.description);
  note.set("dateValue", data.dateValue);
  note.set("fileList", data.fileList);
  await note.save();
  Toast.show({
    content: "修改成功",
  });
}

export default () => {
  const [visible, setVisible] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [editData, setEditData] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    queryByUserId().then((res) => {
      setDataList(res);
    });
  }
  function deleteNoteItem(id) {
    const todo = AV.Object.createWithoutData("Notes", id);
    todo.destroy().then(
      () => {
        fetchData();
        Toast.show({
          content: "删除成功",
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  function handleEdit(eData) {
    setEditData(eData);
    setVisible(true);
  }
  return (
    <div className="app-wrapper">
      <div className="personal-wrapper">
        <div className="avatar-setting">
          <Avatar
            src={"http://lc-vToPA8oT.cn-n1.lcfile.com/wBW7aWBYxxR5Neh26t2JGSjozIOOrdx0/IMG_6881.jpeg"}
            style={{ "--size": "72px", "--border-radius": "50%" }}
          >
          </Avatar>
          <span className="setting"><SetOutline fontSize={24} /></span>
        </div>
        {/* <SearchBar
          placeholder="请输入内容"
          clearable
          style={{ "--height": "40px", "--border-radius": "100px", flex: 1 }}
        /> */}
        <SearchBox></SearchBox>
      </div>
      <SlidingTabs></SlidingTabs>

      {dataList.length === 0 && <ErrorBlock status="empty" />}

      <TimelineContent
        dataList={dataList}
        onDeleteFn={deleteNoteItem}
        onEditFn={handleEdit}
      ></TimelineContent>

      <div
        className={`bottom-button ${visible ? "change-to-close-btn" : "change-to-add-btn"
          }`}
        onClick={() => {
          // query();
          setVisible(!visible);
          setEditData(null);
        }}
      >
        <AddOutline fontSize={36} fontWeight={900} color="#fff" />
      </div>

      <CtmModal isOpen={visible}>
        <AddDataForm
          inputData={editData}
          onSave={async (formData, type) => {
            setVisible(false);
            console.log(formData);
            if (type === "add") {
              await addNoteItem(formData);
            }
            if (type === "edit") {
              await updateNoteItem(formData);
              setEditData(null);
            }
            fetchData();
          }}
        ></AddDataForm>
      </CtmModal>
    </div>
  );
};
