import {
  autoUpdate,
  flip,
  offset,
  useFloating
} from "./chunk-7SO26J3D.js";
import {
  createPopper
} from "./chunk-T22YZR45.js";
import {
  require_react_dom
} from "./chunk-OTY6O57J.js";
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
  HTMLElementType,
  chainPropTypes,
  createChainedFunction,
  debounce,
  elementAcceptingRef_default,
  exactProp,
  getScrollbarSize,
  integerPropType_default,
  ownerDocument,
  ownerWindow,
  refType_default,
  useEventCallback_default,
  useIsFocusVisible,
  usePreviousProps_default,
  visuallyHidden_default
} from "./chunk-NWNPM2ZU.js";
import {
  useEnhancedEffect_default
} from "./chunk-RPXFFOYT.js";
import {
  useControlled,
  useId
} from "./chunk-ZTXVWYLJ.js";
import {
  setRef,
  useForkRef
} from "./chunk-D25FWIIA.js";
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

// node_modules/@mui/lab/node_modules/@mui/base/utils/appendOwnerState.js
init_extends();

// node_modules/@mui/lab/node_modules/@mui/base/utils/isHostComponent.js
function isHostComponent(element) {
  return typeof element === "string";
}

// node_modules/@mui/lab/node_modules/@mui/base/utils/appendOwnerState.js
function appendOwnerState(elementType, otherProps, ownerState) {
  if (elementType === void 0 || isHostComponent(elementType)) {
    return otherProps;
  }
  return _extends({}, otherProps, {
    ownerState: _extends({}, otherProps.ownerState, ownerState)
  });
}

// node_modules/@mui/lab/node_modules/@mui/base/utils/areArraysEqual.js
function areArraysEqual(array1, array2, itemComparer = (a, b) => a === b) {
  return array1.length === array2.length && array1.every((value, index) => itemComparer(value, array2[index]));
}

// node_modules/@mui/lab/node_modules/@mui/base/utils/ClassNameConfigurator.js
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var defaultContextValue = {
  disableDefaultClasses: false
};
var ClassNameConfiguratorContext = React.createContext(defaultContextValue);
function useClassNamesOverride(generateUtilityClass2) {
  const {
    disableDefaultClasses
  } = React.useContext(ClassNameConfiguratorContext);
  return (slot) => {
    if (disableDefaultClasses) {
      return "";
    }
    return generateUtilityClass2(slot);
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/utils/extractEventHandlers.js
function extractEventHandlers(object, excludeKeys = []) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => prop.match(/^on[A-Z]/) && typeof object[prop] === "function" && !excludeKeys.includes(prop)).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}

// node_modules/@mui/lab/node_modules/@mui/base/utils/resolveComponentProps.js
function resolveComponentProps(componentProps, ownerState, slotState) {
  if (typeof componentProps === "function") {
    return componentProps(ownerState, slotState);
  }
  return componentProps;
}

// node_modules/@mui/lab/node_modules/@mui/base/utils/useSlotProps.js
init_extends();

// node_modules/@mui/lab/node_modules/@mui/base/utils/mergeSlotProps.js
init_extends();

// node_modules/@mui/lab/node_modules/@mui/base/utils/omitEventHandlers.js
function omitEventHandlers(object) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === "function")).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}

// node_modules/@mui/lab/node_modules/@mui/base/utils/mergeSlotProps.js
function mergeSlotProps(parameters) {
  const {
    getSlotProps,
    additionalProps,
    externalSlotProps,
    externalForwardedProps,
    className
  } = parameters;
  if (!getSlotProps) {
    const joinedClasses2 = clsx_default(externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className, className, additionalProps == null ? void 0 : additionalProps.className);
    const mergedStyle2 = _extends({}, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
    const props2 = _extends({}, additionalProps, externalForwardedProps, externalSlotProps);
    if (joinedClasses2.length > 0) {
      props2.className = joinedClasses2;
    }
    if (Object.keys(mergedStyle2).length > 0) {
      props2.style = mergedStyle2;
    }
    return {
      props: props2,
      internalRef: void 0
    };
  }
  const eventHandlers = extractEventHandlers(_extends({}, externalForwardedProps, externalSlotProps));
  const componentsPropsWithoutEventHandlers = omitEventHandlers(externalSlotProps);
  const otherPropsWithoutEventHandlers = omitEventHandlers(externalForwardedProps);
  const internalSlotProps = getSlotProps(eventHandlers);
  const joinedClasses = clsx_default(internalSlotProps == null ? void 0 : internalSlotProps.className, additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
  const mergedStyle = _extends({}, internalSlotProps == null ? void 0 : internalSlotProps.style, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
  const props = _extends({}, internalSlotProps, additionalProps, otherPropsWithoutEventHandlers, componentsPropsWithoutEventHandlers);
  if (joinedClasses.length > 0) {
    props.className = joinedClasses;
  }
  if (Object.keys(mergedStyle).length > 0) {
    props.style = mergedStyle;
  }
  return {
    props,
    internalRef: internalSlotProps.ref
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/utils/useSlotProps.js
var _excluded = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function useSlotProps(parameters) {
  var _parameters$additiona;
  const {
    elementType,
    externalSlotProps,
    ownerState,
    skipResolvingSlotProps = false
  } = parameters, rest = _objectWithoutPropertiesLoose(parameters, _excluded);
  const resolvedComponentsProps = skipResolvingSlotProps ? {} : resolveComponentProps(externalSlotProps, ownerState);
  const {
    props: mergedProps,
    internalRef
  } = mergeSlotProps(_extends({}, rest, {
    externalSlotProps: resolvedComponentsProps
  }));
  const ref = useForkRef(internalRef, resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, (_parameters$additiona = parameters.additionalProps) == null ? void 0 : _parameters$additiona.ref);
  const props = appendOwnerState(elementType, _extends({}, mergedProps, {
    ref
  }), ownerState);
  return props;
}

// node_modules/@mui/lab/node_modules/@mui/base/utils/prepareForSlot.js
init_extends();
var React2 = __toESM(require_react());

// node_modules/@mui/lab/node_modules/@mui/base/Badge/Badge.js
init_extends();
var React3 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/useBadge/useBadge.js
function useBadge(parameters) {
  const {
    badgeContent: badgeContentProp,
    invisible: invisibleProp = false,
    max: maxProp = 99,
    showZero = false
  } = parameters;
  const prevProps = usePreviousProps_default({
    badgeContent: badgeContentProp,
    max: maxProp
  });
  let invisible = invisibleProp;
  if (invisibleProp === false && badgeContentProp === 0 && !showZero) {
    invisible = true;
  }
  const {
    badgeContent,
    max = maxProp
  } = invisible ? prevProps : parameters;
  const displayValue = badgeContent && Number(badgeContent) > max ? `${max}+` : badgeContent;
  return {
    badgeContent,
    invisible,
    max,
    displayValue
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/Badge/badgeClasses.js
function getBadgeUtilityClass(slot) {
  return generateUtilityClass("MuiBadge", slot);
}
var badgeClasses = generateUtilityClasses("MuiBadge", ["root", "badge", "invisible"]);

// node_modules/@mui/lab/node_modules/@mui/base/Badge/Badge.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var _excluded2 = ["badgeContent", "children", "invisible", "max", "slotProps", "slots", "showZero"];
var useUtilityClasses = (ownerState) => {
  const {
    invisible
  } = ownerState;
  const slots = {
    root: ["root"],
    badge: ["badge", invisible && "invisible"]
  };
  return composeClasses(slots, useClassNamesOverride(getBadgeUtilityClass));
};
var Badge = React3.forwardRef(function Badge2(props, forwardedRef) {
  var _slots$root, _slots$badge;
  const {
    children,
    max: maxProp = 99,
    slotProps = {},
    slots = {},
    showZero = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const {
    badgeContent,
    max,
    displayValue,
    invisible
  } = useBadge(_extends({}, props, {
    max: maxProp
  }));
  const ownerState = _extends({}, props, {
    badgeContent,
    invisible,
    max,
    showZero
  });
  const classes = useUtilityClasses(ownerState);
  const Root = (_slots$root = slots.root) != null ? _slots$root : "span";
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  const BadgeComponent = (_slots$badge = slots.badge) != null ? _slots$badge : "span";
  const badgeProps = useSlotProps({
    elementType: BadgeComponent,
    externalSlotProps: slotProps.badge,
    ownerState,
    className: classes.badge
  });
  return (0, import_jsx_runtime3.jsxs)(Root, _extends({}, rootProps, {
    children: [children, (0, import_jsx_runtime2.jsx)(BadgeComponent, _extends({}, badgeProps, {
      children: displayValue
    }))]
  }));
});
true ? Badge.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content rendered within the badge.
   */
  badgeContent: import_prop_types.default.node,
  /**
   * The badge will be added relative to this node.
   */
  children: import_prop_types.default.node,
  /**
   * If `true`, the badge is invisible.
   * @default false
   */
  invisible: import_prop_types.default.bool,
  /**
   * Max count to show.
   * @default 99
   */
  max: import_prop_types.default.number,
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  showZero: import_prop_types.default.bool,
  /**
   * The props used for each slot inside the Badge.
   * @default {}
   */
  slotProps: import_prop_types.default.shape({
    badge: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
  }),
  /**
   * The components used for each slot inside the Badge.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types.default.shape({
    badge: import_prop_types.default.elementType,
    root: import_prop_types.default.elementType
  })
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/Button/Button.js
init_extends();
var React5 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/Button/buttonClasses.js
function getButtonUtilityClass(slot) {
  return generateUtilityClass("MuiButton", slot);
}
var buttonClasses = generateUtilityClasses("MuiButton", ["root", "active", "disabled", "focusVisible"]);

// node_modules/@mui/lab/node_modules/@mui/base/useButton/useButton.js
init_extends();
var React4 = __toESM(require_react());
function useButton(parameters = {}) {
  const {
    disabled = false,
    focusableWhenDisabled,
    href,
    rootRef: externalRef,
    tabIndex,
    to,
    type
  } = parameters;
  const buttonRef = React4.useRef();
  const [active, setActive] = React4.useState(false);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React4.useState(false);
  if (disabled && !focusableWhenDisabled && focusVisible) {
    setFocusVisible(false);
  }
  React4.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  const [hostElementName, setHostElementName] = React4.useState("");
  const createHandleMouseLeave = (otherHandlers) => (event) => {
    var _otherHandlers$onMous;
    if (focusVisible) {
      event.preventDefault();
    }
    (_otherHandlers$onMous = otherHandlers.onMouseLeave) == null || _otherHandlers$onMous.call(otherHandlers, event);
  };
  const createHandleBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null || _otherHandlers$onBlur.call(otherHandlers, event);
  };
  const createHandleFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu2;
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      var _otherHandlers$onFocu;
      setFocusVisible(true);
      (_otherHandlers$onFocu = otherHandlers.onFocusVisible) == null || _otherHandlers$onFocu.call(otherHandlers, event);
    }
    (_otherHandlers$onFocu2 = otherHandlers.onFocus) == null || _otherHandlers$onFocu2.call(otherHandlers, event);
  };
  const isNativeButton = () => {
    const button = buttonRef.current;
    return hostElementName === "BUTTON" || hostElementName === "INPUT" && ["button", "submit", "reset"].includes(button == null ? void 0 : button.type) || hostElementName === "A" && (button == null ? void 0 : button.href);
  };
  const createHandleClick = (otherHandlers) => (event) => {
    if (!disabled) {
      var _otherHandlers$onClic;
      (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
    }
  };
  const createHandleMouseDown = (otherHandlers) => (event) => {
    var _otherHandlers$onMous2;
    if (!disabled) {
      setActive(true);
      document.addEventListener("mouseup", () => {
        setActive(false);
      }, {
        once: true
      });
    }
    (_otherHandlers$onMous2 = otherHandlers.onMouseDown) == null || _otherHandlers$onMous2.call(otherHandlers, event);
  };
  const createHandleKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.target === event.currentTarget && !isNativeButton() && event.key === " ") {
      event.preventDefault();
    }
    if (event.target === event.currentTarget && event.key === " " && !disabled) {
      setActive(true);
    }
    if (event.target === event.currentTarget && !isNativeButton() && event.key === "Enter" && !disabled) {
      var _otherHandlers$onClic2;
      (_otherHandlers$onClic2 = otherHandlers.onClick) == null || _otherHandlers$onClic2.call(otherHandlers, event);
      event.preventDefault();
    }
  };
  const createHandleKeyUp = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyU;
    if (event.target === event.currentTarget) {
      setActive(false);
    }
    (_otherHandlers$onKeyU = otherHandlers.onKeyUp) == null || _otherHandlers$onKeyU.call(otherHandlers, event);
    if (event.target === event.currentTarget && !isNativeButton() && !disabled && event.key === " " && !event.defaultMuiPrevented) {
      var _otherHandlers$onClic3;
      (_otherHandlers$onClic3 = otherHandlers.onClick) == null || _otherHandlers$onClic3.call(otherHandlers, event);
    }
  };
  const updateHostElementName = React4.useCallback((instance) => {
    var _instance$tagName;
    setHostElementName((_instance$tagName = instance == null ? void 0 : instance.tagName) != null ? _instance$tagName : "");
  }, []);
  const handleRef = useForkRef(updateHostElementName, externalRef, focusVisibleRef, buttonRef);
  const buttonProps = {};
  if (tabIndex !== void 0) {
    buttonProps.tabIndex = tabIndex;
  }
  if (hostElementName === "BUTTON") {
    buttonProps.type = type != null ? type : "button";
    if (focusableWhenDisabled) {
      buttonProps["aria-disabled"] = disabled;
    } else {
      buttonProps.disabled = disabled;
    }
  } else if (hostElementName !== "") {
    if (!href && !to) {
      buttonProps.role = "button";
      buttonProps.tabIndex = tabIndex != null ? tabIndex : 0;
    }
    if (disabled) {
      buttonProps["aria-disabled"] = disabled;
      buttonProps.tabIndex = focusableWhenDisabled ? tabIndex != null ? tabIndex : 0 : -1;
    }
  }
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = _extends({}, extractEventHandlers(parameters), extractEventHandlers(externalProps));
    const props = _extends({
      type
    }, externalEventHandlers, buttonProps, externalProps, {
      onBlur: createHandleBlur(externalEventHandlers),
      onClick: createHandleClick(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      onKeyUp: createHandleKeyUp(externalEventHandlers),
      onMouseDown: createHandleMouseDown(externalEventHandlers),
      onMouseLeave: createHandleMouseLeave(externalEventHandlers),
      ref: handleRef
    });
    delete props.onFocusVisible;
    return props;
  };
  return {
    getRootProps,
    focusVisible,
    setFocusVisible,
    active,
    rootRef: handleRef
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/Button/Button.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var _excluded3 = ["action", "children", "disabled", "focusableWhenDisabled", "onFocusVisible", "slotProps", "slots"];
var useUtilityClasses2 = (ownerState) => {
  const {
    active,
    disabled,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible", active && "active"]
  };
  return composeClasses(slots, useClassNamesOverride(getButtonUtilityClass));
};
var Button = React5.forwardRef(function Button2(props, forwardedRef) {
  var _slots$root;
  const {
    action,
    children,
    focusableWhenDisabled = false,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded3);
  const buttonRef = React5.useRef();
  const {
    active,
    focusVisible,
    setFocusVisible,
    getRootProps
  } = useButton(_extends({}, props, {
    focusableWhenDisabled
  }));
  React5.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), [setFocusVisible]);
  const ownerState = _extends({}, props, {
    active,
    focusableWhenDisabled,
    focusVisible
  });
  const classes = useUtilityClasses2(ownerState);
  const defaultElement = other.href || other.to ? "a" : "button";
  const Root = (_slots$root = slots.root) != null ? _slots$root : defaultElement;
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  return (0, import_jsx_runtime4.jsx)(Root, _extends({}, rootProps, {
    children
  }));
});
true ? Button.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.shape({
    current: import_prop_types2.default.shape({
      focusVisible: import_prop_types2.default.func.isRequired
    })
  })]),
  /**
   * @ignore
   */
  children: import_prop_types2.default.node,
  /**
   * @ignore
   */
  className: import_prop_types2.default.string,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types2.default.bool,
  /**
   * If `true`, allows a disabled button to receive focus.
   * @default false
   */
  focusableWhenDisabled: import_prop_types2.default.bool,
  /**
   * @ignore
   */
  href: import_prop_types2.default.string,
  /**
   * @ignore
   */
  onFocusVisible: import_prop_types2.default.func,
  /**
   * The props used for each slot inside the Button.
   * @default {}
   */
  slotProps: import_prop_types2.default.shape({
    root: import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object])
  }),
  /**
   * The components used for each slot inside the Button.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types2.default.shape({
    root: import_prop_types2.default.elementType
  }),
  /**
   * @ignore
   */
  to: import_prop_types2.default.string
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/ClickAwayListener/ClickAwayListener.js
var React6 = __toESM(require_react());
var import_prop_types3 = __toESM(require_prop_types());
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
function mapEventPropToEvent(eventProp) {
  return eventProp.substring(2).toLowerCase();
}
function clickedRootScrollbar(event, doc) {
  return doc.documentElement.clientWidth < event.clientX || doc.documentElement.clientHeight < event.clientY;
}
function ClickAwayListener(props) {
  const {
    children,
    disableReactTree = false,
    mouseEvent = "onClick",
    onClickAway,
    touchEvent = "onTouchEnd"
  } = props;
  const movedRef = React6.useRef(false);
  const nodeRef = React6.useRef(null);
  const activatedRef = React6.useRef(false);
  const syntheticEventRef = React6.useRef(false);
  React6.useEffect(() => {
    setTimeout(() => {
      activatedRef.current = true;
    }, 0);
    return () => {
      activatedRef.current = false;
    };
  }, []);
  const handleRef = useForkRef(
    // @ts-expect-error TODO upstream fix
    children.ref,
    nodeRef
  );
  const handleClickAway = useEventCallback_default((event) => {
    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;
    const doc = ownerDocument(nodeRef.current);
    if (!activatedRef.current || !nodeRef.current || "clientX" in event && clickedRootScrollbar(event, doc)) {
      return;
    }
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    let insideDOM;
    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM = !doc.documentElement.contains(
        // @ts-expect-error returns `false` as intended when not dispatched from a Node
        event.target
      ) || nodeRef.current.contains(
        // @ts-expect-error returns `false` as intended when not dispatched from a Node
        event.target
      );
    }
    if (!insideDOM && (disableReactTree || !insideReactTree)) {
      onClickAway(event);
    }
  });
  const createHandleSynthetic = (handlerName) => (event) => {
    syntheticEventRef.current = true;
    const childrenPropsHandler = children.props[handlerName];
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const childrenProps = {
    ref: handleRef
  };
  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
  }
  React6.useEffect(() => {
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent);
      const doc = ownerDocument(nodeRef.current);
      const handleTouchMove = () => {
        movedRef.current = true;
      };
      doc.addEventListener(mappedTouchEvent, handleClickAway);
      doc.addEventListener("touchmove", handleTouchMove);
      return () => {
        doc.removeEventListener(mappedTouchEvent, handleClickAway);
        doc.removeEventListener("touchmove", handleTouchMove);
      };
    }
    return void 0;
  }, [handleClickAway, touchEvent]);
  if (mouseEvent !== false) {
    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
  }
  React6.useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      const doc = ownerDocument(nodeRef.current);
      doc.addEventListener(mappedMouseEvent, handleClickAway);
      return () => {
        doc.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }
    return void 0;
  }, [handleClickAway, mouseEvent]);
  return (0, import_jsx_runtime5.jsx)(React6.Fragment, {
    children: React6.cloneElement(children, childrenProps)
  });
}
true ? ClickAwayListener.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The wrapped element.
   */
  children: elementAcceptingRef_default.isRequired,
  /**
   * If `true`, the React tree is ignored and only the DOM tree is considered.
   * This prop changes how portaled elements are handled.
   * @default false
   */
  disableReactTree: import_prop_types3.default.bool,
  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   * @default 'onClick'
   */
  mouseEvent: import_prop_types3.default.oneOf(["onClick", "onMouseDown", "onMouseUp", "onPointerDown", "onPointerUp", false]),
  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: import_prop_types3.default.func.isRequired,
  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   * @default 'onTouchEnd'
   */
  touchEvent: import_prop_types3.default.oneOf(["onTouchEnd", "onTouchStart", false])
} : void 0;
if (true) {
  ClickAwayListener["propTypes"] = exactProp(ClickAwayListener.propTypes);
}

// node_modules/@mui/lab/node_modules/@mui/base/Dropdown/Dropdown.js
var React10 = __toESM(require_react());
var import_prop_types4 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/useDropdown/DropdownContext.js
var React7 = __toESM(require_react());
var DropdownContext = React7.createContext(null);

// node_modules/@mui/lab/node_modules/@mui/base/useDropdown/useDropdown.js
var React9 = __toESM(require_react());

// node_modules/@mui/lab/node_modules/@mui/base/utils/useControllableReducer.js
init_extends();
var React8 = __toESM(require_react());
function areEqual(a, b) {
  return a === b;
}
var EMPTY_OBJECT = {};
var NOOP = () => {
};
function getControlledState(internalState, controlledProps) {
  const augmentedState = _extends({}, internalState);
  Object.keys(controlledProps).forEach((key) => {
    if (controlledProps[key] !== void 0) {
      augmentedState[key] = controlledProps[key];
    }
  });
  return augmentedState;
}
function useStateChangeDetection(parameters) {
  const {
    nextState,
    initialState,
    stateComparers,
    onStateChange,
    controlledProps,
    lastActionRef
  } = parameters;
  const internalPreviousStateRef = React8.useRef(initialState);
  React8.useEffect(() => {
    if (lastActionRef.current === null) {
      return;
    }
    const previousState = getControlledState(internalPreviousStateRef.current, controlledProps);
    Object.keys(nextState).forEach((key) => {
      var _stateComparers$key;
      const stateComparer = (_stateComparers$key = stateComparers[key]) != null ? _stateComparers$key : areEqual;
      const nextStateItem = nextState[key];
      const previousStateItem = previousState[key];
      if (previousStateItem == null && nextStateItem != null || previousStateItem != null && nextStateItem == null || previousStateItem != null && nextStateItem != null && !stateComparer(nextStateItem, previousStateItem)) {
        var _event, _type;
        onStateChange == null || onStateChange((_event = lastActionRef.current.event) != null ? _event : null, key, nextStateItem, (_type = lastActionRef.current.type) != null ? _type : "", nextState);
      }
    });
    internalPreviousStateRef.current = nextState;
    lastActionRef.current = null;
  }, [internalPreviousStateRef, nextState, lastActionRef, onStateChange, stateComparers, controlledProps]);
}
function useControllableReducer(parameters) {
  const lastActionRef = React8.useRef(null);
  const {
    reducer,
    initialState,
    controlledProps = EMPTY_OBJECT,
    stateComparers = EMPTY_OBJECT,
    onStateChange = NOOP,
    actionContext
  } = parameters;
  const reducerWithControlledState = React8.useCallback((state, action) => {
    lastActionRef.current = action;
    const controlledState = getControlledState(state, controlledProps);
    const newState = reducer(controlledState, action);
    return newState;
  }, [controlledProps, reducer]);
  const [nextState, dispatch] = React8.useReducer(reducerWithControlledState, initialState);
  const dispatchWithContext = React8.useCallback((action) => {
    dispatch(_extends({}, action, {
      context: actionContext
    }));
  }, [actionContext]);
  useStateChangeDetection({
    nextState,
    initialState,
    stateComparers: stateComparers != null ? stateComparers : EMPTY_OBJECT,
    onStateChange: onStateChange != null ? onStateChange : NOOP,
    controlledProps,
    lastActionRef
  });
  return [getControlledState(nextState, controlledProps), dispatchWithContext];
}

// node_modules/@mui/lab/node_modules/@mui/base/useDropdown/useDropdown.types.js
var DropdownActionTypes = {
  blur: "dropdown:blur",
  escapeKeyDown: "dropdown:escapeKeyDown",
  toggle: "dropdown:toggle",
  open: "dropdown:open",
  close: "dropdown:close"
};

// node_modules/@mui/lab/node_modules/@mui/base/useDropdown/dropdownReducer.js
function dropdownReducer(state, action) {
  switch (action.type) {
    case DropdownActionTypes.blur:
      return {
        open: false
      };
    case DropdownActionTypes.escapeKeyDown:
      return {
        open: false
      };
    case DropdownActionTypes.toggle:
      return {
        open: !state.open
      };
    case DropdownActionTypes.open:
      return {
        open: true
      };
    case DropdownActionTypes.close:
      return {
        open: false
      };
    default:
      throw new Error(`Unhandled action`);
  }
}

