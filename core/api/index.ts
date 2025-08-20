import { createFetcher } from "~/core/api/createFetcher";
import { newSessionApi } from "./sessions/new.api";
import type { ToolUpdateFetcher } from "./tools/update";
import { newTool, type ToolCreator } from "./tools/create";
import { listCategories, type CategoryListFetcher } from "./categories/list";
import type { Category } from "../business/tools/Category.type";
import { deleteTool, type ToolDeleter } from "./tools/delete";
import { listCables, type CableListFetcher } from "./cables/list"
import type { Cable } from "../business/synthesizers/Cable.type";

export type ApiSchema = {
	cables: {
		list: CableListFetcher,
	},
	categories: {
		list: CategoryListFetcher
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
		list: listCables(createFetcher<Cable[]>(fetch), useAuth()),
	},
	categories: {
		list: listCategories(createFetcher<Category[]>(fetch), useAuth()),
	},
	modules: {
		list: listModules(createFetcher<Module[]>(fetch), useAuth()),
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
