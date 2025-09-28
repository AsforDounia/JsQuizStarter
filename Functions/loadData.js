
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

export async function getThemeNames() {
	try {
		const response = await fetch('jsonData/manifest.json', { cache: 'no-store' });
		if (!response.ok) throw new Error('Failed to load theme manifest');
		const files = await response.json();
		if (!Array.isArray(files)) return [];
		return files
			.filter(name => typeof name === 'string' && name.endsWith('.json'))
			.map(name => name.replace(/\.json$/i, ''));
	} catch (err) {
		console.error('getThemeNames error:', err);
		return [];
	}
}


export function shuffleArray(array) {
	const copy = array.slice();
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = copy[i];
		copy[i] = copy[j];
		copy[j] = temp;
	}
	return copy;
}


