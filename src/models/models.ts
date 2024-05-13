import { Arcane, ArcaneBaseEvent } from "arcanepad-web-sdk"
import { LightgunApp } from "src/stores/AppsStore"
import { SharedState } from "src/stores/SharedState"
import { Key, KeyboardPressKeyEvent, KeyboardReleaseKeyEvent, KeyboardTypeEvent } from "./KeyboardEvents"

export type AMouseButton = 'Left' | 'Right' | 'Middle'

export abstract class MouseButtonActionBaseEvent extends ArcaneBaseEvent {
  button: AMouseButton
  constructor(name: string, button: AMouseButton) {
    super(name)
    this.button = button
  }
}

export class MouseButtonDoubleClickEvent extends MouseButtonActionBaseEvent {
  constructor(button: AMouseButton) { super('_DoubleClickMouseButton', button) }
}

export class MouseButtonPressEvent extends MouseButtonActionBaseEvent {
  constructor(button: AMouseButton) { super('_PressMouseButton', button) }
}

export class MouseButtonHoldEvent extends MouseButtonActionBaseEvent {
  constructor(button: AMouseButton) { super('_HoldMouseButton', button) }
}

export class MouseButtonReleaseEvent extends MouseButtonActionBaseEvent {
  constructor(button: AMouseButton) { super('_ReleaseMouseButton', button) }
}

export class SelectAppEvent extends ArcaneBaseEvent {
  app: LightgunApp
  constructor(app: LightgunApp) {
    super('SelectApp')
    this.app = app
  }
}

export class EnterAppEvent extends ArcaneBaseEvent {
  app: LightgunApp
  constructor(app: LightgunApp) {
    super('EnterApp')
    this.app = app
  }
}

export class UpdateSharedStateEvent extends ArcaneBaseEvent {
  newSharedState: SharedState
  constructor(newSharedState: SharedState) {
    super('UpdateSharedState')
    this.newSharedState = newSharedState
  }
}

export class GunButtons {
  reloadButton?: GunButton
  escButton?: EscButton
  extraButton?: GunButton
}

export class GunButton {
  constructor({ onTouchStart, onTouchEnd, text }: GunButton = { onTouchStart: () => { }, text: '' }) {
    this.onTouchStart = onTouchStart
    this.onTouchEnd = onTouchEnd
    this.text = text
  }
  onTouchStart?: Function
  onTouchEnd?: Function
  text?: string
}

export class EscButton extends GunButton {
  constructor({ onTouchStart, onTouchEnd, text }: GunButton = {
    onTouchStart: () => Arcane.msg.emit(new KeyboardPressKeyEvent(Key.Escape), []),
    onTouchEnd: () => Arcane.msg.emit(new KeyboardReleaseKeyEvent(Key.Escape), []),
    text: 'Esc'
  }) {
    super({ onTouchStart, onTouchEnd, text })
  }
}

export class ExtraButton extends GunButton {
  constructor({ onTouchStart, onTouchEnd, text }: GunButton = {
    onTouchStart: () => Arcane.msg.emit(new MouseButtonHoldEvent('Middle'), []),
    onTouchEnd: () => Arcane.msg.emit(new MouseButtonReleaseEvent('Middle'), []),
    text: 'Extra'
  }) {
    super({ onTouchStart, onTouchEnd, text })
  }
}

export class ReloadButton extends GunButton {
  constructor({ onTouchStart, onTouchEnd, text }: GunButton = {
    onTouchStart: () => Arcane.msg.emit(new MouseButtonHoldEvent('Right'), []),
    onTouchEnd: () => Arcane.msg.emit(new MouseButtonReleaseEvent('Right'), []),
    text: 'Reload'
  }) {
    super({ onTouchStart, onTouchEnd, text })
  }
}
