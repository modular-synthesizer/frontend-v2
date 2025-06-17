export type Tool = Identified & ScaledCoordinates & {
	controls: Control[];
	nodes: ToolNode[];
};