// node_modules/@mui/lab/node_modules/@mui/base/useDropdown/useDropdown.js
function useDropdown(parameters = {}) {
  const {
    defaultOpen,
    onOpenChange,
    open: openProp
  } = parameters;
  const [popupId, setPopupId] = React9.useState("");
  const [triggerElement, setTriggerElement] = React9.useState(null);
  const lastActionType = React9.useRef(null);
  const handleStateChange = React9.useCallback((event, field, value, reason) => {
    if (field === "open") {
      onOpenChange == null || onOpenChange(event, value);
    }
    lastActionType.current = reason;
  }, [onOpenChange]);
  const controlledProps = React9.useMemo(() => openProp !== void 0 ? {
    open: openProp
  } : {}, [openProp]);
  const [state, dispatch] = useControllableReducer({
    controlledProps,
    initialState: defaultOpen ? {
      open: true
    } : {
      open: false
    },
    onStateChange: handleStateChange,
    reducer: dropdownReducer
  });
  React9.useEffect(() => {
    if (!state.open && lastActionType.current !== null && lastActionType.current !== DropdownActionTypes.blur) {
      triggerElement == null || triggerElement.focus();
    }
  }, [state.open, triggerElement]);
  const contextValue = {
    state,
    dispatch,
    popupId,
    registerPopup: setPopupId,
    registerTrigger: setTriggerElement,
    triggerElement
  };
  return {
    contextValue,
    open: state.open
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/Dropdown/Dropdown.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
function Dropdown(props) {
  const {
    children,
    open,
    defaultOpen,
    onOpenChange
  } = props;
  const {
    contextValue
  } = useDropdown({
    defaultOpen,
    onOpenChange,
    open
  });
  return (0, import_jsx_runtime6.jsx)(DropdownContext.Provider, {
    value: contextValue,
    children
  });
}
true ? Dropdown.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: import_prop_types4.default.node,
  /**
   * If `true`, the dropdown is initially open.
   */
  defaultOpen: import_prop_types4.default.bool,
  /**
   * Callback fired when the component requests to be opened or closed.
   */
  onOpenChange: import_prop_types4.default.func,
  /**
   * Allows to control whether the dropdown is open.
   * This is a controlled counterpart of `defaultOpen`.
   */
  open: import_prop_types4.default.bool
} : void 0;
if (true) {
  Dropdown["propTypes"] = exactProp(Dropdown.propTypes);
}

// node_modules/@mui/lab/node_modules/@mui/base/FocusTrap/FocusTrap.js
var React11 = __toESM(require_react());
var import_prop_types5 = __toESM(require_prop_types());
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var candidatesSelector = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function getTabIndex(node) {
  const tabindexAttr = parseInt(node.getAttribute("tabindex") || "", 10);
  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  }
  if (node.contentEditable === "true" || (node.nodeName === "AUDIO" || node.nodeName === "VIDEO" || node.nodeName === "DETAILS") && node.getAttribute("tabindex") === null) {
    return 0;
  }
  return node.tabIndex;
}
function isNonTabbableRadio(node) {
  if (node.tagName !== "INPUT" || node.type !== "radio") {
    return false;
  }
  if (!node.name) {
    return false;
  }
  const getRadio = (selector) => node.ownerDocument.querySelector(`input[type="radio"]${selector}`);
  let roving = getRadio(`[name="${node.name}"]:checked`);
  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`);
  }
  return roving !== node;
}
function isNodeMatchingSelectorFocusable(node) {
  if (node.disabled || node.tagName === "INPUT" && node.type === "hidden" || isNonTabbableRadio(node)) {
    return false;
  }
  return true;
}
function defaultGetTabbable(root) {
  const regularTabNodes = [];
  const orderedTabNodes = [];
  Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i) => {
    const nodeTabIndex = getTabIndex(node);
    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) {
      return;
    }
    if (nodeTabIndex === 0) {
      regularTabNodes.push(node);
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node
      });
    }
  });
  return orderedTabNodes.sort((a, b) => a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex).map((a) => a.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
  return true;
}
function FocusTrap(props) {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getTabbable = defaultGetTabbable,
    isEnabled = defaultIsEnabled,
    open
  } = props;
  const ignoreNextEnforceFocus = React11.useRef(false);
  const sentinelStart = React11.useRef(null);
  const sentinelEnd = React11.useRef(null);
  const nodeToRestore = React11.useRef(null);
  const reactFocusEventTarget = React11.useRef(null);
  const activated = React11.useRef(false);
  const rootRef = React11.useRef(null);
  const handleRef = useForkRef(children.ref, rootRef);
  const lastKeydown = React11.useRef(null);
  React11.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);
  React11.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    if (!rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute("tabIndex")) {
        if (true) {
          console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join("\n"));
        }
        rootRef.current.setAttribute("tabIndex", "-1");
      }
      if (activated.current) {
        rootRef.current.focus();
      }
    }
    return () => {
      if (!disableRestoreFocus) {
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          ignoreNextEnforceFocus.current = true;
          nodeToRestore.current.focus();
        }
        nodeToRestore.current = null;
      }
    };
  }, [open]);
  React11.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    const loopFocus = (nativeEvent) => {
      lastKeydown.current = nativeEvent;
      if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== "Tab") {
        return;
      }
      if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
        ignoreNextEnforceFocus.current = true;
        if (sentinelEnd.current) {
          sentinelEnd.current.focus();
        }
      }
    };
    const contain = () => {
      const rootElement = rootRef.current;
      if (rootElement === null) {
        return;
      }
      if (!doc.hasFocus() || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }
      if (rootElement.contains(doc.activeElement)) {
        return;
      }
      if (disableEnforceFocus && doc.activeElement !== sentinelStart.current && doc.activeElement !== sentinelEnd.current) {
        return;
      }
      if (doc.activeElement !== reactFocusEventTarget.current) {
        reactFocusEventTarget.current = null;
      } else if (reactFocusEventTarget.current !== null) {
        return;
      }
      if (!activated.current) {
        return;
      }
      let tabbable = [];
      if (doc.activeElement === sentinelStart.current || doc.activeElement === sentinelEnd.current) {
        tabbable = getTabbable(rootRef.current);
      }
      if (tabbable.length > 0) {
        var _lastKeydown$current, _lastKeydown$current2;
        const isShiftTab = Boolean(((_lastKeydown$current = lastKeydown.current) == null ? void 0 : _lastKeydown$current.shiftKey) && ((_lastKeydown$current2 = lastKeydown.current) == null ? void 0 : _lastKeydown$current2.key) === "Tab");
        const focusNext = tabbable[0];
        const focusPrevious = tabbable[tabbable.length - 1];
        if (typeof focusNext !== "string" && typeof focusPrevious !== "string") {
          if (isShiftTab) {
            focusPrevious.focus();
          } else {
            focusNext.focus();
          }
        }
      } else {
        rootElement.focus();
      }
    };
    doc.addEventListener("focusin", contain);
    doc.addEventListener("keydown", loopFocus, true);
    const interval = setInterval(() => {
      if (doc.activeElement && doc.activeElement.tagName === "BODY") {
        contain();
      }
    }, 50);
    return () => {
      clearInterval(interval);
      doc.removeEventListener("focusin", contain);
      doc.removeEventListener("keydown", loopFocus, true);
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open, getTabbable]);
  const onFocus = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
    reactFocusEventTarget.current = event.target;
    const childrenPropsHandler = children.props.onFocus;
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const handleFocusSentinel = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
  };
  return (0, import_jsx_runtime8.jsxs)(React11.Fragment, {
    children: [(0, import_jsx_runtime7.jsx)("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelStart,
      "data-testid": "sentinelStart"
    }), React11.cloneElement(children, {
      ref: handleRef,
      onFocus
    }), (0, import_jsx_runtime7.jsx)("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelEnd,
      "data-testid": "sentinelEnd"
    })]
  });
}
true ? FocusTrap.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A single child content element.
   */
  children: elementAcceptingRef_default,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: import_prop_types5.default.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: import_prop_types5.default.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: import_prop_types5.default.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: import_prop_types5.default.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: import_prop_types5.default.func,
  /**
   * If `true`, focus is locked.
   */
  open: import_prop_types5.default.bool.isRequired
} : void 0;
if (true) {
  FocusTrap["propTypes"] = exactProp(FocusTrap.propTypes);
}

// node_modules/@mui/lab/node_modules/@mui/base/FormControl/FormControl.js
init_extends();
var React13 = __toESM(require_react());
var import_prop_types6 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/FormControl/FormControlContext.js
var React12 = __toESM(require_react());
var FormControlContext = React12.createContext(void 0);
if (true) {
  FormControlContext.displayName = "FormControlContext";
}

// node_modules/@mui/lab/node_modules/@mui/base/FormControl/formControlClasses.js
function getFormControlUtilityClass(slot) {
  return generateUtilityClass("MuiFormControl", slot);
}
var formControlClasses = generateUtilityClasses("MuiFormControl", ["root", "disabled", "error", "filled", "focused", "required"]);

// node_modules/@mui/lab/node_modules/@mui/base/FormControl/FormControl.js
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
var _excluded4 = ["defaultValue", "children", "disabled", "error", "onChange", "required", "slotProps", "slots", "value"];
function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0) && value !== "";
}
function useUtilityClasses3(ownerState) {
  const {
    disabled,
    error,
    filled,
    focused,
    required
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focused && "focused", error && "error", filled && "filled", required && "required"]
  };
  return composeClasses(slots, useClassNamesOverride(getFormControlUtilityClass));
}
var FormControl = React13.forwardRef(function FormControl2(props, forwardedRef) {
  var _slots$root;
  const {
    defaultValue,
    children,
    disabled = false,
    error = false,
    onChange,
    required = false,
    slotProps = {},
    slots = {},
    value: incomingValue
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded4);
  const [value, setValue] = useControlled({
    controlled: incomingValue,
    default: defaultValue,
    name: "FormControl",
    state: "value"
  });
  const filled = hasValue(value);
  const [focusedState, setFocused] = React13.useState(false);
  const focused = focusedState && !disabled;
  React13.useEffect(() => setFocused((isFocused) => disabled ? false : isFocused), [disabled]);
  const ownerState = _extends({}, props, {
    disabled,
    error,
    filled,
    focused,
    required
  });
  const childContext = React13.useMemo(() => {
    return {
      disabled,
      error,
      filled,
      focused,
      onBlur: () => {
        setFocused(false);
      },
      onChange: (event) => {
        setValue(event.target.value);
        onChange == null || onChange(event);
      },
      onFocus: () => {
        setFocused(true);
      },
      required,
      value: value != null ? value : ""
    };
  }, [disabled, error, filled, focused, onChange, required, setValue, value]);
  const classes = useUtilityClasses3(ownerState);
  const renderChildren = () => {
    if (typeof children === "function") {
      return children(childContext);
    }
    return children;
  };
  const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef,
      children: renderChildren()
    },
    ownerState,
    className: classes.root
  });
  return (0, import_jsx_runtime9.jsx)(FormControlContext.Provider, {
    value: childContext,
    children: (0, import_jsx_runtime9.jsx)(Root, _extends({}, rootProps))
  });
});
true ? FormControl.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: import_prop_types6.default.oneOfType([import_prop_types6.default.node, import_prop_types6.default.func]),
  /**
   * Class name applied to the root element.
   */
  className: import_prop_types6.default.string,
  /**
   * @ignore
   */
  defaultValue: import_prop_types6.default.any,
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled: import_prop_types6.default.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: import_prop_types6.default.bool,
  /**
   * Callback fired when the form element's value is modified.
   */
  onChange: import_prop_types6.default.func,
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required: import_prop_types6.default.bool,
  /**
   * The props used for each slot inside the FormControl.
   * @default {}
   */
  slotProps: import_prop_types6.default.shape({
    root: import_prop_types6.default.oneOfType([import_prop_types6.default.func, import_prop_types6.default.object])
  }),
  /**
   * The components used for each slot inside the FormControl.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types6.default.shape({
    root: import_prop_types6.default.elementType
  }),
  /**
   * The value of the form element.
   */
  value: import_prop_types6.default.any
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/FormControl/useFormControlContext.js
var React14 = __toESM(require_react());
function useFormControlContext() {
  return React14.useContext(FormControlContext);
}

// node_modules/@mui/lab/node_modules/@mui/base/Input/Input.js
init_extends();
var React16 = __toESM(require_react());
var import_prop_types7 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/Input/inputClasses.js
function getInputUtilityClass(slot) {
  return generateUtilityClass("MuiInput", slot);
}
var inputClasses = generateUtilityClasses("MuiInput", ["root", "formControl", "focused", "disabled", "error", "multiline", "input", "inputMultiline", "inputTypeSearch", "adornedStart", "adornedEnd"]);

// node_modules/@mui/lab/node_modules/@mui/base/useInput/useInput.js
init_extends();
var React15 = __toESM(require_react());
function useInput(parameters = {}) {
  const {
    defaultValue: defaultValueProp,
    disabled: disabledProp = false,
    error: errorProp = false,
    onBlur,
    onChange,
    onFocus,
    required: requiredProp = false,
    value: valueProp,
    inputRef: inputRefProp
  } = parameters;
  const formControlContext = useFormControlContext();
  let defaultValue;
  let disabled;
  let error;
  let required;
  let value;
  if (formControlContext) {
    var _formControlContext$d, _formControlContext$e, _formControlContext$r;
    defaultValue = void 0;
    disabled = (_formControlContext$d = formControlContext.disabled) != null ? _formControlContext$d : false;
    error = (_formControlContext$e = formControlContext.error) != null ? _formControlContext$e : false;
    required = (_formControlContext$r = formControlContext.required) != null ? _formControlContext$r : false;
    value = formControlContext.value;
    if (true) {
      const definedLocalProps = ["defaultValue", "disabled", "error", "required", "value"].filter((prop) => parameters[prop] !== void 0);
      if (definedLocalProps.length > 0) {
        console.warn(["MUI: You have set props on an input that is inside a FormControl.", "Set these props on a FormControl instead. Otherwise they will be ignored.", `Ignored props: ${definedLocalProps.join(", ")}`].join("\n"));
      }
    }
  } else {
    defaultValue = defaultValueProp;
    disabled = disabledProp;
    error = errorProp;
    required = requiredProp;
    value = valueProp;
  }
  const {
    current: isControlled
  } = React15.useRef(value != null);
  const handleInputRefWarning = React15.useCallback((instance) => {
    if (true) {
      if (instance && instance.nodeName !== "INPUT" && !instance.focus) {
        console.error(["MUI: You have provided a `slots.input` to the input component", "that does not correctly handle the `ref` prop.", "Make sure the `ref` prop is called with a HTMLInputElement."].join("\n"));
      }
    }
  }, []);
  const inputRef = React15.useRef(null);
  const handleInputRef = useForkRef(inputRef, inputRefProp, handleInputRefWarning);
  const [focused, setFocused] = React15.useState(false);
  React15.useEffect(() => {
    if (!formControlContext && disabled && focused) {
      setFocused(false);
      onBlur == null || onBlur();
    }
  }, [formControlContext, disabled, focused, onBlur]);
  const handleFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu;
    if (formControlContext != null && formControlContext.disabled) {
      event.stopPropagation();
      return;
    }
    (_otherHandlers$onFocu = otherHandlers.onFocus) == null || _otherHandlers$onFocu.call(otherHandlers, event);
    if (formControlContext && formControlContext.onFocus) {
      var _formControlContext$o;
      formControlContext == null || (_formControlContext$o = formControlContext.onFocus) == null || _formControlContext$o.call(formControlContext);
    } else {
      setFocused(true);
    }
  };
  const handleBlur2 = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null || _otherHandlers$onBlur.call(otherHandlers, event);
    if (formControlContext && formControlContext.onBlur) {
      formControlContext.onBlur();
    } else {
      setFocused(false);
    }
  };
  const handleChange = (otherHandlers) => (event, ...args) => {
    var _formControlContext$o2, _otherHandlers$onChan;
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        throw new Error(true ? `MUI: Expected valid input target. Did you use a custom \`slots.input\` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.` : formatMuiErrorMessage(17));
      }
    }
    formControlContext == null || (_formControlContext$o2 = formControlContext.onChange) == null || _formControlContext$o2.call(formControlContext, event);
    (_otherHandlers$onChan = otherHandlers.onChange) == null || _otherHandlers$onChan.call(otherHandlers, event, ...args);
  };
  const handleClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }
    (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
  };
  const getRootProps = (externalProps = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters, ["onBlur", "onChange", "onFocus"]);
    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    return _extends({}, externalProps, externalEventHandlers, {
      onClick: handleClick(externalEventHandlers)
    });
  };
  const getInputProps = (externalProps = {}) => {
    const propsEventHandlers = {
      onBlur,
      onChange,
      onFocus
    };
    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    const mergedEventHandlers = _extends({}, externalEventHandlers, {
      onBlur: handleBlur2(externalEventHandlers),
      onChange: handleChange(externalEventHandlers),
      onFocus: handleFocus(externalEventHandlers)
    });
    return _extends({}, mergedEventHandlers, {
      "aria-invalid": error || void 0,
      defaultValue,
      value,
      required,
      disabled
    }, externalProps, {
      ref: handleInputRef
    }, mergedEventHandlers);
  };
  return {
    disabled,
    error,
    focused,
    formControlContext,
    getInputProps,
    getRootProps,
    inputRef: handleInputRef,
    required,
    value
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/Input/Input.js
var import_jsx_runtime10 = __toESM(require_jsx_runtime());
var import_jsx_runtime11 = __toESM(require_jsx_runtime());
var _excluded5 = ["aria-describedby", "aria-label", "aria-labelledby", "autoComplete", "autoFocus", "className", "defaultValue", "disabled", "endAdornment", "error", "id", "multiline", "name", "onClick", "onChange", "onKeyDown", "onKeyUp", "onFocus", "onBlur", "placeholder", "readOnly", "required", "startAdornment", "value", "type", "rows", "slotProps", "slots", "minRows", "maxRows"];
var useUtilityClasses4 = (ownerState) => {
  const {
    disabled,
    error,
    focused,
    formControlContext,
    multiline,
    startAdornment,
    endAdornment
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", error && "error", focused && "focused", Boolean(formControlContext) && "formControl", multiline && "multiline", Boolean(startAdornment) && "adornedStart", Boolean(endAdornment) && "adornedEnd"],
    input: ["input", disabled && "disabled", multiline && "multiline"]
  };
  return composeClasses(slots, useClassNamesOverride(getInputUtilityClass));
};
var Input = React16.forwardRef(function Input2(props, forwardedRef) {
  var _slots$root, _slots$textarea, _slots$input;
  const {
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    autoComplete,
    autoFocus,
    className,
    defaultValue,
    disabled,
    endAdornment,
    error,
    id,
    multiline = false,
    name,
    onClick,
    onChange,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    placeholder,
    readOnly,
    required,
    startAdornment,
    value,
    type: typeProp,
    rows,
    slotProps = {},
    slots = {},
    minRows,
    maxRows
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded5);
  const {
    getRootProps,
    getInputProps,
    focused,
    formControlContext,
    error: errorState,
    disabled: disabledState
  } = useInput({
    disabled,
    defaultValue,
    error,
    onBlur,
    onClick,
    onChange,
    onFocus,
    required,
    value
  });
  const type = !multiline ? typeProp != null ? typeProp : "text" : void 0;
  const ownerState = _extends({}, props, {
    disabled: disabledState,
    error: errorState,
    focused,
    formControlContext,
    multiline,
    type
  });
  const classes = useUtilityClasses4(ownerState);
  const propsToForward = {
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    autoComplete,
    autoFocus,
    id,
    onKeyDown,
    onKeyUp,
    name,
    placeholder,
    readOnly,
    type
  };
  const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: [classes.root, className]
  });
  const InputComponent = multiline ? (_slots$textarea = slots.textarea) != null ? _slots$textarea : "textarea" : (_slots$input = slots.input) != null ? _slots$input : "input";
  const inputProps = useSlotProps({
    elementType: InputComponent,
    getSlotProps: (otherHandlers) => {
      return getInputProps(_extends({}, propsToForward, otherHandlers));
    },
    externalSlotProps: slotProps.input,
    additionalProps: _extends({
      rows: multiline ? rows : void 0
    }, multiline && !isHostComponent(InputComponent) && {
      minRows: rows || minRows,
      maxRows: rows || maxRows
    }),
    ownerState,
    className: classes.input
  });
  if (true) {
    if (multiline) {
      if (rows) {
        if (minRows || maxRows) {
          console.warn("MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.");
        }
      }
    }
  }
  return (0, import_jsx_runtime11.jsxs)(Root, _extends({}, rootProps, {
    children: [startAdornment, (0, import_jsx_runtime10.jsx)(InputComponent, _extends({}, inputProps)), endAdornment]
  }));
});
true ? Input.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  "aria-describedby": import_prop_types7.default.string,
  /**
   * @ignore
   */
  "aria-label": import_prop_types7.default.string,
  /**
   * @ignore
   */
  "aria-labelledby": import_prop_types7.default.string,
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: import_prop_types7.default.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: import_prop_types7.default.bool,
  /**
   * Class name applied to the root element.
   */
  className: import_prop_types7.default.string,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: import_prop_types7.default.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: import_prop_types7.default.bool,
  /**
   * Trailing adornment for this input.
   */
  endAdornment: import_prop_types7.default.node,
  /**
   * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `Mui-error` class on the root element.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: import_prop_types7.default.bool,
  /**
   * The id of the `input` element.
   */
  id: import_prop_types7.default.string,
  /**
   * @ignore
   */
  inputRef: import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.shape({
    current: import_prop_types7.default.object
  })]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: import_prop_types7.default.number,
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: import_prop_types7.default.number,
  /**
   * If `true`, a `textarea` element is rendered.
   * @default false
   */
  multiline: import_prop_types7.default.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: import_prop_types7.default.string,
  /**
   * @ignore
   */
  onBlur: import_prop_types7.default.func,
  /**
   * @ignore
   */
  onChange: import_prop_types7.default.func,
  /**
   * @ignore
   */
  onClick: import_prop_types7.default.func,
  /**
   * @ignore
   */
  onFocus: import_prop_types7.default.func,
  /**
   * @ignore
   */
  onKeyDown: import_prop_types7.default.func,
  /**
   * @ignore
   */
  onKeyUp: import_prop_types7.default.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: import_prop_types7.default.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: import_prop_types7.default.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: import_prop_types7.default.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: import_prop_types7.default.number,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: import_prop_types7.default.shape({
    input: import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.object]),
    root: import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.object])
  }),
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types7.default.shape({
    input: import_prop_types7.default.elementType,
    root: import_prop_types7.default.elementType,
    textarea: import_prop_types7.default.elementType
  }),
  /**
   * Leading adornment for this input.
   */
  startAdornment: import_prop_types7.default.node,
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: import_prop_types7.default.oneOf(["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"]),
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: import_prop_types7.default.any
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/Menu/Menu.js
init_extends();
var React30 = __toESM(require_react());
var import_prop_types10 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/Menu/menuClasses.js
function getMenuUtilityClass(slot) {
  return generateUtilityClass("MuiMenu", slot);
}
var menuClasses = generateUtilityClasses("MuiMenu", ["root", "listbox", "expanded"]);

// node_modules/@mui/lab/node_modules/@mui/base/useMenu/useMenu.js
init_extends();
var React26 = __toESM(require_react());

// node_modules/@mui/lab/node_modules/@mui/base/useMenu/menuReducer.js
init_extends();

// node_modules/@mui/lab/node_modules/@mui/base/useList/useList.js
init_extends();
var React21 = __toESM(require_react());

// node_modules/@mui/lab/node_modules/@mui/base/useList/listActions.types.js
var ListActionTypes = {
  blur: "list:blur",
  focus: "list:focus",
  itemClick: "list:itemClick",
  itemHover: "list:itemHover",
  itemsChange: "list:itemsChange",
  keyDown: "list:keyDown",
  resetHighlight: "list:resetHighlight",
  textNavigation: "list:textNavigation"
};

// node_modules/@mui/lab/node_modules/@mui/base/useList/listReducer.js
init_extends();
function findValidItemToHighlight(currentIndex, lookupDirection, items, includeDisabledItems, isItemDisabled, wrapAround) {
  if (items.length === 0 || !includeDisabledItems && items.every((item, itemIndex) => isItemDisabled(item, itemIndex))) {
    return -1;
  }
  let nextFocus = currentIndex;
  for (; ; ) {
    if (!wrapAround && lookupDirection === "next" && nextFocus === items.length || !wrapAround && lookupDirection === "previous" && nextFocus === -1) {
      return -1;
    }
    const nextFocusDisabled = includeDisabledItems ? false : isItemDisabled(items[nextFocus], nextFocus);
    if (nextFocusDisabled) {
      nextFocus += lookupDirection === "next" ? 1 : -1;
      if (wrapAround) {
        nextFocus = (nextFocus + items.length) % items.length;
      }
    } else {
      return nextFocus;
    }
  }
}
function moveHighlight(previouslyHighlightedValue, offset2, context) {
  var _items$nextIndex;
  const {
    items,
    isItemDisabled,
    disableListWrap,
    disabledItemsFocusable,
    itemComparer,
    focusManagement
  } = context;
  const defaultHighlightedIndex = focusManagement === "DOM" ? 0 : -1;
  const maxIndex = items.length - 1;
  const previouslyHighlightedIndex = previouslyHighlightedValue == null ? -1 : items.findIndex((item) => itemComparer(item, previouslyHighlightedValue));
  let nextIndexCandidate;
  let lookupDirection;
  let wrapAround = !disableListWrap;
  switch (offset2) {
    case "reset":
      if (defaultHighlightedIndex === -1) {
        return null;
      }
      nextIndexCandidate = 0;
      lookupDirection = "next";
      wrapAround = false;
      break;
    case "start":
      nextIndexCandidate = 0;
      lookupDirection = "next";
      wrapAround = false;
      break;
    case "end":
      nextIndexCandidate = maxIndex;
      lookupDirection = "previous";
      wrapAround = false;
      break;
    default: {
      const newIndex = previouslyHighlightedIndex + offset2;
      if (newIndex < 0) {
        if (!wrapAround && previouslyHighlightedIndex !== -1 || Math.abs(offset2) > 1) {
          nextIndexCandidate = 0;
          lookupDirection = "next";
        } else {
          nextIndexCandidate = maxIndex;
          lookupDirection = "previous";
        }
      } else if (newIndex > maxIndex) {
        if (!wrapAround || Math.abs(offset2) > 1) {
          nextIndexCandidate = maxIndex;
          lookupDirection = "previous";
        } else {
          nextIndexCandidate = 0;
          lookupDirection = "next";
        }
      } else {
        nextIndexCandidate = newIndex;
        lookupDirection = offset2 >= 0 ? "next" : "previous";
      }
    }
  }
  const nextIndex = findValidItemToHighlight(nextIndexCandidate, lookupDirection, items, disabledItemsFocusable, isItemDisabled, wrapAround);
  if (nextIndex === -1 && previouslyHighlightedValue !== null && !isItemDisabled(previouslyHighlightedValue, previouslyHighlightedIndex)) {
    return previouslyHighlightedValue;
  }
  return (_items$nextIndex = items[nextIndex]) != null ? _items$nextIndex : null;
}
function toggleSelection(item, selectedValues, selectionMode, itemComparer) {
  if (selectionMode === "none") {
    return [];
  }
  if (selectionMode === "single") {
    if (itemComparer(selectedValues[0], item)) {
      return selectedValues;
    }
    return [item];
  }
  if (selectedValues.some((sv) => itemComparer(sv, item))) {
    return selectedValues.filter((sv) => !itemComparer(sv, item));
  }
  return [...selectedValues, item];
}
function handleItemSelection(item, state, context) {
  const {
    itemComparer,
    isItemDisabled,
    selectionMode,
    items
  } = context;
  const {
    selectedValues
  } = state;
  const itemIndex = items.findIndex((i) => itemComparer(item, i));
  if (isItemDisabled(item, itemIndex)) {
    return state;
  }
  const newSelectedValues = toggleSelection(item, selectedValues, selectionMode, itemComparer);
  return _extends({}, state, {
    selectedValues: newSelectedValues,
    highlightedValue: item
  });
}
function handleKeyDown(key, state, context) {
  const previouslySelectedValue = state.highlightedValue;
  const {
    orientation,
    pageSize
  } = context;
  switch (key) {
    case "Home":
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, "start", context)
      });
    case "End":
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, "end", context)
      });
    case "PageUp":
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, -pageSize, context)
      });
    case "PageDown":
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, pageSize, context)
      });
    case "ArrowUp":
      if (orientation !== "vertical") {
        break;
      }
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, -1, context)
      });
    case "ArrowDown":
      if (orientation !== "vertical") {
        break;
      }
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, 1, context)
      });
    case "ArrowLeft": {
      if (orientation === "vertical") {
        break;
      }
      const offset2 = orientation === "horizontal-ltr" ? -1 : 1;
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, offset2, context)
      });
    }
    case "ArrowRight": {
      if (orientation === "vertical") {
        break;
      }
      const offset2 = orientation === "horizontal-ltr" ? 1 : -1;
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, offset2, context)
      });
    }
    case "Enter":
    case " ":
      if (state.highlightedValue === null) {
        return state;
      }
      return handleItemSelection(state.highlightedValue, state, context);
    default:
      break;
  }
  return state;
}
function handleBlur(state, context) {
  if (context.focusManagement === "DOM") {
    return state;
  }
  return _extends({}, state, {
    highlightedValue: null
  });
}
function textCriteriaMatches(nextFocus, searchString, stringifyItem) {
  var _stringifyItem;
  const text = (_stringifyItem = stringifyItem(nextFocus)) == null ? void 0 : _stringifyItem.trim().toLowerCase();
  if (!text || text.length === 0) {
    return false;
  }
  return text.indexOf(searchString) === 0;
}
function handleTextNavigation(state, searchString, context) {
  const {
    items,
    isItemDisabled,
    disabledItemsFocusable,
    getItemAsString
  } = context;
  const startWithCurrentItem = searchString.length > 1;
  let nextItem = startWithCurrentItem ? state.highlightedValue : moveHighlight(state.highlightedValue, 1, context);
  for (let index = 0; index < items.length; index += 1) {
    if (!nextItem || !startWithCurrentItem && state.highlightedValue === nextItem) {
      return state;
    }
    if (textCriteriaMatches(nextItem, searchString, getItemAsString) && (!isItemDisabled(nextItem, items.indexOf(nextItem)) || disabledItemsFocusable)) {
      return _extends({}, state, {
        highlightedValue: nextItem
      });
    }
    nextItem = moveHighlight(nextItem, 1, context);
  }
  return state;
}
function handleItemsChange(items, previousItems, state, context) {
  var _state$selectedValues;
  const {
    itemComparer,
    focusManagement
  } = context;
  let newHighlightedValue = null;
  if (state.highlightedValue != null) {
    var _items$find;
    newHighlightedValue = (_items$find = items.find((item) => itemComparer(item, state.highlightedValue))) != null ? _items$find : null;
  } else if (focusManagement === "DOM" && previousItems.length === 0) {
    newHighlightedValue = moveHighlight(null, "reset", context);
  }
  const selectedValues = (_state$selectedValues = state.selectedValues) != null ? _state$selectedValues : [];
  const newSelectedValues = selectedValues.filter((selectedValue) => items.some((item) => itemComparer(item, selectedValue)));
  return _extends({}, state, {
    highlightedValue: newHighlightedValue,
    selectedValues: newSelectedValues
  });
}
function handleResetHighlight(state, context) {
  return _extends({}, state, {
    highlightedValue: moveHighlight(null, "reset", context)
  });
}
function listReducer(state, action) {
  const {
    type,
    context
  } = action;
  switch (type) {
    case ListActionTypes.keyDown:
      return handleKeyDown(action.key, state, context);
    case ListActionTypes.itemClick:
      return handleItemSelection(action.item, state, context);
    case ListActionTypes.blur:
      return handleBlur(state, context);
    case ListActionTypes.textNavigation:
      return handleTextNavigation(state, action.searchString, context);
    case ListActionTypes.itemsChange:
      return handleItemsChange(action.items, action.previousItems, state, context);
    case ListActionTypes.resetHighlight:
      return handleResetHighlight(state, context);
    default:
      return state;
  }
}

// node_modules/@mui/lab/node_modules/@mui/base/useList/useListChangeNotifiers.js
var React18 = __toESM(require_react());

// node_modules/@mui/lab/node_modules/@mui/base/utils/useMessageBus.js
var React17 = __toESM(require_react());
function createMessageBus() {
  const listeners = /* @__PURE__ */ new Map();
  function subscribe(topic, callback) {
    let topicListeners = listeners.get(topic);
    if (!topicListeners) {
      topicListeners = /* @__PURE__ */ new Set([callback]);
      listeners.set(topic, topicListeners);
    } else {
      topicListeners.add(callback);
    }
    return () => {
      topicListeners.delete(callback);
      if (topicListeners.size === 0) {
        listeners.delete(topic);
      }
    };
  }
  function publish(topic, ...args) {
    const topicListeners = listeners.get(topic);
    if (topicListeners) {
      topicListeners.forEach((callback) => callback(...args));
    }
  }
  return {
    subscribe,
    publish
  };
}
function useMessageBus() {
  const bus = React17.useRef();
  if (!bus.current) {
    bus.current = createMessageBus();
  }
  return bus.current;
}

