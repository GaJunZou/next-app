import { useEffect, useMemo, useState } from "react";
import "@/pages/global.css"; // 全局的css文件得在在 _app.js 引入，不能在其他地方引入
import { Provider, useContainer } from "@/context";
import { loginApi } from "@api/user";
import { ConfigProvider, Spin, theme } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
// 每個路由更新都會引起刷新，而 _app.js 則只會加載一次，路由變化引起頁面變化并不會重新加載
export default function App({ Component, pageProps, ...exact }) {
  useEffect(() => {
    console.log("[_app]");
  }, []);

  return (
    <div className="_app_js">
      <Provider>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </Provider>
    </div>
  );
}

function Wrapper({ children, pathname }) {
  const { store, dispatch } = useContainer();

  const isDark = useMemo(() => {
    return Boolean(store?.systemTheme === "dark");
  }, [store?.systemTheme]);

  useEffect(() => {
    cookieStore.get("auth_token").then((res) => {
      if (res?.value) {
        loginApi().then((result) => {
          dispatch({
            type: "USER_DATA",
            payload: result.data,
          });
        });
      }
    });
  }, []);

  const [spinning, setSpinning] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSpinning(false);
    }, 1000);
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : null,
      }}
      componentSize="large"
    >
      <div id="root-div" data-theme={store?.systemTheme}>
        {/* <Spin spinning={spinning} fullscreen indicator={<ToastLoad spinning={true}></ToastLoad>} /> */}
        {children}
      </div>
    </ConfigProvider>
  );
}
