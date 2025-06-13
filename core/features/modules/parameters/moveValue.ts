export function moveParameterValue() {
  return async (parameter: Parameter, delta: number) => {
    return features.modules.parameters.setValue(parameter, parameter.value + delta)
  }
}