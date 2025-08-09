export type Tool = Identified & ScaledCoordinates & {
	name: string;
	slots: number;
	controls: Control[];
	nodes: ToolNode[];
	categoryId: string;
};
