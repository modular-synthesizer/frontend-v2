import { useDebounce } from '~/composables/debounce'

export const features = {
  synthesizers: {
    create: createSynthesizer(api, useSnack()),
    fetch: fetchSynthesizer(api, navigateTo),
    list: fetchSynthesizers(api, useSnack()),
    move: moveSynthesizer(api, useSnack()),
    remove: removeSynthesizer(api, useSnack()),
    rescale: rescaleSynthesizer(api, useDebounce())
  }
}