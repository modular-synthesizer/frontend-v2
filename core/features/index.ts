import { useDebounce } from "~/composables/debounce";
import { rescaleTool } from "./tools/rescaleTool";

export const features = {
  modules: {
    move: moveModule(),
    save: saveModule(api, useSnack()),
    select: selectModule(useSelection()),
    parameters: {
      moveValue: moveParameterValue(),
      setValue: setParameterValue(),
    }
  },
  sessions: {
    logout: attemptLogout(navigateTo, useAuth().reset)
  },
  synthesizers: {
    create: createSynthesizer(api, useSnack()),
    fetch: fetchSynthesizer(api, navigateTo),
    list: fetchSynthesizers(api, useSnack()),
    move: moveSynthesizer(api, useSnack()),
    remove: removeSynthesizer(api, useSnack()),
    rescale: rescaleSynthesizer(api, useDebounce(), useSnack()),
  },
  tools: {
    fetch: fetchTool(api, navigateTo),
    list: fetchTools(api, useSnack()),
    rescale: rescaleTool(api, useDebounce(), useSnack()),
  }
}
