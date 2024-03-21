import React, { forwardRef } from 'react';
import Canvas from './Canvas';

const WrappedCanvas = forwardRef((props, ref) => (
  <Canvas {...props} ref={ref} />
));

WrappedCanvas.displayName = 'WrappedCanvas';
export default WrappedCanvas;
