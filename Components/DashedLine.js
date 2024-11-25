import React from 'react';
import Svg, { Line } from 'react-native-svg';

const DashedLine = ({ x1, y1, x2, y2, dashArray }) => {
  return (
    <Svg height="100%" width="100%">
      <Line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeWidth="2"
        strokeDasharray={dashArray}
      />
    </Svg>
  );
};

export default DashedLine;
