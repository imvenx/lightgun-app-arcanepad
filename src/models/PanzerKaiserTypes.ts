import { ArcaneBaseEvent } from "arcanepad-web-sdk";

export type AKey =
  'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' |
  'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' |
  'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' |
  'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' |
  '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' |
  'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12' |
  'Esc' | 'Tab' | 'Up' | 'Down' | 'Left' | 'Right' | 'VolUp' | 'VolDown' | 'PrtSc' | 'Menu'
  | '-' | '=' | '[' | ']' | '\\' | '`' | 'CapsLock' | ';' | "'" | 'Enter' | 'BackSpace' | 'Space'
  | 'Ctrl' | 'Alt' | 'AltGr' | 'Shift' | 'Cmd' | 'Fn' |
  ',' | '.' | '/' | 'Home'


export type ModifierKey = 'Ctrl' | 'Alt' | 'Shift' | 'Cmd' | 'Fn';


export abstract class KeyActionBaseEvent extends ArcaneBaseEvent {
  key: AKey
  modifier?: ModifierKey
  constructor(name: string, key: AKey, modifier?: ModifierKey) {
    super(name)
    this.key = key
    this.modifier = modifier
  }
}

export class PressKeyEvent extends KeyActionBaseEvent { constructor(key: AKey, modifier?: ModifierKey) { super('_PressKey', key, modifier) } }

// export class HoldKeyEvent extends KeyActionBaseEvent { constructor(key: AKey, modifier?: ModifierKey) { super(AEventName.HoldKey, key, modifier) } }

// export class ReleaseKeyEvent extends KeyActionBaseEvent { constructor(key: AKey, modifier?: ModifierKey) { super(AEventName.ReleaseKey, key, modifier) } }
