"use client";
import React, { useEffect, useState } from "react";
import { Tag, Image, Popover } from "antd-mobile";
import { MoreOutline, EditSFill, DeleteOutline } from "antd-mobile-icons";
import { Button, DatePicker, Input, Timeline } from "antd";

import AV from 'leancloud-storage';
import './style.css';

function isEmpty(value) {
  if (value === null) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length === 0
  }

  if (typeof value === 'object') {
    return false
  }
  return !value
}

export default (props) => {
  const { dataList, onDeleteFn, onEditFn } = props;

  const actions = [
    { key: 'edit', icon: <EditSFill />, text: '编辑' },
    { key: 'delete', icon: <DeleteOutline color="red" />, text: <span style={{ color: 'red' }} > 删除</span > }
  ]
  const items = (dataList || []).map((v) => {
    return {
      children: <div className="timeline-item">
        <div className="first-section">
          <Tag color="#2db7f5" style={{ fontSize: 14 }}>{v.dateValue}</Tag>
          <Popover.Menu
            style={{ '--arrow-size': 0 }}
            actions={actions}
            trigger='click'
            placement='bottom-end'
            onAction={(act) => {
              console.log(act);
              if (act.key === 'delete') {
                onDeleteFn(v.id)
                // console.log(v);
              }
              if (act.key === 'edit') {
                onEditFn(v);
              }
            }}
          >
            <div><MoreOutline fontSize={18} /></div>
          </Popover.Menu>
        </div>
        <div style={{ fontSize: "18", fontWeight: 700 }}>{v.title}</div>
        <div>{v.description}</div>
        {
          !isEmpty(v.fileList) && <div>
            {v.fileList.map((l, index) => {
              return (
                <Image key={index} src={l.url} width={64} height={64} fit="cover" style={{ borderRadius: 4 }} />
              );
            })}
          </div>
        }

      </div>,
      color: 'blue'
    };
  })

  console.log(items);

  return <div className="timeline-wrapper">
    <Timeline items={items}></Timeline>
  </div>
}