// node_modules/@mui/lab/node_modules/@mui/base/useList/useListChangeNotifiers.js
var SELECTION_CHANGE_TOPIC = "select:change-selection";
var HIGHLIGHT_CHANGE_TOPIC = "select:change-highlight";
function useListChangeNotifiers() {
  const messageBus = useMessageBus();
  const notifySelectionChanged = React18.useCallback((newSelectedItems) => {
    messageBus.publish(SELECTION_CHANGE_TOPIC, newSelectedItems);
  }, [messageBus]);
  const notifyHighlightChanged = React18.useCallback((newHighlightedItem) => {
    messageBus.publish(HIGHLIGHT_CHANGE_TOPIC, newHighlightedItem);
  }, [messageBus]);
  const registerSelectionChangeHandler = React18.useCallback((handler) => {
    return messageBus.subscribe(SELECTION_CHANGE_TOPIC, handler);
  }, [messageBus]);
  const registerHighlightChangeHandler = React18.useCallback((handler) => {
    return messageBus.subscribe(HIGHLIGHT_CHANGE_TOPIC, handler);
  }, [messageBus]);
  return {
    notifySelectionChanged,
    notifyHighlightChanged,
    registerSelectionChangeHandler,
    registerHighlightChangeHandler
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/utils/useLatest.js
var React19 = __toESM(require_react());
function useLatest(value, deps) {
  const ref = React19.useRef(value);
  React19.useEffect(() => {
    ref.current = value;
  }, deps != null ? deps : [value]);
  return ref;
}

// node_modules/@mui/lab/node_modules/@mui/base/utils/useTextNavigation.js
var React20 = __toESM(require_react());
var TEXT_NAVIGATION_RESET_TIMEOUT = 500;
function useTextNavigation(callback) {
  const textCriteriaRef = React20.useRef({
    searchString: "",
    lastTime: null
  });
  return React20.useCallback((event) => {
    if (event.key.length === 1 && event.key !== " ") {
      const textCriteria = textCriteriaRef.current;
      const lowerKey = event.key.toLowerCase();
      const currentTime = performance.now();
      if (textCriteria.searchString.length > 0 && textCriteria.lastTime && currentTime - textCriteria.lastTime > TEXT_NAVIGATION_RESET_TIMEOUT) {
        textCriteria.searchString = lowerKey;
      } else if (textCriteria.searchString.length !== 1 || lowerKey !== textCriteria.searchString) {
        textCriteria.searchString += lowerKey;
      }
      textCriteria.lastTime = currentTime;
      callback(textCriteria.searchString, event);
    }
  }, [callback]);
}

// node_modules/@mui/lab/node_modules/@mui/base/useList/useList.js
var EMPTY_OBJECT2 = {};
var NOOP2 = () => {
};
var defaultItemComparer = (optionA, optionB) => optionA === optionB;
var defaultIsItemDisabled = () => false;
var defaultItemStringifier = (item) => typeof item === "string" ? item : String(item);
var defaultGetInitialState = () => ({
  highlightedValue: null,
  selectedValues: []
});
function useList(params) {
  const {
    controlledProps = EMPTY_OBJECT2,
    disabledItemsFocusable = false,
    disableListWrap = false,
    focusManagement = "activeDescendant",
    getInitialState = defaultGetInitialState,
    getItemDomElement,
    getItemId,
    isItemDisabled = defaultIsItemDisabled,
    rootRef: externalListRef,
    onStateChange = NOOP2,
    items,
    itemComparer = defaultItemComparer,
    getItemAsString = defaultItemStringifier,
    onChange,
    onHighlightChange,
    onItemsChange,
    orientation = "vertical",
    pageSize = 5,
    reducerActionContext = EMPTY_OBJECT2,
    selectionMode = "single",
    stateReducer: externalReducer
  } = params;
  if (true) {
    if (focusManagement === "DOM" && getItemDomElement == null) {
      throw new Error("useList: The `getItemDomElement` prop is required when using the `DOM` focus management.");
    }
    if (focusManagement === "activeDescendant" && getItemId == null) {
      throw new Error("useList: The `getItemId` prop is required when using the `activeDescendant` focus management.");
    }
  }
  const listRef = React21.useRef(null);
  const handleRef = useForkRef(externalListRef, listRef);
  const handleHighlightChange = React21.useCallback((event, value, reason) => {
    onHighlightChange == null || onHighlightChange(event, value, reason);
    if (focusManagement === "DOM" && value != null && (reason === ListActionTypes.itemClick || reason === ListActionTypes.keyDown || reason === ListActionTypes.textNavigation)) {
      var _getItemDomElement;
      getItemDomElement == null || (_getItemDomElement = getItemDomElement(value)) == null || _getItemDomElement.focus();
    }
  }, [getItemDomElement, onHighlightChange, focusManagement]);
  const stateComparers = React21.useMemo(() => ({
    highlightedValue: itemComparer,
    selectedValues: (valuesArray1, valuesArray2) => areArraysEqual(valuesArray1, valuesArray2, itemComparer)
  }), [itemComparer]);
  const handleStateChange = React21.useCallback((event, field, value, reason, state2) => {
    onStateChange == null || onStateChange(event, field, value, reason, state2);
    switch (field) {
      case "highlightedValue":
        handleHighlightChange(event, value, reason);
        break;
      case "selectedValues":
        onChange == null || onChange(event, value, reason);
        break;
      default:
        break;
    }
  }, [handleHighlightChange, onChange, onStateChange]);
  const listActionContext = React21.useMemo(() => {
    return {
      disabledItemsFocusable,
      disableListWrap,
      focusManagement,
      isItemDisabled,
      itemComparer,
      items,
      getItemAsString,
      onHighlightChange: handleHighlightChange,
      orientation,
      pageSize,
      selectionMode,
      stateComparers
    };
  }, [disabledItemsFocusable, disableListWrap, focusManagement, isItemDisabled, itemComparer, items, getItemAsString, handleHighlightChange, orientation, pageSize, selectionMode, stateComparers]);
  const initialState = getInitialState();
  const reducer = externalReducer != null ? externalReducer : listReducer;
  const actionContext = React21.useMemo(() => _extends({}, reducerActionContext, listActionContext), [reducerActionContext, listActionContext]);
  const [state, dispatch] = useControllableReducer({
    reducer,
    actionContext,
    initialState,
    controlledProps,
    stateComparers,
    onStateChange: handleStateChange
  });
  const {
    highlightedValue,
    selectedValues
  } = state;
  const handleTextNavigation2 = useTextNavigation((searchString, event) => dispatch({
    type: ListActionTypes.textNavigation,
    event,
    searchString
  }));
  const latestSelectedValues = useLatest(selectedValues);
  const latestHighlightedValue = useLatest(highlightedValue);
  const previousItems = React21.useRef([]);
  React21.useEffect(() => {
    if (areArraysEqual(previousItems.current, items, itemComparer)) {
      return;
    }
    dispatch({
      type: ListActionTypes.itemsChange,
      event: null,
      items,
      previousItems: previousItems.current
    });
    previousItems.current = items;
    onItemsChange == null || onItemsChange(items);
  }, [items, itemComparer, dispatch, onItemsChange]);
  const {
    notifySelectionChanged,
    notifyHighlightChanged,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler
  } = useListChangeNotifiers();
  React21.useEffect(() => {
    notifySelectionChanged(selectedValues);
  }, [selectedValues, notifySelectionChanged]);
  React21.useEffect(() => {
    notifyHighlightChanged(highlightedValue);
  }, [highlightedValue, notifyHighlightChanged]);
  const createHandleKeyDown = (externalHandlers) => (event) => {
    var _externalHandlers$onK;
    (_externalHandlers$onK = externalHandlers.onKeyDown) == null || _externalHandlers$onK.call(externalHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    const keysToPreventDefault = ["Home", "End", "PageUp", "PageDown"];
    if (orientation === "vertical") {
      keysToPreventDefault.push("ArrowUp", "ArrowDown");
    } else {
      keysToPreventDefault.push("ArrowLeft", "ArrowRight");
    }
    if (focusManagement === "activeDescendant") {
      keysToPreventDefault.push(" ", "Enter");
    }
    if (keysToPreventDefault.includes(event.key)) {
      event.preventDefault();
    }
    dispatch({
      type: ListActionTypes.keyDown,
      key: event.key,
      event
    });
    handleTextNavigation2(event);
  };
  const createHandleBlur = (externalHandlers) => (event) => {
    var _externalHandlers$onB, _listRef$current;
    (_externalHandlers$onB = externalHandlers.onBlur) == null || _externalHandlers$onB.call(externalHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if ((_listRef$current = listRef.current) != null && _listRef$current.contains(event.relatedTarget)) {
      return;
    }
    dispatch({
      type: ListActionTypes.blur,
      event
    });
  };
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    return _extends({}, externalProps, {
      "aria-activedescendant": focusManagement === "activeDescendant" && highlightedValue != null ? getItemId(highlightedValue) : void 0,
      tabIndex: focusManagement === "DOM" ? -1 : 0,
      ref: handleRef
    }, externalEventHandlers, {
      onBlur: createHandleBlur(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers)
    });
  };
  const getItemState = React21.useCallback((item) => {
    var _latestSelectedValues;
    const index = items.findIndex((i) => itemComparer(i, item));
    const selected = ((_latestSelectedValues = latestSelectedValues.current) != null ? _latestSelectedValues : []).some((value) => value != null && itemComparer(item, value));
    const disabled = isItemDisabled(item, index);
    const highlighted = latestHighlightedValue.current != null && itemComparer(item, latestHighlightedValue.current);
    const focusable = focusManagement === "DOM";
    return {
      disabled,
      focusable,
      highlighted,
      index,
      selected
    };
  }, [items, isItemDisabled, itemComparer, latestSelectedValues, latestHighlightedValue, focusManagement]);
  const contextValue = React21.useMemo(() => ({
    dispatch,
    getItemState,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler
  }), [dispatch, getItemState, registerHighlightChangeHandler, registerSelectionChangeHandler]);
  React21.useDebugValue({
    state
  });
  return {
    contextValue,
    dispatch,
    getRootProps,
    rootRef: handleRef,
    state
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/useList/useListItem.js
init_extends();
var React24 = __toESM(require_react());

// node_modules/@mui/lab/node_modules/@mui/base/utils/useForcedRerendering.js
var React22 = __toESM(require_react());
function useForcedRerendering() {
  const [, setState] = React22.useState({});
  return React22.useCallback(() => {
    setState({});
  }, []);
}

// node_modules/@mui/lab/node_modules/@mui/base/useList/ListContext.js
var React23 = __toESM(require_react());
var ListContext = React23.createContext(null);
if (true) {
  ListContext.displayName = "ListContext";
}

// node_modules/@mui/lab/node_modules/@mui/base/useList/useListItem.js
function useListItem(parameters) {
  const {
    handlePointerOverEvents = false,
    item,
    rootRef: externalRef
  } = parameters;
  const itemRef = React24.useRef(null);
  const handleRef = useForkRef(itemRef, externalRef);
  const listContext = React24.useContext(ListContext);
  if (!listContext) {
    throw new Error("useListItem must be used within a ListProvider");
  }
  const {
    dispatch,
    getItemState,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler
  } = listContext;
  const {
    highlighted,
    selected,
    focusable
  } = getItemState(item);
  const rerender = useForcedRerendering();
  useEnhancedEffect_default(() => {
    function updateHighlightedState(highlightedItem) {
      if (highlightedItem === item && !highlighted) {
        rerender();
      } else if (highlightedItem !== item && highlighted) {
        rerender();
      }
    }
    return registerHighlightChangeHandler(updateHighlightedState);
  });
  useEnhancedEffect_default(() => {
    function updateSelectedState(selectedItems) {
      if (!selected) {
        if (selectedItems.includes(item)) {
          rerender();
        }
      } else if (!selectedItems.includes(item)) {
        rerender();
      }
    }
    return registerSelectionChangeHandler(updateSelectedState);
  }, [registerSelectionChangeHandler, rerender, selected, item]);
  const createHandleClick = React24.useCallback((externalHandlers) => (event) => {
    var _externalHandlers$onC;
    (_externalHandlers$onC = externalHandlers.onClick) == null || _externalHandlers$onC.call(externalHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    dispatch({
      type: ListActionTypes.itemClick,
      item,
      event
    });
  }, [dispatch, item]);
  const createHandlePointerOver = React24.useCallback((externalHandlers) => (event) => {
    var _externalHandlers$onM;
    (_externalHandlers$onM = externalHandlers.onMouseOver) == null || _externalHandlers$onM.call(externalHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    dispatch({
      type: ListActionTypes.itemHover,
      item,
      event
    });
  }, [dispatch, item]);
  let tabIndex;
  if (focusable) {
    tabIndex = highlighted ? 0 : -1;
  }
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    return _extends({}, externalProps, {
      onClick: createHandleClick(externalEventHandlers),
      onPointerOver: handlePointerOverEvents ? createHandlePointerOver(externalEventHandlers) : void 0,
      ref: handleRef,
      tabIndex
    });
  };
  return {
    getRootProps,
    highlighted,
    rootRef: handleRef,
    selected
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/useMenu/menuReducer.js
function menuReducer(state, action) {
  if (action.type === ListActionTypes.itemHover) {
    return state;
  }
  const newState = listReducer(state, action);
  if (newState.highlightedValue === null && action.context.items.length > 0) {
    return _extends({}, newState, {
      highlightedValue: action.context.items[0]
    });
  }
  if (action.type === ListActionTypes.keyDown) {
    if (action.event.key === "Escape") {
      return _extends({}, newState, {
        open: false
      });
    }
  }
  if (action.type === ListActionTypes.blur) {
    var _action$context$listb;
    if (!((_action$context$listb = action.context.listboxRef.current) != null && _action$context$listb.contains(action.event.relatedTarget))) {
      var _action$context$listb2, _action$event$related;
      const listboxId = (_action$context$listb2 = action.context.listboxRef.current) == null ? void 0 : _action$context$listb2.getAttribute("id");
      const controlledBy = (_action$event$related = action.event.relatedTarget) == null ? void 0 : _action$event$related.getAttribute("aria-controls");
      if (listboxId && controlledBy && listboxId === controlledBy) {
        return newState;
      }
      return _extends({}, newState, {
        open: false,
        highlightedValue: action.context.items[0]
      });
    }
  }
  return newState;
}

// node_modules/@mui/lab/node_modules/@mui/base/utils/useCompound.js
var React25 = __toESM(require_react());
var CompoundComponentContext = React25.createContext(null);
CompoundComponentContext.displayName = "CompoundComponentContext";
function sortSubitems(subitems) {
  const subitemsArray = Array.from(subitems.keys()).map((key) => {
    const subitem = subitems.get(key);
    return {
      key,
      subitem
    };
  });
  subitemsArray.sort((a, b) => {
    const aNode = a.subitem.ref.current;
    const bNode = b.subitem.ref.current;
    if (aNode === null || bNode === null || aNode === bNode) {
      return 0;
    }
    return aNode.compareDocumentPosition(bNode) & Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1;
  });
  return new Map(subitemsArray.map((item) => [item.key, item.subitem]));
}
function useCompoundParent() {
  const [subitems, setSubitems] = React25.useState(/* @__PURE__ */ new Map());
  const subitemKeys = React25.useRef(/* @__PURE__ */ new Set());
  const deregisterItem = React25.useCallback(function deregisterItem2(id) {
    subitemKeys.current.delete(id);
    setSubitems((previousState) => {
      const newState = new Map(previousState);
      newState.delete(id);
      return newState;
    });
  }, []);
  const registerItem = React25.useCallback(function registerItem2(id, item) {
    let providedOrGeneratedId;
    if (typeof id === "function") {
      providedOrGeneratedId = id(subitemKeys.current);
    } else {
      providedOrGeneratedId = id;
    }
    subitemKeys.current.add(providedOrGeneratedId);
    setSubitems((previousState) => {
      const newState = new Map(previousState);
      newState.set(providedOrGeneratedId, item);
      return newState;
    });
    return {
      id: providedOrGeneratedId,
      deregister: () => deregisterItem(providedOrGeneratedId)
    };
  }, [deregisterItem]);
  const sortedSubitems = React25.useMemo(() => sortSubitems(subitems), [subitems]);
  const getItemIndex = React25.useCallback(function getItemIndex2(id) {
    return Array.from(sortedSubitems.keys()).indexOf(id);
  }, [sortedSubitems]);
  const contextValue = React25.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount: subitems.size
  }), [getItemIndex, registerItem, subitems.size]);
  return {
    contextValue,
    subitems: sortedSubitems
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/utils/combineHooksSlotProps.js
init_extends();
function combineHooksSlotProps(getFirstProps, getSecondProps) {
  return function getCombinedProps(external = {}) {
    const firstResult = _extends({}, external, getFirstProps(external));
    const result = _extends({}, firstResult, getSecondProps(firstResult));
    return result;
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/useMenu/useMenu.js
var FALLBACK_MENU_CONTEXT = {
  dispatch: () => {
  },
  popupId: "",
  registerPopup: () => {
  },
  registerTrigger: () => {
  },
  state: {
    open: true
  },
  triggerElement: null
};
function useMenu(parameters = {}) {
  var _useId, _React$useContext;
  const {
    listboxRef: listboxRefProp,
    onItemsChange,
    id: idParam
  } = parameters;
  const rootRef = React26.useRef(null);
  const handleRef = useForkRef(rootRef, listboxRefProp);
  const listboxId = (_useId = useId(idParam)) != null ? _useId : "";
  const {
    state: {
      open
    },
    dispatch: menuDispatch,
    triggerElement,
    registerPopup
  } = (_React$useContext = React26.useContext(DropdownContext)) != null ? _React$useContext : FALLBACK_MENU_CONTEXT;
  const isInitiallyOpen = React26.useRef(open);
  const {
    subitems,
    contextValue: compoundComponentContextValue
  } = useCompoundParent();
  const subitemKeys = React26.useMemo(() => Array.from(subitems.keys()), [subitems]);
  const getItemDomElement = React26.useCallback((itemId) => {
    var _subitems$get$ref$cur, _subitems$get;
    if (itemId == null) {
      return null;
    }
    return (_subitems$get$ref$cur = (_subitems$get = subitems.get(itemId)) == null ? void 0 : _subitems$get.ref.current) != null ? _subitems$get$ref$cur : null;
  }, [subitems]);
  const {
    dispatch: listDispatch,
    getRootProps: getListRootProps,
    contextValue: listContextValue,
    state: {
      highlightedValue
    },
    rootRef: mergedListRef
  } = useList({
    disabledItemsFocusable: true,
    focusManagement: "DOM",
    getItemDomElement,
    getInitialState: () => ({
      selectedValues: [],
      highlightedValue: null
    }),
    isItemDisabled: (id) => {
      var _subitems$get2;
      return (subitems == null || (_subitems$get2 = subitems.get(id)) == null ? void 0 : _subitems$get2.disabled) || false;
    },
    items: subitemKeys,
    getItemAsString: (id) => {
      var _subitems$get3, _subitems$get4;
      return ((_subitems$get3 = subitems.get(id)) == null ? void 0 : _subitems$get3.label) || ((_subitems$get4 = subitems.get(id)) == null || (_subitems$get4 = _subitems$get4.ref.current) == null ? void 0 : _subitems$get4.innerText);
    },
    rootRef: handleRef,
    onItemsChange,
    reducerActionContext: {
      listboxRef: rootRef
    },
    selectionMode: "none",
    stateReducer: menuReducer
  });
  useEnhancedEffect_default(() => {
    registerPopup(listboxId);
  }, [listboxId, registerPopup]);
  React26.useEffect(() => {
    if (open && highlightedValue === subitemKeys[0] && !isInitiallyOpen.current) {
      var _subitems$get5;
      (_subitems$get5 = subitems.get(subitemKeys[0])) == null || (_subitems$get5 = _subitems$get5.ref) == null || (_subitems$get5 = _subitems$get5.current) == null || _subitems$get5.focus();
    }
  }, [open, highlightedValue, subitems, subitemKeys]);
  React26.useEffect(() => {
    var _rootRef$current;
    if ((_rootRef$current = rootRef.current) != null && _rootRef$current.contains(document.activeElement) && highlightedValue !== null) {
      var _subitems$get6;
      subitems == null || (_subitems$get6 = subitems.get(highlightedValue)) == null || (_subitems$get6 = _subitems$get6.ref.current) == null || _subitems$get6.focus();
    }
  }, [highlightedValue, subitems]);
  const createHandleBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur, _rootRef$current2;
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null || _otherHandlers$onBlur.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if ((_rootRef$current2 = rootRef.current) != null && _rootRef$current2.contains(event.relatedTarget) || event.relatedTarget === triggerElement) {
      return;
    }
    menuDispatch({
      type: DropdownActionTypes.blur,
      event
    });
  };
  const createHandleKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.key === "Escape") {
      menuDispatch({
        type: DropdownActionTypes.escapeKeyDown,
        event
      });
    }
  };
  const getOwnListboxHandlers = (otherHandlers = {}) => ({
    onBlur: createHandleBlur(otherHandlers),
    onKeyDown: createHandleKeyDown(otherHandlers)
  });
  const getListboxProps = (externalProps = {}) => {
    const getCombinedRootProps = combineHooksSlotProps(getOwnListboxHandlers, getListRootProps);
    const externalEventHandlers = extractEventHandlers(externalProps);
    return _extends({}, externalProps, externalEventHandlers, getCombinedRootProps(externalEventHandlers), {
      id: listboxId,
      role: "menu"
    });
  };
  React26.useDebugValue({
    subitems,
    highlightedValue
  });
  return {
    contextValue: _extends({}, compoundComponentContextValue, listContextValue),
    dispatch: listDispatch,
    getListboxProps,
    highlightedValue,
    listboxRef: mergedListRef,
    menuItems: subitems,
    open,
    triggerElement
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/useMenu/MenuProvider.js
var React27 = __toESM(require_react());
var import_jsx_runtime12 = __toESM(require_jsx_runtime());
function MenuProvider(props) {
  const {
    value,
    children
  } = props;
  const {
    dispatch,
    getItemIndex,
    getItemState,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler,
    registerItem,
    totalSubitemCount
  } = value;
  const listContextValue = React27.useMemo(() => ({
    dispatch,
    getItemState,
    getItemIndex,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler
  }), [dispatch, getItemIndex, getItemState, registerHighlightChangeHandler, registerSelectionChangeHandler]);
  const compoundComponentContextValue = React27.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount
  }), [registerItem, getItemIndex, totalSubitemCount]);
  return (0, import_jsx_runtime12.jsx)(CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: (0, import_jsx_runtime12.jsx)(ListContext.Provider, {
      value: listContextValue,
      children
    })
  });
}

// node_modules/@mui/lab/node_modules/@mui/base/Popper/Popper.js
init_extends();
var React29 = __toESM(require_react());
var import_prop_types9 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/Portal/Portal.js
var React28 = __toESM(require_react());
var ReactDOM = __toESM(require_react_dom());
var import_prop_types8 = __toESM(require_prop_types());
var import_jsx_runtime13 = __toESM(require_jsx_runtime());
function getContainer(container) {
  return typeof container === "function" ? container() : container;
}
var Portal = React28.forwardRef(function Portal2(props, forwardedRef) {
  const {
    children,
    container,
    disablePortal = false
  } = props;
  const [mountNode, setMountNode] = React28.useState(null);
  const handleRef = useForkRef(React28.isValidElement(children) ? children.ref : null, forwardedRef);
  useEnhancedEffect_default(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [container, disablePortal]);
  useEnhancedEffect_default(() => {
    if (mountNode && !disablePortal) {
      setRef(forwardedRef, mountNode);
      return () => {
        setRef(forwardedRef, null);
      };
    }
    return void 0;
  }, [forwardedRef, mountNode, disablePortal]);
  if (disablePortal) {
    if (React28.isValidElement(children)) {
      const newProps = {
        ref: handleRef
      };
      return React28.cloneElement(children, newProps);
    }
    return (0, import_jsx_runtime13.jsx)(React28.Fragment, {
      children
    });
  }
  return (0, import_jsx_runtime13.jsx)(React28.Fragment, {
    children: mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode
  });
});
true ? Portal.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The children to render into the `container`.
   */
  children: import_prop_types8.default.node,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: import_prop_types8.default.oneOfType([HTMLElementType, import_prop_types8.default.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: import_prop_types8.default.bool
} : void 0;
if (true) {
  Portal["propTypes"] = exactProp(Portal.propTypes);
}

// node_modules/@mui/lab/node_modules/@mui/base/Popper/popperClasses.js
function getPopperUtilityClass(slot) {
  return generateUtilityClass("MuiPopper", slot);
}
var popperClasses = generateUtilityClasses("MuiPopper", ["root"]);

// node_modules/@mui/lab/node_modules/@mui/base/Popper/Popper.js
var import_jsx_runtime14 = __toESM(require_jsx_runtime());
var _excluded6 = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"];
var _excluded22 = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function flipPlacement(placement, direction) {
  if (direction === "ltr") {
    return placement;
  }
  switch (placement) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return placement;
  }
}
function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
function isHTMLElement(element) {
  return element.nodeType !== void 0;
}
function isVirtualElement(element) {
  return !isHTMLElement(element);
}
var useUtilityClasses5 = () => {
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, useClassNamesOverride(getPopperUtilityClass));
};
var defaultPopperOptions = {};
var PopperTooltip = React29.forwardRef(function PopperTooltip2(props, forwardedRef) {
  var _slots$root;
  const {
    anchorEl,
    children,
    direction,
    disablePortal,
    modifiers,
    open,
    placement: initialPlacement,
    popperOptions,
    popperRef: popperRefProp,
    slotProps = {},
    slots = {},
    TransitionProps
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded6);
  const tooltipRef = React29.useRef(null);
  const ownRef = useForkRef(tooltipRef, forwardedRef);
  const popperRef = React29.useRef(null);
  const handlePopperRef = useForkRef(popperRef, popperRefProp);
  const handlePopperRefRef = React29.useRef(handlePopperRef);
  useEnhancedEffect_default(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  React29.useImperativeHandle(popperRefProp, () => popperRef.current, []);
  const rtlPlacement = flipPlacement(initialPlacement, direction);
  const [placement, setPlacement] = React29.useState(rtlPlacement);
  const [resolvedAnchorElement, setResolvedAnchorElement] = React29.useState(resolveAnchorEl(anchorEl));
  React29.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.forceUpdate();
    }
  });
  React29.useEffect(() => {
    if (anchorEl) {
      setResolvedAnchorElement(resolveAnchorEl(anchorEl));
    }
  }, [anchorEl]);
  useEnhancedEffect_default(() => {
    if (!resolvedAnchorElement || !open) {
      return void 0;
    }
    const handlePopperUpdate = (data) => {
      setPlacement(data.placement);
    };
    if (true) {
      if (resolvedAnchorElement && isHTMLElement(resolvedAnchorElement) && resolvedAnchorElement.nodeType === 1) {
        const box = resolvedAnchorElement.getBoundingClientRect();
        if (box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
          console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
        }
      }
    }
    let popperModifiers = [{
      name: "preventOverflow",
      options: {
        altBoundary: disablePortal
      }
    }, {
      name: "flip",
      options: {
        altBoundary: disablePortal
      }
    }, {
      name: "onUpdate",
      enabled: true,
      phase: "afterWrite",
      fn: ({
        state
      }) => {
        handlePopperUpdate(state);
      }
    }];
    if (modifiers != null) {
      popperModifiers = popperModifiers.concat(modifiers);
    }
    if (popperOptions && popperOptions.modifiers != null) {
      popperModifiers = popperModifiers.concat(popperOptions.modifiers);
    }
    const popper = createPopper(resolvedAnchorElement, tooltipRef.current, _extends({
      placement: rtlPlacement
    }, popperOptions, {
      modifiers: popperModifiers
    }));
    handlePopperRefRef.current(popper);
    return () => {
      popper.destroy();
      handlePopperRefRef.current(null);
    };
  }, [resolvedAnchorElement, disablePortal, modifiers, open, popperOptions, rtlPlacement]);
  const childProps = {
    placement
  };
  if (TransitionProps !== null) {
    childProps.TransitionProps = TransitionProps;
  }
  const classes = useUtilityClasses5();
  const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      role: "tooltip",
      ref: ownRef
    },
    ownerState: props,
    className: classes.root
  });
  return (0, import_jsx_runtime14.jsx)(Root, _extends({}, rootProps, {
    children: typeof children === "function" ? children(childProps) : children
  }));
});
var Popper = React29.forwardRef(function Popper2(props, forwardedRef) {
  const {
    anchorEl,
    children,
    container: containerProp,
    direction = "ltr",
    disablePortal = false,
    keepMounted = false,
    modifiers,
    open,
    placement = "bottom",
    popperOptions = defaultPopperOptions,
    popperRef,
    style,
    transition = false,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded22);
  const [exited, setExited] = React29.useState(true);
  const handleEnter = () => {
    setExited(false);
  };
  const handleExited = () => {
    setExited(true);
  };
  if (!keepMounted && !open && (!transition || exited)) {
    return null;
  }
  let container;
  if (containerProp) {
    container = containerProp;
  } else if (anchorEl) {
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);
    container = resolvedAnchorEl && isHTMLElement(resolvedAnchorEl) ? ownerDocument(resolvedAnchorEl).body : ownerDocument(null).body;
  }
  const display = !open && keepMounted && (!transition || exited) ? "none" : void 0;
  const transitionProps = transition ? {
    in: open,
    onEnter: handleEnter,
    onExited: handleExited
  } : void 0;
  return (0, import_jsx_runtime14.jsx)(Portal, {
    disablePortal,
    container,
    children: (0, import_jsx_runtime14.jsx)(PopperTooltip, _extends({
      anchorEl,
      direction,
      disablePortal,
      modifiers,
      ref: forwardedRef,
      open: transition ? !exited : open,
      placement,
      popperOptions,
      popperRef,
      slotProps,
      slots
    }, other, {
      style: _extends({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display
      }, style),
      TransitionProps: transitionProps,
      children
    }))
  });
});
true ? Popper.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: chainPropTypes(import_prop_types9.default.oneOfType([HTMLElementType, import_prop_types9.default.object, import_prop_types9.default.func]), (props) => {
    if (props.open) {
      const resolvedAnchorEl = resolveAnchorEl(props.anchorEl);
      if (resolvedAnchorEl && isHTMLElement(resolvedAnchorEl) && resolvedAnchorEl.nodeType === 1) {
        const box = resolvedAnchorEl.getBoundingClientRect();
        if (box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
        }
      } else if (!resolvedAnchorEl || typeof resolvedAnchorEl.getBoundingClientRect !== "function" || isVirtualElement(resolvedAnchorEl) && resolvedAnchorEl.contextElement != null && resolvedAnchorEl.contextElement.nodeType !== 1) {
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join("\n"));
      }
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: import_prop_types9.default.oneOfType([import_prop_types9.default.node, import_prop_types9.default.func]),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: import_prop_types9.default.oneOfType([HTMLElementType, import_prop_types9.default.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: import_prop_types9.default.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: import_prop_types9.default.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: import_prop_types9.default.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: import_prop_types9.default.arrayOf(import_prop_types9.default.shape({
    data: import_prop_types9.default.object,
    effect: import_prop_types9.default.func,
    enabled: import_prop_types9.default.bool,
    fn: import_prop_types9.default.func,
    name: import_prop_types9.default.any,
    options: import_prop_types9.default.object,
    phase: import_prop_types9.default.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: import_prop_types9.default.arrayOf(import_prop_types9.default.string),
    requiresIfExists: import_prop_types9.default.arrayOf(import_prop_types9.default.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types9.default.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: import_prop_types9.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: import_prop_types9.default.shape({
    modifiers: import_prop_types9.default.array,
    onFirstUpdate: import_prop_types9.default.func,
    placement: import_prop_types9.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: import_prop_types9.default.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: refType_default,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: import_prop_types9.default.shape({
    root: import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types9.default.shape({
    root: import_prop_types9.default.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: import_prop_types9.default.bool
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/Menu/Menu.js
var import_jsx_runtime15 = __toESM(require_jsx_runtime());
var _excluded7 = ["actions", "children", "onItemsChange", "slotProps", "slots"];
function useUtilityClasses6(ownerState) {
  const {
    open
  } = ownerState;
  const slots = {
    root: ["root", open && "expanded"],
    listbox: ["listbox", open && "expanded"]
  };
  return composeClasses(slots, useClassNamesOverride(getMenuUtilityClass));
}
var Menu = React30.forwardRef(function Menu2(props, forwardedRef) {
  var _slots$root, _slots$listbox;
  const {
    actions,
    children,
    onItemsChange,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded7);
  const {
    contextValue,
    getListboxProps,
    dispatch,
    open,
    triggerElement
  } = useMenu({
    onItemsChange
  });
  React30.useImperativeHandle(actions, () => ({
    dispatch,
    resetHighlight: () => dispatch({
      type: ListActionTypes.resetHighlight,
      event: null
    })
  }), [dispatch]);
  const ownerState = _extends({}, props, {
    open
  });
  const classes = useUtilityClasses6(ownerState);
  const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef,
      role: void 0
    },
    className: classes.root,
    ownerState
  });
  const Listbox = (_slots$listbox = slots.listbox) != null ? _slots$listbox : "ul";
  const listboxProps = useSlotProps({
    elementType: Listbox,
    getSlotProps: getListboxProps,
    externalSlotProps: slotProps.listbox,
    className: classes.listbox,
    ownerState
  });
  if (open === true && triggerElement == null) {
    return (0, import_jsx_runtime15.jsx)(Root, _extends({}, rootProps, {
      children: (0, import_jsx_runtime15.jsx)(Listbox, _extends({}, listboxProps, {
        children: (0, import_jsx_runtime15.jsx)(MenuProvider, {
          value: contextValue,
          children
        })
      }))
    }));
  }
  return (0, import_jsx_runtime15.jsx)(Popper, _extends({}, rootProps, {
    open,
    anchorEl: triggerElement,
    slots: {
      root: Root
    },
    children: (0, import_jsx_runtime15.jsx)(Listbox, _extends({}, listboxProps, {
      children: (0, import_jsx_runtime15.jsx)(MenuProvider, {
        value: contextValue,
        children
      })
    }))
  }));
});
true ? Menu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref with imperative actions that can be performed on the menu.
   */
  actions: refType_default,
  /**
   * @ignore
   */
  children: import_prop_types10.default.node,
  /**
   * @ignore
   */
  className: import_prop_types10.default.string,
  /**
   * Function called when the items displayed in the menu change.
   */
  onItemsChange: import_prop_types10.default.func,
  /**
   * The props used for each slot inside the Menu.
   * @default {}
   */
  slotProps: import_prop_types10.default.shape({
    listbox: import_prop_types10.default.oneOfType([import_prop_types10.default.func, import_prop_types10.default.object]),
    root: import_prop_types10.default.oneOfType([import_prop_types10.default.func, import_prop_types10.default.object])
  }),
  /**
   * The components used for each slot inside the Menu.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types10.default.shape({
    listbox: import_prop_types10.default.elementType,
    root: import_prop_types10.default.elementType
  })
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/MenuButton/MenuButton.js
init_extends();
var React32 = __toESM(require_react());
var import_prop_types11 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/useMenuButton/useMenuButton.js
init_extends();
var React31 = __toESM(require_react());
function useMenuButton(parameters = {}) {
  const {
    disabled = false,
    focusableWhenDisabled,
    rootRef: externalRef
  } = parameters;
  const menuContext = React31.useContext(DropdownContext);
  if (menuContext === null) {
    throw new Error("useMenuButton: no menu context available.");
  }
  const {
    state,
    dispatch,
    registerTrigger,
    popupId
  } = menuContext;
  const {
    getRootProps: getButtonRootProps,
    rootRef: buttonRootRef,
    active
  } = useButton({
    disabled,
    focusableWhenDisabled,
    rootRef: externalRef
  });
  const handleRef = useForkRef(buttonRootRef, registerTrigger);
  const createHandleClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    dispatch({
      type: DropdownActionTypes.toggle,
      event
    });
  };
  const createHandleKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      dispatch({
        type: DropdownActionTypes.open,
        event
      });
    }
  };
  const getOwnRootProps = (otherHandlers = {}) => ({
    onClick: createHandleClick(otherHandlers),
    onKeyDown: createHandleKeyDown(otherHandlers)
  });
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const getCombinedProps = combineHooksSlotProps(getButtonRootProps, getOwnRootProps);
    return _extends({
      "aria-haspopup": "menu",
      "aria-expanded": state.open,
      "aria-controls": popupId
    }, externalProps, externalEventHandlers, getCombinedProps(externalEventHandlers), {
      ref: handleRef
    });
  };
  return {
    active,
    getRootProps,
    open: state.open,
    rootRef: handleRef
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/MenuButton/menuButtonClasses.js
function getMenuButtonUtilityClass(slot) {
  return generateUtilityClass("MuiMenuButton", slot);
}
var menuButtonClasses = generateUtilityClasses("MuiMenuButton", ["root", "active", "disabled", "expanded"]);

// node_modules/@mui/lab/node_modules/@mui/base/MenuButton/MenuButton.js
var import_jsx_runtime16 = __toESM(require_jsx_runtime());
var _excluded8 = ["children", "disabled", "label", "slots", "slotProps", "focusableWhenDisabled"];
var useUtilityClasses7 = (ownerState) => {
  const {
    active,
    disabled,
    open
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", active && "active", open && "expanded"]
  };
  return composeClasses(slots, useClassNamesOverride(getMenuButtonUtilityClass));
};
var MenuButton = React32.forwardRef(function MenuButton2(props, forwardedRef) {
  const {
    children,
    disabled = false,
    slots = {},
    slotProps = {},
    focusableWhenDisabled = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded8);
  const {
    getRootProps,
    open,
    active
  } = useMenuButton({
    disabled,
    focusableWhenDisabled,
    rootRef: forwardedRef
  });
  const ownerState = _extends({}, props, {
    open,
    active,
    disabled,
    focusableWhenDisabled
  });
  const classes = useUtilityClasses7(ownerState);
  const Root = slots.root || "button";
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef,
      type: "button"
    },
    ownerState,
    className: classes.root
  });
  return (0, import_jsx_runtime16.jsx)(Root, _extends({}, rootProps, {
    children
  }));
});
true ? MenuButton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: import_prop_types11.default.node,
  /**
   * Class name applied to the root element.
   */
  className: import_prop_types11.default.string,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types11.default.bool,
  /**
   * If `true`, allows a disabled button to receive focus.
   * @default false
   */
  focusableWhenDisabled: import_prop_types11.default.bool,
  /**
   * Label of the button
   */
  label: import_prop_types11.default.string,
  /**
   * The components used for each slot inside the MenuButton.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slotProps: import_prop_types11.default.shape({
    root: import_prop_types11.default.oneOfType([import_prop_types11.default.func, import_prop_types11.default.object])
  }),
  /**
   * The props used for each slot inside the MenuButton.
   * @default {}
   */
  slots: import_prop_types11.default.shape({
    root: import_prop_types11.default.elementType
  })
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/MenuItem/MenuItem.js
init_extends();
var React35 = __toESM(require_react());
var import_prop_types12 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/MenuItem/menuItemClasses.js
function getMenuItemUtilityClass(slot) {
  return generateUtilityClass("MuiMenuItem", slot);
}
var menuItemClasses = generateUtilityClasses("MuiMenuItem", ["root", "disabled", "focusVisible"]);

// node_modules/@mui/lab/node_modules/@mui/base/useMenuItem/useMenuItem.js
init_extends();
var React34 = __toESM(require_react());

// node_modules/@mui/lab/node_modules/@mui/base/utils/useCompoundItem.js
var React33 = __toESM(require_react());
function useCompoundItem(id, itemMetadata) {
  const context = React33.useContext(CompoundComponentContext);
  if (context === null) {
    throw new Error("useCompoundItem must be used within a useCompoundParent");
  }
  const {
    registerItem
  } = context;
  const [registeredId, setRegisteredId] = React33.useState(typeof id === "function" ? void 0 : id);
  useEnhancedEffect_default(() => {
    const {
      id: returnedId,
      deregister
    } = registerItem(id, itemMetadata);
    setRegisteredId(returnedId);
    return deregister;
  }, [registerItem, itemMetadata, id]);
  return {
    id: registeredId,
    index: registeredId !== void 0 ? context.getItemIndex(registeredId) : -1,
    totalItemCount: context.totalSubitemCount
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/useMenuItem/useMenuItem.js
function idGenerator(existingKeys) {
  return `menu-item-${existingKeys.size}`;
}
var FALLBACK_MENU_CONTEXT2 = {
  dispatch: () => {
  },
  popupId: "",
  registerPopup: () => {
  },
  registerTrigger: () => {
  },
  state: {
    open: true
  },
  triggerElement: null
};
function useMenuItem(params) {
  var _React$useContext;
  const {
    disabled = false,
    id: idParam,
    rootRef: externalRef,
    label
  } = params;
  const id = useId(idParam);
  const itemRef = React34.useRef(null);
  const itemMetadata = React34.useMemo(() => ({
    disabled,
    id: id != null ? id : "",
    label,
    ref: itemRef
  }), [disabled, id, label]);
  const {
    dispatch
  } = (_React$useContext = React34.useContext(DropdownContext)) != null ? _React$useContext : FALLBACK_MENU_CONTEXT2;
  const {
    getRootProps: getListRootProps,
    highlighted,
    rootRef: listItemRefHandler
  } = useListItem({
    item: id
  });
  const {
    index,
    totalItemCount
  } = useCompoundItem(id != null ? id : idGenerator, itemMetadata);
  const {
    getRootProps: getButtonProps,
    focusVisible,
    rootRef: buttonRefHandler
  } = useButton({
    disabled,
    focusableWhenDisabled: true
  });
  const handleRef = useForkRef(listItemRefHandler, buttonRefHandler, externalRef, itemRef);
  React34.useDebugValue({
    id,
    highlighted,
    disabled,
    label
  });
  const createHandleClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    dispatch({
      type: DropdownActionTypes.close,
      event
    });
  };
  const getOwnHandlers = (otherHandlers = {}) => _extends({}, otherHandlers, {
    onClick: createHandleClick(otherHandlers)
  });
  function getRootProps(externalProps = {}) {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const getCombinedRootProps = combineHooksSlotProps(getOwnHandlers, combineHooksSlotProps(getButtonProps, getListRootProps));
    return _extends({}, externalProps, externalEventHandlers, getCombinedRootProps(externalEventHandlers), {
      ref: handleRef,
      role: "menuitem"
    });
  }
  if (id === void 0) {
    return {
      getRootProps,
      disabled: false,
      focusVisible,
      highlighted: false,
      index: -1,
      totalItemCount: 0,
      rootRef: handleRef
    };
  }
  return {
    getRootProps,
    disabled,
    focusVisible,
    highlighted,
    index,
    totalItemCount,
    rootRef: handleRef
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/MenuItem/MenuItem.js
var import_jsx_runtime17 = __toESM(require_jsx_runtime());
var _excluded9 = ["children", "disabled", "label", "slotProps", "slots"];
function useUtilityClasses8(ownerState) {
  const {
    disabled,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible"]
  };
  return composeClasses(slots, useClassNamesOverride(getMenuItemUtilityClass));
}
var MenuItem = React35.forwardRef(function MenuItem2(props, forwardedRef) {
  var _slots$root;
  const {
    children,
    disabled: disabledProp = false,
    label,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded9);
  const {
    getRootProps,
    disabled,
    focusVisible,
    highlighted
  } = useMenuItem({
    disabled: disabledProp,
    rootRef: forwardedRef,
    label
  });
  const ownerState = _extends({}, props, {
    disabled,
    focusVisible,
    highlighted
  });
  const classes = useUtilityClasses8(ownerState);
  const Root = (_slots$root = slots.root) != null ? _slots$root : "li";
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    className: classes.root,
    ownerState
  });
  return (0, import_jsx_runtime17.jsx)(Root, _extends({}, rootProps, {
    children
  }));
});
true ? MenuItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: import_prop_types12.default.node,
  /**
   * @ignore
   */
  className: import_prop_types12.default.string,
  /**
   * @ignore
   */
  disabled: import_prop_types12.default.bool,
  /**
   * A text representation of the menu item's content.
   * Used for keyboard text navigation matching.
   */
  label: import_prop_types12.default.string,
  /**
   * @ignore
   */
  onClick: import_prop_types12.default.func,
  /**
   * The props used for each slot inside the MenuItem.
   * @default {}
   */
  slotProps: import_prop_types12.default.shape({
    root: import_prop_types12.default.oneOfType([import_prop_types12.default.func, import_prop_types12.default.object])
  }),
  /**
   * The components used for each slot inside the MenuItem.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types12.default.shape({
    root: import_prop_types12.default.elementType
  })
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/Modal/Modal.js
init_extends();
var React37 = __toESM(require_react());
var import_prop_types13 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/unstable_useModal/useModal.js
init_extends();
var React36 = __toESM(require_react());

// node_modules/@mui/lab/node_modules/@mui/base/unstable_useModal/ModalManager.js
function isOverflowing(container) {
  const doc = ownerDocument(container);
  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }
  return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, show) {
  if (show) {
    element.setAttribute("aria-hidden", "true");
  } else {
    element.removeAttribute("aria-hidden");
  }
}
function getPaddingRight(element) {
  return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
}
function isAriaHiddenForbiddenOnElement(element) {
  const forbiddenTagNames = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"];
  const isForbiddenTagName = forbiddenTagNames.indexOf(element.tagName) !== -1;
  const isInputHidden = element.tagName === "INPUT" && element.getAttribute("type") === "hidden";
  return isForbiddenTagName || isInputHidden;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude, show) {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];
  [].forEach.call(container.children, (element) => {
    const isNotExcludedElement = blacklist.indexOf(element) === -1;
    const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);
    if (isNotExcludedElement && isNotForbiddenElement) {
      ariaHidden(element, show);
    }
  });
}
function findIndexOf(items, callback) {
  let idx = -1;
  items.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}
function handleContainer(containerInfo, props) {
  const restoreStyle = [];
  const container = containerInfo.container;
  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      const scrollbarSize = getScrollbarSize(ownerDocument(container));
      restoreStyle.push({
        value: container.style.paddingRight,
        property: "padding-right",
        el: container
      });
      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
      const fixedElements = ownerDocument(container).querySelectorAll(".mui-fixed");
      [].forEach.call(fixedElements, (element) => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: "padding-right",
          el: element
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }
    let scrollContainer;
    if (container.parentNode instanceof DocumentFragment) {
      scrollContainer = ownerDocument(container).body;
    } else {
      const parent = container.parentElement;
      const containerWindow = ownerWindow(container);
      scrollContainer = (parent == null ? void 0 : parent.nodeName) === "HTML" && containerWindow.getComputedStyle(parent).overflowY === "scroll" ? parent : container;
    }
    restoreStyle.push({
      value: scrollContainer.style.overflow,
      property: "overflow",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowX,
      property: "overflow-x",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowY,
      property: "overflow-y",
      el: scrollContainer
    });
    scrollContainer.style.overflow = "hidden";
  }
  const restore = () => {
    restoreStyle.forEach(({
      value,
      el,
      property
    }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
      }
    });
  };
  return restore;
}
function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, (element) => {
    if (element.getAttribute("aria-hidden") === "true") {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}
var ModalManager = class {
  constructor() {
    this.containers = void 0;
    this.modals = void 0;
    this.modals = [];
    this.containers = [];
  }
  add(modal, container) {
    let modalIndex = this.modals.indexOf(modal);
    if (modalIndex !== -1) {
      return modalIndex;
    }
    modalIndex = this.modals.length;
    this.modals.push(modal);
    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }
    const hiddenSiblings = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
    const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }
    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblings
    });
    return modalIndex;
  }
  mount(modal, props) {
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];
    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }
  remove(modal, ariaHiddenState = true) {
    const modalIndex = this.modals.indexOf(modal);
    if (modalIndex === -1) {
      return modalIndex;
    }
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];
    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1);
    if (containerInfo.modals.length === 0) {
      if (containerInfo.restore) {
        containerInfo.restore();
      }
      if (modal.modalRef) {
        ariaHidden(modal.modalRef, ariaHiddenState);
      }
      ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
      this.containers.splice(containerIndex, 1);
    } else {
      const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
      if (nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }
    return modalIndex;
  }
  isTopModal(modal) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }
};

// node_modules/@mui/lab/node_modules/@mui/base/unstable_useModal/useModal.js
function getContainer2(container) {
  return typeof container === "function" ? container() : container;
}
function getHasTransition(children) {
  return children ? children.props.hasOwnProperty("in") : false;
}
var defaultManager = new ModalManager();
function useModal(parameters) {
  const {
    container,
    disableEscapeKeyDown = false,
    disableScrollLock = false,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager = defaultManager,
    closeAfterTransition = false,
    onTransitionEnter,
    onTransitionExited,
    children,
    onClose,
    open,
    rootRef
  } = parameters;
  const modal = React36.useRef({});
  const mountNodeRef = React36.useRef(null);
  const modalRef = React36.useRef(null);
  const handleRef = useForkRef(modalRef, rootRef);
  const [exited, setExited] = React36.useState(!open);
  const hasTransition = getHasTransition(children);
  let ariaHiddenProp = true;
  if (parameters["aria-hidden"] === "false" || parameters["aria-hidden"] === false) {
    ariaHiddenProp = false;
  }
  const getDoc = () => ownerDocument(mountNodeRef.current);
  const getModal = () => {
    modal.current.modalRef = modalRef.current;
    modal.current.mount = mountNodeRef.current;
    return modal.current;
  };
  const handleMounted = () => {
    manager.mount(getModal(), {
      disableScrollLock
    });
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  };
  const handleOpen = useEventCallback_default(() => {
    const resolvedContainer = getContainer2(container) || getDoc().body;
    manager.add(getModal(), resolvedContainer);
    if (modalRef.current) {
      handleMounted();
    }
  });
  const isTopModal = React36.useCallback(() => manager.isTopModal(getModal()), [manager]);
  const handlePortalRef = useEventCallback_default((node) => {
    mountNodeRef.current = node;
    if (!node) {
      return;
    }
    if (open && isTopModal()) {
      handleMounted();
    } else if (modalRef.current) {
      ariaHidden(modalRef.current, ariaHiddenProp);
    }
  });
  const handleClose = React36.useCallback(() => {
    manager.remove(getModal(), ariaHiddenProp);
  }, [ariaHiddenProp, manager]);
  React36.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);
  React36.useEffect(() => {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);
  const createHandleKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.key !== "Escape" || !isTopModal()) {
      return;
    }
    if (!disableEscapeKeyDown) {
      event.stopPropagation();
      if (onClose) {
        onClose(event, "escapeKeyDown");
      }
    }
  };
  const createHandleBackdropClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
    if (event.target !== event.currentTarget) {
      return;
    }
    if (onClose) {
      onClose(event, "backdropClick");
    }
  };
  const getRootProps = (otherHandlers = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters);
    delete propsEventHandlers.onTransitionEnter;
    delete propsEventHandlers.onTransitionExited;
    const externalEventHandlers = _extends({}, propsEventHandlers, otherHandlers);
    return _extends({
      role: "presentation"
    }, externalEventHandlers, {
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      ref: handleRef
    });
  };
  const getBackdropProps = (otherHandlers = {}) => {
    const externalEventHandlers = otherHandlers;
    return _extends({
      "aria-hidden": true
    }, externalEventHandlers, {
      onClick: createHandleBackdropClick(externalEventHandlers),
      open
    });
  };
  const getTransitionProps = () => {
    const handleEnter = () => {
      setExited(false);
      if (onTransitionEnter) {
        onTransitionEnter();
      }
    };
    const handleExited = () => {
      setExited(true);
      if (onTransitionExited) {
        onTransitionExited();
      }
      if (closeAfterTransition) {
        handleClose();
      }
    };
    return {
      onEnter: createChainedFunction(handleEnter, children == null ? void 0 : children.props.onEnter),
      onExited: createChainedFunction(handleExited, children == null ? void 0 : children.props.onExited)
    };
  };
  return {
    getRootProps,
    getBackdropProps,
    getTransitionProps,
    rootRef: handleRef,
    portalRef: handlePortalRef,
    isTopModal,
    exited,
    hasTransition
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/Modal/modalClasses.js
function getModalUtilityClass(slot) {
  return generateUtilityClass("MuiModal", slot);
}
var modalClasses = generateUtilityClasses("MuiModal", ["root", "hidden", "backdrop"]);

// node_modules/@mui/lab/node_modules/@mui/base/Modal/Modal.js
var import_jsx_runtime18 = __toESM(require_jsx_runtime());
var import_jsx_runtime19 = __toESM(require_jsx_runtime());
var _excluded10 = ["children", "closeAfterTransition", "container", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onKeyDown", "open", "onTransitionEnter", "onTransitionExited", "slotProps", "slots"];
var useUtilityClasses9 = (ownerState) => {
  const {
    open,
    exited
  } = ownerState;
  const slots = {
    root: ["root", !open && exited && "hidden"],
    backdrop: ["backdrop"]
  };
  return composeClasses(slots, useClassNamesOverride(getModalUtilityClass));
};
var Modal = React37.forwardRef(function Modal2(props, forwardedRef) {
  var _slots$root;
  const {
    children,
    closeAfterTransition = false,
    container,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    onBackdropClick,
    open,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded10);
  const propsWithDefaults = _extends({}, props, {
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted
  });
  const {
    getRootProps,
    getBackdropProps,
    getTransitionProps,
    portalRef,
    isTopModal,
    exited,
    hasTransition
  } = useModal(_extends({}, propsWithDefaults, {
    rootRef: forwardedRef
  }));
  const ownerState = _extends({}, propsWithDefaults, {
    exited,
    hasTransition
  });
  const classes = useUtilityClasses9(ownerState);
  const childProps = {};
  if (children.props.tabIndex === void 0) {
    childProps.tabIndex = "-1";
  }
  if (hasTransition) {
    const {
      onEnter,
      onExited
    } = getTransitionProps();
    childProps.onEnter = onEnter;
    childProps.onExited = onExited;
  }
  const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    getSlotProps: getRootProps,
    className: classes.root,
    ownerState
  });
  const BackdropComponent = slots.backdrop;
  const backdropProps = useSlotProps({
    elementType: BackdropComponent,
    externalSlotProps: slotProps.backdrop,
    getSlotProps: (otherHandlers) => {
      return getBackdropProps(_extends({}, otherHandlers, {
        onClick: (e) => {
          if (onBackdropClick) {
            onBackdropClick(e);
          }
          if (otherHandlers != null && otherHandlers.onClick) {
            otherHandlers.onClick(e);
          }
        }
      }));
    },
    className: classes.backdrop,
    ownerState
  });
  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }
  return (0, import_jsx_runtime18.jsx)(Portal, {
    ref: portalRef,
    container,
    disablePortal,
    children: (0, import_jsx_runtime19.jsxs)(Root, _extends({}, rootProps, {
      children: [!hideBackdrop && BackdropComponent ? (0, import_jsx_runtime18.jsx)(BackdropComponent, _extends({}, backdropProps)) : null, (0, import_jsx_runtime18.jsx)(FocusTrap, {
        disableEnforceFocus,
        disableAutoFocus,
        disableRestoreFocus,
        isEnabled: isTopModal,
        open,
        children: React37.cloneElement(children, childProps)
      })]
    }))
  });
});
true ? Modal.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A single child content element.
   */
  children: elementAcceptingRef_default.isRequired,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: import_prop_types13.default.bool,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: import_prop_types13.default.oneOfType([HTMLElementType, import_prop_types13.default.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: import_prop_types13.default.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: import_prop_types13.default.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: import_prop_types13.default.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: import_prop_types13.default.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: import_prop_types13.default.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: import_prop_types13.default.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: import_prop_types13.default.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: import_prop_types13.default.bool,
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: import_prop_types13.default.func,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: import_prop_types13.default.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: import_prop_types13.default.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: import_prop_types13.default.func,
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types13.default.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: import_prop_types13.default.shape({
    backdrop: import_prop_types13.default.oneOfType([import_prop_types13.default.func, import_prop_types13.default.object]),
    root: import_prop_types13.default.oneOfType([import_prop_types13.default.func, import_prop_types13.default.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types13.default.shape({
    backdrop: import_prop_types13.default.elementType,
    root: import_prop_types13.default.elementType
  })
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/NoSsr/NoSsr.js
var React38 = __toESM(require_react());
var import_prop_types14 = __toESM(require_prop_types());
var import_jsx_runtime20 = __toESM(require_jsx_runtime());
function NoSsr(props) {
  const {
    children,
    defer = false,
    fallback = null
  } = props;
  const [mountedState, setMountedState] = React38.useState(false);
  useEnhancedEffect_default(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);
  React38.useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);
  return (0, import_jsx_runtime20.jsx)(React38.Fragment, {
    children: mountedState ? children : fallback
  });
}
true ? NoSsr.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * You can wrap a node.
   */
  children: import_prop_types14.default.node,
  /**
   * If `true`, the component will not only prevent server-side rendering.
   * It will also defer the rendering of the children into a different screen frame.
   * @default false
   */
  defer: import_prop_types14.default.bool,
  /**
   * The fallback content to display.
   * @default null
   */
  fallback: import_prop_types14.default.node
} : void 0;
if (true) {
  NoSsr["propTypes"] = exactProp(NoSsr.propTypes);
}

// node_modules/@mui/lab/node_modules/@mui/base/Unstable_NumberInput/NumberInput.js
init_extends();
var React40 = __toESM(require_react());
var import_prop_types15 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/Unstable_NumberInput/numberInputClasses.js
function getNumberInputUtilityClass(slot) {
  return generateUtilityClass("MuiNumberInput", slot);
}
var numberInputClasses = generateUtilityClasses("MuiNumberInput", ["root", "formControl", "focused", "disabled", "readOnly", "error", "input", "incrementButton", "decrementButton", "adornedStart", "adornedEnd"]);

// node_modules/@mui/lab/node_modules/@mui/base/unstable_useNumberInput/useNumberInput.js
init_extends();
var React39 = __toESM(require_react());

// node_modules/@mui/lab/node_modules/@mui/base/unstable_useNumberInput/utils.js
function simpleClamp(val, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
  return Math.max(min, Math.min(val, max));
}
function clamp(val, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, stepProp = NaN) {
  if (Number.isNaN(stepProp)) {
    return simpleClamp(val, min, max);
  }
  const step = stepProp || 1;
  const remainder = val % step;
  const positivity = Math.sign(remainder);
  if (Math.abs(remainder) > step / 2) {
    return simpleClamp(val + positivity * (step - Math.abs(remainder)), min, max);
  }
  return simpleClamp(val - positivity * Math.abs(remainder), min, max);
}
function isNumber(val) {
  return typeof val === "number" && !Number.isNaN(val) && Number.isFinite(val);
}

// node_modules/@mui/lab/node_modules/@mui/base/unstable_useNumberInput/useNumberInput.js
var STEP_KEYS = ["ArrowUp", "ArrowDown", "PageUp", "PageDown"];
var SUPPORTED_KEYS = [...STEP_KEYS, "Home", "End"];
function parseInput(v) {
  return v ? String(v.trim()) : String(v);
}
function useNumberInput(parameters) {
  const {
    min,
    max,
    step,
    shiftMultiplier = 10,
    defaultValue: defaultValueProp,
    disabled: disabledProp = false,
    error: errorProp = false,
    onBlur,
    onInputChange,
    onFocus,
    onChange,
    required: requiredProp = false,
    readOnly: readOnlyProp = false,
    value: valueProp,
    inputRef: inputRefProp,
    inputId: inputIdProp
  } = parameters;
  const formControlContext = useFormControlContext();
  const {
    current: isControlled
  } = React39.useRef(valueProp != null);
  const handleInputRefWarning = React39.useCallback((instance) => {
    if (true) {
      if (instance && instance.nodeName !== "INPUT" && !instance.focus) {
        console.error(["MUI: You have provided a `slots.input` to the input component", "that does not correctly handle the `ref` prop.", "Make sure the `ref` prop is called with a HTMLInputElement."].join("\n"));
      }
    }
  }, []);
  const inputRef = React39.useRef(null);
  const handleInputRef = useForkRef(inputRef, inputRefProp, handleInputRefWarning);
  const inputId = useId(inputIdProp);
  const [focused, setFocused] = React39.useState(false);
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValueProp,
    name: "NumberInput"
  });
  const [dirtyValue, setDirtyValue] = React39.useState(value ? String(value) : void 0);
  React39.useEffect(() => {
    if (!formControlContext && disabledProp && focused) {
      setFocused(false);
      onBlur == null || onBlur();
    }
  }, [formControlContext, disabledProp, focused, onBlur]);
  const handleFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu;
    (_otherHandlers$onFocu = otherHandlers.onFocus) == null || _otherHandlers$onFocu.call(otherHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    if (formControlContext && formControlContext.onFocus) {
      var _formControlContext$o;
      formControlContext == null || (_formControlContext$o = formControlContext.onFocus) == null || _formControlContext$o.call(formControlContext);
    }
    setFocused(true);
  };
  const handleValueChange = () => (event, val) => {
    let newValue;
    if (val === void 0) {
      newValue = val;
      setDirtyValue("");
    } else {
      newValue = clamp(val, min, max, step);
      setDirtyValue(String(newValue));
    }
    setValue(newValue);
    if (isNumber(newValue)) {
      onChange == null || onChange(event, newValue);
    } else {
      onChange == null || onChange(event, void 0);
    }
  };
  const handleInputChange = (otherHandlers) => (event) => {
    var _formControlContext$o2, _otherHandlers$onInpu;
    if (!isControlled && event.target === null) {
      throw new Error(true ? `MUI: Expected valid input target. Did you use a custom \`slots.input\` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.` : formatMuiErrorMessage(17));
    }
    formControlContext == null || (_formControlContext$o2 = formControlContext.onChange) == null || _formControlContext$o2.call(formControlContext, event);
    (_otherHandlers$onInpu = otherHandlers.onInputChange) == null || _otherHandlers$onInpu.call(otherHandlers, event);
    const val = parseInput(event.currentTarget.value);
    if (val === "" || val === "-") {
      setDirtyValue(val);
      setValue(void 0);
    }
    if (val.match(/^-?\d+?$/)) {
      setDirtyValue(val);
      setValue(parseInt(val, 10));
    }
  };
  const handleBlur2 = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    const val = parseInput(event.currentTarget.value);
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null || _otherHandlers$onBlur.call(otherHandlers, event);
    if (val === "" || val === "-") {
      handleValueChange()(event, void 0);
    } else {
      handleValueChange()(event, parseInt(val, 10));
    }
    if (formControlContext && formControlContext.onBlur) {
      formControlContext.onBlur();
    }
    setFocused(false);
  };
  const handleClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }
    (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
  };
  const handleStep = (direction) => (event) => {
    let newValue;
    if (isNumber(value)) {
      const multiplier = event.shiftKey || event.key === "PageUp" || event.key === "PageDown" ? shiftMultiplier : 1;
      newValue = {
        up: value + (step != null ? step : 1) * multiplier,
        down: value - (step != null ? step : 1) * multiplier
      }[direction];
    } else {
      newValue = {
        up: min != null ? min : 0,
        down: max != null ? max : 0
      }[direction];
    }
    handleValueChange()(event, newValue);
  };
  const handleKeyDown2 = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    if (SUPPORTED_KEYS.includes(event.key)) {
      event.preventDefault();
    }
    if (STEP_KEYS.includes(event.key)) {
      const direction = {
        ArrowUp: "up",
        ArrowDown: "down",
        PageUp: "up",
        PageDown: "down"
      }[event.key];
      handleStep(direction)(event);
    }
    if (event.key === "Home" && isNumber(max)) {
      handleValueChange()(event, max);
    }
    if (event.key === "End" && isNumber(min)) {
      handleValueChange()(event, min);
    }
  };
  const getRootProps = (externalProps = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters, ["onBlur", "onInputChange", "onFocus", "onChange"]);
    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    return _extends({}, externalProps, externalEventHandlers, {
      onClick: handleClick(externalEventHandlers)
    });
  };
  const getInputProps = (externalProps = {}) => {
    var _ref;
    const externalEventHandlers = _extends({
      onBlur,
      onFocus
    }, extractEventHandlers(externalProps, ["onInputChange"]));
    const mergedEventHandlers = _extends({}, externalProps, externalEventHandlers, {
      onFocus: handleFocus(externalEventHandlers),
      onChange: handleInputChange(_extends({}, externalEventHandlers, {
        onInputChange
      })),
      onBlur: handleBlur2(externalEventHandlers),
      onKeyDown: handleKeyDown2(externalEventHandlers)
    });
    const displayValue = (_ref = focused ? dirtyValue : value) != null ? _ref : "";
    return _extends({}, mergedEventHandlers, {
      type: "text",
      id: inputId,
      "aria-invalid": errorProp || void 0,
      defaultValue: void 0,
      ref: handleInputRef,
      value: displayValue,
      "aria-valuenow": displayValue,
      "aria-valuetext": String(displayValue),
      "aria-valuemin": min,
      "aria-valuemax": max,
      autoComplete: "off",
      autoCorrect: "off",
      spellCheck: "false",
      required: requiredProp,
      readOnly: readOnlyProp,
      "aria-disabled": disabledProp,
      disabled: disabledProp
    });
  };
  const handleStepperButtonMouseDown = (event) => {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const stepperButtonCommonProps = {
    "aria-controls": inputId,
    tabIndex: -1
  };
  const isIncrementDisabled = disabledProp || (isNumber(value) ? value >= (max != null ? max : Number.MAX_SAFE_INTEGER) : false);
  const getIncrementButtonProps = (externalProps = {}) => {
    return _extends({}, externalProps, stepperButtonCommonProps, {
      disabled: isIncrementDisabled,
      "aria-disabled": isIncrementDisabled,
      onMouseDown: handleStepperButtonMouseDown,
      onClick: handleStep("up")
    });
  };
  const isDecrementDisabled = disabledProp || (isNumber(value) ? value <= (min != null ? min : Number.MIN_SAFE_INTEGER) : false);
  const getDecrementButtonProps = (externalProps = {}) => {
    return _extends({}, externalProps, stepperButtonCommonProps, {
      disabled: isDecrementDisabled,
      "aria-disabled": isDecrementDisabled,
      onMouseDown: handleStepperButtonMouseDown,
      onClick: handleStep("down")
    });
  };
  return {
    disabled: disabledProp,
    error: errorProp,
    focused,
    formControlContext,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    getRootProps,
    required: requiredProp,
    value: focused ? dirtyValue : value,
    isIncrementDisabled,
    isDecrementDisabled,
    inputValue: dirtyValue
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/Unstable_NumberInput/NumberInput.js
var import_jsx_runtime21 = __toESM(require_jsx_runtime());
var import_jsx_runtime22 = __toESM(require_jsx_runtime());
var _excluded11 = ["className", "defaultValue", "disabled", "endAdornment", "error", "id", "max", "min", "onBlur", "onInputChange", "onFocus", "onChange", "placeholder", "required", "readOnly", "shiftMultiplier", "startAdornment", "step", "value", "slotProps", "slots"];
var useUtilityClasses10 = (ownerState) => {
  const {
    disabled,
    error,
    focused,
    readOnly,
    formControlContext,
    isIncrementDisabled,
    isDecrementDisabled,
    startAdornment,
    endAdornment
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", error && "error", focused && "focused", readOnly && "readOnly", Boolean(formControlContext) && "formControl", Boolean(startAdornment) && "adornedStart", Boolean(endAdornment) && "adornedEnd"],
    input: ["input", disabled && "disabled", readOnly && "readOnly"],
    incrementButton: ["incrementButton", isIncrementDisabled && "disabled"],
    decrementButton: ["decrementButton", isDecrementDisabled && "disabled"]
  };
  return composeClasses(slots, useClassNamesOverride(getNumberInputUtilityClass));
};
var NumberInput = React40.forwardRef(function NumberInput2(props, forwardedRef) {
  var _slots$root, _slots$input, _slots$incrementButto, _slots$decrementButto;
  const {
    className,
    defaultValue,
    disabled,
    endAdornment,
    error,
    id,
    max,
    min,
    onBlur,
    onInputChange,
    onFocus,
    onChange,
    placeholder,
    required,
    readOnly = false,
    shiftMultiplier,
    startAdornment,
    step,
    value,
    slotProps = {},
    slots = {}
  } = props, rest = _objectWithoutPropertiesLoose(props, _excluded11);
  const {
    getRootProps,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    focused,
    error: errorState,
    disabled: disabledState,
    formControlContext,
    isIncrementDisabled,
    isDecrementDisabled
  } = useNumberInput({
    min,
    max,
    step,
    shiftMultiplier,
    defaultValue,
    disabled,
    error,
    onFocus,
    onInputChange,
    onBlur,
    onChange,
    required,
    readOnly,
    value,
    inputId: id
  });
  const ownerState = _extends({}, props, {
    disabled: disabledState,
    error: errorState,
    focused,
    readOnly,
    formControlContext,
    isIncrementDisabled,
    isDecrementDisabled
  });
  const classes = useUtilityClasses10(ownerState);
  const propsForwardedToInputSlot = {
    placeholder
  };
  const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: rest,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: [classes.root, className]
  });
  const Input3 = (_slots$input = slots.input) != null ? _slots$input : "input";
  const inputProps = useSlotProps({
    elementType: Input3,
    getSlotProps: (otherHandlers) => getInputProps(_extends({}, otherHandlers, propsForwardedToInputSlot)),
    externalSlotProps: slotProps.input,
    ownerState,
    className: classes.input
  });
  const IncrementButton = (_slots$incrementButto = slots.incrementButton) != null ? _slots$incrementButto : "button";
  const incrementButtonProps = useSlotProps({
    elementType: IncrementButton,
    getSlotProps: getIncrementButtonProps,
    externalSlotProps: slotProps.incrementButton,
    ownerState,
    className: classes.incrementButton
  });
  const DecrementButton = (_slots$decrementButto = slots.decrementButton) != null ? _slots$decrementButto : "button";
  const decrementButtonProps = useSlotProps({
    elementType: DecrementButton,
    getSlotProps: getDecrementButtonProps,
    externalSlotProps: slotProps.decrementButton,
    ownerState,
    className: classes.decrementButton
  });
  return (0, import_jsx_runtime22.jsxs)(Root, _extends({}, rootProps, {
    children: [(0, import_jsx_runtime21.jsx)(DecrementButton, _extends({}, decrementButtonProps)), (0, import_jsx_runtime21.jsx)(IncrementButton, _extends({}, incrementButtonProps)), startAdornment, (0, import_jsx_runtime21.jsx)(Input3, _extends({}, inputProps)), endAdornment]
  }));
});
true ? NumberInput.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: import_prop_types15.default.node,
  /**
   * @ignore
   */
  className: import_prop_types15.default.string,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: import_prop_types15.default.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: import_prop_types15.default.bool,
  /**
   * Trailing adornment for this input.
   */
  endAdornment: import_prop_types15.default.node,
  /**
   * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `Mui-error` class on the root element.
   */
  error: import_prop_types15.default.bool,
  /**
   * The id of the `input` element.
   */
  id: import_prop_types15.default.string,
  /**
   * The maximum value.
   */
  max: import_prop_types15.default.number,
  /**
   * The minimum value.
   */
  min: import_prop_types15.default.number,
  /**
   * @ignore
   */
  onBlur: import_prop_types15.default.func,
  /**
   * Callback fired after the value is clamped and changes - when the `input` is blurred or when
   * the stepper buttons are triggered.
   * Called with `undefined` when the value is unset.
   *
   * @param {React.FocusEvent<HTMLInputElement>|React.PointerEvent|React.KeyboardEvent} event The event source of the callback
   * @param {number|undefined} value The new value of the component
   */
  onChange: import_prop_types15.default.func,
  /**
   * @ignore
   */
  onFocus: import_prop_types15.default.func,
  /**
   * Callback fired when the `input` value changes after each keypress, before clamping is applied.
   * Note that `event.target.value` may contain values that fall outside of `min` and `max` or
   * are otherwise "invalid".
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   */
  onInputChange: import_prop_types15.default.func,
  /**
   * @ignore
   */
  placeholder: import_prop_types15.default.string,
  /**
   * If `true`, the `input` element becomes read-only. The stepper buttons remain active,
   * with the addition that they are now keyboard focusable.
   * @default false
   */
  readOnly: import_prop_types15.default.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: import_prop_types15.default.bool,
  /**
   * Multiplier applied to `step` if the shift key is held while incrementing
   * or decrementing the value. Defaults to `10`.
   */
  shiftMultiplier: import_prop_types15.default.number,
  /**
   * The props used for each slot inside the NumberInput.
   * @default {}
   */
  slotProps: import_prop_types15.default.shape({
    decrementButton: import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object]),
    incrementButton: import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object]),
    input: import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object]),
    root: import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object])
  }),
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types15.default.shape({
    decrementButton: import_prop_types15.default.elementType,
    incrementButton: import_prop_types15.default.elementType,
    input: import_prop_types15.default.elementType,
    root: import_prop_types15.default.elementType
  }),
  /**
   * Leading adornment for this input.
   */
  startAdornment: import_prop_types15.default.node,
  /**
   * The amount that the value changes on each increment or decrement.
   */
  step: import_prop_types15.default.number,
  /**
   * The current value. Use when the component is controlled.
   */
  value: import_prop_types15.default.any
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/OptionGroup/OptionGroup.js
init_extends();
var React41 = __toESM(require_react());
var import_prop_types16 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/OptionGroup/optionGroupClasses.js
function getOptionGroupUtilityClass(slot) {
  return generateUtilityClass("MuiOptionGroup", slot);
}
var optionGroupClasses = generateUtilityClasses("MuiOptionGroup", ["root", "disabled", "label", "list"]);

// node_modules/@mui/lab/node_modules/@mui/base/OptionGroup/OptionGroup.js
var import_jsx_runtime23 = __toESM(require_jsx_runtime());
var import_jsx_runtime24 = __toESM(require_jsx_runtime());
var _excluded12 = ["disabled", "slotProps", "slots"];
function useUtilityClasses11(disabled) {
  const slots = {
    root: ["root", disabled && "disabled"],
    label: ["label"],
    list: ["list"]
  };
  return composeClasses(slots, useClassNamesOverride(getOptionGroupUtilityClass));
}
var OptionGroup = React41.forwardRef(function OptionGroup2(props, forwardedRef) {
  const {
    disabled = false,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded12);
  const Root = (slots == null ? void 0 : slots.root) || "li";
  const Label = (slots == null ? void 0 : slots.label) || "span";
  const List = (slots == null ? void 0 : slots.list) || "ul";
  const classes = useUtilityClasses11(disabled);
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState: props,
    className: classes.root
  });
  const labelProps = useSlotProps({
    elementType: Label,
    externalSlotProps: slotProps.label,
    ownerState: props,
    className: classes.label
  });
  const listProps = useSlotProps({
    elementType: List,
    externalSlotProps: slotProps.list,
    ownerState: props,
    className: classes.list
  });
  return (0, import_jsx_runtime24.jsxs)(Root, _extends({}, rootProps, {
    children: [(0, import_jsx_runtime23.jsx)(Label, _extends({}, labelProps, {
      children: props.label
    })), (0, import_jsx_runtime23.jsx)(List, _extends({}, listProps, {
      children: props.children
    }))]
  }));
});
true ? OptionGroup.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: import_prop_types16.default.node,
  /**
   * @ignore
   */
  className: import_prop_types16.default.string,
  /**
   * If `true` all the options in the group will be disabled.
   * @default false
   */
  disabled: import_prop_types16.default.bool,
  /**
   * The human-readable description of the group.
   */
  label: import_prop_types16.default.node,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: import_prop_types16.default.shape({
    label: import_prop_types16.default.oneOfType([import_prop_types16.default.func, import_prop_types16.default.object]),
    list: import_prop_types16.default.oneOfType([import_prop_types16.default.func, import_prop_types16.default.object]),
    root: import_prop_types16.default.oneOfType([import_prop_types16.default.func, import_prop_types16.default.object])
  }),
  /**
   * The components used for each slot inside the OptionGroup.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types16.default.shape({
    label: import_prop_types16.default.elementType,
    list: import_prop_types16.default.elementType,
    root: import_prop_types16.default.elementType
  })
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/Option/Option.js
init_extends();
var React43 = __toESM(require_react());
var import_prop_types17 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/Option/optionClasses.js
function getOptionUtilityClass(slot) {
  return generateUtilityClass("MuiOption", slot);
}
var optionClasses = generateUtilityClasses("MuiOption", ["root", "disabled", "selected", "highlighted"]);

// node_modules/@mui/lab/node_modules/@mui/base/useOption/useOption.js
init_extends();
var React42 = __toESM(require_react());
function useOption(params) {
  const {
    value,
    label,
    disabled,
    rootRef: optionRefParam,
    id: idParam
  } = params;
  const {
    getRootProps: getListItemProps,
    rootRef: listItemRefHandler,
    highlighted,
    selected
  } = useListItem({
    item: value
  });
  const id = useId(idParam);
  const optionRef = React42.useRef(null);
  const selectOption = React42.useMemo(() => ({
    disabled,
    label,
    value,
    ref: optionRef,
    id
  }), [disabled, label, value, id]);
  const {
    index
  } = useCompoundItem(value, selectOption);
  const handleRef = useForkRef(optionRefParam, optionRef, listItemRefHandler);
  return {
    getRootProps: (externalProps = {}) => {
      const externalEventHandlers = extractEventHandlers(externalProps);
      return _extends({}, externalProps, getListItemProps(externalEventHandlers), {
        id,
        ref: handleRef,
        role: "option",
        "aria-selected": selected
      });
    },
    highlighted,
    index,
    selected,
    rootRef: handleRef
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/Option/Option.js
var import_jsx_runtime25 = __toESM(require_jsx_runtime());
var _excluded13 = ["children", "disabled", "label", "slotProps", "slots", "value"];
function useUtilityClasses12(ownerState) {
  const {
    disabled,
    highlighted,
    selected
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", highlighted && "highlighted", selected && "selected"]
  };
  return composeClasses(slots, useClassNamesOverride(getOptionUtilityClass));
}
var Option = React43.memo(React43.forwardRef(function Option2(props, forwardedRef) {
  var _slots$root, _optionRef$current;
  const {
    children,
    disabled = false,
    label,
    slotProps = {},
    slots = {},
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded13);
  const Root = (_slots$root = slots.root) != null ? _slots$root : "li";
  const optionRef = React43.useRef(null);
  const combinedRef = useForkRef(optionRef, forwardedRef);
  const computedLabel = label != null ? label : typeof children === "string" ? children : (_optionRef$current = optionRef.current) == null ? void 0 : _optionRef$current.innerText;
  const {
    getRootProps,
    selected,
    highlighted,
    index
  } = useOption({
    disabled,
    label: computedLabel,
    rootRef: combinedRef,
    value
  });
  const ownerState = _extends({}, props, {
    disabled,
    highlighted,
    index,
    selected
  });
  const classes = useUtilityClasses12(ownerState);
  const rootProps = useSlotProps({
    getSlotProps: getRootProps,
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    className: classes.root,
    ownerState
  });
  return (0, import_jsx_runtime25.jsx)(Root, _extends({}, rootProps, {
    children
  }));
}));
true ? Option.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: import_prop_types17.default.node,
  /**
   * @ignore
   */
  className: import_prop_types17.default.string,
  /**
   * If `true`, the option will be disabled.
   * @default false
   */
  disabled: import_prop_types17.default.bool,
  /**
   * A text representation of the option's content.
   * Used for keyboard text navigation matching.
   */
  label: import_prop_types17.default.string,
  /**
   * The props used for each slot inside the Option.
   * @default {}
   */
  slotProps: import_prop_types17.default.shape({
    root: import_prop_types17.default.oneOfType([import_prop_types17.default.func, import_prop_types17.default.object])
  }),
  /**
   * The components used for each slot inside the Option.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types17.default.shape({
    root: import_prop_types17.default.elementType
  }),
  /**
   * The value of the option.
   */
  value: import_prop_types17.default.any.isRequired
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/Unstable_Popup/Popup.js
init_extends();
var React44 = __toESM(require_react());
var import_prop_types18 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/Unstable_Popup/popupClasses.js
function getPopupUtilityClass(slot) {
  return generateUtilityClass("MuiPopup", slot);
}
var popupClasses = generateUtilityClasses("MuiPopup", ["root", "open"]);

// node_modules/@mui/lab/node_modules/@mui/base/Unstable_Popup/Popup.js
var import_jsx_runtime26 = __toESM(require_jsx_runtime());
var _excluded14 = ["anchor", "children", "container", "disablePortal", "keepMounted", "middleware", "offset", "open", "placement", "slotProps", "slots", "strategy", "withTransition"];
function useUtilityClasses13(ownerState) {
  const {
    open
  } = ownerState;
  const slots = {
    root: ["root", open && "open"]
  };
  return composeClasses(slots, useClassNamesOverride(getPopupUtilityClass));
}
function resolveAnchor(anchor) {
  return typeof anchor === "function" ? anchor() : anchor;
}
var Popup = React44.forwardRef(function Popup2(props, forwardedRef) {
  var _slots$root;
  const {
    anchor: anchorProp,
    children,
    container,
    disablePortal = false,
    keepMounted = false,
    middleware,
    offset: offsetProp = 0,
    open = false,
    placement = "bottom",
    slotProps = {},
    slots = {},
    strategy = "absolute",
    withTransition = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded14);
  const {
    refs,
    elements,
    floatingStyles,
    update,
    placement: finalPlacement
  } = useFloating({
    elements: {
      reference: resolveAnchor(anchorProp)
    },
    open,
    middleware: middleware != null ? middleware : [offset(offsetProp != null ? offsetProp : 0), flip()],
    placement,
    strategy,
    whileElementsMounted: !keepMounted ? autoUpdate : void 0
  });
  const handleRef = useForkRef(refs.setFloating, forwardedRef);
  const [exited, setExited] = React44.useState(true);
  const handleEntering = () => {
    setExited(false);
  };
  const handleExited = () => {
    setExited(true);
  };
  useEnhancedEffect_default(() => {
    if (keepMounted && open && elements.reference && elements.floating) {
      const cleanup = autoUpdate(elements.reference, elements.floating, update);
      return cleanup;
    }
    return void 0;
  }, [keepMounted, open, elements, update]);
  const ownerState = _extends({}, props, {
    disablePortal,
    keepMounted,
    offset,
    open,
    placement,
    finalPlacement,
    strategy,
    withTransition
  });
  const display = !open && keepMounted && (!withTransition || exited) ? "none" : void 0;
  const classes = useUtilityClasses13(ownerState);
  const Root = (_slots$root = slots == null ? void 0 : slots.root) != null ? _slots$root : "div";
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState,
    className: classes.root,
    additionalProps: {
      ref: handleRef,
      role: "tooltip",
      style: _extends({}, floatingStyles, {
        display
      })
    }
  });
  const shouldRender = open || keepMounted || withTransition && !exited;
  if (!shouldRender) {
    return null;
  }
  const childProps = {
    placement: finalPlacement,
    requestOpen: open,
    onExited: handleExited,
    onEnter: handleEntering
  };
  return (0, import_jsx_runtime26.jsx)(Portal, {
    disablePortal,
    container,
    children: (0, import_jsx_runtime26.jsx)(Root, _extends({}, rootProps, {
      children: typeof children === "function" ? children(childProps) : children
    }))
  });
});
true ? Popup.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * An HTML element, [virtual element](https://floating-ui.com/docs/virtual-elements),
   * or a function that returns either.
   * It's used to set the position of the popup.
   */
  anchor: import_prop_types18.default.oneOfType([HTMLElementType, import_prop_types18.default.object, import_prop_types18.default.func]),
  /**
   * @ignore
   */
  children: import_prop_types18.default.oneOfType([import_prop_types18.default.node, import_prop_types18.default.func]),
  /**
   * An HTML element or function that returns one. The container will have the portal children appended to it.
   * By default, it uses the body of the top-level document object, so it's `document.body` in these cases.
   */
  container: import_prop_types18.default.oneOfType([HTMLElementType, import_prop_types18.default.func]),
  /**
   * If `true`, the popup will be rendered where it is defined, without the use of portals.
   * @default false
   */
  disablePortal: import_prop_types18.default.bool,
  /**
   * If `true`, the popup will exist in the DOM even if it's closed.
   * Its visibility will be controlled by the `display` CSS property.
   *
   * Otherwise, a closed popup will be removed from the DOM.
   *
   * @default false
   */
  keepMounted: import_prop_types18.default.bool,
  /**
   * Collection of Floating UI middleware to use when positioning the popup.
   * If not provided, the [`offset`](https://floating-ui.com/docs/offset)
   * and [`flip`](https://floating-ui.com/docs/flip) functions will be used.
   *
   * @see https://floating-ui.com/docs/computePosition#middleware
   */
  middleware: import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.oneOf([false]), import_prop_types18.default.shape({
    fn: import_prop_types18.default.func.isRequired,
    name: import_prop_types18.default.string.isRequired,
    options: import_prop_types18.default.any
  })])),
  /**
   * Distance between a popup and the trigger element.
   * This prop is ignored when custom `middleware` is provided.
   *
   * @default 0
   * @see https://floating-ui.com/docs/offset
   */
  offset: import_prop_types18.default.oneOfType([import_prop_types18.default.func, import_prop_types18.default.number, import_prop_types18.default.shape({
    alignmentAxis: import_prop_types18.default.number,
    crossAxis: import_prop_types18.default.number,
    mainAxis: import_prop_types18.default.number
  })]),
  /**
   * If `true`, the popup is visible.
   *
   * @default false
   */
  open: import_prop_types18.default.bool,
  /**
   * Determines where to place the popup relative to the trigger element.
   *
   * @default 'bottom'
   * @see https://floating-ui.com/docs/computePosition#placement
   */
  placement: import_prop_types18.default.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The props used for each slot inside the Popup.
   *
   * @default {}
   */
  slotProps: import_prop_types18.default.shape({
    root: import_prop_types18.default.oneOfType([import_prop_types18.default.func, import_prop_types18.default.object])
  }),
  /**
   * The components used for each slot inside the Popup.
   * Either a string to use a HTML element or a component.
   *
   * @default {}
   */
  slots: import_prop_types18.default.shape({
    root: import_prop_types18.default.elementType
  }),
  /**
   * The type of CSS position property to use (absolute or fixed).
   *
   * @default 'absolute'
   * @see https://floating-ui.com/docs/computePosition#strategy
   */
  strategy: import_prop_types18.default.oneOf(["absolute", "fixed"]),
  /**
   * If `true`, the popup will not disappear immediately when it needs to be closed
   * but wait until the exit transition has finished.
   * In such a case, a function form of `children` must be used and `onExited`
   * callback function must be called when the transition or animation finish.
   *
   * @default false
   */
  withTransition: import_prop_types18.default.bool
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/Select/Select.js
init_extends();
var React47 = __toESM(require_react());
var import_prop_types19 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/useSelect/useSelect.js
init_extends();
var React45 = __toESM(require_react());

