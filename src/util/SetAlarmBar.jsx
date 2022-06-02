import I_xWhite from "../img/icon/I_xWhite.svg";

export default function SetAlarmBar({ cont = "copied", type }) {
  if (document.getElementsByClassName("alarmBar")[0]) return;
  console.log(cont);
  let alarmBar = document.createElement("div");
  alarmBar.className = "alarmBar";

  alarmBar.style.display = "flex";
  alarmBar.style.justifyContent = "space-between";
  alarmBar.style.alignItems = "center";
  alarmBar.style.gap = "40px";
  alarmBar.style.width = "91.2vw";
  alarmBar.style.maxWidth = "540px";
  alarmBar.style.height = "12vw";
  alarmBar.style.maxHeight = "40px";
  alarmBar.style.padding = "0 20px";
  alarmBar.style.fontSize = "14px";
  alarmBar.style.color = "#fff";
  alarmBar.style.background = "rgba(255, 255, 255, 0.1)";
  alarmBar.style.border = "1px solid #F7AB1F";
  alarmBar.style.borderRadius = "20px";
  alarmBar.style.zIndex = "10000";
  alarmBar.style.backdropFilter = "blur(40px)";

  let leftBox = document.createElement("span");
  leftBox.append(cont);

  let exitIcon = document.createElement("img");
  exitIcon.src = I_xWhite;
  exitIcon.style.width = "4vw";
  exitIcon.style.maxWidth = "14px";
  exitIcon.style.cursor = "pointer";

  alarmBar.style.top = "0px";
  alarmBar.style.left = "50%";
  alarmBar.style.position = "fixed";
  alarmBar.style.transform = "translate(-50%,0)";

  alarmBar.style.fontFamily = "NotosansMedium";

  alarmBar.append(leftBox);
  alarmBar.append(exitIcon);

  let alarmBarApear;

  alarmBarApear = alarmBar.animate([{ transform: "translate(-50%,98px)" }], {
    duration: 400,
    fill: "forwards",
    easing: "ease-in-out",
  });

  if (type === "mobile")
    alarmBarApear = alarmBar.animate([{ transform: "translate(-50%,78px)" }], {
      duration: 400,
      fill: "forwards",
      easing: "ease-in-out",
    });

  alarmBarApear.play();

  alarmBarApear.onfinish = errBarDisapear;

  function errBarDisapear() {
    alarmBar.animate([{ transform: "translate(-50%,0px)" }], {
      delay: 5400,
      duration: 400,
      fill: "forwards",
      easing: "ease-in-out",
    }).onfinish = removeErrBar;
  }

  function removeErrBar() {
    alarmBar.remove();
  }

  exitIcon.addEventListener("click", function () {
    alarmBar.animate([{ transform: "translate(-50%,0px)" }], {
      delay: 0,
      duration: 400,
      fill: "forwards",
      easing: "ease-in-out",
    }).onfinish = removeErrBar;
  });

  document.body.append(alarmBar);
}
