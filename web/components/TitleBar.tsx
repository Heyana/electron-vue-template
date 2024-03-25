import { defineComponent, ref } from "vue";
import "./style/title-bar.less";
import { createImg, onlyInput } from "@utils/UtilsJsx/UtilsJsxPublic";
import { CustomJsx } from "@utils/UtilsJsx/UtilsJsx";
import { ipcRenderer } from "@utils/UtilsExports";
import { winURL } from "@desktop/config/StaticPath";
import { downloadFile } from "js-funcs";
export default defineComponent({
  name: "TitleBar",
  setup: () => () => com(),
});
const refData = {
  full: ref(false),
};
const menu = [
  {
    name: "mini",
    img: "miniWin",
    click: () => {
      ipcRenderer.invoke("windows-mini");
    },
  },
  {
    name: "win",
    elseVal: refData.full,
    elseImg: "minWin",
    img: "bigWin",
    click: () => {
      refData.full.value = !refData.full.value;
      ipcRenderer.invoke("window-max").then((res) => {
        console.log(refData.full.value, "efData.full");
        // refData.full = res.status;
      });
    },
  },

  {
    name: "close",
    img: "closeWin",
    click: () => {
      ipcRenderer.invoke("window-close");
    },
  },
];
const com = () => (
  <div class="title" style={{ "-webkit-app-region": "drag" } as any}>
    <div class="left" style={{ "-webkit-app-region": "no-drag" } as any}>
      <div class="logo">{createImg("logo")}</div>
      <div class="search">
        <div class="icon">{createImg("search")}</div>
        {onlyInput({
          tip: "请输入项目名称",
        })}
      </div>
      {CustomJsx.BtGradient({
        name: "订制应用",
        async click() {
          return;
          const link = await ipcRenderer.invoke("getWinUrl");
          console.log(link, "link");
          // alert(link);
          downloadFile(
            new Blob([
              JSON.stringify({
                link,
              }),
            ]),
            "test.json"
          );
        },
      })}
    </div>
    <div class="right" style={{ "-webkit-app-region": "no-drag" } as any}>
      <div class="user">
        {createImg("user")}
        <p>GT-STAB</p>
      </div>
      <div class="setting">{createImg("setting")}</div>
      <div class="contro">
        {menu.map((i) => {
          return (
            <div onClick={i.click} class={i.name}>
              {createImg(
                "projectWindow/" + (i.elseVal?.value ? i.elseImg : i.img)
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
