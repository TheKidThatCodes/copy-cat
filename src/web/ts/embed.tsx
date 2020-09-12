import { Component, h, render } from "preact";
import { Semaphore, Terminal, TerminalData } from "@squid-dev/cc-web-term";
import type { ConfigGroup } from "./classes";
import { ComputerAccess } from "./computer/access";
import { ComputerPersistance, StoragePersistence, VoidPersistence } from "./computer/persist";
import termFont from "@squid-dev/cc-web-term/assets/term_font.png";
import termFontHd from "@squid-dev/cc-web-term/assets/term_font_hd.png";
import requirejs from "require";

type MainProps = {
  font: string,
  persistence: ComputerPersistance,
  files: { [filename: string]: string | ArrayBuffer },
  label?: string,
  width?: number,
  height?: number,
}

type MainState = {
  on: boolean,
  label: string | null,
  terminal: TerminalData,
  terminalChanged: Semaphore,
  computer: ComputerAccess,
};

const emptyGroup: ConfigGroup = {
  addString: () => { },
  addBoolean: () => { },
  addInt: () => { },
};

class Main extends Component<MainProps, MainState> {
  public constructor(props: MainProps, context: unknown) {
    super(props, context);

    const terminal = new TerminalData();
    const terminalChanged = new Semaphore();
    const computer = new ComputerAccess(
      props.persistence,
      terminal, terminalChanged,
      (label, on) => this.setState({ label, on }),
    );

    // Set up the file system from the list of files given.
    for (const fileName in props.files) {
      if (!Object.prototype.hasOwnProperty.call(props.files, fileName)) continue;

      const contents = props.files[fileName];
      const file = computer.createFile(fileName);
      if (file.value === null) throw new Error(file.error);

      const written = file.value.setContents(contents);
      if (written.value === null) throw new Error(written.error);
    }

    this.setState({
      on: false,
      label: null,
      terminal, terminalChanged, computer
    });
  }

  public componentDidMount(): void {
    this.state.computer.start(() => emptyGroup, this.props);
  }

  public render({ font }: MainProps, { computer, terminal, terminalChanged, label, on }: MainState) {
    return <Terminal terminal={terminal} changed={terminalChanged} focused={true} computer={computer}
      font={font}
      id={0} label={label} on={on} />;
  }
}

export default (element: HTMLElement, options?: {
  persistId?: number,
  label?: string,
  width?: number,
  height?: number,
  hdFont?: boolean | string,
  files?: { [filename: string]: string | ArrayBuffer },
}): void => {
  const { persistId, hdFont, files } = options || {};

  const persistence = persistId === undefined ? new VoidPersistence() : new StoragePersistence(persistId);
  const font = typeof hdFont === "string" ? hdFont :
    // We need to do some terrible path hackery to get this to resolve relative to the
    // current script (and thus copy-cat.squiddev.ccc).
    // termFont{Hd,} will be of the form "termFont_xxx.png" - we convert it to
    // "./termFont_xxx.png", and then resolve.
    requirejs.toUrl("./" + (hdFont === undefined || hdFont ? termFontHd : termFont));

  render(<Main persistence={persistence} font={font} files={files || {}} {...options} />, element);
};
