export function failure(key: string, message: string): AsyncFailure {
	return { ok: false, key, message };
}

export function success<T>(data: T): AsyncSuccess<T> {
	return { ok: true, data };
}
