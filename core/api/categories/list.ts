import type { Category } from "~/core/business/tools/Category.type";

export type CategoryListFetcher = () => ExpectedResult<Category[]>;

export function listCategories(
	fetcher: Fetcher<Category[]>,
	auth: Auth,
): CategoryListFetcher {
	return async () => {
		return await fetcher("GET", "/categories", {
			auth_token: auth.token,
		});
	};
}
