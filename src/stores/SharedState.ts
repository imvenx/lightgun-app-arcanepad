import { Apps } from "src/models/models";
import { ref } from "vue";

export class SharedState {
  selectedApp: Apps = 'Tutorial'
}

export const sharedState = ref<SharedState>(new SharedState())
