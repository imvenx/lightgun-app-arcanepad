import { Apps } from "src/models/models";
import { ref } from "vue";

export class SharedState {
  selectedApp: Apps = 'Tutorial'
  inApp: boolean = false
}

export const sharedState = ref<SharedState>(new SharedState())
