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
  public cursor: string;
  public visibility: "visible" | "hidden";
  public data: DataLineData;

  /**
   * DataLine is a wrapper around a span element that adds data-ty-* attributes
   * to the element. These attributes are used by the termynal library to
   * determine how to render the element.
   *
   * @param {string} props.type - The type of the element. Can be 'input', 'progress', or '' as pure text line.
   * @param {string} props.cursor - The character to use for the cursor.
   * @param {string} props.value - The value of the element.
   * @param {number} props.delay - The delay before the element is rendered.
   * @param {number} props.typeDelay - The delay between each character typed in input line.
   * @param {string} props.prompt - The prompt to use for input lines.
   * @param {number} props.progressLength - The length of the progress bar.
   * @param {string} props.progressChar - The character to use for the progress bar.
   * @param {number} props.progressPercent - The percentage of the progress bar to fill.
   */
  constructor(props: DataLineProps) {
    super(props);
    this.visibility = 'visible'
    this.cursor = props.cursor || '';
    this.data = {};
    this.data.type = props.type || '';
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
