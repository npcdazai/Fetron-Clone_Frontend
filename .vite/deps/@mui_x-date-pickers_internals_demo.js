import {
  pickersTextFieldClasses
} from "./chunk-CXAZTIMO.js";
import {
  textFieldClasses_default
} from "./chunk-QGATKALZ.js";
import "./chunk-IL6ABLR4.js";
import "./chunk-F2YNTXKW.js";
import "./chunk-GSNO3QVF.js";
import {
  Stack_default,
  stackClasses_default
} from "./chunk-NLXTEVBL.js";
import "./chunk-OEFGZR56.js";
import "./chunk-76OOB7TG.js";
import "./chunk-E3FMLCPB.js";
import "./chunk-U7HJA236.js";
import "./chunk-G5KGXSJR.js";
import "./chunk-3FJ6WUB2.js";
import "./chunk-J6RQQO32.js";
import "./chunk-MCJUKPHM.js";
import "./chunk-7GRSEBZJ.js";
import "./chunk-EK2UUCCF.js";
import "./chunk-OSXJOVCE.js";
import "./chunk-GTJPQRSM.js";
import "./chunk-AOW7Q6QM.js";
import "./chunk-UPVR5VHR.js";
import "./chunk-KMNHMRK2.js";
import "./chunk-ZAP2GYSG.js";
import "./chunk-IBWUGY4Z.js";
import "./chunk-FZE224VB.js";
import "./chunk-N5Z5KARF.js";
import "./chunk-3MJSC5FO.js";
import "./chunk-D36YRMCG.js";
import "./chunk-LQHJAPLN.js";
import {
  Typography_default
} from "./chunk-VET7VOV4.js";
import "./chunk-BNIK2AUT.js";
import "./chunk-JLSLPL4B.js";
import "./chunk-ZSA6EGSN.js";
import "./chunk-4EF566ZQ.js";
import "./chunk-PFZ42PES.js";
import "./chunk-55NDJUPW.js";
import "./chunk-SRJVOYDD.js";
import "./chunk-7SO26J3D.js";
import "./chunk-XAWTPI7E.js";
import "./chunk-W3VT5O72.js";
import "./chunk-EE4TPZMF.js";
import "./chunk-434IGKTH.js";
import "./chunk-ALJHO7VG.js";
import "./chunk-IMCWWOGW.js";
import "./chunk-VPB6KAEJ.js";
import "./chunk-QOYICO4W.js";
import "./chunk-6F25EX6R.js";
import "./chunk-BMCBGW7S.js";
import "./chunk-WKWQPAVO.js";
import "./chunk-SYQ7DUOR.js";
import "./chunk-4GGYTDRQ.js";
import "./chunk-6SYVD2NO.js";
import "./chunk-YRRZ43LC.js";
import "./chunk-T22YZR45.js";
import "./chunk-OTY6O57J.js";
import "./chunk-CCRBYHLB.js";
import "./chunk-PSGUSLG5.js";
import {
  require_jsx_runtime
} from "./chunk-F7RKNM7B.js";
import "./chunk-O3RQAFXY.js";
import "./chunk-NWNPM2ZU.js";
import "./chunk-RPXFFOYT.js";
import "./chunk-ZTXVWYLJ.js";
import "./chunk-D25FWIIA.js";
import "./chunk-HA5N2SSD.js";
import "./chunk-HHFWMVFQ.js";
import {
  _extends,
  init_extends
} from "./chunk-BJM7UO3E.js";
import "./chunk-2CMOOEJQ.js";
import {
  require_react
} from "./chunk-2PA4WPI3.js";
import {
  __toESM
} from "./chunk-ROME4SDB.js";

