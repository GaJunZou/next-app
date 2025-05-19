"use client";
import React, { useEffect, useState } from "react";
import { Tag, Image, Popover, ImageViewer } from "antd-mobile";
import { MoreOutline, EditSFill, DeleteOutline, ClockCircleOutline } from "antd-mobile-icons";
import { Timeline } from "antd";

import "./style.css";
import { usePopup } from "../popup";

function isEmpty(value) {
  if (value === null) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === "object") {
    return false;
  }
  return !value;
}

export default (props) => {
  const { dataList, onDeleteFn, onEditFn } = props;
  const openPopup = usePopup();

  const actions = [
    { key: "edit", icon: <EditSFill />, text: "编辑" },
    {
      key: "delete",
      icon: <DeleteOutline color="red" />,
      text: <span style={{ color: "red" }}> 删除</span>,
    },
  ];
  const items = (dataList || []).map((v) => {
    return {
      children: (
        <div className="timeline-item">
          <div className="first-section">
            <Tag color="#2db7f5" round style={{ fontSize: 14 }} onClick={() => { openPopup() }}>
              <ClockCircleOutline style={{ fontSize: 14 }} />
              &nbsp;&nbsp;
              {v.dateValue}
            </Tag>
            <Popover.Menu
              style={{ "--arrow-size": 0 }}
              actions={actions}
              trigger="click"
              placement="bottom-end"
              onAction={(act) => {
                console.log(act);
                if (act.key === "delete") {
                  onDeleteFn(v.id);
                  // console.log(v);
                }
                if (act.key === "edit") {
                  onEditFn(v);
                }
              }}
            >
              <div>
                <MoreOutline fontSize={18} />
              </div>
            </Popover.Menu>
          </div>
          {/* <div style={{ fontSize: "18", fontWeight: 700 }}>{v.title}</div> */}
          <div>{v.description}</div>
          {!isEmpty(v.fileList) && (
            <div className="image-preview">
              {v.fileList.map((l, index) => {
                return (
                  <Image
                    key={index}
                    src={l.url}
                    width={64}
                    fit="cover"
                    style={{ borderRadius: 8 }}
                    onClick={() => {
                      const urlList = v.fileList.map((f) => f.url);
                      ImageViewer.Multi.show({
                        images: urlList,
                        defaultIndex: index,
                        classNames: { mask: "image-preview-mask" },
                      });
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      ),
      color: "blue",
    };
  });

  return (
    <div className="timeline-wrapper">
      <Timeline items={items}></Timeline>
    </div>
  );
};