// node_modules/@mui/lab/node_modules/@mui/base/useSelect/useSelect.types.js
var SelectActionTypes = {
  buttonClick: "buttonClick"
};

// node_modules/@mui/lab/node_modules/@mui/base/useSelect/defaultOptionStringifier.js
var defaultOptionStringifier = (option) => {
  const {
    label,
    value
  } = option;
  if (typeof label === "string") {
    return label;
  }
  if (typeof value === "string") {
    return value;
  }
  return String(option);
};

// node_modules/@mui/lab/node_modules/@mui/base/useSelect/selectReducer.js
init_extends();
function selectReducer(state, action) {
  const {
    open
  } = state;
  const {
    context: {
      selectionMode
    }
  } = action;
  if (action.type === SelectActionTypes.buttonClick) {
    var _state$selectedValues;
    const itemToHighlight = (_state$selectedValues = state.selectedValues[0]) != null ? _state$selectedValues : moveHighlight(null, "start", action.context);
    return _extends({}, state, {
      open: !open,
      highlightedValue: !open ? itemToHighlight : null
    });
  }
  const newState = listReducer(state, action);
  switch (action.type) {
    case ListActionTypes.keyDown:
      if (state.open) {
        if (action.event.key === "Escape") {
          return _extends({}, newState, {
            open: false
          });
        }
        if (selectionMode === "single" && (action.event.key === "Enter" || action.event.key === " ")) {
          return _extends({}, newState, {
            open: false
          });
        }
      } else {
        if (action.event.key === "Enter" || action.event.key === " " || action.event.key === "ArrowDown") {
          var _state$selectedValues2;
          return _extends({}, state, {
            open: true,
            highlightedValue: (_state$selectedValues2 = state.selectedValues[0]) != null ? _state$selectedValues2 : moveHighlight(null, "start", action.context)
          });
        }
        if (action.event.key === "ArrowUp") {
          var _state$selectedValues3;
          return _extends({}, state, {
            open: true,
            highlightedValue: (_state$selectedValues3 = state.selectedValues[0]) != null ? _state$selectedValues3 : moveHighlight(null, "end", action.context)
          });
        }
      }
      break;
    case ListActionTypes.itemClick:
      if (selectionMode === "single") {
        return _extends({}, newState, {
          open: false
        });
      }
      break;
    case ListActionTypes.blur:
      return _extends({}, newState, {
        open: false
      });
    default:
      return newState;
  }
  return newState;
}

