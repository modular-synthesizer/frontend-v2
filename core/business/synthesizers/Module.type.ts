import type { ModuleLink } from "./ModuleLink.type";
import type { ModuleNode } from "./ModuleNode.type";
import type { Parameter } from "./Parameter.type";
import type { Port } from "./Port.type";

export type Module = Identified & {
	rack: number;
	slot: number;
	slots: number;
	controls: Control[];
	parameters: Parameter[];
	ports: Port[];
	nodes: ModuleNode[];
	links: ModuleLink[];
};
