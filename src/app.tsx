import React from 'react';
import {ReactElement} from 'react';
import {DataLine} from './dataline';
import "./styles/termynal.css";


const defaultOptions = {
  startDelay: 600,
  typeDelay: 90,
  lineDelay: 1500,
  progressLength: 40,
  progressChar: '█',
  progressPercent: 100,
  cursor: '▋',
}

type TermynalProps = {
  id?: string;
  title?: string;
  flex?: boolean;
  startDelay?: number;
  typeDelay?: number;
  lineDelay?: number;
  progressLength?: number;
  progressChar?: string;
  progressPercent?: number;
  cursor?: string;
  children?: ReactElement[];
}


export class App extends React.Component {
  public id: string;
  public title: string;
  public flex: boolean;
  public children: DataLine[];
  public cursor: string;
  public fastVisible: 'visible' | 'hidden';
  public restartVisible: 'visible' | 'hidden';
  public startDelay: number;
  public typeDelay: number;
  public lineDelay: number;
  public originalStartDelay: number;
  public originalTypeDelay: number;
  public originalLineDelay: number;
  public progressLength: number;
  public progressChar: string;
  public progressPercent: number;

  private readonly lines: DataLine[];

  /**
   * react-termynal-new
   *
   * A React component for simulating a terminal session.
   *
   * @param {string} props.id - The id of the element to render the terminal in.
   * @param {string} props.title - The title of the terminal.
   * @param {boolean} props.flex - Whether to make height of terminal flexible.
   * @param {number} props.startDelay - The delay before the terminal starts typing.
   * @param {number} props.typeDelay - The delay between each character typed in input line.
   * @param {number} props.lineDelay - The delay between each line.
   * @param {number} props.progressLength - The length of the progress bar.
   * @param {string} props.progressChar - The character to use for the progress bar.
   * @param {number} props.progressPercent - The percentage of the progress bar to fill.
   * @param {string} props.cursor - The character to use for the cursor.
   * @param {ReactElement[]} props.children - The lines to render in the terminal.
   */
  constructor(props: TermynalProps) {
    super(props);
    this.id = props.id || "termynal";
    this.title = props.title || "bash";
    this.flex = props.flex || false;
    this.originalStartDelay = this.startDelay = props.startDelay || defaultOptions.startDelay;
    this.originalTypeDelay = this.typeDelay = props.typeDelay || defaultOptions.typeDelay;
    this.originalLineDelay = this.lineDelay = props.lineDelay || defaultOptions.lineDelay;
    this.progressLength = props.progressLength || defaultOptions.progressLength;
    this.progressChar = props.progressChar || defaultOptions.progressChar;
    this.progressPercent = props.progressPercent || defaultOptions.progressPercent;
    this.cursor = props.cursor || defaultOptions.cursor;
    this.children = [];
    this.lines = (props.children || []).map((v) => new DataLine(v.props));
    this.fastVisible = 'visible';
    this.restartVisible = 'hidden';
    this.init();
  }

  render() {
    return (
      <React.StrictMode>
        <div id={this.id} data-termynal="" data-termynal-title={this.title}>
          <a href='#'
             style={{visibility: this.fastVisible}}
             onClick={(e) => {
               e.preventDefault()
               this.lineDelay = 1
               this.typeDelay = 1
               this.startDelay = 1
             }} data-terminal-control=''>fast →</a>
          {this.children.map((v) => v.render())}
          <a href='#'
             style={{visibility: this.restartVisible}}
             onClick={(e) => {
               e.preventDefault()
               this.init()
             }} data-terminal-control=''>restart ↻</a>
        </div>
        <p></p>
      </React.StrictMode>
    )
  }

  init() {
    if (this.flex) {
      this.children = [];
    } else {
      this.children = this.lines.map((v) => {
        v.visibility = 'hidden';
        return v;
      });
    }
    this.fastVisible = 'visible';
    this.restartVisible = 'hidden';
    this.start();
  }

  enableLine(line: DataLine) {
    if (this.flex) {
      this.children.push(line);
    } else {
      line.visibility = 'visible';
    }
  }

  async start() {
    await this.wait(this.startDelay);
    for (let line of this.lines) {

      const type = line.data.type;
      const delay = line.data.delay || this.lineDelay;

      if (type === 'input') {
        line.data.cursor = line.cursor || this.cursor;
        await this.type(line);
        await this.wait(delay);
      } else if (type === 'progress') {
        await this.progress(line);
        await this.wait(delay);
      } else {
        this.enableLine(line);
        await this.wait(delay);
        this.forceUpdate()
      }
      if (type === 'input') {
        line.data.cursor = undefined;
        this.forceUpdate()
      }
    }
    this.lineDelay = this.originalLineDelay
    this.typeDelay = this.originalTypeDelay
    this.startDelay = this.originalStartDelay
    this.fastVisible = 'hidden';
    this.restartVisible = 'visible';
    this.forceUpdate();
  }


  async type(line: DataLine) {
    const chars = [...line.data.value!];
    const delay = line.data.typeDelay || this.typeDelay;
    let temp_value = line.data.value;
    line.data.value = '';
    this.enableLine(line);
    for (let char of chars) {
      await this.wait(delay);
      line.data.value += char;
      this.forceUpdate()
    }
    line.data.value = temp_value;
  }


  async progress(line: DataLine) {
    const progressLength = line.data.progressLength || this.progressLength;
    const progressChar = line.data.progressChar || this.progressChar;
    const chars = progressChar.repeat(progressLength);
    const progressPercent = line.data.progressPercent || this.progressPercent;
    line.data.value = '';
    this.enableLine(line);
    for (let i = 1; i < chars.length + 1; i++) {
      await this.wait(this.typeDelay);
      const percent = Math.round(i / chars.length * 100);
      line.data.value = `${chars.slice(0, i)} ${percent}%`;
      this.forceUpdate()
      if (percent > progressPercent) {
        break;
      }
    }
  }


  wait(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}

