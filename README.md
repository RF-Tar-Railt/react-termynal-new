# React-Termynal-New

`react-termynal-new` is another react wrapper around the css/javascript library [termynal.js](https://github.com/ines/termynal).

## Installation

```bash
npm install react-termynal-new
```

## Usage

```jsx
import React from 'react';
import {App as Termynal, DataLine} from 'react-termynal-new';

const App = () => {
  return (
    <Termynal>
      <DataLine type="input" prompt=">>>">Hello World! </DataLine>
    </Termynal>
  );
};

export default App;
```
