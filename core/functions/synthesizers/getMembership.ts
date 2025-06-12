export function getMembership(
	synthesizer: Synthesizer,
	username: string,
): Membership {
	return synthesizer.members.find(
		(m: Membership) => m.username === username,
	) as Membership;
}
