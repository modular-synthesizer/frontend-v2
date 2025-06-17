export type ToolNode = Identified & Coordinates & {
  name: string;
  generator: string;
  // TODO : Check if this flag is still relevant through the whole application.
  polyphonic: boolean;
}