// node_modules/@mui/lab/node_modules/@mui/base/useSelect/useSelect.js
var visuallyHiddenStyle = {
  clip: "rect(1px, 1px, 1px, 1px)",
  clipPath: "inset(50%)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  left: "50%",
  bottom: 0
  // to display the native browser validation error at the bottom of the Select.
};
var noop = () => {
};
function defaultFormValueProvider(selectedOption) {
  if (Array.isArray(selectedOption)) {
    if (selectedOption.length === 0) {
      return "";
    }
    return JSON.stringify(selectedOption.map((o) => o.value));
  }
  if ((selectedOption == null ? void 0 : selectedOption.value) == null) {
    return "";
  }
  if (typeof selectedOption.value === "string" || typeof selectedOption.value === "number") {
    return selectedOption.value;
  }
  return JSON.stringify(selectedOption.value);
}
function preventDefault(event) {
  event.preventDefault();
}
function useSelect(props) {
  const {
    areOptionsEqual,
    buttonRef: buttonRefProp,
    defaultOpen = false,
    defaultValue: defaultValueProp,
    disabled = false,
    listboxId: listboxIdProp,
    listboxRef: listboxRefProp,
    multiple = false,
    name,
    required,
    onChange,
    onHighlightChange,
    onOpenChange,
    open: openProp,
    options: optionsParam,
    getOptionAsString = defaultOptionStringifier,
    getSerializedValue = defaultFormValueProvider,
    value: valueProp
  } = props;
  const buttonRef = React45.useRef(null);
  const handleButtonRef = useForkRef(buttonRefProp, buttonRef);
  const listboxRef = React45.useRef(null);
  const listboxId = useId(listboxIdProp);
  let defaultValue;
  if (valueProp === void 0 && defaultValueProp === void 0) {
    defaultValue = [];
  } else if (defaultValueProp !== void 0) {
    if (multiple) {
      defaultValue = defaultValueProp;
    } else {
      defaultValue = defaultValueProp == null ? [] : [defaultValueProp];
    }
  }
  const value = React45.useMemo(() => {
    if (valueProp !== void 0) {
      if (multiple) {
        return valueProp;
      }
      return valueProp == null ? [] : [valueProp];
    }
    return void 0;
  }, [valueProp, multiple]);
  const {
    subitems,
    contextValue: compoundComponentContextValue
  } = useCompoundParent();
  const options = React45.useMemo(() => {
    if (optionsParam != null) {
      return new Map(optionsParam.map((option, index) => [option.value, {
        value: option.value,
        label: option.label,
        disabled: option.disabled,
        ref: React45.createRef(),
        id: `${listboxId}_${index}`
      }]));
    }
    return subitems;
  }, [optionsParam, subitems, listboxId]);
  const handleListboxRef = useForkRef(listboxRefProp, listboxRef);
  const {
    getRootProps: getButtonRootProps,
    active: buttonActive,
    focusVisible: buttonFocusVisible,
    rootRef: mergedButtonRef
  } = useButton({
    disabled,
    rootRef: handleButtonRef
  });
  const optionValues = React45.useMemo(() => Array.from(options.keys()), [options]);
  const getOptionByValue = React45.useCallback((valueToGet) => {
    if (areOptionsEqual !== void 0) {
      const similarValue = optionValues.find((optionValue) => areOptionsEqual(optionValue, valueToGet));
      return options.get(similarValue);
    }
    return options.get(valueToGet);
  }, [options, areOptionsEqual, optionValues]);
  const isItemDisabled = React45.useCallback((valueToCheck) => {
    var _option$disabled;
    const option = getOptionByValue(valueToCheck);
    return (_option$disabled = option == null ? void 0 : option.disabled) != null ? _option$disabled : false;
  }, [getOptionByValue]);
  const stringifyOption = React45.useCallback((valueToCheck) => {
    const option = getOptionByValue(valueToCheck);
    if (!option) {
      return "";
    }
    return getOptionAsString(option);
  }, [getOptionByValue, getOptionAsString]);
  const controlledState = React45.useMemo(() => ({
    selectedValues: value,
    open: openProp
  }), [value, openProp]);
  const getItemId = React45.useCallback((itemValue) => {
    var _options$get;
    return (_options$get = options.get(itemValue)) == null ? void 0 : _options$get.id;
  }, [options]);
  const handleSelectionChange = React45.useCallback((event, newValues) => {
    if (multiple) {
      onChange == null || onChange(event, newValues);
    } else {
      var _newValues$;
      onChange == null || onChange(event, (_newValues$ = newValues[0]) != null ? _newValues$ : null);
    }
  }, [multiple, onChange]);
  const handleHighlightChange = React45.useCallback((event, newValue) => {
    onHighlightChange == null || onHighlightChange(event, newValue != null ? newValue : null);
  }, [onHighlightChange]);
  const handleStateChange = React45.useCallback((event, field, fieldValue) => {
    if (field === "open") {
      onOpenChange == null || onOpenChange(fieldValue);
      if (fieldValue === false && (event == null ? void 0 : event.type) !== "blur") {
        var _buttonRef$current;
        (_buttonRef$current = buttonRef.current) == null || _buttonRef$current.focus();
      }
    }
  }, [onOpenChange]);
  const useListParameters = {
    getInitialState: () => {
      var _defaultValue;
      return {
        highlightedValue: null,
        selectedValues: (_defaultValue = defaultValue) != null ? _defaultValue : [],
        open: defaultOpen
      };
    },
    getItemId,
    controlledProps: controlledState,
    itemComparer: areOptionsEqual,
    isItemDisabled,
    rootRef: mergedButtonRef,
    onChange: handleSelectionChange,
    onHighlightChange: handleHighlightChange,
    onStateChange: handleStateChange,
    reducerActionContext: React45.useMemo(() => ({
      multiple
    }), [multiple]),
    items: optionValues,
    getItemAsString: stringifyOption,
    selectionMode: multiple ? "multiple" : "single",
    stateReducer: selectReducer
  };
  const {
    dispatch,
    getRootProps: getListboxRootProps,
    contextValue: listContextValue,
    state: {
      open,
      highlightedValue: highlightedOption,
      selectedValues: selectedOptions
    },
    rootRef: mergedListRootRef
  } = useList(useListParameters);
  const createHandleButtonMouseDown = (externalEventHandlers) => (event) => {
    var _externalEventHandler;
    externalEventHandlers == null || (_externalEventHandler = externalEventHandlers.onMouseDown) == null || _externalEventHandler.call(externalEventHandlers, event);
    if (!event.defaultMuiPrevented) {
      const action = {
        type: SelectActionTypes.buttonClick,
        event
      };
      dispatch(action);
    }
  };
  useEnhancedEffect_default(() => {
    if (highlightedOption != null) {
      var _getOptionByValue;
      const optionRef = (_getOptionByValue = getOptionByValue(highlightedOption)) == null ? void 0 : _getOptionByValue.ref;
      if (!listboxRef.current || !(optionRef != null && optionRef.current)) {
        return;
      }
      const listboxClientRect = listboxRef.current.getBoundingClientRect();
      const optionClientRect = optionRef.current.getBoundingClientRect();
      if (optionClientRect.top < listboxClientRect.top) {
        listboxRef.current.scrollTop -= listboxClientRect.top - optionClientRect.top;
      } else if (optionClientRect.bottom > listboxClientRect.bottom) {
        listboxRef.current.scrollTop += optionClientRect.bottom - listboxClientRect.bottom;
      }
    }
  }, [highlightedOption, getOptionByValue]);
  const getOptionMetadata = React45.useCallback((optionValue) => getOptionByValue(optionValue), [getOptionByValue]);
  const getSelectTriggerProps = (otherHandlers = {}) => {
    return _extends({}, otherHandlers, {
      onMouseDown: createHandleButtonMouseDown(otherHandlers),
      ref: mergedListRootRef,
      role: "combobox",
      "aria-expanded": open,
      "aria-controls": listboxId
    });
  };
  const getButtonProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const listboxAndButtonProps = combineHooksSlotProps(getButtonRootProps, getListboxRootProps);
    const combinedProps = combineHooksSlotProps(listboxAndButtonProps, getSelectTriggerProps);
    return _extends({}, externalProps, combinedProps(externalEventHandlers));
  };
  const getListboxProps = (externalProps = {}) => {
    return _extends({}, externalProps, {
      id: listboxId,
      role: "listbox",
      "aria-multiselectable": multiple ? "true" : void 0,
      ref: handleListboxRef,
      onMouseDown: preventDefault
      // to prevent the button from losing focus when interacting with the listbox
    });
  };
  React45.useDebugValue({
    selectedOptions,
    highlightedOption,
    open
  });
  const contextValue = React45.useMemo(() => _extends({}, listContextValue, compoundComponentContextValue), [listContextValue, compoundComponentContextValue]);
  let selectValue;
  if (props.multiple) {
    selectValue = selectedOptions;
  } else {
    selectValue = selectedOptions.length > 0 ? selectedOptions[0] : null;
  }
  let selectedOptionsMetadata;
  if (multiple) {
    selectedOptionsMetadata = selectValue.map((v) => getOptionMetadata(v)).filter((o) => o !== void 0);
  } else {
    var _getOptionMetadata;
    selectedOptionsMetadata = (_getOptionMetadata = getOptionMetadata(selectValue)) != null ? _getOptionMetadata : null;
  }
  const getHiddenInputProps = (externalProps = {}) => {
    return _extends({
      name,
      tabIndex: -1,
      "aria-hidden": true,
      required: required ? true : void 0,
      value: getSerializedValue(selectedOptionsMetadata),
      onChange: noop,
      style: visuallyHiddenStyle
    }, externalProps);
  };
  return {
    buttonActive,
    buttonFocusVisible,
    buttonRef: mergedButtonRef,
    contextValue,
    disabled,
    dispatch,
    getButtonProps,
    getHiddenInputProps,
    getListboxProps,
    getOptionMetadata,
    listboxRef: mergedListRootRef,
    open,
    options: optionValues,
    value: selectValue,
    highlightedOption
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/useSelect/SelectProvider.js
var React46 = __toESM(require_react());
var import_jsx_runtime27 = __toESM(require_jsx_runtime());
function SelectProvider(props) {
  const {
    value,
    children
  } = props;
  const {
    dispatch,
    getItemIndex,
    getItemState,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler,
    registerItem,
    totalSubitemCount
  } = value;
  const listContextValue = React46.useMemo(() => ({
    dispatch,
    getItemState,
    getItemIndex,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler
  }), [dispatch, getItemIndex, getItemState, registerHighlightChangeHandler, registerSelectionChangeHandler]);
  const compoundComponentContextValue = React46.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount
  }), [registerItem, getItemIndex, totalSubitemCount]);
  return (0, import_jsx_runtime27.jsx)(CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: (0, import_jsx_runtime27.jsx)(ListContext.Provider, {
      value: listContextValue,
      children
    })
  });
}

