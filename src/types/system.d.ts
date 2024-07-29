interface IIBindingManager {
	/**
	 * Gets all held down keys
	 * @returns All keys currently held down
	 */
	GetHeldKeys(): Enum.KeyCode[];

	/**
	 *
	 * @param keys Array of keys that needs to be held down
	 * @returns True if all the keys of the array are held down, false otherwise
	 */
	GetIfHeldKeysArePressed(keys: Enum.KeyCode[]): boolean;
}

export { IIBindingManager };