// node_modules/@mui/x-date-pickers/internals/demo/DemoContainer.js
init_extends();
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var getChildTypeFromChildName = (childName) => {
  if (childName.match(/^([A-Za-z]+)Range(Calendar|Clock)$/)) {
    return "multi-panel-UI-view";
  }
  if (childName.match(/^([A-Za-z]*)(DigitalClock)$/)) {
    return "Tall-UI-view";
  }
  if (childName.match(/^Static([A-Za-z]+)/) || childName.match(/^([A-Za-z]+)(Calendar|Clock)$/)) {
    return "UI-view";
  }
  if (childName.match(/^MultiInput([A-Za-z]+)RangeField$/) || childName.match(/^([A-Za-z]+)RangePicker$/)) {
    return "multi-input-range-field";
  }
  if (childName.match(/^SingleInput([A-Za-z]+)RangeField$/)) {
    return "single-input-range-field";
  }
  return "single-input-field";
};
var getSupportedSectionFromChildName = (childName) => {
  if (childName.includes("DateTime")) {
    return "date-time";
  }
  if (childName.includes("Date")) {
    return "date";
  }
  return "time";
};
function DemoItem(props) {
  const {
    label,
    children,
    component,
    sx: sxProp
  } = props;
  let spacing;
  let sx = sxProp;
  if (component && getChildTypeFromChildName(component) === "multi-input-range-field") {
    spacing = 1.5;
    sx = _extends({}, sx, {
      [`& .${textFieldClasses_default.root}`]: {
        flexGrow: 1
      }
    });
  } else {
    spacing = 1;
  }
  return (0, import_jsx_runtime2.jsxs)(Stack_default, {
    direction: "column",
    alignItems: "stretch",
    spacing,
    sx,
    children: [label && (0, import_jsx_runtime.jsx)(Typography_default, {
      variant: "body2",
      children: label
    }), children]
  });
}
DemoItem.displayName = "DemoItem";
var isDemoItem = (child) => {
  if (React.isValidElement(child) && typeof child.type !== "string") {
    return child.type.displayName === "DemoItem";
  }
  return false;
};
function DemoContainer(props) {
  const {
    children,
    components,
    sx: sxProp
  } = props;
  const childrenTypes = /* @__PURE__ */ new Set();
  const childrenSupportedSections = /* @__PURE__ */ new Set();
  components.forEach((childName) => {
    childrenTypes.add(getChildTypeFromChildName(childName));
    childrenSupportedSections.add(getSupportedSectionFromChildName(childName));
  });
  const getSpacing = (direction2) => {
    if (direction2 === "row") {
      return childrenTypes.has("UI-view") || childrenTypes.has("Tall-UI-view") ? 3 : 2;
    }
    return childrenTypes.has("UI-view") ? 4 : 3;
  };
  let direction;
  let spacing;
  let extraSx = {};
  let demoItemSx = {};
  const sx = _extends({
    overflow: "auto",
    // Add padding as overflow can hide the outline text field label.
    pt: 1
  }, sxProp);
  if (components.length > 2 || childrenTypes.has("multi-input-range-field") || childrenTypes.has("single-input-range-field") || childrenTypes.has("multi-panel-UI-view") || childrenTypes.has("UI-view") || childrenSupportedSections.has("date-time")) {
    direction = "column";
    spacing = getSpacing("column");
  } else {
    direction = {
      xs: "column",
      lg: "row"
    };
    spacing = {
      xs: getSpacing("column"),
      lg: getSpacing("row")
    };
  }
  if (childrenTypes.has("UI-view")) {
  } else if (childrenTypes.has("single-input-range-field")) {
    if (!childrenSupportedSections.has("date-time")) {
      extraSx = {
        [`& > .${textFieldClasses_default.root}, & > .${pickersTextFieldClasses.root}`]: {
          minWidth: 300
        }
      };
    } else {
      extraSx = {
        [`& > .${textFieldClasses_default.root}, & > .${pickersTextFieldClasses.root}`]: {
          minWidth: {
            xs: 300,
            // If demo also contains MultiInputDateTimeRangeField, increase width to avoid cutting off the value.
            md: childrenTypes.has("multi-input-range-field") ? 460 : 400
          }
        }
      };
    }
  } else if (childrenSupportedSections.has("date-time")) {
    extraSx = {
      [`& > .${textFieldClasses_default.root}, & > .${pickersTextFieldClasses.root}`]: {
        minWidth: 270
      }
    };
    if (childrenTypes.has("multi-input-range-field")) {
      demoItemSx = {
        [`& > .${stackClasses_default.root} > .${textFieldClasses_default.root}, & > .${stackClasses_default.root} > .${pickersTextFieldClasses.root}`]: {
          minWidth: 210
        }
      };
    }
  } else {
    extraSx = {
      [`& > .${textFieldClasses_default.root}, & > .${pickersTextFieldClasses.root}`]: {
        minWidth: 200
      }
    };
  }
  const finalSx = _extends({}, sx, extraSx);
  return (0, import_jsx_runtime.jsx)(Stack_default, {
    direction,
    spacing,
    sx: finalSx,
    children: React.Children.map(children, (child) => {
      if (React.isValidElement(child) && isDemoItem(child)) {
        return React.cloneElement(child, {
          sx: _extends({}, extraSx, demoItemSx)
        });
      }
      return child;
    })
  });
}
export {
  DemoContainer,
  DemoItem
};
//# sourceMappingURL=@mui_x-date-pickers_internals_demo.js.map
