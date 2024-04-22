import { Apps } from "src/models/models";
import { ref } from "vue";

export class PadState {
  selectedApp: Apps = 'Tutorial'
}

export const padState = ref<PadState>(new PadState())
