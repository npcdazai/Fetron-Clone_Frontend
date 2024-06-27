import {
  getPanelId,
  getTabId,
  useTabContext
} from "./chunk-LQI7IIZT.js";
import {
  Tabs_default
} from "./chunk-GXKHXEJ7.js";
import "./chunk-O2TK57UI.js";
import "./chunk-OGFVHOXD.js";
import "./chunk-D36YRMCG.js";
import "./chunk-LQHJAPLN.js";
import "./chunk-36USVHPP.js";
import "./chunk-BNIK2AUT.js";
import "./chunk-5SZXYZTF.js";
import "./chunk-EDQZ3PMS.js";
import "./chunk-JLSLPL4B.js";
import "./chunk-ZSA6EGSN.js";
import "./chunk-NP3OWEJ3.js";
import "./chunk-4EF566ZQ.js";
import "./chunk-RXGDTOTH.js";
import "./chunk-VQ6DFLGM.js";
import "./chunk-PFZ42PES.js";
import "./chunk-55NDJUPW.js";
import "./chunk-SRJVOYDD.js";
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
import "./chunk-YRRZ43LC.js";
import "./chunk-OTY6O57J.js";
import "./chunk-CCRBYHLB.js";
import {
  _objectWithoutPropertiesLoose
} from "./chunk-PSGUSLG5.js";
import {
  require_jsx_runtime
} from "./chunk-F7RKNM7B.js";
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
import {
  require_prop_types
} from "./chunk-2CMOOEJQ.js";
import {
  require_react
} from "./chunk-2PA4WPI3.js";
import {
  __toESM
} from "./chunk-ROME4SDB.js";

// node_modules/@mui/lab/TabList/TabList.js
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["children"];
var TabList = React.forwardRef(function TabList2(props, ref) {
  const {
    children: childrenProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const context = useTabContext();
  if (context === null) {
    throw new TypeError("No TabContext provided");
  }
  const children = React.Children.map(childrenProp, (child) => {
    if (!React.isValidElement(child)) {
      return null;
    }
    return React.cloneElement(child, {
      // SOMEDAY: `Tabs` will set those themselves
      "aria-controls": getPanelId(context, child.props.value),
      id: getTabId(context, child.props.value)
    });
  });
  return (0, import_jsx_runtime.jsx)(Tabs_default, _extends({}, other, {
    ref,
    value: context.value,
    children
  }));
});
true ? TabList.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * A list of `<Tab />` elements.
   */
  children: import_prop_types.default.node
} : void 0;
var TabList_default = TabList;
export {
  TabList_default as default
};
//# sourceMappingURL=@mui_lab_TabList.js.map
