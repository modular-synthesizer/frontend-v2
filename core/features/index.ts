import { useDebounce } from "~/composables/debounce";
import { rescaleTool } from "./tools/rescaleTool";
import { fetchCategories } from "./categories/fetchCategories";
import { loadModule } from "./modules/loadModule";
import { usePorts } from "~/composables/cables/ports";
import { moveModule } from "@jsynple/core"

export const features = {
  modules: {
    load: loadModule(usePorts()),
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
    categories: {
      list: fetchCategories(api, useSnack())
    },
    create: createTool(api, useSnack()),
    fetch: fetchTool(api, navigateTo),
    list: fetchTools(api, useSnack()),
    rescale: rescaleTool(api, useDebounce(), useSnack()),
  }
}
