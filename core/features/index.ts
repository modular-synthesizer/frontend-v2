export const features = {
  synthesizers: {
    create: createSynthesizer(api.synthesizers.new, useSnack()),
    fetch: fetchSynthesizer(api.synthesizers.get, navigateTo),
    list: fetchSynthesizers(api.synthesizers.list, useSnack()),
    remove: removeSynthesizer(api.synthesizers.delete, useSnack()),
  }
}