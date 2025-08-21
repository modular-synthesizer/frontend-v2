import type { NodeGenerator } from "~/core/business/synthesizers/NodeGenerator.type";
import { createListFetcher } from "../utils/createListFetcher";

export const listGenerators = createListFetcher<NodeGenerator>("/generators")