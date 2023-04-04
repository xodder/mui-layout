import { Stack, StackProps } from '@mui/material';
import React from 'react';

type OverridenProps = 'display' | 'justifyContent' | 'alignItems';

export type FlexItemProps<C extends React.ElementType = 'div'> = Omit<
  StackProps<C>,
  OverridenProps
> &
  Partial<{
    crossAxisAlignment: StackProps['justifyContent'];
    mainAxisAlignment: StackProps['alignItems'];
  }>;

function FlexItem<C extends React.ElementType>(
  props: FlexItemProps<C>,
  ref: React.Ref<any>
) {
  const { crossAxisAlignment, mainAxisAlignment, ...otherProps } = props;

  return (
    <Stack
      ref={ref}
      {...otherProps}
      justifyContent={mainAxisAlignment}
      alignItems={crossAxisAlignment}
    />
  );
}

export default React.forwardRef(FlexItem);
