import { Box, BoxProps } from '@mui/material';

type Responsive<T> = Partial<{
  xs: T;
  sm: T;
  md: T;
  lg: T;
}>;

type Value = string | number;

type OverridenProps =
  | 'gridTemplateColumns'
  | 'gap'
  | 'rowGap'
  | 'columnGap'
  | 'display'
  | 'justifyContent'
  | 'alignItems';

export type GridProps = Omit<BoxProps, OverridenProps> &
  Partial<{
    columns: Value | Responsive<Value>;
    columnTemplate: string | Responsive<string>;
    rowTemplate: string | Responsive<string>;
    spacing: Value | Responsive<Value>;
    rowSpacing: Value | Responsive<Value>;
    columnSpacing: Value | Responsive<Value>;
    mainAxisAlignment: BoxProps['justifyContent'];
    crossAxisAlignment: BoxProps['alignItems'];
  }>;

function Grid({
  columns,
  columnTemplate,
  rowTemplate,
  columnSpacing,
  rowSpacing,
  spacing,
  mainAxisAlignment,
  crossAxisAlignment,
  ...props
}: GridProps) {
  const cols = !isEmpty(columns)
    ? resolveResponsiveValue(columns, 'repeat({}, minmax(10px, 1fr))')
    : resolveResponsiveValue(columnTemplate, '{}');
  const rows = resolveResponsiveValue(rowTemplate, '{}');

  return (
    <Box
      {...props}
      display="grid"
      gridTemplateColumns={cols}
      gridTemplateRows={rows}
      gap={resolveResponsiveValue(spacing, '{}')}
      rowGap={resolveResponsiveValue(columnSpacing, '{}')}
      columnGap={resolveResponsiveValue(rowSpacing, '{}')}
      justifyContent={mainAxisAlignment}
      alignItems={crossAxisAlignment}
    />
  );
}

function resolveResponsiveValue(
  value: Value | Responsive<Value> | undefined,
  format: string
) {
  if (typeof value !== 'object') {
    return resolveValue(format, value);
  }

  return {
    xs: resolveValue(format, value?.xs),
    sm: resolveValue(format, value?.sm),
    md: resolveValue(format, value?.md),
    lg: resolveValue(format, value?.lg),
  };
}

function resolveValue(format: string, value: Value | undefined) {
  if (value === undefined) {
    return undefined;
  }

  const value__ = format.replace('{}', value.toString());

  if (!isNaN(value__ as any)) {
    return Number(value__);
  }

  return value__;
}

function isEmpty(value?: Value | Responsive<Value>) {
  if (typeof value !== 'object') {
    if (typeof value === 'string') {
      return !value || value.length === 0;
    }

    return value === undefined;
  }

  return Object.keys(value).length === 0;
}

export default Grid;
