"use client";

import { DatePicker, Input } from "antd";
import { ImageUploader, Button, Toast } from "antd-mobile";
import { useState } from "react";
import dayjs from 'dayjs';
import "./style.css";

function useFormState(initValue) {
  const [form, setForm] = useState(initValue);
  const setValue = (newValue) => {
    setForm({
      ...form,
      ...newValue,
    });
  };

  return {
    ...form,
    setValue,
    formValue: form,
  };
}
function sleep(timeout) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true);
    }, timeout);
  });
}

export async function mockUpload(file) {
  await sleep(2000);
  return {
    url: URL.createObjectURL(file),
  };
}

export async function mockUploadFail() {
  await sleep(2000);
  throw new Error("Fail to upload");
}

export default (props) => {
  const { onSave } = props;
  const form = useFormState({
    title: "title",
    description: "description",
    dateValue: "2025-05-16",
    fileList: [
      {
        url: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60",
      },
    ],
  });

  return (
    <div className="modal-inner-content">
      <div className="modal-inner-control">
        <Input
          placeholder="标题"
          variant={"filled"}
          value={form.title}
          onChange={(e) => {
            form.setValue({
              title: e.target.value,
            });
          }}
        ></Input>
        <Input.TextArea
          value={form.description}
          onChange={(e) => {
            form.setValue({
              description: e.target.value,
            });
          }}
          variant={"filled"}
          placeholder="Controlled autosize"
          autoSize={{ minRows: 3, maxRows: 5 }}
          showCount
          maxLength={100}
        />
        <DatePicker
          variant={"filled"}
          value={dayjs(form.dateValue)}
          onChange={(value, dateString) => {
            console.log({value, dateString});
            
            form.setValue({
              dateValue: dateString,
            });
          }}
        />
        <ImageUploader
          value={form.fileList}
          onChange={(items) => {
            form.setValue({ fileList: items });
          }}
          upload={mockUpload}
          maxCount={4}
          multiple={true}
          style={{ "--cell-size": "100px" }}
        />
      </div>
      <div className="modal-inner-footer">
        <Button block color="primary" fill="solid" shape="rounded" onClick={() => onSave(form.formValue)}>
          保存
        </Button>
      </div>
    </div>
  );
};
