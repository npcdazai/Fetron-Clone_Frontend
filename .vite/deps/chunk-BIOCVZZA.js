import {
  ButtonBase_default
} from "./chunk-OGFVHOXD.js";
import {
  createSvgIcon
} from "./chunk-55NDJUPW.js";
import {
  capitalize_default
} from "./chunk-SRJVOYDD.js";
import {
  styled_default
} from "./chunk-QOYICO4W.js";
import {
  useThemeProps
} from "./chunk-6F25EX6R.js";
import {
  clsx_default
} from "./chunk-CCRBYHLB.js";
import {
  _objectWithoutPropertiesLoose
} from "./chunk-PSGUSLG5.js";
import {
  require_jsx_runtime
} from "./chunk-F7RKNM7B.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses
} from "./chunk-HA5N2SSD.js";
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

// node_modules/@mui/material/TableSortLabel/TableSortLabel.js
init_extends();
var import_prop_types = __toESM(require_prop_types());
var React2 = __toESM(require_react());

// node_modules/@mui/material/internal/svg-icons/ArrowDownward.js
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ArrowDownward_default = createSvgIcon((0, import_jsx_runtime.jsx)("path", {
  d: "M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
}), "ArrowDownward");

// node_modules/@mui/material/TableSortLabel/tableSortLabelClasses.js
function getTableSortLabelUtilityClass(slot) {
  return generateUtilityClass("MuiTableSortLabel", slot);
}
var tableSortLabelClasses = generateUtilityClasses("MuiTableSortLabel", ["root", "active", "icon", "iconDirectionDesc", "iconDirectionAsc"]);
var tableSortLabelClasses_default = tableSortLabelClasses;

// node_modules/@mui/material/TableSortLabel/TableSortLabel.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var _excluded = ["active", "children", "className", "direction", "hideSortIcon", "IconComponent"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    direction,
    active
  } = ownerState;
  const slots = {
    root: ["root", active && "active"],
    icon: ["icon", `iconDirection${capitalize_default(direction)}`]
  };
  return composeClasses(slots, getTableSortLabelUtilityClass, classes);
};
var TableSortLabelRoot = styled_default(ButtonBase_default, {
  name: "MuiTableSortLabel",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.active && styles.active];
  }
})(({
  theme
}) => ({
  cursor: "pointer",
  display: "inline-flex",
  justifyContent: "flex-start",
  flexDirection: "inherit",
  alignItems: "center",
  "&:focus": {
    color: (theme.vars || theme).palette.text.secondary
  },
  "&:hover": {
    color: (theme.vars || theme).palette.text.secondary,
    [`& .${tableSortLabelClasses_default.icon}`]: {
      opacity: 0.5
    }
  },
  [`&.${tableSortLabelClasses_default.active}`]: {
    color: (theme.vars || theme).palette.text.primary,
    [`& .${tableSortLabelClasses_default.icon}`]: {
      opacity: 1,
      color: (theme.vars || theme).palette.text.secondary
    }
  }
}));
var TableSortLabelIcon = styled_default("span", {
  name: "MuiTableSortLabel",
  slot: "Icon",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.icon, styles[`iconDirection${capitalize_default(ownerState.direction)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  fontSize: 18,
  marginRight: 4,
  marginLeft: 4,
  opacity: 0,
  transition: theme.transitions.create(["opacity", "transform"], {
    duration: theme.transitions.duration.shorter
  }),
  userSelect: "none"
}, ownerState.direction === "desc" && {
  transform: "rotate(0deg)"
}, ownerState.direction === "asc" && {
  transform: "rotate(180deg)"
}));
var TableSortLabel = React2.forwardRef(function TableSortLabel2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTableSortLabel"
  });
  const {
    active = false,
    children,
    className,
    direction = "asc",
    hideSortIcon = false,
    IconComponent = ArrowDownward_default
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    active,
    direction,
    hideSortIcon,
    IconComponent
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime3.jsxs)(TableSortLabelRoot, _extends({
    className: clsx_default(classes.root, className),
    component: "span",
    disableRipple: true,
    ownerState,
    ref
  }, other, {
    children: [children, hideSortIcon && !active ? null : (0, import_jsx_runtime2.jsx)(TableSortLabelIcon, {
      as: IconComponent,
      className: clsx_default(classes.icon),
      ownerState
    })]
  }));
});
true ? TableSortLabel.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the label will have the active styling (should be true for the sorted column).
   * @default false
   */
  active: import_prop_types.default.bool,
  /**
   * Label contents, the arrow will be appended automatically.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The current sort direction.
   * @default 'asc'
   */
  direction: import_prop_types.default.oneOf(["asc", "desc"]),
  /**
   * Hide sort icon when active is false.
   * @default false
   */
  hideSortIcon: import_prop_types.default.bool,
  /**
   * Sort icon to use.
   * @default ArrowDownwardIcon
   */
  IconComponent: import_prop_types.default.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var TableSortLabel_default = TableSortLabel;

export {
  getTableSortLabelUtilityClass,
  tableSortLabelClasses_default,
  TableSortLabel_default
};
//# sourceMappingURL=chunk-BIOCVZZA.js.map
