interface DummyTable {
	[key: string]: unknown;
}

interface TrophyConfiguration extends DummyTable {
	AdvancedDamageSystem: boolean;
}

export { DummyTable, TrophyConfiguration };
