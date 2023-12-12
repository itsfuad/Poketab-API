export const avList = [
	'mankey',
	'meowth',
	'mew',
	'squirtle',
	'squirtle2',
	'charmander',
	'charmander2',
	'psyduck',
	'caterpie',
	'eevee',
	'haunter',
	'mewtwo',
	'jigglypuff',
	'pichu',
	'pidgey',
	'pikachu',
	'dratini',
	'raichu',
	'zubat',
	'articuno',
	'bellsprout',
	'blastoise',
	'bulbasaur2',
	'bullbasaur',
	'charizard',
	'rattata',
	'rayquaza',
	'snorlax',
	'ivysaur',
	'palkia',
];


export const isRealString = (str: string) => {
	return typeof str === 'string' && str.trim().length > 0;
};

export function validateUserName(name: string) {
	const name_format = /^[a-zA-Z0-9_\u0980-\u09FF]{3,20}$/;
	return (isRealString(name) && name_format.test(name) && name.trim().length > 0);
}

export function validateAvatar(avatar: string) {
	return avList.includes(avatar);
}

export function validateKey(key: string) {
	const keyformat = /^[a-zA-Z0-9]{2}-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{2}$/;
	return keyformat.test(key);
}

export function validateAll(name: string, key: string, avatar: string) {
	return (validateUserName(name) && validateKey(key) && validateAvatar(avatar));
}


export async function getLinkMetadata(message: string) {
	const regex = /https?:\/\/[^\s]+/g;
	const link = message.match(regex);

	if (link) {
		const url = link[0];
		const html = await fetch(url).then((res) => res.text());
		const titleRegex = /<title[^>]*>([^<]+)<\/title>/g;
		const descriptionRegex = /<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/g;
		const imageRegex = /<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/g;

		const title = titleRegex.exec(html)?.[1] || '';
		const description = descriptionRegex.exec(html)?.[1] || '';
		let image = imageRegex.exec(html)?.[1] || '';

		//if image path is relative, convert it to absolute
		if (image && image.startsWith('/')) {
			const urlObject = new URL(url);
			image = `${urlObject.protocol}//${urlObject.host}${image}`;
		}

		return {
			success: true,
			data: {
				title,
				description,
				image,
				url,
			},
		};

	} else {
		//console.error('No valid links found in the message.');
		return {
			success: false,
			error: 'No valid links found in the message',
		};
	}
}