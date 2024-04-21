import { ArcaneBaseEvent } from "arcanepad-web-sdk"
import { SharedState } from "src/stores/SharedState"

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

export type Apps = 'Tutorial' | 'HouseOfTheBread'

export class SelectAppEvent extends ArcaneBaseEvent {
  app: Apps
  constructor(app: Apps) {
    super('SelectApp')
    this.app = app
  }
}

export class EnterAppEvent extends ArcaneBaseEvent {
  app: Apps
  constructor(app: Apps) {
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

