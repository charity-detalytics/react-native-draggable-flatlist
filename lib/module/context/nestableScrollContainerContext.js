import React, { useContext, useMemo, useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
const NestableScrollContainerContext = /*#__PURE__*/React.createContext(undefined); // Kept out of the context above: every nested list consumes that one, and the
// outer scroll is toggled when each drag starts and ends, which would
// otherwise re-render every nested list and all of its cells twice per drag.

const OuterScrollEnabledContext = /*#__PURE__*/React.createContext(true);

function useSetupNestableScrollContextValue(_ref) {
  let {
    forwardedRef
  } = _ref;
  const [outerScrollEnabled, setOuterScrollEnabled] = useState(true);
  const scrollViewSize = useSharedValue(0);
  const scrollableRefInner = useRef(null);
  const scrollableRef = forwardedRef || scrollableRefInner;
  const outerScrollOffset = useSharedValue(0);
  const containerSize = useSharedValue(0);
  const contextVal = useMemo(() => ({
    setOuterScrollEnabled,
    outerScrollOffset,
    scrollViewSize,
    scrollableRef,
    containerSize
  }), [scrollableRef]);
  return {
    contextVal,
    outerScrollEnabled
  };
}

export function NestableScrollContainerProvider(_ref2) {
  let {
    children,
    forwardedRef
  } = _ref2;
  const {
    contextVal,
    outerScrollEnabled
  } = useSetupNestableScrollContextValue({
    forwardedRef
  });
  return /*#__PURE__*/React.createElement(NestableScrollContainerContext.Provider, {
    value: contextVal
  }, /*#__PURE__*/React.createElement(OuterScrollEnabledContext.Provider, {
    value: outerScrollEnabled
  }, children));
}
export function useNestableScrollContainerContext() {
  const value = useContext(NestableScrollContainerContext);
  return value;
}
export function useSafeNestableScrollContainerContext() {
  const value = useNestableScrollContainerContext();

  if (!value) {
    throw new Error("useSafeNestableScrollContainerContext must be called within a NestableScrollContainerContext.Provider");
  }

  return value;
}
export function useOuterScrollEnabled() {
  return useContext(OuterScrollEnabledContext);
}
//# sourceMappingURL=nestableScrollContainerContext.js.map