export const features = {
  synthesizers: {
    create: createSynthesizer(api.synthesizers.new, useSnack()),
    fetch: fetchSynthesizers(api.synthesizers.list, useSnack()),
    remove: removeSynthesizer(api.synthesizers.delete, useSnack()),
  }
}