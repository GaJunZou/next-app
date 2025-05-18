"use client";

import { DatePicker, Input } from "antd";
import { ImageUploader, Button, Toast } from "antd-mobile";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import "./style.css";
import { mockUpload } from "@/api";

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

export async function mockUploadFail() {
  await sleep(2000);
  throw new Error("Fail to upload");
}

export default (props) => {
  const { inputData, onSave } = props;
  const form = useFormState(() => {
    const today = dayjs().format('YYYY-MM-DD');
    return {
      // title: "",
      description: "",
      dateValue: today,
      fileList: [],
    }
  });

  useEffect(() => {
    if (inputData) {
      console.log(inputData);
      form.setValue({ ...inputData });
    }
  }, [inputData]);

  return (
    <div className="modal-inner-content">
      <div className="modal-inner-control">
        {/* <Input
          placeholder="标题"
          variant={"filled"}
          value={form.title}
          onChange={(e) => {
            form.setValue({
              title: e.target.value,
            });
          }}
        ></Input> */}
        <Input.TextArea
          value={form.description}
          onChange={(e) => {
            form.setValue({
              description: e.target.value,
            });
          }}
          variant={"filled"}
          placeholder="分享此刻的心情~"
          autoSize={{ minRows: 5, maxRows: 10 }}
          showCount
          maxLength={200}
        />
        <DatePicker
          variant={"filled"}
          value={dayjs(form.dateValue)}
          onChange={(value, dateString) => {
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
          className="my-image-uploader"
          style={{ "--cell-size": "100px" }}
        />
      </div>
      <div className="modal-inner-footer">
        <Button block color="primary" fill="solid" shape="rounded" onClick={() => onSave(form.formValue, inputData ? 'edit' : 'add')}>
          保存
        </Button>
      </div>
    </div>
  );
};
