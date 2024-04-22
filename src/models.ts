import { AEventName, ArcaneBaseEvent } from "arcanepad-web-sdk"

export class AttackedEvent extends ArcaneBaseEvent {
  damage: number
  constructor(damage: number) {
    super('Attacked')
    this.damage = damage
  }
}

export class MouseMoveEvent extends ArcaneBaseEvent {
  x: number
  y: number
  constructor(x: number, y: number) {
    super('_MouseMove');
    this.x = x
    this.y = y
  }
}