// node_modules/@mui/lab/node_modules/@mui/base/Select/selectClasses.js
function getSelectUtilityClass(slot) {
  return generateUtilityClass("MuiSelect", slot);
}
var selectClasses = generateUtilityClasses("MuiSelect", ["root", "button", "listbox", "popper", "active", "expanded", "disabled", "focusVisible"]);

// node_modules/@mui/lab/node_modules/@mui/base/Select/Select.js
var import_jsx_runtime28 = __toESM(require_jsx_runtime());
var import_jsx_runtime29 = __toESM(require_jsx_runtime());
var _span;
var _excluded15 = ["areOptionsEqual", "autoFocus", "children", "defaultValue", "defaultListboxOpen", "disabled", "getSerializedValue", "listboxId", "listboxOpen", "multiple", "name", "required", "onChange", "onListboxOpenChange", "getOptionAsString", "renderValue", "placeholder", "slotProps", "slots", "value"];
function defaultRenderValue(selectedOptions) {
  var _selectedOptions$labe;
  if (Array.isArray(selectedOptions)) {
    return (0, import_jsx_runtime28.jsx)(React47.Fragment, {
      children: selectedOptions.map((o) => o.label).join(", ")
    });
  }
  return (_selectedOptions$labe = selectedOptions == null ? void 0 : selectedOptions.label) != null ? _selectedOptions$labe : null;
}
function useUtilityClasses14(ownerState) {
  const {
    active,
    disabled,
    open,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible", active && "active", open && "expanded"],
    listbox: ["listbox", disabled && "disabled"],
    popper: ["popper"]
  };
  return composeClasses(slots, useClassNamesOverride(getSelectUtilityClass));
}
var Select = React47.forwardRef(function Select2(props, forwardedRef) {
  var _slots$root, _slots$listbox, _slots$popper, _ref, _renderValue;
  const {
    areOptionsEqual,
    autoFocus,
    children,
    defaultValue,
    defaultListboxOpen = false,
    disabled: disabledProp,
    getSerializedValue,
    listboxId,
    listboxOpen: listboxOpenProp,
    multiple = false,
    name,
    required = false,
    onChange,
    onListboxOpenChange,
    getOptionAsString = defaultOptionStringifier,
    renderValue: renderValueProp,
    placeholder,
    slotProps = {},
    slots = {},
    value: valueProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded15);
  const renderValue = renderValueProp != null ? renderValueProp : defaultRenderValue;
  const [buttonDefined, setButtonDefined] = React47.useState(false);
  const buttonRef = React47.useRef(null);
  const listboxRef = React47.useRef(null);
  const Button3 = (_slots$root = slots.root) != null ? _slots$root : "button";
  const ListboxRoot = (_slots$listbox = slots.listbox) != null ? _slots$listbox : "ul";
  const PopperComponent = (_slots$popper = slots.popper) != null ? _slots$popper : Popper;
  const handleButtonRefChange = React47.useCallback((element) => {
    setButtonDefined(element != null);
  }, []);
  const handleButtonRef = useForkRef(forwardedRef, buttonRef, handleButtonRefChange);
  React47.useEffect(() => {
    if (autoFocus) {
      buttonRef.current.focus();
    }
  }, [autoFocus]);
  const {
    buttonActive,
    buttonFocusVisible,
    contextValue,
    disabled,
    getButtonProps,
    getListboxProps,
    getHiddenInputProps,
    getOptionMetadata,
    value,
    open
  } = useSelect({
    name,
    required,
    getSerializedValue,
    areOptionsEqual,
    buttonRef: handleButtonRef,
    defaultOpen: defaultListboxOpen,
    defaultValue,
    disabled: disabledProp,
    listboxId,
    multiple,
    open: listboxOpenProp,
    onChange,
    onOpenChange: onListboxOpenChange,
    getOptionAsString,
    value: valueProp
  });
  const ownerState = _extends({}, props, {
    active: buttonActive,
    defaultListboxOpen,
    disabled,
    focusVisible: buttonFocusVisible,
    open,
    multiple,
    renderValue,
    value
  });
  const classes = useUtilityClasses14(ownerState);
  const buttonProps = useSlotProps({
    elementType: Button3,
    getSlotProps: getButtonProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState,
    className: classes.root
  });
  const listboxProps = useSlotProps({
    elementType: ListboxRoot,
    getSlotProps: getListboxProps,
    externalSlotProps: slotProps.listbox,
    additionalProps: {
      ref: listboxRef
    },
    ownerState,
    className: classes.listbox
  });
  const popperProps = useSlotProps({
    elementType: PopperComponent,
    externalSlotProps: slotProps.popper,
    additionalProps: {
      anchorEl: buttonRef.current,
      keepMounted: true,
      open,
      placement: "bottom-start",
      role: void 0
    },
    ownerState,
    className: classes.popper
  });
  let selectedOptionsMetadata;
  if (multiple) {
    selectedOptionsMetadata = value.map((v) => getOptionMetadata(v)).filter((o) => o !== void 0);
  } else {
    var _getOptionMetadata;
    selectedOptionsMetadata = (_getOptionMetadata = getOptionMetadata(value)) != null ? _getOptionMetadata : null;
  }
  return (0, import_jsx_runtime29.jsxs)(React47.Fragment, {
    children: [(0, import_jsx_runtime28.jsx)(Button3, _extends({}, buttonProps, {
      children: (_ref = (_renderValue = renderValue(selectedOptionsMetadata)) != null ? _renderValue : placeholder) != null ? _ref : (
        // fall back to a zero-width space to prevent layout shift
        // from https://github.com/mui/material-ui/pull/24563
        _span || (_span = (0, import_jsx_runtime28.jsx)("span", {
          className: "notranslate",
          children: "​"
        }))
      )
    })), buttonDefined && (0, import_jsx_runtime28.jsx)(PopperComponent, _extends({}, popperProps, {
      children: (0, import_jsx_runtime28.jsx)(ListboxRoot, _extends({}, listboxProps, {
        children: (0, import_jsx_runtime28.jsx)(SelectProvider, {
          value: contextValue,
          children
        })
      }))
    })), (0, import_jsx_runtime28.jsx)("input", _extends({}, getHiddenInputProps()))]
  });
});
true ? Select.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A function used to determine if two options' values are equal.
   * By default, reference equality is used.
   *
   * There is a performance impact when using the `areOptionsEqual` prop (proportional to the number of options).
   * Therefore, it's recommented to use the default reference equality comparison whenever possible.
   */
  areOptionsEqual: import_prop_types19.default.func,
  /**
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus: import_prop_types19.default.bool,
  /**
   * @ignore
   */
  children: import_prop_types19.default.node,
  /**
   * @ignore
   */
  className: import_prop_types19.default.string,
  /**
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen: import_prop_types19.default.bool,
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue: import_prop_types19.default.any,
  /**
   * If `true`, the select is disabled.
   * @default false
   */
  disabled: import_prop_types19.default.bool,
  /**
   * A function used to convert the option label to a string.
   * It's useful when labels are elements and need to be converted to plain text
   * to enable navigation using character keys on a keyboard.
   *
   * @default defaultOptionStringifier
   */
  getOptionAsString: import_prop_types19.default.func,
  /**
   * A function to convert the currently selected value to a string.
   * Used to set a value of a hidden input associated with the select,
   * so that the selected value can be posted with a form.
   */
  getSerializedValue: import_prop_types19.default.func,
  /**
   * `id` attribute of the listbox element.
   */
  listboxId: import_prop_types19.default.string,
  /**
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen: import_prop_types19.default.bool,
  /**
   * If `true`, selecting multiple values is allowed.
   * This affects the type of the `value`, `defaultValue`, and `onChange` props.
   *
   * @default false
   */
  multiple: import_prop_types19.default.bool,
  /**
   * Name of the element. For example used by the server to identify the fields in form submits.
   * If the name is provided, the component will render a hidden input element that can be submitted to a server.
   */
  name: import_prop_types19.default.string,
  /**
   * Callback fired when an option is selected.
   */
  onChange: import_prop_types19.default.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange: import_prop_types19.default.func,
  /**
   * Text to show when there is no selected value.
   */
  placeholder: import_prop_types19.default.node,
  /**
   * Function that customizes the rendering of the selected value.
   */
  renderValue: import_prop_types19.default.func,
  /**
   * If `true`, the Select cannot be empty when submitting form.
   * @default false
   */
  required: import_prop_types19.default.bool,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: import_prop_types19.default.shape({
    listbox: import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object]),
    popper: import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object]),
    root: import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object])
  }),
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types19.default.shape({
    listbox: import_prop_types19.default.elementType,
    popper: import_prop_types19.default.elementType,
    root: import_prop_types19.default.elementType
  }),
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value: import_prop_types19.default.any
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/Slider/Slider.js
init_extends();
var React49 = __toESM(require_react());
var import_prop_types20 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/Slider/sliderClasses.js
function getSliderUtilityClass(slot) {
  return generateUtilityClass("MuiSlider", slot);
}
var sliderClasses = generateUtilityClasses("MuiSlider", ["root", "active", "focusVisible", "disabled", "dragging", "marked", "vertical", "trackInverted", "trackFalse", "rail", "track", "mark", "markActive", "markLabel", "markLabelActive", "thumb"]);

// node_modules/@mui/lab/node_modules/@mui/base/useSlider/useSlider.js
init_extends();
var React48 = __toESM(require_react());
var INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;
function asc(a, b) {
  return a - b;
}
function clamp2(value, min, max) {
  if (value == null) {
    return min;
  }
  return Math.min(Math.max(min, value), max);
}
function findClosest(values, currentValue) {
  var _values$reduce;
  const {
    index: closestIndex
  } = (_values$reduce = values.reduce((acc, value, index) => {
    const distance = Math.abs(currentValue - value);
    if (acc === null || distance < acc.distance || distance === acc.distance) {
      return {
        distance,
        index
      };
    }
    return acc;
  }, null)) != null ? _values$reduce : {};
  return closestIndex;
}
function trackFinger(event, touchId) {
  if (touchId.current !== void 0 && event.changedTouches) {
    const touchEvent = event;
    for (let i = 0; i < touchEvent.changedTouches.length; i += 1) {
      const touch = touchEvent.changedTouches[i];
      if (touch.identifier === touchId.current) {
        return {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    }
    return false;
  }
  return {
    x: event.clientX,
    y: event.clientY
  };
}
function valueToPercent(value, min, max) {
  return (value - min) * 100 / (max - min);
}
function percentToValue(percent, min, max) {
  return (max - min) * percent + min;
}
function getDecimalPrecision(num) {
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split("e-");
    const matissaDecimalPart = parts[0].split(".")[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }
  const decimalPart = num.toString().split(".")[1];
  return decimalPart ? decimalPart.length : 0;
}
function roundValueToStep(value, step, min) {
  const nearest = Math.round((value - min) / step) * step + min;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}
function setValueIndex({
  values,
  newValue,
  index
}) {
  const output = values.slice();
  output[index] = newValue;
  return output.sort(asc);
}
function focusThumb({
  sliderRef,
  activeIndex,
  setActive
}) {
  var _sliderRef$current, _doc$activeElement;
  const doc = ownerDocument(sliderRef.current);
  if (!((_sliderRef$current = sliderRef.current) != null && _sliderRef$current.contains(doc.activeElement)) || Number(doc == null || (_doc$activeElement = doc.activeElement) == null ? void 0 : _doc$activeElement.getAttribute("data-index")) !== activeIndex) {
    var _sliderRef$current2;
    (_sliderRef$current2 = sliderRef.current) == null || _sliderRef$current2.querySelector(`[type="range"][data-index="${activeIndex}"]`).focus();
  }
  if (setActive) {
    setActive(activeIndex);
  }
}
function areValuesEqual(newValue, oldValue) {
  if (typeof newValue === "number" && typeof oldValue === "number") {
    return newValue === oldValue;
  }
  if (typeof newValue === "object" && typeof oldValue === "object") {
    return areArraysEqual(newValue, oldValue);
  }
  return false;
}
var axisProps = {
  horizontal: {
    offset: (percent) => ({
      left: `${percent}%`
    }),
    leap: (percent) => ({
      width: `${percent}%`
    })
  },
  "horizontal-reverse": {
    offset: (percent) => ({
      right: `${percent}%`
    }),
    leap: (percent) => ({
      width: `${percent}%`
    })
  },
  vertical: {
    offset: (percent) => ({
      bottom: `${percent}%`
    }),
    leap: (percent) => ({
      height: `${percent}%`
    })
  }
};
var Identity = (x) => x;
var cachedSupportsTouchActionNone;
function doesSupportTouchActionNone() {
  if (cachedSupportsTouchActionNone === void 0) {
    if (typeof CSS !== "undefined" && typeof CSS.supports === "function") {
      cachedSupportsTouchActionNone = CSS.supports("touch-action", "none");
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }
  return cachedSupportsTouchActionNone;
}
function useSlider(parameters) {
  const {
    "aria-labelledby": ariaLabelledby,
    defaultValue,
    disabled = false,
    disableSwap = false,
    isRtl = false,
    marks: marksProp = false,
    max = 100,
    min = 0,
    name,
    onChange,
    onChangeCommitted,
    orientation = "horizontal",
    rootRef: ref,
    scale = Identity,
    step = 1,
    tabIndex,
    value: valueProp
  } = parameters;
  const touchId = React48.useRef();
  const [active, setActive] = React48.useState(-1);
  const [open, setOpen] = React48.useState(-1);
  const [dragging, setDragging] = React48.useState(false);
  const moveCount = React48.useRef(0);
  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue != null ? defaultValue : min,
    name: "Slider"
  });
  const handleChange = onChange && ((event, value, thumbIndex) => {
    const nativeEvent = event.nativeEvent || event;
    const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
    Object.defineProperty(clonedEvent, "target", {
      writable: true,
      value: {
        value,
        name
      }
    });
    onChange(clonedEvent, value, thumbIndex);
  });
  const range = Array.isArray(valueDerived);
  let values = range ? valueDerived.slice().sort(asc) : [valueDerived];
  values = values.map((value) => clamp2(value, min, max));
  const marks = marksProp === true && step !== null ? [...Array(Math.floor((max - min) / step) + 1)].map((_, index) => ({
    value: min + step * index
  })) : marksProp || [];
  const marksValues = marks.map((mark) => mark.value);
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusedThumbIndex, setFocusedThumbIndex] = React48.useState(-1);
  const sliderRef = React48.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, sliderRef);
  const handleRef = useForkRef(ref, handleFocusRef);
  const createHandleHiddenInputFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu;
    const index = Number(event.currentTarget.getAttribute("data-index"));
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusedThumbIndex(index);
    }
    setOpen(index);
    otherHandlers == null || (_otherHandlers$onFocu = otherHandlers.onFocus) == null || _otherHandlers$onFocu.call(otherHandlers, event);
  };
  const createHandleHiddenInputBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusedThumbIndex(-1);
    }
    setOpen(-1);
    otherHandlers == null || (_otherHandlers$onBlur = otherHandlers.onBlur) == null || _otherHandlers$onBlur.call(otherHandlers, event);
  };
  useEnhancedEffect_default(() => {
    if (disabled && sliderRef.current.contains(document.activeElement)) {
      var _document$activeEleme;
      (_document$activeEleme = document.activeElement) == null || _document$activeEleme.blur();
    }
  }, [disabled]);
  if (disabled && active !== -1) {
    setActive(-1);
  }
  if (disabled && focusedThumbIndex !== -1) {
    setFocusedThumbIndex(-1);
  }
  const createHandleHiddenInputChange = (otherHandlers) => (event) => {
    var _otherHandlers$onChan;
    (_otherHandlers$onChan = otherHandlers.onChange) == null || _otherHandlers$onChan.call(otherHandlers, event);
    const index = Number(event.currentTarget.getAttribute("data-index"));
    const value = values[index];
    const marksIndex = marksValues.indexOf(value);
    let newValue = event.target.valueAsNumber;
    if (marks && step == null) {
      const maxMarksValue = marksValues[marksValues.length - 1];
      if (newValue > maxMarksValue) {
        newValue = maxMarksValue;
      } else if (newValue < marksValues[0]) {
        newValue = marksValues[0];
      } else {
        newValue = newValue < value ? marksValues[marksIndex - 1] : marksValues[marksIndex + 1];
      }
    }
    newValue = clamp2(newValue, min, max);
    if (range) {
      if (disableSwap) {
        newValue = clamp2(newValue, values[index - 1] || -Infinity, values[index + 1] || Infinity);
      }
      const previousValue = newValue;
      newValue = setValueIndex({
        values,
        newValue,
        index
      });
      let activeIndex = index;
      if (!disableSwap) {
        activeIndex = newValue.indexOf(previousValue);
      }
      focusThumb({
        sliderRef,
        activeIndex
      });
    }
    setValueState(newValue);
    setFocusedThumbIndex(index);
    if (handleChange && !areValuesEqual(newValue, valueDerived)) {
      handleChange(event, newValue, index);
    }
    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }
  };
  const previousIndex = React48.useRef();
  let axis = orientation;
  if (isRtl && orientation === "horizontal") {
    axis += "-reverse";
  }
  const getFingerNewValue = ({
    finger,
    move = false
  }) => {
    const {
      current: slider
    } = sliderRef;
    const {
      width,
      height,
      bottom,
      left
    } = slider.getBoundingClientRect();
    let percent;
    if (axis.indexOf("vertical") === 0) {
      percent = (bottom - finger.y) / height;
    } else {
      percent = (finger.x - left) / width;
    }
    if (axis.indexOf("-reverse") !== -1) {
      percent = 1 - percent;
    }
    let newValue;
    newValue = percentToValue(percent, min, max);
    if (step) {
      newValue = roundValueToStep(newValue, step, min);
    } else {
      const closestIndex = findClosest(marksValues, newValue);
      newValue = marksValues[closestIndex];
    }
    newValue = clamp2(newValue, min, max);
    let activeIndex = 0;
    if (range) {
      if (!move) {
        activeIndex = findClosest(values, newValue);
      } else {
        activeIndex = previousIndex.current;
      }
      if (disableSwap) {
        newValue = clamp2(newValue, values[activeIndex - 1] || -Infinity, values[activeIndex + 1] || Infinity);
      }
      const previousValue = newValue;
      newValue = setValueIndex({
        values,
        newValue,
        index: activeIndex
      });
      if (!(disableSwap && move)) {
        activeIndex = newValue.indexOf(previousValue);
        previousIndex.current = activeIndex;
      }
    }
    return {
      newValue,
      activeIndex
    };
  };
  const handleTouchMove = useEventCallback_default((nativeEvent) => {
    const finger = trackFinger(nativeEvent, touchId);
    if (!finger) {
      return;
    }
    moveCount.current += 1;
    if (nativeEvent.type === "mousemove" && nativeEvent.buttons === 0) {
      handleTouchEnd(nativeEvent);
      return;
    }
    const {
      newValue,
      activeIndex
    } = getFingerNewValue({
      finger,
      move: true
    });
    focusThumb({
      sliderRef,
      activeIndex,
      setActive
    });
    setValueState(newValue);
    if (!dragging && moveCount.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
      setDragging(true);
    }
    if (handleChange && !areValuesEqual(newValue, valueDerived)) {
      handleChange(nativeEvent, newValue, activeIndex);
    }
  });
  const handleTouchEnd = useEventCallback_default((nativeEvent) => {
    const finger = trackFinger(nativeEvent, touchId);
    setDragging(false);
    if (!finger) {
      return;
    }
    const {
      newValue
    } = getFingerNewValue({
      finger,
      move: true
    });
    setActive(-1);
    if (nativeEvent.type === "touchend") {
      setOpen(-1);
    }
    if (onChangeCommitted) {
      onChangeCommitted(nativeEvent, newValue);
    }
    touchId.current = void 0;
    stopListening();
  });
  const handleTouchStart = useEventCallback_default((nativeEvent) => {
    if (disabled) {
      return;
    }
    if (!doesSupportTouchActionNone()) {
      nativeEvent.preventDefault();
    }
    const touch = nativeEvent.changedTouches[0];
    if (touch != null) {
      touchId.current = touch.identifier;
    }
    const finger = trackFinger(nativeEvent, touchId);
    if (finger !== false) {
      const {
        newValue,
        activeIndex
      } = getFingerNewValue({
        finger
      });
      focusThumb({
        sliderRef,
        activeIndex,
        setActive
      });
      setValueState(newValue);
      if (handleChange && !areValuesEqual(newValue, valueDerived)) {
        handleChange(nativeEvent, newValue, activeIndex);
      }
    }
    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener("touchmove", handleTouchMove);
    doc.addEventListener("touchend", handleTouchEnd);
  });
  const stopListening = React48.useCallback(() => {
    const doc = ownerDocument(sliderRef.current);
    doc.removeEventListener("mousemove", handleTouchMove);
    doc.removeEventListener("mouseup", handleTouchEnd);
    doc.removeEventListener("touchmove", handleTouchMove);
    doc.removeEventListener("touchend", handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);
  React48.useEffect(() => {
    const {
      current: slider
    } = sliderRef;
    slider.addEventListener("touchstart", handleTouchStart, {
      passive: doesSupportTouchActionNone()
    });
    return () => {
      slider.removeEventListener("touchstart", handleTouchStart, {
        passive: doesSupportTouchActionNone()
      });
      stopListening();
    };
  }, [stopListening, handleTouchStart]);
  React48.useEffect(() => {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);
  const createHandleMouseDown = (otherHandlers) => (event) => {
    var _otherHandlers$onMous;
    (_otherHandlers$onMous = otherHandlers.onMouseDown) == null || _otherHandlers$onMous.call(otherHandlers, event);
    if (disabled) {
      return;
    }
    if (event.defaultPrevented) {
      return;
    }
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    const finger = trackFinger(event, touchId);
    if (finger !== false) {
      const {
        newValue,
        activeIndex
      } = getFingerNewValue({
        finger
      });
      focusThumb({
        sliderRef,
        activeIndex,
        setActive
      });
      setValueState(newValue);
      if (handleChange && !areValuesEqual(newValue, valueDerived)) {
        handleChange(event, newValue, activeIndex);
      }
    }
    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener("mousemove", handleTouchMove);
    doc.addEventListener("mouseup", handleTouchEnd);
  };
  const trackOffset = valueToPercent(range ? values[0] : min, min, max);
  const trackLeap = valueToPercent(values[values.length - 1], min, max) - trackOffset;
  const getRootProps = (externalProps = {}) => {
    const externalHandlers = extractEventHandlers(externalProps);
    const ownEventHandlers = {
      onMouseDown: createHandleMouseDown(externalHandlers || {})
    };
    const mergedEventHandlers = _extends({}, externalHandlers, ownEventHandlers);
    return _extends({}, externalProps, {
      ref: handleRef
    }, mergedEventHandlers);
  };
  const createHandleMouseOver = (otherHandlers) => (event) => {
    var _otherHandlers$onMous2;
    (_otherHandlers$onMous2 = otherHandlers.onMouseOver) == null || _otherHandlers$onMous2.call(otherHandlers, event);
    const index = Number(event.currentTarget.getAttribute("data-index"));
    setOpen(index);
  };
  const createHandleMouseLeave = (otherHandlers) => (event) => {
    var _otherHandlers$onMous3;
    (_otherHandlers$onMous3 = otherHandlers.onMouseLeave) == null || _otherHandlers$onMous3.call(otherHandlers, event);
    setOpen(-1);
  };
  const getThumbProps = (externalProps = {}) => {
    const externalHandlers = extractEventHandlers(externalProps);
    const ownEventHandlers = {
      onMouseOver: createHandleMouseOver(externalHandlers || {}),
      onMouseLeave: createHandleMouseLeave(externalHandlers || {})
    };
    return _extends({}, externalProps, externalHandlers, ownEventHandlers);
  };
  const getThumbStyle = (index) => {
    return {
      // So the non active thumb doesn't show its label on hover.
      pointerEvents: active !== -1 && active !== index ? "none" : void 0
    };
  };
  const getHiddenInputProps = (externalProps = {}) => {
    var _parameters$step;
    const externalHandlers = extractEventHandlers(externalProps);
    const ownEventHandlers = {
      onChange: createHandleHiddenInputChange(externalHandlers || {}),
      onFocus: createHandleHiddenInputFocus(externalHandlers || {}),
      onBlur: createHandleHiddenInputBlur(externalHandlers || {})
    };
    const mergedEventHandlers = _extends({}, externalHandlers, ownEventHandlers);
    return _extends({
      tabIndex,
      "aria-labelledby": ariaLabelledby,
      "aria-orientation": orientation,
      "aria-valuemax": scale(max),
      "aria-valuemin": scale(min),
      name,
      type: "range",
      min: parameters.min,
      max: parameters.max,
      step: parameters.step === null && parameters.marks ? "any" : (_parameters$step = parameters.step) != null ? _parameters$step : void 0,
      disabled
    }, externalProps, mergedEventHandlers, {
      style: _extends({}, visuallyHidden_default, {
        direction: isRtl ? "rtl" : "ltr",
        // So that VoiceOver's focus indicator matches the thumb's dimensions
        width: "100%",
        height: "100%"
      })
    });
  };
  return {
    active,
    axis,
    axisProps,
    dragging,
    focusedThumbIndex,
    getHiddenInputProps,
    getRootProps,
    getThumbProps,
    marks,
    open,
    range,
    rootRef: handleRef,
    trackLeap,
    trackOffset,
    values,
    getThumbStyle
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/Slider/Slider.js
var import_jsx_runtime30 = __toESM(require_jsx_runtime());
var import_jsx_runtime31 = __toESM(require_jsx_runtime());
var _excluded16 = ["aria-label", "aria-valuetext", "aria-labelledby", "className", "disableSwap", "disabled", "getAriaLabel", "getAriaValueText", "marks", "max", "min", "name", "onChange", "onChangeCommitted", "orientation", "scale", "step", "tabIndex", "track", "value", "valueLabelFormat", "isRtl", "defaultValue", "slotProps", "slots"];
function Identity2(x) {
  return x;
}
var useUtilityClasses15 = (ownerState) => {
  const {
    disabled,
    dragging,
    marked,
    orientation,
    track
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", dragging && "dragging", marked && "marked", orientation === "vertical" && "vertical", track === "inverted" && "trackInverted", track === false && "trackFalse"],
    rail: ["rail"],
    track: ["track"],
    mark: ["mark"],
    markActive: ["markActive"],
    markLabel: ["markLabel"],
    markLabelActive: ["markLabelActive"],
    valueLabel: ["valueLabel"],
    thumb: ["thumb", disabled && "disabled"],
    active: ["active"],
    disabled: ["disabled"],
    focusVisible: ["focusVisible"]
  };
  return composeClasses(slots, useClassNamesOverride(getSliderUtilityClass));
};
var Slider = React49.forwardRef(function Slider2(props, forwardedRef) {
  var _slots$root, _slots$rail, _slots$track, _slots$thumb, _slots$mark, _slots$markLabel;
  const {
    "aria-label": ariaLabel,
    "aria-valuetext": ariaValuetext,
    "aria-labelledby": ariaLabelledby,
    className,
    disableSwap = false,
    disabled = false,
    getAriaLabel,
    getAriaValueText,
    marks: marksProp = false,
    max = 100,
    min = 0,
    orientation = "horizontal",
    scale = Identity2,
    step = 1,
    track = "normal",
    valueLabelFormat = Identity2,
    isRtl = false,
    defaultValue,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded16);
  const partialOwnerState = _extends({}, props, {
    marks: marksProp,
    disabled,
    disableSwap,
    isRtl,
    defaultValue,
    max,
    min,
    orientation,
    scale,
    step,
    track,
    valueLabelFormat
  });
  const {
    axisProps: axisProps2,
    getRootProps,
    getHiddenInputProps,
    getThumbProps,
    active,
    axis,
    range,
    focusedThumbIndex,
    dragging,
    marks,
    values,
    trackOffset,
    trackLeap,
    getThumbStyle
  } = useSlider(_extends({}, partialOwnerState, {
    rootRef: forwardedRef
  }));
  const ownerState = _extends({}, partialOwnerState, {
    marked: marks.length > 0 && marks.some((mark) => mark.label),
    dragging,
    focusedThumbIndex,
    activeThumbIndex: active
  });
  const classes = useUtilityClasses15(ownerState);
  const Root = (_slots$root = slots.root) != null ? _slots$root : "span";
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState,
    className: [classes.root, className]
  });
  const Rail = (_slots$rail = slots.rail) != null ? _slots$rail : "span";
  const railProps = useSlotProps({
    elementType: Rail,
    externalSlotProps: slotProps.rail,
    ownerState,
    className: classes.rail
  });
  const Track = (_slots$track = slots.track) != null ? _slots$track : "span";
  const trackProps = useSlotProps({
    elementType: Track,
    externalSlotProps: slotProps.track,
    additionalProps: {
      style: _extends({}, axisProps2[axis].offset(trackOffset), axisProps2[axis].leap(trackLeap))
    },
    ownerState,
    className: classes.track
  });
  const Thumb = (_slots$thumb = slots.thumb) != null ? _slots$thumb : "span";
  const thumbProps = useSlotProps({
    elementType: Thumb,
    getSlotProps: getThumbProps,
    externalSlotProps: slotProps.thumb,
    ownerState,
    skipResolvingSlotProps: true
  });
  const ValueLabel = slots.valueLabel;
  const valueLabelProps = useSlotProps({
    elementType: ValueLabel,
    externalSlotProps: slotProps.valueLabel,
    ownerState
  });
  const Mark = (_slots$mark = slots.mark) != null ? _slots$mark : "span";
  const markProps = useSlotProps({
    elementType: Mark,
    externalSlotProps: slotProps.mark,
    ownerState,
    className: classes.mark
  });
  const MarkLabel = (_slots$markLabel = slots.markLabel) != null ? _slots$markLabel : "span";
  const markLabelProps = useSlotProps({
    elementType: MarkLabel,
    externalSlotProps: slotProps.markLabel,
    ownerState
  });
  const Input3 = slots.input || "input";
  const inputProps = useSlotProps({
    elementType: Input3,
    getSlotProps: getHiddenInputProps,
    externalSlotProps: slotProps.input,
    ownerState
  });
  return (0, import_jsx_runtime31.jsxs)(Root, _extends({}, rootProps, {
    children: [(0, import_jsx_runtime30.jsx)(Rail, _extends({}, railProps)), (0, import_jsx_runtime30.jsx)(Track, _extends({}, trackProps)), marks.filter((mark) => mark.value >= min && mark.value <= max).map((mark, index) => {
      const percent = valueToPercent(mark.value, min, max);
      const style = axisProps2[axis].offset(percent);
      let markActive;
      if (track === false) {
        markActive = values.indexOf(mark.value) !== -1;
      } else {
        markActive = track === "normal" && (range ? mark.value >= values[0] && mark.value <= values[values.length - 1] : mark.value <= values[0]) || track === "inverted" && (range ? mark.value <= values[0] || mark.value >= values[values.length - 1] : mark.value >= values[0]);
      }
      return (0, import_jsx_runtime31.jsxs)(React49.Fragment, {
        children: [(0, import_jsx_runtime30.jsx)(Mark, _extends({
          "data-index": index
        }, markProps, !isHostComponent(Mark) && {
          markActive
        }, {
          style: _extends({}, style, markProps.style),
          className: clsx_default(markProps.className, markActive && classes.markActive)
        })), mark.label != null ? (0, import_jsx_runtime30.jsx)(MarkLabel, _extends({
          "aria-hidden": true,
          "data-index": index
        }, markLabelProps, !isHostComponent(MarkLabel) && {
          markLabelActive: markActive
        }, {
          style: _extends({}, style, markLabelProps.style),
          className: clsx_default(classes.markLabel, markLabelProps.className, markActive && classes.markLabelActive),
          children: mark.label
        })) : null]
      }, index);
    }), values.map((value, index) => {
      const percent = valueToPercent(value, min, max);
      const style = axisProps2[axis].offset(percent);
      const resolvedSlotProps = resolveComponentProps(slotProps.thumb, ownerState, {
        index,
        focused: focusedThumbIndex === index,
        active: active === index
      });
      return (0, import_jsx_runtime31.jsxs)(Thumb, _extends({
        "data-index": index
      }, thumbProps, resolvedSlotProps, {
        className: clsx_default(classes.thumb, thumbProps.className, resolvedSlotProps == null ? void 0 : resolvedSlotProps.className, active === index && classes.active, focusedThumbIndex === index && classes.focusVisible),
        style: _extends({}, style, getThumbStyle(index), thumbProps.style, resolvedSlotProps == null ? void 0 : resolvedSlotProps.style),
        children: [(0, import_jsx_runtime30.jsx)(Input3, _extends({
          "data-index": index,
          "aria-label": getAriaLabel ? getAriaLabel(index) : ariaLabel,
          "aria-valuenow": scale(value),
          "aria-labelledby": ariaLabelledby,
          "aria-valuetext": getAriaValueText ? getAriaValueText(scale(value), index) : ariaValuetext,
          value: values[index]
        }, inputProps)), ValueLabel ? (0, import_jsx_runtime30.jsx)(ValueLabel, _extends({}, !isHostComponent(ValueLabel) && {
          valueLabelFormat,
          index,
          disabled
        }, valueLabelProps, {
          children: typeof valueLabelFormat === "function" ? valueLabelFormat(scale(value), index) : valueLabelFormat
        })) : null]
      }), index);
    })]
  }));
});
true ? Slider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The label of the slider.
   */
  "aria-label": chainPropTypes(import_prop_types20.default.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);
    if (range && props["aria-label"] != null) {
      return new Error("MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.");
    }
    return null;
  }),
  /**
   * The id of the element containing a label for the slider.
   */
  "aria-labelledby": import_prop_types20.default.string,
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  "aria-valuetext": chainPropTypes(import_prop_types20.default.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);
    if (range && props["aria-valuetext"] != null) {
      return new Error("MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.");
    }
    return null;
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: import_prop_types20.default.oneOfType([import_prop_types20.default.arrayOf(import_prop_types20.default.number), import_prop_types20.default.number]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types20.default.bool,
  /**
   * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
   * @default false
   */
  disableSwap: import_prop_types20.default.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   * This is important for screen reader users.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel: import_prop_types20.default.func,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   * This is important for screen reader users.
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText: import_prop_types20.default.func,
  /**
   * If `true` the Slider will be rendered right-to-left (with the lowest value on the right-hand side).
   * @default false
   */
  isRtl: import_prop_types20.default.bool,
  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks: import_prop_types20.default.oneOfType([import_prop_types20.default.arrayOf(import_prop_types20.default.shape({
    label: import_prop_types20.default.node,
    value: import_prop_types20.default.number.isRequired
  })), import_prop_types20.default.bool]),
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max: import_prop_types20.default.number,
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min: import_prop_types20.default.number,
  /**
   * Name attribute of the hidden `input` element.
   */
  name: import_prop_types20.default.string,
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {Event} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange: import_prop_types20.default.func,
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted: import_prop_types20.default.func,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: import_prop_types20.default.oneOf(["horizontal", "vertical"]),
  /**
   * A transformation function, to change the scale of the slider.
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  scale: import_prop_types20.default.func,
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  slotProps: import_prop_types20.default.shape({
    input: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
    mark: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
    markLabel: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
    rail: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
    root: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
    thumb: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
    track: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
    valueLabel: import_prop_types20.default.oneOfType([import_prop_types20.default.any, import_prop_types20.default.func])
  }),
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types20.default.shape({
    input: import_prop_types20.default.elementType,
    mark: import_prop_types20.default.elementType,
    markLabel: import_prop_types20.default.elementType,
    rail: import_prop_types20.default.elementType,
    root: import_prop_types20.default.elementType,
    thumb: import_prop_types20.default.elementType,
    track: import_prop_types20.default.elementType,
    valueLabel: import_prop_types20.default.elementType
  }),
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step: import_prop_types20.default.number,
  /**
   * Tab index attribute of the hidden `input` element.
   */
  tabIndex: import_prop_types20.default.number,
  /**
   * The track presentation:
   *
   * - `normal` the track will render a bar representing the slider value.
   * - `inverted` the track will render a bar representing the remaining slider value.
   * - `false` the track will render without a bar.
   * @default 'normal'
   */
  track: import_prop_types20.default.oneOf(["inverted", "normal", false]),
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: import_prop_types20.default.oneOfType([import_prop_types20.default.arrayOf(import_prop_types20.default.number), import_prop_types20.default.number]),
  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  valueLabelFormat: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.string])
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/Snackbar/Snackbar.js
init_extends();
var React51 = __toESM(require_react());
var import_prop_types21 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/Snackbar/snackbarClasses.js
function getSnackbarUtilityClass(slot) {
  return generateUtilityClass("MuiSnackbar", slot);
}
var snackbarClasses = generateUtilityClasses("MuiSnackbar", ["root"]);

