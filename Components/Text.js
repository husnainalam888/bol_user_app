import React from 'react';
import {Text as RNText} from 'react-native';
const Text = ({style, fontFamily, ...props}) => {
  // Add your custom font family style
  const customStyle = {
    fontFamily: fontFamily || 'Poppins-Regular',
    lineHeight: 22, // Use your custom font family or a default one
    ...style, // Include other styles passed as props
  };

  return <RNText style={customStyle} {...props} />;
};

export default Text;
