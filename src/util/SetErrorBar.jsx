import { findNonSerializableValue } from "@reduxjs/toolkit";
import I_chkYellow from "../img/icon/I_chkYellow.svg";
import I_xWhite from "../img/icon/I_xWhite.svg";

export default function SetErrorBar({ str = "copied", type = "pc" }) {
  if (document.getElementsByClassName("errBar")[0]) return;

  let errBar = document.createElement("div");
  errBar.className = "errBar";

  errBar.style.display = "flex";
  errBar.style.justifyContent = "space-between";
  errBar.style.alignItems = "center";
  errBar.style.width = "91.2vw";
  errBar.style.maxWidth = "480px";
  errBar.style.height = "12vw";
  errBar.style.maxHeight = "40px";
  errBar.style.padding = "0 20px";
  errBar.style.fontSize = "14px";
  errBar.style.color = "#fff";
  errBar.style.background = "rgba(0,0,0,0.7)";
  errBar.style.border = "1px solid #fff";
  errBar.style.borderRadius = "20px";
  errBar.style.zIndex = "10000";

  let leftBox = document.createElement("span");
  leftBox.style.display = "flex";
  leftBox.style.alignItems = "center";
  leftBox.style.gap = "10px";

  let errText = document.createElement("p");
  errText.innerText = str;

  let checkIconBox = document.createElement("span");
  checkIconBox.style.display = "flex";
  checkIconBox.style.justifyContent = "center";
  checkIconBox.style.alignItems = "center";
  checkIconBox.style.width = "16px";
  // checkIconBox.style.maxWidth = "20px";
  checkIconBox.style.height = "16px";
  // checkIconBox.style.maxHeight = "20px";
  checkIconBox.style.marginRight = "10px";
  checkIconBox.style.border = "1px solid #f7AB1F";
  checkIconBox.style.borderRadius = "50%";

  let checkIcon = document.createElement("img");
  checkIcon.src = I_chkYellow;
  checkIcon.style.height = "8px";

  let exitIcon = document.createElement("img");
  exitIcon.src = I_xWhite;
  exitIcon.style.width = "4vw";
  exitIcon.style.maxWidth = "14px";
  exitIcon.style.cursor = "pointer";

  checkIconBox.append(checkIcon);
  leftBox.append(checkIconBox);

  errBar.style.top = "0px";
  errBar.style.left = "50%";
  errBar.style.position = "fixed";
  errBar.style.transform = "translate(-50%,0)";

  errBar.style.fontFamily = "NotosansMedium";

  leftBox.append(errText);
  errBar.append(leftBox);
  errBar.append(exitIcon);

  let errBarApear;

  errBarApear = errBar.animate([{ transform: "translate(-50%,98px)" }], {
    duration: 400,
    fill: "forwards",
    easing: "ease-in-out",
  });

  if (type === "mobile")
    errBarApear = errBar.animate([{ transform: "translate(-50%,78px)" }], {
      duration: 400,
      fill: "forwards",
      easing: "ease-in-out",
    });

  errBarApear.play();

  errBarApear.onfinish = errBarDisapear;

  function errBarDisapear() {
    errBar.animate([{ transform: "translate(-50%,0px)" }], {
      delay: 5400,
      duration: 400,
      fill: "forwards",
      easing: "ease-in-out",
    }).onfinish = removeErrBar;
  }

  function removeErrBar() {
    errBar.remove();
  }

  exitIcon.addEventListener("click", function () {
    errBar.animate([{ transform: "translate(-50%,0px)" }], {
      delay: 0,
      duration: 400,
      fill: "forwards",
      easing: "ease-in-out",
    }).onfinish = removeErrBar;
  });

  document.body.append(errBar);
}
