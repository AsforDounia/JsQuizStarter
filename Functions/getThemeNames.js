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
