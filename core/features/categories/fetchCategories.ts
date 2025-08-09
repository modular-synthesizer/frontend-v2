import type { Category } from "~/core/business/tools/Category.type";

export function fetchCategories(api: ApiSchema, snack: Snacker) {
	return async (): Promise<Category[]> => {
		const response: AsyncResult<Category[]> = await api.categories.list()
		if (!response.ok) {
			snack.error("categories.errors.list");
			return [];
		}

		return response.data;
	};
}
