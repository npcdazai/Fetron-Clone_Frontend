import {
  deprecatedPropType,
  requirePropFactory
} from "./chunk-NWNPM2ZU.js";
import {
  setRef
} from "./chunk-D25FWIIA.js";
import {
  ClassNameGenerator_default
} from "./chunk-HA5N2SSD.js";

// node_modules/@mui/material/utils/deprecatedPropType.js
var deprecatedPropType_default = deprecatedPropType;

// node_modules/@mui/material/utils/requirePropFactory.js
var requirePropFactory_default = requirePropFactory;

// node_modules/@mui/material/utils/setRef.js
var setRef_default = setRef;

// node_modules/@mui/material/utils/index.js
var unstable_ClassNameGenerator = {
  configure: (generator) => {
    if (true) {
      console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join("\n"));
    }
    ClassNameGenerator_default.configure(generator);
  }
};

export {
  deprecatedPropType_default,
  requirePropFactory_default,
  setRef_default,
  unstable_ClassNameGenerator
};
//# sourceMappingURL=chunk-36USVHPP.js.map