// node_modules/@mui/lab/node_modules/@mui/base/useSnackbar/useSnackbar.js
init_extends();
var React50 = __toESM(require_react());
function useSnackbar(parameters = {}) {
  const {
    autoHideDuration = null,
    disableWindowBlurListener = false,
    onClose,
    open,
    resumeHideDuration
  } = parameters;
  const timerAutoHide = React50.useRef();
  React50.useEffect(() => {
    if (!open) {
      return void 0;
    }
    function handleKeyDown2(nativeEvent) {
      if (!nativeEvent.defaultPrevented) {
        if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
          onClose == null || onClose(nativeEvent, "escapeKeyDown");
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown2);
    return () => {
      document.removeEventListener("keydown", handleKeyDown2);
    };
  }, [open, onClose]);
  const handleClose = useEventCallback_default((event, reason) => {
    onClose == null || onClose(event, reason);
  });
  const setAutoHideTimer = useEventCallback_default((autoHideDurationParam) => {
    if (!onClose || autoHideDurationParam == null) {
      return;
    }
    clearTimeout(timerAutoHide.current);
    timerAutoHide.current = setTimeout(() => {
      handleClose(null, "timeout");
    }, autoHideDurationParam);
  });
  React50.useEffect(() => {
    if (open) {
      setAutoHideTimer(autoHideDuration);
    }
    return () => {
      clearTimeout(timerAutoHide.current);
    };
  }, [open, autoHideDuration, setAutoHideTimer]);
  const handleClickAway = (event) => {
    onClose == null || onClose(event, "clickaway");
  };
  const handlePause = () => {
    clearTimeout(timerAutoHide.current);
  };
  const handleResume = React50.useCallback(() => {
    if (autoHideDuration != null) {
      setAutoHideTimer(resumeHideDuration != null ? resumeHideDuration : autoHideDuration * 0.5);
    }
  }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);
  const createHandleBlur = (otherHandlers) => (event) => {
    const onBlurCallback = otherHandlers.onBlur;
    onBlurCallback == null || onBlurCallback(event);
    handleResume();
  };
  const createHandleFocus = (otherHandlers) => (event) => {
    const onFocusCallback = otherHandlers.onFocus;
    onFocusCallback == null || onFocusCallback(event);
    handlePause();
  };
  const createMouseEnter = (otherHandlers) => (event) => {
    const onMouseEnterCallback = otherHandlers.onMouseEnter;
    onMouseEnterCallback == null || onMouseEnterCallback(event);
    handlePause();
  };
  const createMouseLeave = (otherHandlers) => (event) => {
    const onMouseLeaveCallback = otherHandlers.onMouseLeave;
    onMouseLeaveCallback == null || onMouseLeaveCallback(event);
    handleResume();
  };
  React50.useEffect(() => {
    if (!disableWindowBlurListener && open) {
      window.addEventListener("focus", handleResume);
      window.addEventListener("blur", handlePause);
      return () => {
        window.removeEventListener("focus", handleResume);
        window.removeEventListener("blur", handlePause);
      };
    }
    return void 0;
  }, [disableWindowBlurListener, handleResume, open]);
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = _extends({}, extractEventHandlers(parameters), extractEventHandlers(externalProps));
    return _extends({
      // ClickAwayListener adds an `onClick` prop which results in the alert not being announced.
      // See https://github.com/mui/material-ui/issues/29080
      role: "presentation"
    }, externalProps, externalEventHandlers, {
      onBlur: createHandleBlur(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onMouseEnter: createMouseEnter(externalEventHandlers),
      onMouseLeave: createMouseLeave(externalEventHandlers)
    });
  };
  return {
    getRootProps,
    onClickAway: handleClickAway
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/Snackbar/Snackbar.js
var import_jsx_runtime32 = __toESM(require_jsx_runtime());
var _excluded17 = ["autoHideDuration", "children", "disableWindowBlurListener", "exited", "onBlur", "onClose", "onFocus", "onMouseEnter", "onMouseLeave", "open", "resumeHideDuration", "slotProps", "slots"];
var useUtilityClasses16 = () => {
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, useClassNamesOverride(getSnackbarUtilityClass));
};
var Snackbar = React51.forwardRef(function Snackbar2(props, forwardedRef) {
  const {
    autoHideDuration = null,
    children,
    disableWindowBlurListener = false,
    exited = true,
    onClose,
    open,
    resumeHideDuration,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded17);
  const classes = useUtilityClasses16();
  const {
    getRootProps,
    onClickAway
  } = useSnackbar(_extends({}, props, {
    autoHideDuration,
    disableWindowBlurListener,
    onClose,
    open,
    resumeHideDuration
  }));
  const ownerState = props;
  const Root = slots.root || "div";
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  const clickAwayListenerProps = useSlotProps({
    elementType: ClickAwayListener,
    externalSlotProps: slotProps.clickAwayListener,
    additionalProps: {
      onClickAway
    },
    ownerState
  });
  delete clickAwayListenerProps.ownerState;
  if (!open && exited) {
    return null;
  }
  return (0, import_jsx_runtime32.jsx)(ClickAwayListener, _extends({}, clickAwayListenerProps, {
    children: (0, import_jsx_runtime32.jsx)(Root, _extends({}, rootProps, {
      children
    }))
  }));
});
true ? Snackbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   * @default null
   */
  autoHideDuration: import_prop_types21.default.number,
  /**
   * @ignore
   */
  children: import_prop_types21.default.node,
  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   * @default false
   */
  disableWindowBlurListener: import_prop_types21.default.bool,
  /**
   * The prop used to handle exited transition and unmount the component.
   * @default true
   */
  exited: import_prop_types21.default.bool,
  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {React.SyntheticEvent<any> | Event} event The event source of the callback.
   * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`, or `"escapeKeyDown"`.
   */
  onClose: import_prop_types21.default.func,
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types21.default.bool,
  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` prop isn't specified, it does nothing.
   * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration: import_prop_types21.default.number,
  /**
   * The props used for each slot inside the Snackbar.
   * @default {}
   */
  slotProps: import_prop_types21.default.shape({
    clickAwayListener: import_prop_types21.default.oneOfType([import_prop_types21.default.func, import_prop_types21.default.shape({
      children: import_prop_types21.default.element.isRequired,
      disableReactTree: import_prop_types21.default.bool,
      mouseEvent: import_prop_types21.default.oneOf(["onClick", "onMouseDown", "onMouseUp", "onPointerDown", "onPointerUp", false]),
      onClickAway: import_prop_types21.default.func,
      touchEvent: import_prop_types21.default.oneOf(["onTouchEnd", "onTouchStart", false])
    })]),
    root: import_prop_types21.default.oneOfType([import_prop_types21.default.func, import_prop_types21.default.object])
  }),
  /**
   * The components used for each slot inside the Snackbar.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types21.default.shape({
    root: import_prop_types21.default.elementType
  })
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/Switch/Switch.js
init_extends();
var React53 = __toESM(require_react());
var import_prop_types22 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/useSwitch/useSwitch.js
init_extends();
var React52 = __toESM(require_react());
function useSwitch(props) {
  const {
    checked: checkedProp,
    defaultChecked,
    disabled,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly,
    required
  } = props;
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "Switch",
    state: "checked"
  });
  const createHandleInputChange = (otherProps) => (event) => {
    var _otherProps$onChange;
    if (event.nativeEvent.defaultPrevented) {
      return;
    }
    setCheckedState(event.target.checked);
    onChange == null || onChange(event);
    (_otherProps$onChange = otherProps.onChange) == null || _otherProps$onChange.call(otherProps, event);
  };
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React52.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  React52.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  const inputRef = React52.useRef(null);
  const createHandleFocus = (otherProps) => (event) => {
    var _otherProps$onFocus;
    if (!inputRef.current) {
      inputRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      onFocusVisible == null || onFocusVisible(event);
    }
    onFocus == null || onFocus(event);
    (_otherProps$onFocus = otherProps.onFocus) == null || _otherProps$onFocus.call(otherProps, event);
  };
  const createHandleBlur = (otherProps) => (event) => {
    var _otherProps$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    onBlur == null || onBlur(event);
    (_otherProps$onBlur = otherProps.onBlur) == null || _otherProps$onBlur.call(otherProps, event);
  };
  const handleInputRef = useForkRef(focusVisibleRef, inputRef);
  const getInputProps = (otherProps = {}) => _extends({
    checked: checkedProp,
    defaultChecked,
    disabled,
    readOnly,
    ref: handleInputRef,
    required,
    type: "checkbox"
  }, otherProps, {
    onChange: createHandleInputChange(otherProps),
    onFocus: createHandleFocus(otherProps),
    onBlur: createHandleBlur(otherProps)
  });
  return {
    checked,
    disabled: Boolean(disabled),
    focusVisible,
    getInputProps,
    inputRef: handleInputRef,
    readOnly: Boolean(readOnly)
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/Switch/switchClasses.js
function getSwitchUtilityClass(slot) {
  return generateUtilityClass("MuiSwitch", slot);
}
var switchClasses = generateUtilityClasses("MuiSwitch", ["root", "input", "track", "thumb", "checked", "disabled", "focusVisible", "readOnly"]);

// node_modules/@mui/lab/node_modules/@mui/base/Switch/Switch.js
var import_jsx_runtime33 = __toESM(require_jsx_runtime());
var import_jsx_runtime34 = __toESM(require_jsx_runtime());
var _excluded18 = ["checked", "defaultChecked", "disabled", "onBlur", "onChange", "onFocus", "onFocusVisible", "readOnly", "required", "slotProps", "slots"];
var useUtilityClasses17 = (ownerState) => {
  const {
    checked,
    disabled,
    focusVisible,
    readOnly
  } = ownerState;
  const slots = {
    root: ["root", checked && "checked", disabled && "disabled", focusVisible && "focusVisible", readOnly && "readOnly"],
    thumb: ["thumb"],
    input: ["input"],
    track: ["track"]
  };
  return composeClasses(slots, useClassNamesOverride(getSwitchUtilityClass));
};
var Switch = React53.forwardRef(function Switch2(props, forwardedRef) {
  var _slots$root, _slots$thumb, _slots$input, _slots$track;
  const {
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded18);
  const {
    getInputProps,
    checked,
    disabled,
    focusVisible,
    readOnly
  } = useSwitch(props);
  const ownerState = _extends({}, props, {
    checked,
    disabled,
    focusVisible,
    readOnly
  });
  const classes = useUtilityClasses17(ownerState);
  const Root = (_slots$root = slots.root) != null ? _slots$root : "span";
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  const Thumb = (_slots$thumb = slots.thumb) != null ? _slots$thumb : "span";
  const thumbProps = useSlotProps({
    elementType: Thumb,
    externalSlotProps: slotProps.thumb,
    ownerState,
    className: classes.thumb
  });
  const Input3 = (_slots$input = slots.input) != null ? _slots$input : "input";
  const inputProps = useSlotProps({
    elementType: Input3,
    getSlotProps: getInputProps,
    externalSlotProps: slotProps.input,
    ownerState,
    className: classes.input
  });
  const Track = slots.track === null ? () => null : (_slots$track = slots.track) != null ? _slots$track : "span";
  const trackProps = useSlotProps({
    elementType: Track,
    externalSlotProps: slotProps.track,
    ownerState,
    className: classes.track
  });
  return (0, import_jsx_runtime34.jsxs)(Root, _extends({}, rootProps, {
    children: [(0, import_jsx_runtime33.jsx)(Track, _extends({}, trackProps)), (0, import_jsx_runtime33.jsx)(Thumb, _extends({}, thumbProps)), (0, import_jsx_runtime33.jsx)(Input3, _extends({}, inputProps))]
  }));
});
true ? Switch.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component is checked.
   */
  checked: import_prop_types22.default.bool,
  /**
   * Class name applied to the root element.
   */
  className: import_prop_types22.default.string,
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: import_prop_types22.default.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: import_prop_types22.default.bool,
  /**
   * @ignore
   */
  onBlur: import_prop_types22.default.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: import_prop_types22.default.func,
  /**
   * @ignore
   */
  onFocus: import_prop_types22.default.func,
  /**
   * @ignore
   */
  onFocusVisible: import_prop_types22.default.func,
  /**
   * If `true`, the component is read only.
   */
  readOnly: import_prop_types22.default.bool,
  /**
   * If `true`, the `input` element is required.
   */
  required: import_prop_types22.default.bool,
  /**
   * The props used for each slot inside the Switch.
   * @default {}
   */
  slotProps: import_prop_types22.default.shape({
    input: import_prop_types22.default.oneOfType([import_prop_types22.default.func, import_prop_types22.default.object]),
    root: import_prop_types22.default.oneOfType([import_prop_types22.default.func, import_prop_types22.default.object]),
    thumb: import_prop_types22.default.oneOfType([import_prop_types22.default.func, import_prop_types22.default.object]),
    track: import_prop_types22.default.oneOfType([import_prop_types22.default.func, import_prop_types22.default.object])
  }),
  /**
   * The components used for each slot inside the Switch.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types22.default.shape({
    input: import_prop_types22.default.elementType,
    root: import_prop_types22.default.elementType,
    thumb: import_prop_types22.default.elementType,
    track: import_prop_types22.default.oneOfType([import_prop_types22.default.elementType, import_prop_types22.default.oneOf([null])])
  })
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/TablePagination/TablePagination.js
init_extends();
var React55 = __toESM(require_react());
var import_prop_types23 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/TablePagination/TablePaginationActions.js
init_extends();
var React54 = __toESM(require_react());
var import_jsx_runtime35 = __toESM(require_jsx_runtime());
var import_jsx_runtime36 = __toESM(require_jsx_runtime());
var _excluded19 = ["count", "getItemAriaLabel", "onPageChange", "page", "rowsPerPage", "showFirstButton", "showLastButton", "direction", "ownerState", "slotProps", "slots"];
var _span2;
var _span22;
var _span3;
var _span4;
function LastPageIconDefault() {
  return _span2 || (_span2 = (0, import_jsx_runtime35.jsx)("span", {
    children: "⇾|"
  }));
}
function FirstPageIconDefault() {
  return _span22 || (_span22 = (0, import_jsx_runtime35.jsx)("span", {
    children: "|⇽"
  }));
}
function NextPageIconDefault() {
  return _span3 || (_span3 = (0, import_jsx_runtime35.jsx)("span", {
    children: "⇾"
  }));
}
function BackPageIconDefault() {
  return _span4 || (_span4 = (0, import_jsx_runtime35.jsx)("span", {
    children: "⇽"
  }));
}
function defaultGetAriaLabel(type) {
  return `Go to ${type} page`;
}
var TablePaginationActions = React54.forwardRef(function TablePaginationActions2(props, forwardedRef) {
  var _slots$root, _slots$firstButton, _slots$lastButton, _slots$nextButton, _slots$backButton, _slots$lastPageIcon, _slots$firstPageIcon, _slots$nextPageIcon, _slots$backPageIcon;
  const {
    count,
    getItemAriaLabel = defaultGetAriaLabel,
    onPageChange,
    page,
    rowsPerPage,
    showFirstButton = false,
    showLastButton = false,
    direction,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded19);
  const ownerState = props;
  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };
  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };
  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState
  });
  const FirstButton = (_slots$firstButton = slots.firstButton) != null ? _slots$firstButton : "button";
  const firstButtonProps = useSlotProps({
    elementType: FirstButton,
    externalSlotProps: slotProps.firstButton,
    additionalProps: {
      onClick: handleFirstPageButtonClick,
      disabled: page === 0,
      "aria-label": getItemAriaLabel("first", page),
      title: getItemAriaLabel("first", page)
    },
    ownerState
  });
  const LastButton = (_slots$lastButton = slots.lastButton) != null ? _slots$lastButton : "button";
  const lastButtonProps = useSlotProps({
    elementType: LastButton,
    externalSlotProps: slotProps.lastButton,
    additionalProps: {
      onClick: handleLastPageButtonClick,
      disabled: page >= Math.ceil(count / rowsPerPage) - 1,
      "aria-label": getItemAriaLabel("last", page),
      title: getItemAriaLabel("last", page)
    },
    ownerState
  });
  const NextButton = (_slots$nextButton = slots.nextButton) != null ? _slots$nextButton : "button";
  const nextButtonProps = useSlotProps({
    elementType: NextButton,
    externalSlotProps: slotProps.nextButton,
    additionalProps: {
      onClick: handleNextButtonClick,
      disabled: count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false,
      "aria-label": getItemAriaLabel("next", page),
      title: getItemAriaLabel("next", page)
    },
    ownerState
  });
  const BackButton = (_slots$backButton = slots.backButton) != null ? _slots$backButton : "button";
  const backButtonProps = useSlotProps({
    elementType: BackButton,
    externalSlotProps: slotProps.backButton,
    additionalProps: {
      onClick: handleBackButtonClick,
      disabled: page === 0,
      "aria-label": getItemAriaLabel("previous", page),
      title: getItemAriaLabel("previous", page)
    },
    ownerState
  });
  const LastPageIcon = (_slots$lastPageIcon = slots.lastPageIcon) != null ? _slots$lastPageIcon : LastPageIconDefault;
  const FirstPageIcon = (_slots$firstPageIcon = slots.firstPageIcon) != null ? _slots$firstPageIcon : FirstPageIconDefault;
  const NextPageIcon = (_slots$nextPageIcon = slots.nextPageIcon) != null ? _slots$nextPageIcon : NextPageIconDefault;
  const BackPageIcon = (_slots$backPageIcon = slots.backPageIcon) != null ? _slots$backPageIcon : BackPageIconDefault;
  return (0, import_jsx_runtime36.jsxs)(Root, _extends({}, rootProps, {
    children: [showFirstButton && (0, import_jsx_runtime35.jsx)(FirstButton, _extends({}, firstButtonProps, {
      children: direction === "rtl" ? (0, import_jsx_runtime35.jsx)(LastPageIcon, {}) : (0, import_jsx_runtime35.jsx)(FirstPageIcon, {})
    })), (0, import_jsx_runtime35.jsx)(BackButton, _extends({}, backButtonProps, {
      children: direction === "rtl" ? (0, import_jsx_runtime35.jsx)(NextPageIcon, {}) : (0, import_jsx_runtime35.jsx)(BackPageIcon, {})
    })), (0, import_jsx_runtime35.jsx)(NextButton, _extends({}, nextButtonProps, {
      children: direction === "rtl" ? (0, import_jsx_runtime35.jsx)(BackPageIcon, {}) : (0, import_jsx_runtime35.jsx)(NextPageIcon, {})
    })), showLastButton && (0, import_jsx_runtime35.jsx)(LastButton, _extends({}, lastButtonProps, {
      children: direction === "rtl" ? (0, import_jsx_runtime35.jsx)(FirstPageIcon, {}) : (0, import_jsx_runtime35.jsx)(LastPageIcon, {})
    }))]
  }));
});

// node_modules/@mui/lab/node_modules/@mui/base/TablePagination/tablePaginationClasses.js
function getTablePaginationUtilityClass(slot) {
  return generateUtilityClass("MuiTablePagination", slot);
}
var tablePaginationClasses = generateUtilityClasses("MuiTablePagination", ["root", "toolbar", "spacer", "selectLabel", "selectRoot", "select", "selectIcon", "input", "menuItem", "displayedRows", "actions"]);

// node_modules/@mui/lab/node_modules/@mui/base/TablePagination/TablePagination.js
var import_jsx_runtime37 = __toESM(require_jsx_runtime());
var import_react = __toESM(require_react());
var import_jsx_runtime38 = __toESM(require_jsx_runtime());
var _excluded20 = ["colSpan", "count", "getItemAriaLabel", "labelDisplayedRows", "labelId", "labelRowsPerPage", "onPageChange", "onRowsPerPageChange", "page", "rowsPerPage", "rowsPerPageOptions", "selectId", "slotProps", "slots"];
function defaultLabelDisplayedRows({
  from,
  to,
  count
}) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}
function defaultGetAriaLabel2(type) {
  return `Go to ${type} page`;
}
var useUtilityClasses18 = () => {
  const slots = {
    root: ["root"],
    toolbar: ["toolbar"],
    spacer: ["spacer"],
    selectLabel: ["selectLabel"],
    select: ["select"],
    input: ["input"],
    selectIcon: ["selectIcon"],
    menuItem: ["menuItem"],
    displayedRows: ["displayedRows"],
    actions: ["actions"]
  };
  return composeClasses(slots, useClassNamesOverride(getTablePaginationUtilityClass));
};
var TablePagination = React55.forwardRef(function TablePagination2(props, forwardedRef) {
  var _slots$root, _slots$select, _slots$actions, _slots$menuItem, _slots$selectLabel, _slots$displayedRows, _slots$toolbar, _slots$spacer;
  const {
    colSpan: colSpanProp,
    count,
    getItemAriaLabel = defaultGetAriaLabel2,
    labelDisplayedRows = defaultLabelDisplayedRows,
    labelId: labelIdProp,
    labelRowsPerPage = "Rows per page:",
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    rowsPerPageOptions = [10, 25, 50, 100],
    selectId: selectIdProp,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded20);
  const ownerState = props;
  const classes = useUtilityClasses18();
  let colSpan;
  const Root = (_slots$root = slots.root) != null ? _slots$root : "td";
  if (Root === "td" || !isHostComponent(Root)) {
    colSpan = colSpanProp || 1e3;
  }
  const getLabelDisplayedRowsTo = () => {
    if (count === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage);
  };
  const selectId = useId(selectIdProp);
  const labelId = useId(labelIdProp);
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      colSpan,
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  const Select3 = (_slots$select = slots.select) != null ? _slots$select : "select";
  const selectProps = useSlotProps({
    elementType: Select3,
    externalSlotProps: slotProps.select,
    additionalProps: {
      value: rowsPerPage,
      id: selectId,
      onChange: (event) => onRowsPerPageChange && onRowsPerPageChange(event),
      "aria-label": rowsPerPage.toString(),
      "aria-labelledby": [labelId, selectId].filter(Boolean).join(" ") || void 0
    },
    ownerState,
    className: classes.select
  });
  const Actions = (_slots$actions = slots.actions) != null ? _slots$actions : TablePaginationActions;
  const actionsProps = useSlotProps({
    elementType: Actions,
    externalSlotProps: slotProps.actions,
    additionalProps: {
      page,
      rowsPerPage,
      count,
      onPageChange,
      getItemAriaLabel
    },
    ownerState,
    className: classes.actions
  });
  const MenuItem3 = (_slots$menuItem = slots.menuItem) != null ? _slots$menuItem : "option";
  const menuItemProps = useSlotProps({
    elementType: MenuItem3,
    externalSlotProps: slotProps.menuItem,
    additionalProps: {
      value: void 0
    },
    ownerState,
    className: classes.menuItem
  });
  const SelectLabel = (_slots$selectLabel = slots.selectLabel) != null ? _slots$selectLabel : "p";
  const selectLabelProps = useSlotProps({
    elementType: SelectLabel,
    externalSlotProps: slotProps.selectLabel,
    additionalProps: {
      id: labelId
    },
    ownerState,
    className: classes.selectLabel
  });
  const DisplayedRows = (_slots$displayedRows = slots.displayedRows) != null ? _slots$displayedRows : "p";
  const displayedRowsProps = useSlotProps({
    elementType: DisplayedRows,
    externalSlotProps: slotProps.displayedRows,
    ownerState,
    className: classes.displayedRows
  });
  const Toolbar = (_slots$toolbar = slots.toolbar) != null ? _slots$toolbar : "div";
  const toolbarProps = useSlotProps({
    elementType: Toolbar,
    externalSlotProps: slotProps.toolbar,
    ownerState,
    className: classes.toolbar
  });
  const Spacer = (_slots$spacer = slots.spacer) != null ? _slots$spacer : "div";
  const spacerProps = useSlotProps({
    elementType: Spacer,
    externalSlotProps: slotProps.spacer,
    ownerState,
    className: classes.spacer
  });
  return (0, import_jsx_runtime37.jsx)(Root, _extends({}, rootProps, {
    children: (0, import_jsx_runtime38.jsxs)(Toolbar, _extends({}, toolbarProps, {
      children: [(0, import_jsx_runtime37.jsx)(Spacer, _extends({}, spacerProps)), rowsPerPageOptions.length > 1 && (0, import_jsx_runtime37.jsx)(SelectLabel, _extends({}, selectLabelProps, {
        children: labelRowsPerPage
      })), rowsPerPageOptions.length > 1 && (0, import_jsx_runtime37.jsx)(Select3, _extends({}, selectProps, {
        children: rowsPerPageOptions.map((rowsPerPageOption) => (0, import_react.createElement)(MenuItem3, _extends({}, menuItemProps, {
          key: typeof rowsPerPageOption !== "number" && rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption,
          value: typeof rowsPerPageOption !== "number" && rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption
        }), typeof rowsPerPageOption !== "number" && rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption))
      })), (0, import_jsx_runtime37.jsx)(DisplayedRows, _extends({}, displayedRowsProps, {
        children: labelDisplayedRows({
          from: count === 0 ? 0 : page * rowsPerPage + 1,
          to: getLabelDisplayedRowsTo(),
          count: count === -1 ? -1 : count,
          page
        })
      })), (0, import_jsx_runtime37.jsx)(Actions, _extends({}, actionsProps))]
    }))
  }));
});
true ? TablePagination.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  colSpan: import_prop_types23.default.number,
  /**
   * The total number of rows.
   *
   * To enable server side pagination for an unknown number of items, provide -1.
   */
  count: import_prop_types23.default.number.isRequired,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   * @default function defaultGetAriaLabel(type: ItemAriaLabelType) {
   *   return `Go to ${type} page`;
   * }
   */
  getItemAriaLabel: import_prop_types23.default.func,
  /**
   * Customize the displayed rows label. Invoked with a `{ from, to, count, page }`
   * object.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default function defaultLabelDisplayedRows({ from, to, count }: LabelDisplayedRowsArgs) {
   *   return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
   * }
   */
  labelDisplayedRows: import_prop_types23.default.func,
  /**
   * Id of the label element within the pagination.
   */
  labelId: import_prop_types23.default.string,
  /**
   * Customize the rows per page label.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Rows per page:'
   */
  labelRowsPerPage: import_prop_types23.default.node,
  /**
   * Callback fired when the page is changed.
   *
   * @param {React.MouseEvent<HTMLButtonElement> | null} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: import_prop_types23.default.func.isRequired,
  /**
   * Callback fired when the number of rows per page is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   */
  onRowsPerPageChange: import_prop_types23.default.func,
  /**
   * The zero-based index of the current page.
   */
  page: chainPropTypes(integerPropType_default.isRequired, (props) => {
    const {
      count,
      page,
      rowsPerPage
    } = props;
    if (count === -1) {
      return null;
    }
    const newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
    if (page < 0 || page > newLastPage) {
      return new Error(`MUI: The page prop of a TablePagination is out of range (0 to ${newLastPage}, but page is ${page}).`);
    }
    return null;
  }),
  /**
   * The number of rows per page.
   *
   * Set -1 to display all the rows.
   */
  rowsPerPage: integerPropType_default.isRequired,
  /**
   * Customizes the options of the rows per page select field. If less than two options are
   * available, no select field will be displayed.
   * Use -1 for the value with a custom label to show all the rows.
   * @default [10, 25, 50, 100]
   */
  rowsPerPageOptions: import_prop_types23.default.arrayOf(import_prop_types23.default.oneOfType([import_prop_types23.default.number, import_prop_types23.default.shape({
    label: import_prop_types23.default.string.isRequired,
    value: import_prop_types23.default.number.isRequired
  })]).isRequired),
  /**
   * Id of the select element within the pagination.
   */
  selectId: import_prop_types23.default.string,
  /**
   * The props used for each slot inside the TablePagination.
   * @default {}
   */
  slotProps: import_prop_types23.default.shape({
    actions: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object]),
    displayedRows: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object]),
    menuItem: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object]),
    root: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object]),
    select: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object]),
    selectLabel: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object]),
    spacer: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object]),
    toolbar: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object])
  }),
  /**
   * The components used for each slot inside the TablePagination.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types23.default.shape({
    actions: import_prop_types23.default.elementType,
    displayedRows: import_prop_types23.default.elementType,
    menuItem: import_prop_types23.default.elementType,
    root: import_prop_types23.default.elementType,
    select: import_prop_types23.default.elementType,
    selectLabel: import_prop_types23.default.elementType,
    spacer: import_prop_types23.default.elementType,
    toolbar: import_prop_types23.default.elementType
  })
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/TabPanel/TabPanel.js
init_extends();
var React61 = __toESM(require_react());
var import_prop_types25 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/TabPanel/tabPanelClasses.js
function getTabPanelUtilityClass(slot) {
  return generateUtilityClass("MuiTabPanel", slot);
}
var tabPanelClasses = generateUtilityClasses("MuiTabPanel", ["root", "hidden"]);

// node_modules/@mui/lab/node_modules/@mui/base/useTabPanel/useTabPanel.js
init_extends();
var React60 = __toESM(require_react());

// node_modules/@mui/lab/node_modules/@mui/base/Tabs/Tabs.js
init_extends();
var React59 = __toESM(require_react());
var import_prop_types24 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/Tabs/tabsClasses.js
function getTabsUtilityClass(slot) {
  return generateUtilityClass("MuiTabs", slot);
}
var tabsClasses = generateUtilityClasses("MuiTabs", ["root", "horizontal", "vertical"]);

// node_modules/@mui/lab/node_modules/@mui/base/useTabs/useTabs.js
init_extends();
var React56 = __toESM(require_react());
function useTabs(parameters) {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    orientation,
    direction,
    selectionFollowsFocus
  } = parameters;
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "Tabs",
    state: "value"
  });
  const onSelected = React56.useCallback((event, newValue) => {
    setValue(newValue);
    onChange == null || onChange(event, newValue);
  }, [onChange, setValue]);
  const {
    subitems: tabPanels,
    contextValue: compoundComponentContextValue
  } = useCompoundParent();
  const tabIdLookup = React56.useRef(() => void 0);
  const getTabPanelId = React56.useCallback((tabValue) => {
    var _tabPanels$get;
    return (_tabPanels$get = tabPanels.get(tabValue)) == null ? void 0 : _tabPanels$get.id;
  }, [tabPanels]);
  const getTabId = React56.useCallback((tabPanelId) => {
    return tabIdLookup.current(tabPanelId);
  }, []);
  const registerTabIdLookup = React56.useCallback((lookupFunction) => {
    tabIdLookup.current = lookupFunction;
  }, []);
  return {
    contextValue: _extends({
      direction,
      getTabId,
      getTabPanelId,
      onSelected,
      orientation,
      registerTabIdLookup,
      selectionFollowsFocus,
      value
    }, compoundComponentContextValue)
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/useTabs/TabsProvider.js
var React58 = __toESM(require_react());

// node_modules/@mui/lab/node_modules/@mui/base/Tabs/TabsContext.js
var React57 = __toESM(require_react());
var TabsContext = React57.createContext(null);
if (true) {
  TabsContext.displayName = "TabsContext";
}
function useTabsContext() {
  const context = React57.useContext(TabsContext);
  if (context == null) {
    throw new Error("No TabsContext provided");
  }
  return context;
}

// node_modules/@mui/lab/node_modules/@mui/base/useTabs/TabsProvider.js
var import_jsx_runtime39 = __toESM(require_jsx_runtime());
function TabsProvider(props) {
  const {
    value: valueProp,
    children
  } = props;
  const {
    direction,
    getItemIndex,
    onSelected,
    orientation,
    registerItem,
    registerTabIdLookup,
    selectionFollowsFocus,
    totalSubitemCount,
    value,
    getTabId,
    getTabPanelId
  } = valueProp;
  const compoundComponentContextValue = React58.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount
  }), [registerItem, getItemIndex, totalSubitemCount]);
  const tabsContextValue = React58.useMemo(() => ({
    direction,
    getTabId,
    getTabPanelId,
    onSelected,
    orientation,
    registerTabIdLookup,
    selectionFollowsFocus,
    value
  }), [direction, getTabId, getTabPanelId, onSelected, orientation, registerTabIdLookup, selectionFollowsFocus, value]);
  return (0, import_jsx_runtime39.jsx)(CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: (0, import_jsx_runtime39.jsx)(TabsContext.Provider, {
      value: tabsContextValue,
      children
    })
  });
}

// node_modules/@mui/lab/node_modules/@mui/base/Tabs/Tabs.js
var import_jsx_runtime40 = __toESM(require_jsx_runtime());
var _excluded21 = ["children", "value", "defaultValue", "orientation", "direction", "onChange", "selectionFollowsFocus", "slotProps", "slots"];
var useUtilityClasses19 = (ownerState) => {
  const {
    orientation
  } = ownerState;
  const slots = {
    root: ["root", orientation]
  };
  return composeClasses(slots, useClassNamesOverride(getTabsUtilityClass));
};
var Tabs = React59.forwardRef(function Tabs2(props, forwardedRef) {
  var _slots$root;
  const {
    children,
    orientation = "horizontal",
    direction = "ltr",
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded21);
  const {
    contextValue
  } = useTabs(props);
  const ownerState = _extends({}, props, {
    orientation,
    direction
  });
  const classes = useUtilityClasses19(ownerState);
  const TabsRoot = (_slots$root = slots.root) != null ? _slots$root : "div";
  const tabsRootProps = useSlotProps({
    elementType: TabsRoot,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  return (0, import_jsx_runtime40.jsx)(TabsRoot, _extends({}, tabsRootProps, {
    children: (0, import_jsx_runtime40.jsx)(TabsProvider, {
      value: contextValue,
      children
    })
  }));
});
true ? Tabs.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: import_prop_types24.default.node,
  /**
   * @ignore
   */
  className: import_prop_types24.default.string,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: import_prop_types24.default.oneOfType([import_prop_types24.default.number, import_prop_types24.default.string]),
  /**
   * The direction of the text.
   * @default 'ltr'
   */
  direction: import_prop_types24.default.oneOf(["ltr", "rtl"]),
  /**
   * Callback invoked when new value is being set.
   */
  onChange: import_prop_types24.default.func,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: import_prop_types24.default.oneOf(["horizontal", "vertical"]),
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus: import_prop_types24.default.bool,
  /**
   * The props used for each slot inside the Tabs.
   * @default {}
   */
  slotProps: import_prop_types24.default.shape({
    root: import_prop_types24.default.oneOfType([import_prop_types24.default.func, import_prop_types24.default.object])
  }),
  /**
   * The components used for each slot inside the Tabs.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types24.default.shape({
    root: import_prop_types24.default.elementType
  }),
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `null`.
   */
  value: import_prop_types24.default.oneOfType([import_prop_types24.default.number, import_prop_types24.default.string])
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/useTabPanel/useTabPanel.js
function tabPanelValueGenerator(otherTabPanelValues) {
  return otherTabPanelValues.size;
}
function useTabPanel(parameters) {
  const {
    value: valueParam,
    id: idParam,
    rootRef: externalRef
  } = parameters;
  const context = useTabsContext();
  if (context === null) {
    throw new Error("No TabContext provided");
  }
  const {
    value: selectedTabValue,
    getTabId
  } = context;
  const id = useId(idParam);
  const ref = React60.useRef(null);
  const handleRef = useForkRef(ref, externalRef);
  const metadata = React60.useMemo(() => ({
    id,
    ref
  }), [id]);
  const {
    id: value
  } = useCompoundItem(valueParam != null ? valueParam : tabPanelValueGenerator, metadata);
  const hidden = value !== selectedTabValue;
  const correspondingTabId = value !== void 0 ? getTabId(value) : void 0;
  const getRootProps = (externalProps = {}) => {
    return _extends({
      "aria-labelledby": correspondingTabId != null ? correspondingTabId : void 0,
      hidden,
      id: id != null ? id : void 0
    }, externalProps, {
      ref: handleRef
    });
  };
  return {
    hidden,
    getRootProps,
    rootRef: handleRef
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/TabPanel/TabPanel.js
var import_jsx_runtime41 = __toESM(require_jsx_runtime());
var _excluded23 = ["children", "value", "slotProps", "slots"];
var useUtilityClasses20 = (ownerState) => {
  const {
    hidden
  } = ownerState;
  const slots = {
    root: ["root", hidden && "hidden"]
  };
  return composeClasses(slots, useClassNamesOverride(getTabPanelUtilityClass));
};
var TabPanel = React61.forwardRef(function TabPanel2(props, forwardedRef) {
  var _slots$root;
  const {
    children,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded23);
  const {
    hidden,
    getRootProps
  } = useTabPanel(props);
  const ownerState = _extends({}, props, {
    hidden
  });
  const classes = useUtilityClasses20(ownerState);
  const TabPanelRoot = (_slots$root = slots.root) != null ? _slots$root : "div";
  const tabPanelRootProps = useSlotProps({
    elementType: TabPanelRoot,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      role: "tabpanel",
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  return (0, import_jsx_runtime41.jsx)(TabPanelRoot, _extends({}, tabPanelRootProps, {
    children: !hidden && children
  }));
});
true ? TabPanel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: import_prop_types25.default.node,
  /**
   * @ignore
   */
  className: import_prop_types25.default.string,
  /**
   * The props used for each slot inside the TabPanel.
   * @default {}
   */
  slotProps: import_prop_types25.default.shape({
    root: import_prop_types25.default.oneOfType([import_prop_types25.default.func, import_prop_types25.default.object])
  }),
  /**
   * The components used for each slot inside the TabPanel.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types25.default.shape({
    root: import_prop_types25.default.elementType
  }),
  /**
   * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
   * If not provided, it will fall back to the index of the panel.
   * It is recommended to explicitly provide it, as it's required for the tab panel to be rendered on the server.
   */
  value: import_prop_types25.default.oneOfType([import_prop_types25.default.number, import_prop_types25.default.string])
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/TabsList/TabsList.js
init_extends();
var React64 = __toESM(require_react());
var import_prop_types26 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/TabsList/tabsListClasses.js
function getTabsListUtilityClass(slot) {
  return generateUtilityClass("MuiTabsList", slot);
}
var tabsListClasses = generateUtilityClasses("MuiTabsList", ["root", "horizontal", "vertical"]);

// node_modules/@mui/lab/node_modules/@mui/base/useTabsList/useTabsList.js
init_extends();
var React62 = __toESM(require_react());

// node_modules/@mui/lab/node_modules/@mui/base/useTabsList/useTabsList.types.js
var TabsListActionTypes = {
  valueChange: "valueChange"
};

// node_modules/@mui/lab/node_modules/@mui/base/useTabsList/tabsListReducer.js
init_extends();
function tabsListReducer(state, action) {
  if (action.type === TabsListActionTypes.valueChange) {
    return _extends({}, state, {
      highlightedValue: action.value
    });
  }
  const newState = listReducer(state, action);
  const {
    context: {
      selectionFollowsFocus
    }
  } = action;
  if (action.type === ListActionTypes.itemsChange) {
    if (newState.selectedValues.length > 0) {
      return _extends({}, newState, {
        highlightedValue: newState.selectedValues[0]
      });
    }
    moveHighlight(null, "reset", action.context);
  }
  if (selectionFollowsFocus && newState.highlightedValue != null) {
    return _extends({}, newState, {
      selectedValues: [newState.highlightedValue]
    });
  }
  return newState;
}

// node_modules/@mui/lab/node_modules/@mui/base/useTabsList/useTabsList.js
function useTabsList(parameters) {
  var _selectedValues$;
  const {
    rootRef: externalRef
  } = parameters;
  const {
    direction = "ltr",
    onSelected,
    orientation = "horizontal",
    value,
    registerTabIdLookup,
    selectionFollowsFocus
  } = useTabsContext();
  const {
    subitems,
    contextValue: compoundComponentContextValue
  } = useCompoundParent();
  const tabIdLookup = React62.useCallback((tabValue) => {
    var _subitems$get;
    return (_subitems$get = subitems.get(tabValue)) == null ? void 0 : _subitems$get.id;
  }, [subitems]);
  registerTabIdLookup(tabIdLookup);
  const subitemKeys = React62.useMemo(() => Array.from(subitems.keys()), [subitems]);
  const getTabElement = React62.useCallback((tabValue) => {
    var _subitems$get$ref$cur, _subitems$get2;
    if (tabValue == null) {
      return null;
    }
    return (_subitems$get$ref$cur = (_subitems$get2 = subitems.get(tabValue)) == null ? void 0 : _subitems$get2.ref.current) != null ? _subitems$get$ref$cur : null;
  }, [subitems]);
  const isRtl = direction === "rtl";
  let listOrientation;
  if (orientation === "vertical") {
    listOrientation = "vertical";
  } else {
    listOrientation = isRtl ? "horizontal-rtl" : "horizontal-ltr";
  }
  const handleChange = React62.useCallback((event, newValue) => {
    var _newValue$;
    onSelected(event, (_newValue$ = newValue[0]) != null ? _newValue$ : null);
  }, [onSelected]);
  const controlledProps = React62.useMemo(() => {
    if (value === void 0) {
      return {};
    }
    return value != null ? {
      selectedValues: [value]
    } : {
      selectedValues: []
    };
  }, [value]);
  const isItemDisabled = React62.useCallback((item) => {
    var _subitems$get$disable, _subitems$get3;
    return (_subitems$get$disable = (_subitems$get3 = subitems.get(item)) == null ? void 0 : _subitems$get3.disabled) != null ? _subitems$get$disable : false;
  }, [subitems]);
  const {
    contextValue: listContextValue,
    dispatch,
    getRootProps: getListboxRootProps,
    state: {
      highlightedValue,
      selectedValues
    },
    rootRef: mergedRootRef
  } = useList({
    controlledProps,
    disabledItemsFocusable: !selectionFollowsFocus,
    focusManagement: "DOM",
    getItemDomElement: getTabElement,
    isItemDisabled,
    items: subitemKeys,
    rootRef: externalRef,
    onChange: handleChange,
    orientation: listOrientation,
    reducerActionContext: React62.useMemo(() => ({
      selectionFollowsFocus: selectionFollowsFocus || false
    }), [selectionFollowsFocus]),
    selectionMode: "single",
    stateReducer: tabsListReducer
  });
  React62.useEffect(() => {
    if (value === void 0) {
      return;
    }
    if (value != null) {
      dispatch({
        type: TabsListActionTypes.valueChange,
        value
      });
    }
  }, [dispatch, value]);
  const getRootProps = (externalProps = {}) => {
    return _extends({}, externalProps, getListboxRootProps(externalProps), {
      "aria-orientation": orientation === "vertical" ? "vertical" : void 0,
      role: "tablist"
    });
  };
  const contextValue = React62.useMemo(() => _extends({}, compoundComponentContextValue, listContextValue), [compoundComponentContextValue, listContextValue]);
  return {
    contextValue,
    dispatch,
    getRootProps,
    highlightedValue,
    isRtl,
    orientation,
    rootRef: mergedRootRef,
    selectedValue: (_selectedValues$ = selectedValues[0]) != null ? _selectedValues$ : null
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/useTabsList/TabsListProvider.js
var React63 = __toESM(require_react());
var import_jsx_runtime42 = __toESM(require_jsx_runtime());
function TabsListProvider(props) {
  const {
    value,
    children
  } = props;
  const {
    dispatch,
    getItemIndex,
    getItemState,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler,
    registerItem,
    totalSubitemCount
  } = value;
  const listContextValue = React63.useMemo(() => ({
    dispatch,
    getItemState,
    getItemIndex,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler
  }), [dispatch, getItemIndex, getItemState, registerHighlightChangeHandler, registerSelectionChangeHandler]);
  const compoundComponentContextValue = React63.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount
  }), [registerItem, getItemIndex, totalSubitemCount]);
  return (0, import_jsx_runtime42.jsx)(CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: (0, import_jsx_runtime42.jsx)(ListContext.Provider, {
      value: listContextValue,
      children
    })
  });
}

// node_modules/@mui/lab/node_modules/@mui/base/TabsList/TabsList.js
var import_jsx_runtime43 = __toESM(require_jsx_runtime());
var _excluded24 = ["children", "slotProps", "slots"];
var useUtilityClasses21 = (ownerState) => {
  const {
    orientation
  } = ownerState;
  const slots = {
    root: ["root", orientation]
  };
  return composeClasses(slots, useClassNamesOverride(getTabsListUtilityClass));
};
var TabsList = React64.forwardRef(function TabsList2(props, forwardedRef) {
  var _slots$root;
  const {
    children,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded24);
  const {
    isRtl,
    orientation,
    getRootProps,
    contextValue
  } = useTabsList({
    rootRef: forwardedRef
  });
  const ownerState = _extends({}, props, {
    isRtl,
    orientation
  });
  const classes = useUtilityClasses21(ownerState);
  const TabsListRoot = (_slots$root = slots.root) != null ? _slots$root : "div";
  const tabsListRootProps = useSlotProps({
    elementType: TabsListRoot,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState,
    className: classes.root
  });
  return (0, import_jsx_runtime43.jsx)(TabsListProvider, {
    value: contextValue,
    children: (0, import_jsx_runtime43.jsx)(TabsListRoot, _extends({}, tabsListRootProps, {
      children
    }))
  });
});
true ? TabsList.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: import_prop_types26.default.node,
  /**
   * @ignore
   */
  className: import_prop_types26.default.string,
  /**
   * The props used for each slot inside the TabsList.
   * @default {}
   */
  slotProps: import_prop_types26.default.shape({
    root: import_prop_types26.default.oneOfType([import_prop_types26.default.func, import_prop_types26.default.object])
  }),
  /**
   * The components used for each slot inside the TabsList.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types26.default.shape({
    root: import_prop_types26.default.elementType
  })
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/Tab/Tab.js
init_extends();
var React66 = __toESM(require_react());
var import_prop_types27 = __toESM(require_prop_types());

// node_modules/@mui/lab/node_modules/@mui/base/Tab/tabClasses.js
function getTabUtilityClass(slot) {
  return generateUtilityClass("MuiTab", slot);
}
var tabClasses = generateUtilityClasses("MuiTab", ["root", "selected", "disabled"]);

// node_modules/@mui/lab/node_modules/@mui/base/useTab/useTab.js
init_extends();
var React65 = __toESM(require_react());
function tabValueGenerator(otherTabValues) {
  return otherTabValues.size;
}
function useTab(parameters) {
  const {
    value: valueParam,
    rootRef: externalRef,
    disabled = false,
    id: idParam
  } = parameters;
  const tabRef = React65.useRef(null);
  const id = useId(idParam);
  const {
    value: selectedValue,
    selectionFollowsFocus,
    getTabPanelId
  } = useTabsContext();
  const tabMetadata = React65.useMemo(() => ({
    disabled,
    ref: tabRef,
    id
  }), [disabled, tabRef, id]);
  const {
    id: value,
    index,
    totalItemCount: totalTabsCount
  } = useCompoundItem(valueParam != null ? valueParam : tabValueGenerator, tabMetadata);
  const {
    getRootProps: getTabProps,
    rootRef: listItemRefHandler,
    highlighted,
    selected
  } = useListItem({
    item: value
  });
  const {
    getRootProps: getButtonProps,
    rootRef: buttonRefHandler,
    active,
    focusVisible,
    setFocusVisible
  } = useButton({
    disabled,
    focusableWhenDisabled: !selectionFollowsFocus,
    type: "button"
  });
  const handleRef = useForkRef(tabRef, externalRef, listItemRefHandler, buttonRefHandler);
  const tabPanelId = value !== void 0 ? getTabPanelId(value) : void 0;
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const getCombinedRootProps = combineHooksSlotProps(getTabProps, getButtonProps);
    return _extends({}, externalProps, getCombinedRootProps(externalEventHandlers), {
      role: "tab",
      "aria-controls": tabPanelId,
      "aria-selected": selected,
      id,
      ref: handleRef
    });
  };
  return {
    getRootProps,
    active,
    focusVisible,
    highlighted,
    index,
    rootRef: handleRef,
    // the `selected` state isn't set on the server (it relies on effects to be calculated),
    // so we fall back to checking the `value` prop with the selectedValue from the TabsContext
    selected: selected || value === selectedValue,
    setFocusVisible,
    totalTabsCount
  };
}

// node_modules/@mui/lab/node_modules/@mui/base/Tab/Tab.js
var import_jsx_runtime44 = __toESM(require_jsx_runtime());
var _excluded25 = ["action", "children", "value", "disabled", "onChange", "onClick", "onFocus", "slotProps", "slots"];
var useUtilityClasses22 = (ownerState) => {
  const {
    selected,
    disabled
  } = ownerState;
  const slots = {
    root: ["root", selected && "selected", disabled && "disabled"]
  };
  return composeClasses(slots, useClassNamesOverride(getTabUtilityClass));
};
var Tab = React66.forwardRef(function Tab2(props, forwardedRef) {
  var _slots$root;
  const {
    children,
    disabled = false,
    slotProps = {},
    slots = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded25);
  const tabRef = React66.useRef();
  const handleRef = useForkRef(tabRef, forwardedRef);
  const {
    active,
    highlighted,
    selected,
    getRootProps
  } = useTab(_extends({}, props, {
    rootRef: handleRef
  }));
  const ownerState = _extends({}, props, {
    active,
    disabled,
    highlighted,
    selected
  });
  const classes = useUtilityClasses22(ownerState);
  const TabRoot = (_slots$root = slots.root) != null ? _slots$root : "button";
  const tabRootProps = useSlotProps({
    elementType: TabRoot,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  return (0, import_jsx_runtime44.jsx)(TabRoot, _extends({}, tabRootProps, {
    children
  }));
});
true ? Tab.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: import_prop_types27.default.oneOfType([import_prop_types27.default.func, import_prop_types27.default.shape({
    current: import_prop_types27.default.shape({
      focusVisible: import_prop_types27.default.func.isRequired
    })
  })]),
  /**
   * @ignore
   */
  children: import_prop_types27.default.node,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types27.default.bool,
  /**
   * Callback invoked when new value is being set.
   */
  onChange: import_prop_types27.default.func,
  /**
   * The props used for each slot inside the Tab.
   * @default {}
   */
  slotProps: import_prop_types27.default.shape({
    root: import_prop_types27.default.oneOfType([import_prop_types27.default.func, import_prop_types27.default.object])
  }),
  /**
   * The components used for each slot inside the Tab.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types27.default.shape({
    root: import_prop_types27.default.elementType
  }),
  /**
   * You can provide your own value. Otherwise, it falls back to the child position index.
   */
  value: import_prop_types27.default.oneOfType([import_prop_types27.default.number, import_prop_types27.default.string])
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/TextareaAutosize/TextareaAutosize.js
init_extends();
var React67 = __toESM(require_react());
var import_prop_types28 = __toESM(require_prop_types());
var ReactDOM2 = __toESM(require_react_dom());
var import_jsx_runtime45 = __toESM(require_jsx_runtime());
var import_jsx_runtime46 = __toESM(require_jsx_runtime());
var _excluded26 = ["onChange", "maxRows", "minRows", "style", "value"];
function getStyleValue(value) {
  return parseInt(value, 10) || 0;
}
var styles = {
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: "hidden",
    // Remove from the content flow
    position: "absolute",
    // Ignore the scrollbar width
    overflow: "hidden",
    height: 0,
    top: 0,
    left: 0,
    // Create a new layer, increase the isolation of the computed values
    transform: "translateZ(0)"
  }
};
function isEmpty(obj) {
  return obj === void 0 || obj === null || Object.keys(obj).length === 0 || obj.outerHeightStyle === 0 && !obj.overflow;
}
var TextareaAutosize = React67.forwardRef(function TextareaAutosize2(props, forwardedRef) {
  const {
    onChange,
    maxRows,
    minRows = 1,
    style,
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded26);
  const {
    current: isControlled
  } = React67.useRef(value != null);
  const inputRef = React67.useRef(null);
  const handleRef = useForkRef(forwardedRef, inputRef);
  const shadowRef = React67.useRef(null);
  const renders = React67.useRef(0);
  const [state, setState] = React67.useState({
    outerHeightStyle: 0
  });
  const getUpdatedState = React67.useCallback(() => {
    const input = inputRef.current;
    const containerWindow = ownerWindow(input);
    const computedStyle = containerWindow.getComputedStyle(input);
    if (computedStyle.width === "0px") {
      return {
        outerHeightStyle: 0
      };
    }
    const inputShallow = shadowRef.current;
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || props.placeholder || "x";
    if (inputShallow.value.slice(-1) === "\n") {
      inputShallow.value += " ";
    }
    const boxSizing = computedStyle.boxSizing;
    const padding = getStyleValue(computedStyle.paddingBottom) + getStyleValue(computedStyle.paddingTop);
    const border = getStyleValue(computedStyle.borderBottomWidth) + getStyleValue(computedStyle.borderTopWidth);
    const innerHeight = inputShallow.scrollHeight;
    inputShallow.value = "x";
    const singleRowHeight = inputShallow.scrollHeight;
    let outerHeight = innerHeight;
    if (minRows) {
      outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
    }
    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);
    const outerHeightStyle = outerHeight + (boxSizing === "border-box" ? padding + border : 0);
    const overflow = Math.abs(outerHeight - innerHeight) <= 1;
    return {
      outerHeightStyle,
      overflow
    };
  }, [maxRows, minRows, props.placeholder]);
  const updateState = (prevState, newState) => {
    const {
      outerHeightStyle,
      overflow
    } = newState;
    if (renders.current < 20 && (outerHeightStyle > 0 && Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1 || prevState.overflow !== overflow)) {
      renders.current += 1;
      return {
        overflow,
        outerHeightStyle
      };
    }
    if (true) {
      if (renders.current === 20) {
        console.error(["MUI: Too many re-renders. The layout is unstable.", "TextareaAutosize limits the number of renders to prevent an infinite loop."].join("\n"));
      }
    }
    return prevState;
  };
  const syncHeight = React67.useCallback(() => {
    const newState = getUpdatedState();
    if (isEmpty(newState)) {
      return;
    }
    setState((prevState) => updateState(prevState, newState));
  }, [getUpdatedState]);
  useEnhancedEffect_default(() => {
    const syncHeightWithFlushSync = () => {
      const newState = getUpdatedState();
      if (isEmpty(newState)) {
        return;
      }
      ReactDOM2.flushSync(() => {
        setState((prevState) => updateState(prevState, newState));
      });
    };
    const handleResize = () => {
      renders.current = 0;
      syncHeightWithFlushSync();
    };
    let rAF;
    const rAFHandleResize = () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        handleResize();
      });
    };
    const debounceHandleResize = debounce(handleResize);
    const input = inputRef.current;
    const containerWindow = ownerWindow(input);
    containerWindow.addEventListener("resize", debounceHandleResize);
    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(false ? rAFHandleResize : handleResize);
      resizeObserver.observe(input);
    }
    return () => {
      debounceHandleResize.clear();
      cancelAnimationFrame(rAF);
      containerWindow.removeEventListener("resize", debounceHandleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [getUpdatedState]);
  useEnhancedEffect_default(() => {
    syncHeight();
  });
  React67.useEffect(() => {
    renders.current = 0;
  }, [value]);
  const handleChange = (event) => {
    renders.current = 0;
    if (!isControlled) {
      syncHeight();
    }
    if (onChange) {
      onChange(event);
    }
  };
  return (0, import_jsx_runtime46.jsxs)(React67.Fragment, {
    children: [(0, import_jsx_runtime45.jsx)("textarea", _extends({
      value,
      onChange: handleChange,
      ref: handleRef,
      rows: minRows,
      style: _extends({
        height: state.outerHeightStyle,
        // Need a large enough difference to allow scrolling.
        // This prevents infinite rendering loop.
        overflow: state.overflow ? "hidden" : void 0
      }, style)
    }, other)), (0, import_jsx_runtime45.jsx)("textarea", {
      "aria-hidden": true,
      className: props.className,
      readOnly: true,
      ref: shadowRef,
      tabIndex: -1,
      style: _extends({}, styles.shadow, style, {
        paddingTop: 0,
        paddingBottom: 0
      })
    })]
  });
});
true ? TextareaAutosize.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  className: import_prop_types28.default.string,
  /**
   * Maximum number of rows to display.
   */
  maxRows: import_prop_types28.default.oneOfType([import_prop_types28.default.number, import_prop_types28.default.string]),
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows: import_prop_types28.default.oneOfType([import_prop_types28.default.number, import_prop_types28.default.string]),
  /**
   * @ignore
   */
  onChange: import_prop_types28.default.func,
  /**
   * @ignore
   */
  placeholder: import_prop_types28.default.string,
  /**
   * @ignore
   */
  style: import_prop_types28.default.object,
  /**
   * @ignore
   */
  value: import_prop_types28.default.oneOfType([import_prop_types28.default.arrayOf(import_prop_types28.default.string), import_prop_types28.default.number, import_prop_types28.default.string])
} : void 0;

