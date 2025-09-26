
export async function loadData(themeKey) {
	try {
		const response = await fetch(`jsonData/${themeKey}.json`, { cache: 'no-store' });
		if (!response.ok) throw new Error(`Failed to load theme: ${themeKey}`);
		const json = await response.json();
		return json.questions || null;
	} catch (error) {
		console.error('Error loading theme data:', error);
		return null;
	}
}