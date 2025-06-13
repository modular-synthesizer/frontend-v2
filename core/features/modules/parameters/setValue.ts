export function setParameterValue() {
  return async (parameter: Parameter, value: number) => {
    parameter.value = Math.min(Math.max(value, parameter.minimum), parameter.maximum)
  }
}