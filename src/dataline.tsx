import React from 'react';

type DataLineProps = {
  type?: string;
  cursor?: string;
  value?: string;
  delay?: number;
  typeDelay?: number;
  prompt?: string;
  progressLength?: number;
  progressChar?: string;
  progressPercent?: number;
  children?: string;
}

type DataLineData = {
  type?: string;
  cursor?: string;
  value?: string;
  delay?: number;
  typeDelay?: number;
  prompt?: string;
  progressLength?: number;
  progressChar?: string;
  progressPercent?: number;
}



export class DataLine extends React.Component {
  public visibility: "visible" | "hidden";
  public data: DataLineData;

  constructor(props: DataLineProps) {
    super(props);
    this.visibility = 'visible'
    this.data = {};
    this.data.type = props.type;
    this.data.cursor = props.cursor;
    this.data.value = props.value || props.children || '';
    this.data.delay = props.delay;
    this.data.typeDelay = props.typeDelay;
    this.data.prompt = props.prompt;
    this.data.progressLength = props.progressLength;
    this.data.progressChar = props.progressChar;
    this.data.progressPercent = props.progressPercent;
  }

  generate_attributes() {
    let attrs = {style: {visibility: this.visibility}};
    for (let prop of Object.keys(this.data)) {
        let value = this.data[prop];
        if (value === undefined || value === null) {
          continue;
        }
        // Custom add class
        if (prop === 'class') {
          attrs['class'] = `${value}`
          continue
        }
        if (prop === 'type') {
          attrs['data-ty'] = `${value}`
        } else if (prop !== 'value') {
          attrs[`data-ty-${prop.toLowerCase()}`] = value
        }
    }
    return attrs;
  }
  render() {
    return (
      <span {...this.generate_attributes()}>{this.data.value || ''}</span>
    );
  }
}
