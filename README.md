# mui-layout
A collection of layout elements built on [mui](https://mui.com/material-ui)

## Installation
```console
$ pnpm add github:xodder/mui-layout
```

## Usage
```jsx
import { Avatar, Typography, IconButton } from '@mui/material';
import { Column, Row, Spacer, Flexible } from '@xod/layout';

function DummyListItem() {
  return (
    <Row crossAxisAlignment="center">
      <Avatar />
      <Spacer sx={2} />
      <Column>
        <Typography>Title</Typography>
        <Typography variant="body2" color="text.secondary">
          Subtitle
        </Typography>
      </Column>
      <Flexible />
      <IconButton>x</IconButton>
    </Row>
  );
}
```

## Components
The following components are exposed by the library and each does just what it's name implies:

- Column
- Row
- FlexItem
- Grid
- Center
- Spacer
- Flexible