// node_modules/@mui/lab/node_modules/@mui/base/useAutocomplete/useAutocomplete.js
init_extends();
var React68 = __toESM(require_react());
function stripDiacritics(string) {
  return typeof string.normalize !== "undefined" ? string.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : string;
}
function createFilterOptions(config = {}) {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    limit,
    matchFrom = "any",
    stringify,
    trim = false
  } = config;
  return (options, {
    inputValue,
    getOptionLabel
  }) => {
    let input = trim ? inputValue.trim() : inputValue;
    if (ignoreCase) {
      input = input.toLowerCase();
    }
    if (ignoreAccents) {
      input = stripDiacritics(input);
    }
    const filteredOptions = !input ? options : options.filter((option) => {
      let candidate = (stringify || getOptionLabel)(option);
      if (ignoreCase) {
        candidate = candidate.toLowerCase();
      }
      if (ignoreAccents) {
        candidate = stripDiacritics(candidate);
      }
      return matchFrom === "start" ? candidate.indexOf(input) === 0 : candidate.indexOf(input) > -1;
    });
    return typeof limit === "number" ? filteredOptions.slice(0, limit) : filteredOptions;
  };
}
var defaultFilterOptions = createFilterOptions();
/*! Bundled license information:

@mui/base/index.js:
  (**
   * @mui/base v5.0.0-beta.18
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=chunk-PUPOOQ6M.js.map
