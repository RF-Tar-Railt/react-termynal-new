import React from 'react';
import { ReactElement } from 'react';
import { DataLine } from './dataline';
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

  constructor(props: TermynalProps) {
    super(props);
    this.id = props.id || "termynal";
    this.originalStartDelay = this.startDelay = props.startDelay || defaultOptions.startDelay;
    this.originalTypeDelay = this.typeDelay = props.typeDelay || defaultOptions.typeDelay;
    this.originalLineDelay = this.lineDelay = props.lineDelay || defaultOptions.lineDelay;
    this.progressLength = props.progressLength || defaultOptions.progressLength;
    this.progressChar = props.progressChar || defaultOptions.progressChar;
    this.progressPercent = props.progressPercent || defaultOptions.progressPercent;
    this.cursor = props.cursor || defaultOptions.cursor;
    this.children = (props.children || []).map((v) => new DataLine(v.props));
    this.fastVisible = 'visible';
    this.restartVisible = 'hidden';
  }
  render() {
    return (
      <div id={this.id} data-termynal="">
        <a href='#'
           style={{visibility: this.fastVisible}}
           onClick={(e) => {
            e.preventDefault()
            this.lineDelay = 0
            this.typeDelay = 0
            this.startDelay = 0
        }} data-terminal-control=''>fast →</a>
        {this.children.map((v) => v.render())}
        <a href='#'
           style={{visibility: this.restartVisible}}
           onClick={(e) => {
            e.preventDefault()
            this.init()
        }} data-terminal-control=''>restart ↻</a>
      </div>
    )
  }

  componentDidMount() {
    this.init();
  }

  init() {
    for (let line of this.children) {
      line.visibility = 'hidden'
    }
    this.fastVisible = 'visible';
    this.restartVisible = 'hidden';
    this.start();
  }

  async start() {
    await this.wait(this.startDelay);
    for (let line of this.children) {

      const type = line.data.type;
      const delay = line.data.delay || this.lineDelay;

      if (type === 'input') {
          line.data.cursor = this.cursor;
          await this.type(line);
          await this.wait(delay);
      }

      else if (type === 'progress') {
          await this.progress(line);
          await this.wait(delay);
      }

      else {
        line.visibility = 'visible';
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
    this.forceUpdate()
  }


  async type(line: DataLine) {
    const chars = [...line.data.value!];
    line.data.value = '';
    line.visibility = 'visible';
    for (let char of chars) {
      const delay = line.data.typeDelay || this.typeDelay;
      await this.wait(delay);
      line.data.value += char;
      this.forceUpdate()
    }
  }


  async progress(line: DataLine) {
    const progressLength = line.data.progressLength || this.progressLength;
    const progressChar = line.data.progressChar || this.progressChar;
    const chars = progressChar.repeat(progressLength);
    const progressPercent = line.data.progressPercent || this.progressPercent;
    line.data.value = '';
    line.visibility = 'visible';
    for (let i = 1; i < chars.length + 1; i++) {
      await this.wait(this.typeDelay);
      const percent = Math.round(i / chars.length * 100);
      line.data.value = `${chars.slice(0, i)} ${percent}%`;
      this.forceUpdate()
      if (percent>progressPercent) {
        break;
      }
    }
  }


  wait(time: number) {
      return new Promise(resolve => setTimeout(resolve, time));
  }
}

