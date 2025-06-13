import { useDebounce } from "~/composables/debounce";

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
  synthesizers: {
    create: createSynthesizer(api, useSnack()),
    fetch: fetchSynthesizer(api, navigateTo),
    list: fetchSynthesizers(api, useSnack()),
    move: moveSynthesizer(api, useSnack()),
    remove: removeSynthesizer(api, useSnack()),
    rescale: rescaleSynthesizer(api, useDebounce(), useSnack())
  },
  tools: {
    fetch: fetchTools(api, useSnack())
  }
}
