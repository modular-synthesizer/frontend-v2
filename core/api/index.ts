import { createFetcher } from "~/core/api/createFetcher";
import { newSessionApi } from "./sessions/new.api";
import type { ToolUpdateFetcher } from "./tools/update";
import { newTool, type ToolCreator } from "./tools/create";
import { listCategories, type CategoryListFetcher } from "./categories/list";
import type { Category } from "../business/tools/Category.type";
import { deleteTool, type ToolDeleter } from "./tools/delete";
import { listCables, type CableListFetcher } from "./cables/list"
import type { ApiCable, ApiModule, NodeGenerator } from "@jsynple/core";
import { listGenerators, type GeneratorsListFetcher } from "./generators/list";

export type ApiSchema = {
	cables: {
		list: CableListFetcher,
	},
	categories: {
		list: CategoryListFetcher
	},
	generators: {
		list: GeneratorsListFetcher
	},
	modules: {
		list: ModuleListFetcher;
		update: ModuleUpdateFetcher;
	};
	sessions: {
		new: SessionCreationFetcher;
	};
	synthesizers: {
		delete: SynthesizerDeleteFetcher;
		get: SynthesizerGetFetcher;
		new: SynthesizerCreationFetcher;
		list: SynthesizerListFetcher;
		update: SynthesizerUpdateFetcher;
	};
	tools: {
		delete: ToolDeleter,
		new: ToolCreator;
		get: ToolFetcher;
		list: ToolsListFetcher;
		update: ToolUpdateFetcher;
	};
};

export const api: ApiSchema = {
	cables: {
		list: listCables(createFetcher<ApiCable[]>(fetch), useAuth()),
	},
	categories: {
		list: listCategories(createFetcher<Category[]>(fetch), useAuth()),
	},
	generators: {
		list: listGenerators(createFetcher<NodeGenerator[]>(fetch), useAuth()),
	},
	modules: {
		list: listModules(createFetcher<ApiModule[]>(fetch), useAuth()),
		update: updateModule(createFetcher<Module>(fetch), useAuth()),
	},
	sessions: {
		new: newSessionApi(createFetcher<Session>(fetch)),
	},
	synthesizers: {
		delete: deleteSynthesizer(createFetcher<void>(fetch), useAuth()),
		get: getSynthesizer(createFetcher<Synthesizer>(fetch), useAuth()),
		new: newSynthesizer(createFetcher<Synthesizer>(fetch), useAuth()),
		list: listSynthesizers(createFetcher<Synthesizer[]>(fetch), useAuth()),
		update: updateSynthesizer(createFetcher<Synthesizer>(fetch), useAuth()),
	},
	tools: {
		delete: deleteTool(createFetcher<void>(fetch), useAuth()),
		get: getTool(createFetcher<Tool>(fetch), useAuth()),
		list: listTools(createFetcher<Tool[]>(fetch), useAuth()),
		new: newTool(createFetcher<Tool>(fetch), useAuth()),
		update: updateTool(createFetcher<Tool>(fetch), useAuth()),
	},
};
